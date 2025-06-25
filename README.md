# 📧 Smart Anti-Spam System

A full-stack spam email classifier using BERT (Fine-tuned `bert-base-uncased`) with a React frontend and FastAPI backend.

## 🏗️ Project Structure

```
PCyber/
├── backend/                 # FastAPI Backend
│   ├── api/                # API endpoints (future expansion)
│   │   ├── database.py     # SQLAlchemy setup
│   │   └── init_db.py      # Database initialization
│   ├── models/             # Database models
│   │   └── models.py       # User and Email models
│   ├── services/           # Business logic services
│   │   ├── email_processor.py      # Email processing
│   │   └── sendmail_integration.py # Email delivery
│   ├── ml/                 # Machine Learning components
│   │   └── model_loader.py # BERT model loading and prediction
│   └── app.py              # Main FastAPI application
├── frontend/               # React Frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   ├── contexts/       # React contexts
│   │   └── ...
│   └── ...
├── data/                   # Dataset files
│   ├── train.parquet       # Training data
│   ├── test.parquet        # Test data
│   └── spam.csv            # Spam dataset
├── content/                # ML Model files
│   └── best_model/         # Trained BERT model
├── notebooks/              # Jupyter notebooks
│   └── Final_Code.ipynb    # BERT fine-tuning notebook
├── config/                 # Configuration files
│   ├── alembic/            # Database migrations
│   └── alembic.ini         # Alembic configuration
├── scripts/                # Utility scripts
│   └── entrypoint.sh       # Docker entrypoint
├── logs/                   # Application logs
├── mail/                   # Email processing
├── main.py                 # Application entry point
├── requirements.txt        # Python dependencies
├── Dockerfile              # Docker configuration
├── docker-compose.yaml     # Docker Compose setup
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- Docker & Docker Compose (optional)

### Option 1: Using Docker (Recommended)

1. **Clone and navigate to the project:**
   ```bash
   cd PCyber
   ```

2. **Start the application:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Backend API: http://localhost:8000
   - Frontend: http://localhost:5173 (run separately)
   - API Documentation: http://localhost:8000/docs

### Option 2: Local Development

1. **Backend Setup:**
   ```bash
   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Run backend
   python main.py
   ```

2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📊 ML Model Performance

The fine-tuned BERT model achieves excellent performance:

| Metric | Value |
|--------|-------|
| Accuracy | 99.78% |
| Precision | 99.85% |
| Recall | 99.71% |
| F1-Score | 99.00% |

## 🔧 API Endpoints

- `POST /api/v1/signup` - User registration
- `POST /api/v1/login` - User authentication
- `POST /api/v1/send-email` - Send email with spam detection
- `GET /api/v1/emails/sent` - Get sent emails
- `GET /api/v1/emails/received` - Get received emails
- `GET /api/v1/emails/spam` - Get spam emails
- `GET /api/v1/health` - Health check

## 🛠️ Technologies Used

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Database ORM
- **Alembic** - Database migrations
- **BERT (Hugging Face)** - ML model for spam detection
- **Sendmail** - Email delivery integration
- **JWT** - Authentication

### Frontend
- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Spline** - 3D background
- **Axios** - HTTP client

### Infrastructure
- **Docker** - Containerization
- **PostgreSQL** - Database
- **SQLite** - Development database

## 📝 Development

### Database Migrations
```bash
# Create new migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head
```

### ML Model Training
See `notebooks/Final_Code.ipynb` for the complete BERT fine-tuning process.

## 📄 License

This project is for educational and research purposes.

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
