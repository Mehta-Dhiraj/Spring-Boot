# Multi-stage build for Spring Boot application
FROM openjdk:17-jdk-slim as builder

# Install Maven and curl
RUN apt-get update && \
    apt-get install -y curl maven && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy pom.xml first for better layer caching
COPY pom.xml .

# Download dependencies (this will be cached if pom.xml doesn't change)
RUN mvn dependency:go-offline -B

# Copy source code
COPY src src

# Build the application
RUN mvn clean package -DskipTests

# Runtime stage - using Eclipse Temurin for ARM64 compatibility
FROM eclipse-temurin:17-jre

# Install curl for health checks
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root user (Debian syntax)
RUN groupadd -r spring && useradd -r -g spring spring

# Set working directory
WORKDIR /app

# Copy the built JAR from builder stage
COPY --from=builder /app/target/educonnect-1.0.0.war app.war

# Change ownership to spring user
RUN chown -R spring:spring /app
USER spring

# Expose port
EXPOSE 8080

# JVM optimization for containers
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:+UseG1GC -XX:+UseStringDeduplication"

# Health check (single declaration)
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8080/actuator/health || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "app.war"]
