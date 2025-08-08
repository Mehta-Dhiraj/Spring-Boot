package com.dmehta.school.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;

/**
 * Security audit logging configuration
 * Logs all security-related events for monitoring and compliance
 */
@Component
public class SecurityAuditConfig {

    private static final Logger securityLogger = LoggerFactory.getLogger("SECURITY_AUDIT");
    private static final Logger logger = LoggerFactory.getLogger(SecurityAuditConfig.class);

    @EventListener
    public void onAuthenticationSuccess(AuthenticationSuccessEvent event) {
        String username = event.getAuthentication().getName();
        String authorities = event.getAuthentication().getAuthorities().toString();
        
        securityLogger.info("AUTHENTICATION_SUCCESS: User '{}' successfully authenticated with authorities: {}", 
            username, authorities);
        
        logger.info("Successful login for user: {}", username);
    }

    @EventListener
    public void onAuthenticationFailure(AuthenticationFailureBadCredentialsEvent event) {
        String username = event.getAuthentication().getName();
        String errorMessage = event.getException().getMessage();
        
        securityLogger.warn("AUTHENTICATION_FAILURE: Failed login attempt for user '{}' - Reason: {}", 
            username, errorMessage);
        
        logger.warn("Failed login attempt for user: {} - {}", username, errorMessage);
    }

    // Note: AuthorizationDeniedEvent not available in Spring Boot 2.3.3
    // Authorization denied events can be logged through access denied handlers

    /**
     * Log admin operations for audit trail
     */
    public void logAdminOperation(String username, String operation, String details) {
        securityLogger.info("ADMIN_OPERATION: User '{}' performed '{}' - Details: {}", 
            username, operation, details);
    }

    /**
     * Log security violations
     */
    public void logSecurityViolation(String username, String violation, String details) {
        securityLogger.error("SECURITY_VIOLATION: User '{}' - Violation: '{}' - Details: {}", 
            username, violation, details);
    }

    /**
     * Log data access operations
     */
    public void logDataAccess(String username, String operation, String resourceType, String resourceId) {
        securityLogger.info("DATA_ACCESS: User '{}' performed '{}' on {} with ID: {}", 
            username, operation, resourceType, resourceId);
    }
}
