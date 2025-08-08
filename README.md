# EduConnect - School Directory Application

🎉 **MODERN FULL-STACK APPLICATION WITH SPRING BOOT 3.x & REACT!**

A comprehensive, modern full-stack web application for managing and searching school information across multiple cities in India. The application features a React TypeScript frontend with Material-UI and a Spring Boot backend with PostgreSQL database.

## 🏗️ Architecture

### Backend
- **Framework**: Spring Boot 3.2.8 with Java 17 (OpenJDK)
- **Database**: PostgreSQL 13+ (running in Podman container)
- **Security**: Spring Security 6.x with BCrypt password encoding
- **ORM**: Hibernate 6.4.x/JPA with Jakarta EE
- **API Documentation**: SpringDoc OpenAPI 3 (Swagger UI)
- **Build Tool**: Maven 3.11+
- **Testing**: JUnit 5, Mockito, Spring Boot Test

### Frontend
- **Framework**: React 18+ with TypeScript
- **UI Library**: Material-UI (MUI) 5.x
- **Routing**: React Router 6.x
- **HTTP Client**: Axios
- **Build Tool**: Create React App with TypeScript
- **Styling**: Material-UI theming with custom components

## ✨ Key Features

### 🎨 **Modern React Frontend**
- **Responsive Design**: Material-UI components with mobile-first approach
- **TypeScript**: Type-safe development with enhanced IDE support
- **Real-time State Management**: Reactive authentication and data updates
- **Intuitive User Experience**: Clean, professional interface with smooth navigation
- **Favorites System**: Local storage-based school favorites with persistent state
- **Advanced Search**: Filter schools by city, area, rating, and infrastructure

### 🔒 **Security Enhancements**
- **BCrypt Password Encoding**: 12-round hashing for secure password storage
- **Input Validation**: Frontend and backend validation with specific error messages
- **CORS Configuration**: Properly configured for frontend-backend communication
- **Session Management**: Secure authentication state management
- **Password Requirements**: Minimum 6-character password policy
- **Security Headers**: HSTS, frame options, content type protection

### 🚀 **Performance Optimizations**
- **Optimized Database Queries**: Custom JPA repository methods
- **HikariCP Connection Pooling**: Auto-configured for optimal performance
- **Efficient List Updates**: In-place updates without full reloads
- **Modern Java 17**: Enhanced performance and language features
- **React Optimization**: Efficient re-rendering and state management

### 📊 **API Documentation**
- **OpenAPI 3 Specification**: Complete API documentation
- **Swagger UI**: Interactive API testing interface
- **RESTful Design**: Clean, consistent API endpoints
- **Comprehensive Error Handling**: Specific error messages for better debugging

### 🧪 **Testing & Quality**
- **Production-Ready Code**: Clean, maintainable codebase
- **Error Handling**: Comprehensive error handling across all layers
- **User-Friendly Messages**: Clear validation and error messages
- **Code Organization**: Modular architecture with separation of concerns

## 📋 Prerequisites

Before running the application, ensure you have the following installed:

### Backend Requirements
- **Java 17** (OpenJDK 17 recommended)
- **Maven 3.11+**
- **Podman** (for PostgreSQL container)

### Frontend Requirements
- **Node.js 18+** (with npm)
- **Git** (for version control)

### Development Tools (Recommended)
- **IntelliJ IDEA** or **VS Code**
- **Postman** (for API testing)

## 🚀 Setup Instructions

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd Spring-Boot
```

### Step 2: Database Setup
```bash
# Start Podman machine
podman machine start

# Run PostgreSQL container
podman run --name postgres-school \
  -e POSTGRES_DB=schools \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:13

# Verify database is running
podman exec -it postgres-school psql -U postgres -d schools -c "SELECT version();"
```

### Step 3: Backend Setup (Spring Boot)
```bash
# Navigate to backend directory
cd educonnect

# Set Java environment (if needed)
export JAVA_HOME=/opt/homebrew/Cellar/openjdk@17/17.0.16/libexec/openjdk.jdk/Contents/Home

# Run the Spring Boot application
mvn spring-boot:run

# Backend will be available at: http://localhost:8080
# API Documentation: http://localhost:8080/swagger-ui.html
```

### Step 4: Frontend Setup (React)
```bash
# Open a new terminal and navigate to frontend directory
cd school-directory-frontend

# Install dependencies
npm install

# Start the React development server
npm start

# Frontend will be available at: http://localhost:3000
```

### Step 5: Application Configuration
The application is pre-configured with the following settings:

**Backend Configuration** (`educonnect/src/main/resources/application.properties`):
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/schools
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=update
spring.sql.init.mode=always
```

**Frontend Configuration** (React app automatically configured for `http://localhost:8080` API)

## 🎯 Access the Application

Once both backend and frontend are running:

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/swagger-ui.html

## 🎮 Using the Application

### For General Users
1. **Browse Schools**: View all available schools on the home page
2. **Search & Filter**: Use the search functionality to find schools by city, area, or name
3. **View Details**: Click on any school to see detailed information
4. **Favorites**: Add schools to your favorites for quick access
5. **User Registration**: Create a new account to access additional features

### For Administrators
1. **Admin Login**: Use the "Admin Login" button in the navigation
2. **School Management**: Create, update, and delete school information
3. **Dashboard**: Access the admin dashboard for comprehensive school management
4. **Real-time Updates**: Changes are reflected immediately without page refresh

### Demo Accounts
- **Admin Username**: `dhiraj`, **Password**: `password123` (minimum 6 characters)
- **Admin Username**: `cognizant`, **Password**: `cognizant123`

## 📊 Database Schema

The application automatically creates and populates the following tables:

### Admin Table
- `id` (Primary Key, Auto-generated)
- `username` (VARCHAR 70)
- `email` (VARCHAR 25)
- `city` (VARCHAR 25)
- `password` (VARCHAR 125)

### School Table
- `id` (Primary Key, Auto-generated)
- `name` (VARCHAR 70)
- `city` (VARCHAR 25)
- `area` (VARCHAR 25)
- `address` (VARCHAR 125)
- `fees` (VARCHAR 16)
- `bus` (VARCHAR 3)
- `infrastructure` (VARCHAR 6)
- `rating` (VARCHAR 6)

## 🎯 Pre-loaded Data

The application comes with pre-loaded data including:
- **50 Schools** across 4 major cities:
  - **Pune**: 10 schools (VIBGYOR, Lexicon, DPS, etc.)
  - **Mumbai**: 20 schools (Singapore International, JBCN, Bombay Scottish, etc.)
  - **Bhopal**: 12 schools (Scindia, Carmel Convent, Choithram, etc.)
  - **Hyderabad**: 8 schools (Oakridge, Indus International, EuroSchool, etc.)
- **2 Admin Users**:
  - Username: `dhiraj`, Password: `1234`
  - Username: `cognizant`, Password: `cognizant`

## 📚 API Documentation

### 🔗 **Interactive API Documentation**
The application now includes comprehensive API documentation using **SpringDoc OpenAPI 3**:

- **Swagger UI**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **OpenAPI 3 Spec**: [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)
- **API Docs JSON**: [http://localhost:8080/v3/api-docs.yaml](http://localhost:8080/v3/api-docs.yaml)

### 🔍 **New Search Features**
- **Search by Name**: `/search?name={schoolName}` - Find schools by name (case-insensitive)
- **Advanced Filtering**: Enhanced search with rating thresholds and area-specific queries
- **Optimized Queries**: All search operations use optimized database queries

## 🔗 API Endpoints

### Public Endpoints

#### Home & Search
| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/` | Home page with search form | - |
| POST | `/` | Process search form | `city`, `area` |
| GET | `/listSchools` | Display filtered schools | Session: `city`, `area` |
| GET | `/search` | **NEW**: Search schools by name | `name` (query param) |

#### Authentication
| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/login` | Login page | - |
| GET | `/register` | Registration page | - |
| POST | `/register` | Process registration | `Admin` object |

#### School Listings
| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/allList` | Display all schools | - |
| GET | `/cityList` | Display schools by city | Session: `city` |

### Admin Endpoints (Requires Authentication)

#### Admin Dashboard
| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/admin` | Admin dashboard | - |

#### School Management
| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/addSchool` | Add school form | - |
| POST | `/addSchool` | Create new school | `School` object |
| GET | `/deleteSchool` | Delete school | `id` |
| GET | `/updateSchool` | Update school form | `id` |
| POST | `/updateSchool` | Update school | `School` object |

#### Data Management
| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/delete` | Delete management page | - |
| GET | `/update` | Update management page | - |

## 🔧 Configuration Files

### Application Properties
Located at: `src/main/resources/application.properties`
```properties
# View Configuration
spring.mvc.view.prefix=/WEB-INF/jsp/
spring.mvc.view.suffix=.jsp

# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/schools
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.defer-datasource-initialization=true
spring.sql.init.mode=always

# Logging Configuration
logging.level.org.springframework=ERROR
logging.level.org.springframework.web=DEBUG

# Mail Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=dhiraj.intuit@gmail.com
spring.mail.password=ngvyibejuysjkgko
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

### Data Initialization
Located at: `src/main/resources/data.sql`
- Automatically executed on application startup
- Contains INSERT statements for all 50 schools and admin users
- Uses auto-generated IDs for all entities

## 🛠️ Development

### Project Structure
```
school-listing-project/
├── src/main/java/com/cognizant/school/
│   ├── controller/          # REST Controllers
│   ├── model/              # JPA Entities
│   ├── repository/         # Data Access Layer
│   ├── services/           # Business Logic
│   ├── security/           # Security Configuration
│   └── securityServices/   # Security Services
├── src/main/resources/
│   ├── application.properties
│   └── data.sql           # Initial data
└── src/main/webapp/WEB-INF/jsp/  # JSP Views
```

### Key Components

#### Models
- `Admin.java` - Admin user entity
- `School.java` - School information entity
- `Mail.java` - Email configuration entity

#### Controllers
- `HomeController.java` - Home page and authentication
- `AdminController.java` - Admin operations
- `SchoolsController.java` - School listing and filtering

#### Services
- `AdminService.java` - Admin user management
- `SchoolService.java` - School data operations
- `MailService.java` - Email functionality

## 🔒 Security Features

- Spring Security integration
- Session-based authentication
- Password encryption
- Role-based access control
- CSRF protection

## 📧 Email Configuration

The application includes email functionality with Gmail SMTP configuration. Update the email credentials in `application.properties` for production use.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   ```bash
   # Check if PostgreSQL container is running
   podman ps
   
   # Restart container if needed
   podman restart postgres-school
   ```

2. **Java Version Issues**
   ```bash
   # Check Java version
   java -version
   
   # Set correct JAVA_HOME
   export JAVA_HOME=/Library/Java/JavaVirtualMachines/amazon-corretto-8.jdk/Contents/Home
   ```

3. **Port Already in Use**
   ```bash
   # Check what's using port 8080
   lsof -i :8080
   
   # Kill the process or change port in application.properties
   server.port=8081
   ```

4. **Maven Build Issues**
   ```bash
   # Clean and rebuild
   ./mvnw clean install
   
   # Skip tests if needed
   ./mvnw spring-boot:run -DskipTests
   ```

## 🚀 Deployment

For production deployment:

1. Update database credentials
2. Configure proper email settings
3. Set `spring.jpa.hibernate.ddl-auto=validate`
4. Enable HTTPS
5. Configure proper logging levels
6. Set up monitoring and health checks

## 📝 License

This project is developed for educational and demonstration purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions, please check the troubleshooting section or create an issue in the repository.

---

**Happy Coding! 🎉**
