import secrets
import base64

def generate_jwt_secret():
    # Generate 32 random bytes
    random_bytes = secrets.token_bytes(32)
    # Convert to base64 for a readable string
    jwt_secret = base64.b64encode(random_bytes).decode('utf-8')
    return jwt_secret

if __name__ == "__main__":
    secret = generate_jwt_secret()
    print("\nGenerated JWT Secret Key:")
    print("-" * 50)
    print(secret)
    print("-" * 50)
    print("\nAdd this to your .env file as:")
    print(f"JWT_SECRET={secret}") 