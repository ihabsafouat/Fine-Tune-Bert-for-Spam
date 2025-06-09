import re
from typing import Dict, Any
from bs4 import BeautifulSoup
import html

def clean_text(text: str) -> str:
    """
    Clean and normalize text content
    """
    # Remove HTML tags
    text = BeautifulSoup(text, "html.parser").get_text()
    
    # Decode HTML entities
    text = html.unescape(text)
    
    # Remove URLs
    text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
    
    # Remove email addresses
    text = re.sub(r'\S+@\S+', '', text)
    
    # Remove special characters and extra whitespace
    text = re.sub(r'[^\w\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    
    return text.strip()

def process_email(content: str) -> str:
    """
    Process email content for spam classification
    
    Args:
        content: Raw email content
        
    Returns:
        Processed text ready for classification
    """
    # Clean the text
    processed_text = clean_text(content)
    
    # Additional processing can be added here if needed
    # For example, removing common spam words, normalizing text, etc.
    
    return processed_text

def extract_email_metadata(email_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Extract relevant metadata from email
    
    Args:
        email_data: Dictionary containing email data
        
    Returns:
        Dictionary with extracted metadata
    """
    metadata = {
        'sender': email_data.get('sender', ''),
        'recipient': email_data.get('recipient', ''),
        'subject': email_data.get('subject', ''),
        'headers': email_data.get('headers', {})
    }
    
    return metadata 