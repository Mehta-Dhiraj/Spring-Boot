package com.dmehta.school.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.dmehta.school.model.Admin;
import com.dmehta.school.repository.AdminRepository;

/**
 * Unit tests for AdminServiceImpl
 * Tests admin registration logic and validation
 */
@ExtendWith(MockitoExtension.class)
class AdminServiceImplTest {

    @Mock
    private AdminRepository adminRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AdminServiceImpl adminService;

    private Admin testAdmin;

    @BeforeEach
    void setUp() {
        testAdmin = new Admin("testuser", "test@example.com", "Mumbai", "encodedPassword123");
    }

    @Test
    void testRegisterAdmin_ValidInput_Success() {
        // Given
        when(adminRepository.findByUsername("testuser")).thenReturn(null);
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword123");
        when(adminRepository.save(any(Admin.class))).thenReturn(testAdmin);

        // When & Then
        assertDoesNotThrow(() -> 
            adminService.registerAdmin("testuser", "test@example.com", "Mumbai", "password123")
        );

        verify(adminRepository, times(1)).findByUsername("testuser");
        verify(passwordEncoder, times(1)).encode("password123");
        verify(adminRepository, times(1)).save(any(Admin.class));
    }

    @Test
    void testRegisterAdmin_EmptyUsername_ThrowsException() {
        // When & Then
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
            adminService.registerAdmin("", "test@example.com", "Mumbai", "password123")
        );

        assertEquals("All fields are required", exception.getMessage());
        verify(adminRepository, never()).save(any(Admin.class));
    }

    @Test
    void testRegisterAdmin_InvalidEmail_ThrowsException() {
        // When & Then
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
            adminService.registerAdmin("testuser", "invalid-email", "Mumbai", "password123")
        );

        assertEquals("Invalid email format", exception.getMessage());
        verify(adminRepository, never()).save(any(Admin.class));
    }

    @Test
    void testRegisterAdmin_ShortPassword_ThrowsException() {
        // When & Then
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
            adminService.registerAdmin("testuser", "test@example.com", "Mumbai", "123")
        );

        assertEquals("Password must be at least 6 characters long", exception.getMessage());
        verify(adminRepository, never()).save(any(Admin.class));
    }

    @Test
    void testRegisterAdmin_ExistingUsername_ThrowsException() {
        // Given
        when(adminRepository.findByUsername("testuser")).thenReturn(testAdmin);

        // When & Then
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
            adminService.registerAdmin("testuser", "test@example.com", "Mumbai", "password123")
        );

        assertEquals("Username already exists", exception.getMessage());
        verify(adminRepository, times(1)).findByUsername("testuser");
        verify(adminRepository, never()).save(any(Admin.class));
    }

    @Test
    void testRegisterAdmin_NullInput_ThrowsException() {
        // When & Then
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
            adminService.registerAdmin(null, "test@example.com", "Mumbai", "password123")
        );

        assertEquals("All fields are required", exception.getMessage());
        verify(adminRepository, never()).save(any(Admin.class));
    }

    @Test
    void testRegisterAdmin_ValidEmailFormats_Success() {
        // Test various valid email formats
        String[] validEmails = {
            "user@example.com",
            "user.name@example.com",
            "user+tag@example.co.uk",
            "user123@example-domain.com"
        };

        for (String email : validEmails) {
            when(adminRepository.findByUsername(anyString())).thenReturn(null);
            when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
            when(adminRepository.save(any(Admin.class))).thenReturn(testAdmin);

            assertDoesNotThrow(() -> 
                adminService.registerAdmin("user" + System.nanoTime(), email, "Mumbai", "password123"),
                "Should accept valid email: " + email
            );
        }
    }

    @Test
    void testRegisterAdmin_InvalidEmailFormats_ThrowsException() {
        // Test various invalid email formats
        String[] invalidEmails = {
            "invalid-email",
            "@example.com",
            "user@",
            "user@.com",
            "user..name@example.com",
            "user@example.",
            ""
        };

        for (String email : invalidEmails) {
            IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
                adminService.registerAdmin("testuser", email, "Mumbai", "password123"),
                "Should reject invalid email: " + email
            );

            assertEquals("Invalid email format", exception.getMessage());
        }
    }
}
