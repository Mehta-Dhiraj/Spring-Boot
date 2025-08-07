package com.dmehta.school.config;

import org.springframework.context.annotation.Configuration;

/**
 * Database configuration for Spring Boot 3.x
 * HikariCP is auto-configured by Spring Boot with optimal defaults
 * Custom configuration can be added via application.properties if needed
 */
@Configuration
public class DatabaseConfig {
    // Spring Boot 3.x auto-configures HikariCP with optimal settings
    // Additional configuration can be added via application.properties:
    // spring.datasource.hikari.maximum-pool-size=20
    // spring.datasource.hikari.minimum-idle=5
    // spring.datasource.hikari.connection-timeout=30000
    // spring.datasource.hikari.idle-timeout=600000
    // spring.datasource.hikari.max-lifetime=1800000
    // spring.datasource.hikari.leak-detection-threshold=60000
}
