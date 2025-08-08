package com.dmehta.school.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * OpenAPI 3 configuration for API documentation
 * Compatible with Spring Boot 3.x
 */
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("School Listing Application API")
                        .version("2.0.0")
                        .description("Comprehensive REST API for managing and searching school information across multiple cities in India. " +
                                "This API provides functionality for searching schools by city and area, admin management, and CRUD operations.")
                        .contact(new Contact()
                                .name("School Listing Team")
                                .url("https://github.com/Mehta-Dhiraj/Spring-Boot")
                                .email("admin@schoollisting.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")));
    }
}
