import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import os
from typing import Tuple

def load_model():
    """
    Load the trained BERT model and tokenizer
    """
    model_path = os.path.join("content", "best_model")
    
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model not found at {model_path}")
    
    # Load tokenizer and model
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForSequenceClassification.from_pretrained(model_path)
    
    # Set model to evaluation mode
    model.eval()
    
    return model, tokenizer

def predict_spam(model_tuple: Tuple, text: str) -> Tuple[bool, float]:
    """
    Predict if the given text is spam
    
    Args:
        model_tuple: Tuple containing (model, tokenizer)
        text: Text to classify
        
    Returns:
        Tuple of (is_spam: bool, confidence: float)
    """
    model, tokenizer = model_tuple
    
    # Tokenize input
    inputs = tokenizer(
        text,
        padding=True,
        truncation=True,
        max_length=512,
        return_tensors="pt"
    )
    
    # Make prediction
    with torch.no_grad():
        outputs = model(**inputs)
        probabilities = torch.softmax(outputs.logits, dim=1)
        prediction = torch.argmax(probabilities, dim=1)
        confidence = probabilities[0][prediction].item()
    
    # Assuming 1 is spam, 0 is not spam
    is_spam = bool(prediction.item())
    
    return is_spam, confidence 