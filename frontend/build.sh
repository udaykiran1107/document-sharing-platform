#!/bin/bash

# Frontend Build Script

echo "Building frontend for production..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm ci
fi

# Build
echo "Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "Build completed successfully!"
    echo "Built files are in: dist/"
else
    echo "Build failed!"
    exit 1
fi
