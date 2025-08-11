#!/bin/bash

# EduConnect Docker Build and Deployment Script
echo "🐳 EduConnect Docker Build and Deployment"
echo "=========================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null 2>&1; then
    echo "❌ Docker Compose not found. Please install Docker Compose."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ Created .env file. You can modify it if needed."
fi

# Build the Spring Boot application first
echo "🔨 Building Spring Boot application..."
cd educonnect
if [ -f "./mvnw" ]; then
    ./mvnw clean package -DskipTests
else
    mvn clean package -DskipTests
fi

if [ $? -ne 0 ]; then
    echo "❌ Failed to build Spring Boot application"
    exit 1
fi

cd ..
echo "✅ Spring Boot application built successfully"

# Build Docker images
echo "🐳 Building Docker images..."
docker-compose build --no-cache

if [ $? -ne 0 ]; then
    echo "❌ Failed to build Docker images"
    exit 1
fi

echo "✅ Docker images built successfully"

# Start the services
echo "🚀 Starting EduConnect services..."
docker-compose up -d

if [ $? -ne 0 ]; then
    echo "❌ Failed to start services"
    exit 1
fi

echo "✅ EduConnect services started successfully!"
echo ""
echo "🌐 Application URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8080"
echo "   Database: localhost:5432"
echo ""
echo "📊 Check service status:"
echo "   docker-compose ps"
echo ""
echo "📝 View logs:"
echo "   docker-compose logs -f [service-name]"
echo ""
echo "🛑 Stop services:"
echo "   docker-compose down"
