# 📧 Spam Email Classifier using BERT

This project fine-tunes the `bert-base-uncased` model from Hugging Face Transformers to classify emails as **spam** or **not spam**. It uses **Stratified K-Fold Cross-Validation** for robust evaluation and generalization.

---

## 📁 Dataset

- **train.parquet**: 8,180 emails  
- **test.parquet**: 2,170 emails  

Each row contains:
- `text`: Email content  
- `label`: `0 = not spam`, `1 = spam`

---

## 🛠 Features

- Fine-tunes `bert-base-uncased` for binary classification
- Uses 5-fold Stratified K-Fold Cross-Validation
- Evaluates using accuracy, precision, recall, and F1-score
- Logs metrics (optional) with Weights & Biases (W&B)
- Saves the best model and evaluates it on the test set

---

## 📈 Evaluation

Used cross-validation and accuracy/F1-score.

| Model              | Accuracy |
|--------------------|----------|
| eval_loss          | 0.0109   |
| eval_accuracy      | 0.9978   |
| eval_precision     | 0.9985   |
| eval_recall        | 0.9971   |
| eval_f1            | 0.99     |



## 📋 Classification Report

          precision    recall  f1-score   support

       0       1.00      1.00      1.00      1350
       1       1.00      1.00      1.00      1375

accuracy                           1.00      2725


## 🚀 How to Run

### 1. Install Dependencies

```bash
pip install -r requirements.txt
