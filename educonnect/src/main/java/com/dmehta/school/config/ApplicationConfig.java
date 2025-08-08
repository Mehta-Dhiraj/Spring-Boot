package com.dmehta.school.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

/**
 * Application configuration properties for EduConnect
 * Centralizes application-specific configuration
 */
@Configuration
public class ApplicationConfig {

    /**
     * Application properties configuration
     */
    @Bean
    @ConfigurationProperties(prefix = "educonnect.app")
    @Validated
    public AppProperties appProperties() {
        return new AppProperties();
    }

    /**
     * Security properties configuration
     */
    @Bean
    @ConfigurationProperties(prefix = "educonnect.security")
    @Validated
    public SecurityProperties securityProperties() {
        return new SecurityProperties();
    }

    /**
     * Application-specific properties
     */
    public static class AppProperties {
        @NotBlank
        private String name = "EduConnect";
        
        @NotBlank
        private String version = "1.0.0";
        
        @NotBlank
        private String description = "Smart Educational Institution Directory";
        
        @Min(1)
        private int maxSchoolsPerPage = 12;
        
        @Min(1)
        private int maxSearchResults = 100;

        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getVersion() { return version; }
        public void setVersion(String version) { this.version = version; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        
        public int getMaxSchoolsPerPage() { return maxSchoolsPerPage; }
        public void setMaxSchoolsPerPage(int maxSchoolsPerPage) { this.maxSchoolsPerPage = maxSchoolsPerPage; }
        
        public int getMaxSearchResults() { return maxSearchResults; }
        public void setMaxSearchResults(int maxSearchResults) { this.maxSearchResults = maxSearchResults; }
    }

    /**
     * Security-specific properties
     */
    public static class SecurityProperties {
        @Min(4)
        private int bcryptRounds = 12;
        
        @Min(300)
        private int sessionTimeoutSeconds = 1800; // 30 minutes
        
        private boolean csrfEnabled = true;
        private boolean auditLoggingEnabled = true;

        // Getters and Setters
        public int getBcryptRounds() { return bcryptRounds; }
        public void setBcryptRounds(int bcryptRounds) { this.bcryptRounds = bcryptRounds; }
        
        public int getSessionTimeoutSeconds() { return sessionTimeoutSeconds; }
        public void setSessionTimeoutSeconds(int sessionTimeoutSeconds) { this.sessionTimeoutSeconds = sessionTimeoutSeconds; }
        
        public boolean isCsrfEnabled() { return csrfEnabled; }
        public void setCsrfEnabled(boolean csrfEnabled) { this.csrfEnabled = csrfEnabled; }
        
        public boolean isAuditLoggingEnabled() { return auditLoggingEnabled; }
        public void setAuditLoggingEnabled(boolean auditLoggingEnabled) { this.auditLoggingEnabled = auditLoggingEnabled; }
    }
}
