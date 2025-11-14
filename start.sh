#!/bin/bash

# Document Sharing Platform - Production Start Script

echo "Starting Document Sharing Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "Error: Node.js version 18 or higher is required"
    exit 1
fi

# Create necessary directories
echo "Creating directories..."
mkdir -p uploads data logs

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Warning: .env file not found. Using default configuration."
fi

# Start backend
echo "Starting backend server..."
NODE_ENV=production node src/server.js

echo "Backend server started successfully!"
