# 🐳 EduConnect Docker Deployment Guide

## Overview
This guide explains how to deploy the EduConnect application using Docker containers. The application consists of three main services:
- **Frontend**: React application served by Nginx
- **Backend**: Spring Boot application
- **Database**: PostgreSQL database

## Prerequisites
- Docker installed and running
- Docker Compose installed
- At least 2GB RAM available
- Ports 3000, 8080, and 5432 available

## Quick Start

### 1. Clone and Navigate
```bash
cd /Users/dmehta2/Code_bases/Spring-Boot
```

### 2. Run the Build Script
```bash
./docker-build.sh
```

This script will:
- Build the Spring Boot application
- Create Docker images
- Start all services
- Display access URLs

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **Database**: localhost:5432

## Manual Deployment

### 1. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env file if needed
nano .env
```

### 2. Build Spring Boot Application
```bash
cd educonnect
./mvnw clean package -DskipTests
cd ..
```

### 3. Build and Start Services
```bash
# Build all images
docker-compose build

# Start all services
docker-compose up -d

# Check service status
docker-compose ps
```

## Docker Services

### Frontend Service
- **Image**: Custom React + Nginx
- **Port**: 3000 → 80
- **Features**: 
  - Multi-stage build for optimization
  - Nginx with gzip compression
  - React Router support
  - Health checks

### Backend Service
- **Image**: Custom Spring Boot + OpenJDK 17
- **Port**: 8080
- **Features**:
  - Multi-stage build
  - JVM optimization for containers
  - Health checks with Actuator
  - Non-root user for security

### Database Service
- **Image**: PostgreSQL 15 Alpine
- **Port**: 5432
- **Features**:
  - Persistent data storage
  - Health checks
  - Automatic schema initialization

## Environment Variables

### Database Configuration
```env
DB_PASSWORD=educonnect123
```

### URL Configuration
```env
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8080/api
```

### Profile Configuration
```env
COMPOSE_PROFILES=development  # or production
```

## Production Deployment

### 1. Enable Production Profile
```bash
export COMPOSE_PROFILES=production
docker-compose --profile production up -d
```

### 2. Production Features
- Nginx reverse proxy
- SSL/TLS support (configure certificates)
- Enhanced security headers
- Resource limits and optimization

### 3. Cloud Deployment
This Docker setup can be deployed to:
- **AWS**: ECS, EKS, or EC2
- **Google Cloud**: Cloud Run, GKE
- **Azure**: Container Instances, AKS
- **DigitalOcean**: App Platform, Kubernetes
- **Heroku**: Container Registry

## Management Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f database
```

### Service Management
```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Restart specific service
docker-compose restart backend

# Scale services (if needed)
docker-compose up -d --scale backend=2
```

### Database Management
```bash
# Connect to database
docker-compose exec database psql -U educonnect -d educonnect

# Backup database
docker-compose exec database pg_dump -U educonnect educonnect > backup.sql

# Restore database
docker-compose exec -T database psql -U educonnect educonnect < backup.sql
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using the port
   lsof -i :3000
   lsof -i :8080
   lsof -i :5432
   
   # Kill the process or change ports in docker-compose.yml
   ```

2. **Database Connection Issues**
   ```bash
   # Check database health
   docker-compose exec database pg_isready -U educonnect
   
   # View database logs
   docker-compose logs database
   ```

3. **Backend Not Starting**
   ```bash
   # Check backend logs
   docker-compose logs backend
   
   # Verify database is ready
   docker-compose ps
   ```

### Health Checks
All services include health checks:
```bash
# Check service health
docker-compose ps

# Manual health check
curl http://localhost:3000/health  # Frontend
curl http://localhost:8080/actuator/health  # Backend
```

## Security Considerations

### Production Security
- Change default passwords
- Use secrets management
- Enable SSL/TLS
- Configure firewall rules
- Regular security updates

### Container Security
- Non-root users in containers
- Minimal base images (Alpine)
- Security scanning
- Resource limits

## Performance Optimization

### JVM Tuning
Backend includes optimized JVM settings:
- Container-aware memory management
- G1 garbage collector
- String deduplication

### Database Optimization
- Connection pooling
- Query optimization
- Index management
- Regular maintenance

### Frontend Optimization
- Gzip compression
- Static asset caching
- Bundle optimization
- CDN integration (for production)

## Monitoring and Logging

### Application Monitoring
- Spring Boot Actuator endpoints
- Health checks
- Metrics collection
- Custom dashboards

### Log Management
- Structured logging
- Log aggregation
- Error tracking
- Performance monitoring

## Backup and Recovery

### Database Backups
```bash
# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker-compose exec database pg_dump -U educonnect educonnect > "backup_${DATE}.sql"
```

### Application State
- Database backups
- Configuration backups
- Image versioning
- Rollback procedures

## Support and Maintenance

### Regular Tasks
- Update base images
- Security patches
- Performance monitoring
- Backup verification

### Scaling Considerations
- Load balancing
- Database clustering
- Caching strategies
- CDN integration

---

## Quick Reference

### Essential Commands
```bash
# Start everything
./docker-build.sh

# Stop everything
docker-compose down

# View logs
docker-compose logs -f

# Check status
docker-compose ps

# Update and restart
docker-compose build && docker-compose up -d
```

### Application URLs
- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- API Docs: http://localhost:8080/swagger-ui.html
- Health: http://localhost:8080/actuator/health
