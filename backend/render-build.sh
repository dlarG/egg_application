#!/usr/bin/env bash
# render-build.sh

echo "Starting build process..."
echo "Current Python version:"
python --version

# Exit on error
set -e

# Upgrade pip
echo "Upgrading pip..."
python -m pip install --upgrade pip

# Install system dependencies
echo "Installing system dependencies..."
apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    libpq-dev \
    --no-install-recommends

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Build completed successfully!"