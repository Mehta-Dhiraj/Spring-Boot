# School Listing Application

A comprehensive Spring Boot web application for managing and searching school information across multiple cities in India. The application provides functionality for searching schools by city and area, admin management, and CRUD operations.

## 🏗️ Architecture

- **Backend**: Spring Boot 2.3.3 with Java 1.8
- **Database**: PostgreSQL 13 (running in Podman container)
- **Frontend**: JSP with Bootstrap 4.5.0 and jQuery 3.5.1
- **Security**: Spring Security for authentication
- **ORM**: Hibernate/JPA with auto-generated schemas
- **Build Tool**: Maven

## 📋 Prerequisites

Before running the application, ensure you have the following installed:

- **Java 1.8** (Amazon Corretto 8 recommended)
- **Maven 3.6+**
- **Podman** (for PostgreSQL container)
- **Git** (for version control)

## 🚀 Setup Instructions

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd school-listing-project
```

### Step 2: Set Up Java Environment
```bash
# Check Java version (should be 1.8)
java -version

# If using multiple Java versions, set JAVA_HOME
export JAVA_HOME=/Library/Java/JavaVirtualMachines/amazon-corretto-8.jdk/Contents/Home
```

### Step 3: Start PostgreSQL Database
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

### Step 4: Configure Application Properties
The application is pre-configured with the following database settings in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/schools
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=create-drop
spring.sql.init.mode=always
```

### Step 5: Run the Application
```bash
# Make Maven wrapper executable
chmod +x mvnw

# Start the application
./mvnw spring-boot:run
```

### Step 6: Access the Application
- **Application URL**: http://localhost:8080
- **Default Port**: 8080

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

## 🔗 API Endpoints

### Public Endpoints

#### Home & Search
| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/` | Home page with search form | - |
| POST | `/` | Process search form | `city`, `area` |
| GET | `/listSchools` | Display filtered schools | Session: `city`, `area` |

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
