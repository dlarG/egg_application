#!/bin/bash
# render-build.sh

# Install system dependencies for psycopg2 compilation
apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    libpq-dev

# Install Python dependencies
pip install -r requirements.txt