#!/bin/bash
# render-build.sh

echo "Starting build process..."

# Install system dependencies for psycopg2 compilation
apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    libpq-dev \
    build-essential

echo "Installing Python dependencies..."
# Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt

echo "Build completed successfully!"