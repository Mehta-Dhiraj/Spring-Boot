package com.dmehta.school.exception;

/**
 * Custom exception for admin registration errors
 */
public class AdminRegistrationException extends RuntimeException {
    
    public AdminRegistrationException(String message) {
        super(message);
    }
    
    public AdminRegistrationException(String message, Throwable cause) {
        super(message, cause);
    }
}
