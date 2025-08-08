package com.dmehta.school.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;

/**
 * Global exception handler for the School Listing Application
 * Provides centralized exception handling and user-friendly error pages
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(IllegalArgumentException.class)
    public ModelAndView handleIllegalArgumentException(IllegalArgumentException ex, HttpServletRequest request) {
        logger.warn("Validation error at {}: {}", request.getRequestURI(), ex.getMessage());
        
        ModelAndView modelAndView = new ModelAndView("error");
        modelAndView.addObject("errorMessage", ex.getMessage());
        modelAndView.addObject("errorCode", HttpStatus.BAD_REQUEST.value());
        modelAndView.setStatus(HttpStatus.BAD_REQUEST);
        return modelAndView;
    }

    @ExceptionHandler(SchoolNotFoundException.class)
    public ModelAndView handleSchoolNotFoundException(SchoolNotFoundException ex, HttpServletRequest request) {
        logger.warn("School not found at {}: {}", request.getRequestURI(), ex.getMessage());
        
        ModelAndView modelAndView = new ModelAndView("error");
        modelAndView.addObject("errorMessage", "School not found: " + ex.getMessage());
        modelAndView.addObject("errorCode", HttpStatus.NOT_FOUND.value());
        modelAndView.setStatus(HttpStatus.NOT_FOUND);
        return modelAndView;
    }

    @ExceptionHandler(AdminRegistrationException.class)
    public ModelAndView handleAdminRegistrationException(AdminRegistrationException ex, HttpServletRequest request) {
        logger.warn("Admin registration error at {}: {}", request.getRequestURI(), ex.getMessage());
        
        ModelAndView modelAndView = new ModelAndView("register");
        modelAndView.addObject("errorMessage", ex.getMessage());
        modelAndView.addObject("errorCode", HttpStatus.BAD_REQUEST.value());
        return modelAndView;
    }

    @ExceptionHandler(Exception.class)
    public ModelAndView handleGenericException(Exception ex, HttpServletRequest request) {
        logger.error("Unexpected error at {}: {}", request.getRequestURI(), ex.getMessage(), ex);
        
        ModelAndView modelAndView = new ModelAndView("error");
        modelAndView.addObject("errorMessage", "An unexpected error occurred. Please try again later.");
        modelAndView.addObject("errorCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
        modelAndView.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        return modelAndView;
    }
}
