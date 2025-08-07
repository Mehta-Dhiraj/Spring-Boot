package com.dmehta.school.exception;

/**
 * Custom exception for when a school is not found
 */
public class SchoolNotFoundException extends RuntimeException {
    
    public SchoolNotFoundException(String message) {
        super(message);
    }
    
    public SchoolNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
    
    public SchoolNotFoundException(Integer schoolId) {
        super("School not found with ID: " + schoolId);
    }
}
