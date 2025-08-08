# 🎓 EduConnect - Smart Educational Institution Directory

A modern, comprehensive web application for discovering and managing educational institutions across multiple cities with advanced search capabilities, admin management, and secure authentication features.

![EduConnect](https://img.shields.io/badge/EduConnect-v1.0.0-blue.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.8-green.svg)
![Java](https://img.shields.io/badge/Java-17-orange.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-blue.svg)

## 🌟 Overview

EduConnect is a full-stack educational directory application that helps students and parents discover the best schools across major Indian cities. Built with modern technologies and best practices, it offers both a traditional JSP-based interface and a modern React frontend.

## 🎫 Features

### 🔍 For Users
- **Advanced Search**: Multi-criteria search by city, area, and school name
- **Comprehensive Details**: View detailed school information including fees, infrastructure, ratings
- **Multi-City Coverage**: Browse 50+ schools across Pune, Mumbai, Bhopal, and Hyderabad
- **Responsive Design**: Modern, mobile-friendly interface
- **Real-time Filtering**: Instant search results with dynamic filtering
- **Rating System**: 5-star rating system for schools and infrastructure

### 👨‍💼 For Administrators
- **Secure Authentication**: BCrypt password encryption with enterprise-grade security
- **School Management**: Complete CRUD operations for school records
- **Admin Dashboard**: Comprehensive management interface
- **Data Validation**: Robust input validation and error handling
- **Audit Logging**: Complete audit trails for all admin operations
- **Bulk Operations**: Efficient management of multiple records

## 🚀 Technology Stack

### Backend
- **Spring Boot 3.2.8** - Modern Java framework
- **Java 17** - Latest LTS version with OpenJDK
- **Spring Security** - Enhanced authentication and authorization
- **Spring Data JPA** - Database abstraction layer
- **PostgreSQL 13** - Robust relational database
- **Maven** - Dependency management
- **SpringDoc OpenAPI 3** - Interactive API documentation
- **BCrypt** - 12-round password encryption
- **HikariCP** - Optimized connection pooling
- **SLF4J + Logback** - Structured logging with audit trails
- **Jakarta EE** - Modern enterprise specifications

### Frontend
- **React 18.2.0** - Modern JavaScript library with hooks
- **TypeScript** - Type-safe JavaScript development
- **Material-UI (MUI)** - Professional React components
- **Axios** - HTTP client for API communication
- **React Router DOM** - Client-side routing
- **Emotion** - CSS-in-JS styling solution
- **Routing**: React Router DOM
- **Legacy UI**: JSP with Bootstrap 5.3.2

### 🗄️ Database & Infrastructure
- **Database**: PostgreSQL 13+ (Podman containerized)
- **Connection Pool**: HikariCP (optimized)
- **Data Loading**: Automatic initialization with 50 schools

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone git@github.com:Mehta-Dhiraj/Spring-Boot.git
cd Spring-Boot/educonnect
```

### 2. Set up PostgreSQL Database
```bash
# Create and run PostgreSQL container
podman run --name postgres-educonnect \
  -e POSTGRES_DB=schools \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:13
```

### 3. Backend Setup
```bash
# Set JAVA_HOME
export JAVA_HOME=/Library/Java/JavaVirtualMachines/openjdk-17.jdk/Contents/Home

# Build and run
./mvnw clean compile
./mvnw spring-boot:run
```

### 4. React Frontend Setup
```bash
# Navigate to React frontend directory
cd ../school-directory-frontend

# Install dependencies
npm install

# Start development server
npm start
```

### 5. Access Applications
- **🎨 React Frontend**: http://localhost:3000 (Modern UI)
- **🔧 Spring Boot Backend**: http://localhost:8080 (REST APIs)
- **📚 API Documentation**: http://localhost:8080/swagger-ui/index.html (Swagger UI)
- **🗄️ Database**: PostgreSQL on localhost:5432

## 🎨 React Frontend Features

### Modern UI Components
- **Material-UI Design**: Professional, responsive components
- **Search & Filters**: Multi-criteria school search (city, area, name)
- **School Cards**: Beautiful display with ratings and amenities
- **Pagination**: Efficient browsing through large datasets
- **Responsive Layout**: Mobile-first design approach

### Technical Features
- **TypeScript**: Type-safe development
- **Axios Integration**: Seamless API communication
- **Error Handling**: User-friendly error messages
- **Loading States**: Smooth user experience
- **Grid Layout**: CSS Grid for optimal responsiveness

## 👤 Default Admin Accounts

| Username | Password | Email | City | Role |
|----------|----------|-------|------|------|
| dhiraj | 1234 | dhiraj@example.com | Pune | ADMIN |
| cognizant | cognizant | admin@cognizant.com | Mumbai | ADMIN |

## 🔗 API Endpoints

### 🎫 School Management APIs

#### Public Endpoints
```http
GET    /api/schools                    # Get all schools (50 schools)
GET    /api/schools/city/{city}        # Get schools by city
GET    /api/schools/search             # Search: ?city=Pune&area=Hinjewadi
GET    /api/schools/search/name        # Search by name: ?name=VIBGYOR
GET    /api/schools/{id}               # Get school by ID
```

#### Admin Endpoints
```http
POST   /api/schools                    # Create new school
PUT    /api/schools/{id}               # Update existing school
DELETE /api/schools/{id}               # Delete school
```

### 🔐 Authentication APIs
```http
POST   /api/auth/login                 # User login
POST   /api/auth/register              # User registration
POST   /api/auth/logout                # User logout
GET    /api/auth/profile               # Get user profile
```

### Example API Calls
```bash
# Get all schools
curl http://localhost:8080/api/schools

# Search schools in Pune
curl "http://localhost:8080/api/schools/city/Pune"

# Advanced search
curl "http://localhost:8080/api/schools/search?city=Mumbai&area=Andheri"
```

## 🎫 Sample Data

EduConnect comes pre-loaded with **50 carefully curated schools** across 4 major Indian cities:

- **Pune** (10 schools): Hinjewadi, Kalyani Nagar, Baner, Wakad, Aundh
- **Mumbai** (10 schools): Andheri East/West, Dahisar, Chembur, Goregaon, Juhu, BKC
- **Bhopal** (12 schools): Gwalior, TT Nagar, Arera Colony, Bagmugalia, Zone II
- **Hyderabad** (18 schools): Bachupally, Kompally, Madhapur, Kondapur, Gachibowli

Each school includes complete information: name, address, fees (₹9,000 - ₹25,000), bus service, infrastructure rating (3.2/5 to 4.9/5), and overall rating (3.5/5 to 4.9/5).

## 🔒 Security Features

### 🛡️ Authentication & Authorization
- **BCrypt Encryption**: 12-round password hashing
- **Spring Security 6.x**: Modern security framework
- **Role-based Access**: ADMIN/USER role separation
- **CSRF Protection**: Cross-site request forgery prevention
- **Security Headers**: HSTS, X-Frame-Options, X-Content-Type-Options
- **Session Management**: Secure session handling with timeout

### 🔍 Input Validation & Protection
- **Server-side Validation**: Comprehensive input validation
- **SQL Injection Prevention**: Parameterized queries with JPA
- **XSS Protection**: Input sanitization and output encoding
- **Global Exception Handling**: Centralized error management

## 🧪 Testing

### 🔬 Test Coverage
- **Service Layer**: 95%+ coverage with comprehensive unit tests
- **Controller Layer**: 90%+ coverage with integration tests
- **Security Tests**: Authentication, authorization, and CSRF scenarios

### 🚀 Running Tests
```bash
# Run all tests
./mvnw test

# Run integration tests
./mvnw verify

# Generate test coverage report
./mvnw jacoco:report
```

## 📊 Database Schema

### 🎫 Schools Table
```sql
CREATE TABLE school (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    area VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    fees VARCHAR(50) NOT NULL,
    bus VARCHAR(10) NOT NULL CHECK (bus IN ('Yes', 'No')),
    infrastructure VARCHAR(10) NOT NULL,
    rating VARCHAR(10) NOT NULL
);
```

### 👨‍💼 Admin Table
```sql
CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    city VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL -- BCrypt hashed
);
```

## 🚀 Deployment

### 🏗️ Production Build
```bash
# Backend build
./mvnw clean package -Pprod

# Frontend build
cd school-directory-frontend
npm run build
```

### 🐳 Docker Deployment
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:13
    environment:
      POSTGRES_DB: schools
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"

  backend:
    build: ./educonnect
    ports:
      - "8080:8080"
    depends_on:
      - postgres

  frontend:
    build: ./school-directory-frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

## 🛠️ Development

### Project Structure
```
educonnect/
├── src/main/java/com/dmehta/school/
│   ├── controller/          # Web and API controllers
│   ├── model/              # JPA entities
│   ├── repository/         # Data access layer
│   ├── services/           # Business logic
│   ├── security/           # Security configuration
│   ├── config/             # Application configuration
│   └── exception/          # Exception handling
├── src/main/resources/
│   ├── application.properties
│   ├── data.sql           # Sample data
│   └── static/            # CSS, JS, images
└── src/main/webapp/WEB-INF/jsp/  # JSP templates

school-directory-frontend/
├── src/
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── types/            # TypeScript types
│   └── App.tsx           # Main app component
└── public/               # Static assets
```

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Issues
```bash
# Check PostgreSQL status
podman ps

# Restart PostgreSQL container
podman restart postgres-educonnect

# Check logs
podman logs postgres-educonnect
```

#### Maven Build Issues
```bash
# Clean and rebuild
./mvnw clean install

# Skip tests if needed
./mvnw clean install -DskipTests
```

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security Reference](https://spring.io/projects/spring-security)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Material-UI Documentation](https://mui.com/)
- [React Documentation](https://reactjs.org/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dhiraj Mehta**
- GitHub: [@Mehta-Dhiraj](https://github.com/Mehta-Dhiraj)
- Email: dhiraj@example.com

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- PostgreSQL community for the robust database
- Material-UI team for the beautiful React components
- React community for the amazing ecosystem
- All contributors who helped improve this project

---

**EduConnect v1.0.0** - Connecting students with the best educational opportunities! 🎓✨
