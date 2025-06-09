import os
import logging
import subprocess
from typing import Dict, Any
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('spam_filter.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

class EmailHandler:
    def __init__(self):
        self.spam_folder = os.getenv("SPAM_FOLDER", "/var/spool/mail/spam")
        self.log_folder = os.getenv("LOG_FOLDER", "/var/log/spam-filter")
        
        # Create necessary directories if they don't exist
        os.makedirs(self.spam_folder, exist_ok=True)
        os.makedirs(self.log_folder, exist_ok=True)

    def _log_action(self, action: str, email_data: Dict[str, Any]):
        """
        Log email handling action
        """
        timestamp = datetime.now().isoformat()
        log_entry = {
            'timestamp': timestamp,
            'action': action,
            'sender': email_data.get('sender', ''),
            'recipient': email_data.get('recipient', ''),
            'subject': email_data.get('subject', '')
        }
        
        log_file = os.path.join(self.log_folder, f"spam_filter_{datetime.now().strftime('%Y%m%d')}.log")
        
        with open(log_file, 'a') as f:
            f.write(f"{log_entry}\n")
        
        logger.info(f"Action: {action} - From: {email_data.get('sender')} - To: {email_data.get('recipient')}")

    def handle_spam(self, email_data: Dict[str, Any]):
        """
        Handle spam email by saving it to the spam folder
        """
        try:
            # Save spam to spam folder
            spam_file = os.path.join(
                self.spam_folder,
                f"spam_{datetime.now().strftime('%Y%m%d_%H%M%S')}.eml"
            )
            
            with open(spam_file, 'w', encoding='utf-8') as f:
                f.write(f"From: {email_data['sender']}\n")
                f.write(f"To: {email_data['recipient']}\n")
                f.write(f"Subject: {email_data['subject']}\n")
                f.write("\n")
                f.write(email_data['content'])
            
            # Log the action
            self._log_action("SPAM_REJECTED", email_data)
            logger.info(f"Spam email saved to: {spam_file}")
            
        except Exception as e:
            logger.error(f"Error handling spam: {str(e)}")
            raise

    def handle_legitimate(self, email_data: Dict[str, Any]):
        """
        Handle legitimate email by sending it via sendmail
        """
        try:
            # Create email content
            email_content = f"""From: {email_data['sender']}
To: {email_data['recipient']}
Subject: {email_data['subject']}

{email_data['content']}
"""
            
            # Send email using sendmail
            process = subprocess.Popen(
                ['sendmail', '-t'],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            
            stdout, stderr = process.communicate(input=email_content.encode())
            
            if process.returncode != 0:
                raise Exception(f"Sendmail error: {stderr.decode()}")
            
            # Log the action
            self._log_action("EMAIL_ACCEPTED", email_data)
            logger.info(f"Email sent via sendmail to: {email_data['recipient']}")
            
        except Exception as e:
            logger.error(f"Error handling legitimate email: {str(e)}")
            raise 