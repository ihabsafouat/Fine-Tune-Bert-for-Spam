import secrets
import string

def generate_api_key(length=32):
    # Define the character set for the API key
    alphabet = string.ascii_letters + string.digits
    # Generate a secure random API key
    api_key = ''.join(secrets.choice(alphabet) for _ in range(length))
    return api_key

if __name__ == "__main__":
    api_key = generate_api_key()
    print("\nGenerated API Key:")
    print("-" * 50)
    print(api_key)
    print("-" * 50)
    print("\nAdd this to your .env file as:")
    print(f"API_KEY={api_key}") 