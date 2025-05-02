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

<br/>
<br/>


## 📈 Evaluation

Used cross-validation and accuracy/F1-score.

| Model              | Accuracy |
|--------------------|----------|
| eval_loss          | 0.0109   |
| eval_accuracy      | 0.9978   |
| eval_precision     | 0.9985   |
| eval_recall        | 0.9971   |
| eval_f1            | 0.99     |


<br/>
<br/>

## 📋 Classification Report

          precision    recall  f1-score   support

       0       1.00      1.00      1.00      1350
       1       1.00      1.00      1.00      1375

accuracy                           1.00      2725


<br/>
<br/>

## 🧠 Learnings

- BERT is highly effective for binary classification tasks such as spam detection.
- Using **Stratified K-Fold Cross-Validation** helped ensure that each fold maintained the class balance, leading to more reliable model performance across different data splits.
- Hugging Face's `Trainer` API simplifies training, evaluation, and integration of transformers models.
- Tokenizing text inputs with correct padding and truncation is critical to prevent shape mismatches and runtime errors.
- The evaluation metrics show that the model generalizes very well and has minimal overfitting.
- Disabling external tools like W&B during development helps reduce unnecessary overhead when experimenting locally.
- Managing `label` types carefully (e.g., converting to `int64`) is important when working with PyTorch tensors.


<br/>
<br/>
## 🚀 How to Run

### 1. Install Dependencies

```bash
pip install -r requirements.txt
