#!/bin/bash
set -e

# Function to check database connection
check_db() {
    nc -z db 5432
    return $?
}

# Wait for database to be ready
echo "Waiting for database..."
until check_db; do
    echo "Database is not ready - sleeping"
    sleep 2
done
echo "Database is ready!"

# Initialize database
echo "Initializing database..."
python init_db.py

# Start the application
echo "Starting application..."
exec python -m uvicorn app:app --host 0.0.0.0 --port 8000 --workers 4 --limit-concurrency 1000 --timeout-keep-alive 30 