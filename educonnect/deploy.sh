#!/bin/bash

# EduConnect Backend Deployment Helper Script
echo "🚀 EduConnect Backend Deployment Helper"
echo "========================================"

# Check if Maven is available
if ! command -v mvn &> /dev/null && ! [ -f "./mvnw" ]; then
    echo "❌ Maven not found. Please install Maven or use ./mvnw"
    exit 1
fi

# Build the application
echo "📦 Building Spring Boot application..."
if [ -f "./mvnw" ]; then
    ./mvnw clean package -DskipTests
else
    mvn clean package -DskipTests
fi

if [ $? -eq 0 ]; then
    echo "✅ Build successful! WAR file created at target/educonnect-1.0.0.war"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Go to https://railway.app or https://render.com"
    echo "2. Create new project and connect your GitHub repository"
    echo "3. Select the 'educonnect' folder"
    echo "4. Add PostgreSQL database"
    echo "5. Set environment variables:"
    echo "   - SPRING_PROFILES_ACTIVE=prod"
    echo "   - FRONTEND_URL=https://educonnect-school-directory.windsurf.build"
    echo "   - PORT=8080"
    echo ""
    echo "🎯 Your frontend is already live at:"
    echo "   https://educonnect-school-directory.windsurf.build"
else
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi
