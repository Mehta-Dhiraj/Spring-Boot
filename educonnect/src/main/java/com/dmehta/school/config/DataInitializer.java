package com.dmehta.school.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.dmehta.school.model.Admin;
import com.dmehta.school.repository.AdminRepository;

import java.util.List;

/**
 * Data initializer to update existing admin passwords to BCrypt encoding
 * Runs after application context is fully initialized to avoid circular dependencies
 */
// @Component - Temporarily disabled for Spring Boot 3.x upgrade
public class DataInitializer {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @EventListener(ApplicationReadyEvent.class)
    public void initializeData() {
        logger.info("Starting data initialization - updating admin passwords to BCrypt encoding");
        
        try {
            // Update existing admin passwords if they're not already encoded
            updateAdminPasswords();
            logger.info("Data initialization completed successfully");
        } catch (Exception e) {
            logger.error("Error during data initialization", e);
        }
    }

    private void updateAdminPasswords() {
        Iterable<Admin> admins = adminRepository.findAll();
        
        for (Admin admin : admins) {
            String currentPassword = admin.getPassword();
            
            // Check if password is already BCrypt encoded (BCrypt hashes start with $2a$, $2b$, or $2y$)
            if (!currentPassword.startsWith("$2a$") && !currentPassword.startsWith("$2b$") && !currentPassword.startsWith("$2y$")) {
                logger.info("Updating password for admin: {}", admin.getUsername());
                
                // Encode the plain text password
                String encodedPassword = passwordEncoder.encode(currentPassword);
                admin.setPassword(encodedPassword);
                adminRepository.save(admin);
                
                logger.info("Successfully updated password for admin: {}", admin.getUsername());
            } else {
                logger.debug("Password for admin {} is already encoded", admin.getUsername());
            }
        }
    }
}
