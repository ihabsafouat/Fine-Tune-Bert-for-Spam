import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Configuration
API_KEY = os.getenv("API_KEY")
BASE_URL = "http://localhost:8000"

def test_health_check():
    """Test the health check endpoint"""
    response = requests.get(f"{BASE_URL}/api/v1/health")
    print("\nTesting Health Check:")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    return response.status_code == 200

def test_spam_detection():
    """Test the spam detection endpoint with sample emails"""
    headers = {
        "X-API-Key": API_KEY,
        "Content-Type": "application/json"
    }
    
    # Test cases
    test_cases = [
        {
            "name": "Spam Email",
            "email": {
                "sender": "spammer@example.com",
                "recipient": "user@example.com",
                "subject": "URGENT: You've won a million dollars!",
                "content": "CONGRATULATIONS! You've won $1,000,000! Click here to claim your prize: http://suspicious-link.com"
            }
        },
        {
            "name": "Legitimate Email",
            "email": {
                "sender": "colleague@company.com",
                "recipient": "user@example.com",
                "subject": "Meeting Tomorrow",
                "content": "Hi, I'd like to schedule a meeting tomorrow at 2 PM to discuss the project progress. Please let me know if this time works for you."
            }
        }
    ]
    
    print("\nTesting Spam Detection:")
    for test_case in test_cases:
        print(f"\nTest Case: {test_case['name']}")
        response = requests.post(
            f"{BASE_URL}/api/v1/check-email",
            headers=headers,
            json=test_case["email"]
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")

def main():
    print("Starting Backend Tests...")
    
    # Test health check
    if not test_health_check():
        print("Health check failed!")
        return
    
    # Test spam detection
    test_spam_detection()
    
    print("\nBackend tests completed!")

if __name__ == "__main__":
    main() 