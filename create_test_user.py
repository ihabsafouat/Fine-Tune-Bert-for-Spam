from database import SessionLocal
from models import User
from passlib.context import CryptContext
import secrets

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def generate_api_key():
    return secrets.token_urlsafe(32)

def create_test_users():
    db = SessionLocal()
    try:
        # Create first test user
        user1 = db.query(User).filter(User.email == "test1@example.com").first()
        if not user1:
            hashed_password = pwd_context.hash("password123")
            api_key = generate_api_key()
            user1 = User(
                email="test1@example.com",
                hashed_password=hashed_password,
                api_key=api_key
            )
            db.add(user1)
            print("Test user 1 created successfully!")
            print("Email: test1@example.com")
            print("Password: password123")
            print(f"API Key: {api_key}")

        # Create second test user
        user2 = db.query(User).filter(User.email == "test2@example.com").first()
        if not user2:
            hashed_password = pwd_context.hash("password123")
            api_key = generate_api_key()
            user2 = User(
                email="test2@example.com",
                hashed_password=hashed_password,
                api_key=api_key
            )
            db.add(user2)
            print("\nTest user 2 created successfully!")
            print("Email: test2@example.com")
            print("Password: password123")
            print(f"API Key: {api_key}")

        db.commit()
    except Exception as e:
        print(f"Error creating test users: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_test_users() 