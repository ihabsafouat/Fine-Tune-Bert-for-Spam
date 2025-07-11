from fastapi import FastAPI, HTTPException, Depends, Security
from fastapi.security import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from typing import Optional, List
import os
from dotenv import load_dotenv
from backend.ml.model_loader import load_model, predict_spam
from backend.services.email_processor import process_email
from backend.services.sendmail_integration import EmailHandler
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext
import secrets
from sqlalchemy.orm import Session
from backend.database.database import SessionLocal, engine, get_db # Import necessary database components
from backend.models.models import User, Email # Import the User and Email models
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi.responses import JSONResponse
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
import logging
from fastapi import Request as FastAPIRequest
import requests
from collections import defaultdict
from time import time

# Load environment variables
load_dotenv()
print(f"API_KEY loaded from environment: {os.getenv('API_KEY')}")

app = FastAPI(
    title="Smart Anti-Spam System",
    description="AI-powered spam detection system integrated with Sendmail",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Allow both localhost variations
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
    expose_headers=["*"]  # Expose all headers
)

# Security
API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Models
class EmailRequest(BaseModel):
    sender: str
    recipient: str
    subject: str
    content: str
    headers: Optional[dict] = None

class EmailResponse(BaseModel):
    is_spam: bool
    confidence: float
    message: str

class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    api_key: str

# Add new models
class EmailCreate(BaseModel):
    recipient_email: str
    subject: str
    content: str

class EmailRead(BaseModel):
    id: int
    subject: str
    content: str
    sender_email: str
    recipient_email: str
    is_spam: bool
    spam_confidence: float
    created_at: datetime

    class Config:
        orm_mode = True

class UserUpdateEmail(BaseModel):
    email: str

class UserUpdatePassword(BaseModel):
    new_password: str
    confirm_password: str

# Initialize components
model = load_model()
sendmail_handler = EmailHandler()

# Mock user database (replace with real database in production)
# users_db = {}

def generate_api_key():
    return secrets.token_urlsafe(32)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, os.getenv("JWT_SECRET", "your-secret-key"), algorithm="HS256")
    return encoded_jwt

async def verify_api_key(api_key: str = Security(api_key_header), db: Session = Depends(get_db)):
    # Check if the provided API key exists in any user's record
    user = db.query(User).filter(User.api_key == api_key).first()
    if user:
        return api_key
            
    raise HTTPException(
        status_code=403,
        detail="Invalid API key"
    )

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

# --- Account Lockout State ---
FAILED_ATTEMPTS = defaultdict(lambda: {'count': 0, 'lockout_until': 0})
LOCKOUT_THRESHOLD = 5
LOCKOUT_TIME = 15 * 60  # 15 minutes

@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={"detail": "Too many requests, please try again later."}
    )

# Security headers middleware
class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['Referrer-Policy'] = 'no-referrer'
        response.headers['Permissions-Policy'] = 'geolocation=()'
        response.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none';"
        return response

app.add_middleware(SecurityHeadersMiddleware)
# Optionally enforce HTTPS in production
# app.add_middleware(HTTPSRedirectMiddleware)

@app.post("/api/v1/signup", response_model=Token)
@limiter.limit("5/minute")
async def signup(request: Request, user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    hashed_password = pwd_context.hash(user.password)
    api_key = generate_api_key()
    new_user = User(
        email=user.email,
        hashed_password=hashed_password,
        api_key=api_key
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    access_token = create_access_token(data={"sub": new_user.email})
    return {"access_token": access_token, "token_type": "bearer", "api_key": new_user.api_key}

@app.post("/api/v1/login", response_model=Token)
@limiter.limit("10/minute")
async def login(user: UserLogin, request: FastAPIRequest, db: Session = Depends(get_db)):
    ip = get_remote_address(request)
    state = FAILED_ATTEMPTS[ip]
    now = time()
    # Check lockout
    if state['lockout_until'] > now:
        logger.warning(f"Locked out login attempt from {ip} for user: {user.email}")
        raise HTTPException(status_code=403, detail=f"Account locked. Try again later.")
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not pwd_context.verify(user.password, db_user.hashed_password):
        logger.warning(f"Failed login attempt for user: {user.email} from {ip}")
        state['count'] += 1
        # If failed attempts >= LOCKOUT_THRESHOLD, lock out
        if state['count'] >= LOCKOUT_THRESHOLD:
            state['lockout_until'] = now + LOCKOUT_TIME
            state['count'] = 0
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    # Success: reset state
    state['count'] = 0
    state['lockout_until'] = 0
    access_token = create_access_token(data={"sub": db_user.email})
    return {"access_token": access_token, "token_type": "bearer", "api_key": db_user.api_key}

@app.post("/api/v1/check-email", response_model=EmailResponse)
async def check_email(
    email: EmailRequest,
    api_key: str = Depends(verify_api_key)
):
    try:
        # Process email content
        processed_content = process_email(email.content)
        
        # Predict if spam
        is_spam, confidence = predict_spam(model, processed_content)
        
        # Convert Pydantic model to dictionary
        email_dict = email.dict()
        
        # Handle email based on prediction
        try:
            if is_spam:
                sendmail_handler.handle_spam(email_dict)
                message = "Email classified as spam and rejected"
            else:
                sendmail_handler.handle_legitimate(email_dict)
                message = "Email classified as legitimate and accepted"
        except Exception as e:
            # If Sendmail integration fails, just log it but continue
            print(f"Sendmail integration error (ignored for testing): {str(e)}")
            message = "Email classified as legitimate (Sendmail integration disabled)"
        
        return EmailResponse(
            is_spam=is_spam,
            confidence=float(confidence),
            message=message
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing email: {str(e)}"
        )

@app.post("/api/v1/send-email", response_model=EmailRead)
async def send_email(
    email: EmailCreate,
    db: Session = Depends(get_db),
    api_key: str = Depends(verify_api_key)
):
    # Get sender and recipient
    sender = db.query(User).filter(User.api_key == api_key).first()
    recipient = db.query(User).filter(User.email == email.recipient_email).first()
    
    if not recipient:
        raise HTTPException(
            status_code=404,
            detail="Recipient not found"
        )
    
    # Process email content and check for spam
    processed_content = process_email(email.content)
    is_spam, confidence = predict_spam(model, processed_content)
    
    # Create email record
    db_email = Email(
        subject=email.subject,
        content=email.content,
        sender_id=sender.id,
        recipient_id=recipient.id,
        is_spam=is_spam,
        spam_confidence=float(confidence)
    )
    
    db.add(db_email)
    db.commit()
    db.refresh(db_email)
    
    # Handle email based on prediction
    try:
        if is_spam:
            sendmail_handler.handle_spam({
                "sender": sender.email,
                "recipient": recipient.email,
                "subject": email.subject,
                "content": email.content
            })
        else:
            sendmail_handler.handle_legitimate({
                "sender": sender.email,
                "recipient": recipient.email,
                "subject": email.subject,
                "content": email.content
            })
    except Exception as e:
        print(f"Sendmail integration error: {str(e)}")
    
    # Add sender and recipient emails to the response
    response_data = {
        **db_email.__dict__,
        "sender_email": sender.email,
        "recipient_email": recipient.email
    }
    
    return response_data

@app.get("/api/v1/emails/sent", response_model=List[EmailRead])
async def get_sent_emails(
    db: Session = Depends(get_db),
    api_key: str = Depends(verify_api_key)
):
    user = db.query(User).filter(User.api_key == api_key).first()
    emails = []
    for email in user.sent_emails:
        emails.append(EmailRead(
            id=email.id,
            subject=email.subject,
            content=email.content,
            sender_email=email.sender.email,  # assumes relationship is set up
            recipient_email=email.recipient.email,  # assumes relationship is set up
            is_spam=email.is_spam,
            spam_confidence=email.spam_confidence,
            created_at=email.created_at
        ))
    return emails

@app.get("/api/v1/emails/received", response_model=List[EmailRead])
async def get_received_emails(
    db: Session = Depends(get_db),
    api_key: str = Depends(verify_api_key)
):
    user = db.query(User).filter(User.api_key == api_key).first()
    emails = []
    for email in user.received_emails:
        emails.append(EmailRead(
            id=email.id,
            subject=email.subject,
            content=email.content,
            sender_email=email.sender.email,  # assumes relationship is set up
            recipient_email=email.recipient.email,  # assumes relationship is set up
            is_spam=email.is_spam,
            spam_confidence=email.spam_confidence,
            created_at=email.created_at
        ))
    return emails

@app.get("/api/v1/emails/spam", response_model=List[EmailRead])
async def get_spam_emails(
    db: Session = Depends(get_db),
    api_key: str = Depends(verify_api_key)
):
    user = db.query(User).filter(User.api_key == api_key).first()
    emails = []
    for email in user.received_emails:
        if email.is_spam:
            emails.append(EmailRead(
                id=email.id,
                subject=email.subject,
                content=email.content,
                sender_email=email.sender.email,
                recipient_email=email.recipient.email,
                is_spam=email.is_spam,
                spam_confidence=email.spam_confidence,
                created_at=email.created_at
            ))
    return emails

@app.get("/api/v1/health")
async def health_check():
    return {"status": "healthy", "service": "anti-spam-api"}

@app.patch("/api/v1/user/email")
async def update_email(
    data: UserUpdateEmail,
    api_key: str = Depends(verify_api_key),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.api_key == api_key).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already in use")
    user.email = data.email
    db.commit()
    db.refresh(user)
    return {"message": "Email updated successfully", "email": user.email}

@app.patch("/api/v1/user/password")
async def update_password(
    data: UserUpdatePassword,
    api_key: str = Depends(verify_api_key),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.api_key == api_key).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if data.new_password != data.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    user.hashed_password = pwd_context.hash(data.new_password)
    db.commit()
    return {"message": "Password updated successfully"}

@app.get("/api/v1/user/me")
async def get_current_user(api_key: str = Depends(verify_api_key), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.api_key == api_key).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "email": user.email,
        "api_key": user.api_key,
        "created_at": user.created_at,
        "updated_at": user.updated_at,
    }

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True) 