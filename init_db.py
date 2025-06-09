from database import Base, engine
from models import User, Email

def init_db():
    # Create all tables
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    print("Creating database tables...")
    init_db()
    print("Database tables created successfully!") 