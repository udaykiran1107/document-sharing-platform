# Multi-stage build: Frontend + Backend
FROM node:18-alpine AS frontend-builder

# Build frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Backend stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy backend package files
COPY package*.json ./

# Install backend dependencies
RUN npm ci --only=production

# Copy backend application files
COPY src ./src

# Copy built frontend from builder stage
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Create necessary directories
RUN mkdir -p uploads data logs

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "src/server.js"]
