#!/bin/bash
# render-build.sh

echo "Starting build process..."

# Install system dependencies
apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    libpq-dev \
    build-essential

echo "Installing Python dependencies..."
# Upgrade pip first
pip install --upgrade pip

# Install requirements
pip install -r requirements.txt

echo "Build completed successfully!"