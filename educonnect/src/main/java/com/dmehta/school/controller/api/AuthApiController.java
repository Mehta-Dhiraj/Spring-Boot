package com.dmehta.school.controller.api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dmehta.school.model.Admin;
import com.dmehta.school.repository.AdminRepository;
import com.dmehta.school.services.AdminServiceImpl;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Authentication", description = "Authentication and user management endpoints")
public class AuthApiController {

    @Autowired
    private AdminServiceImpl adminService;
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;



    @PostMapping("/login")
    @Operation(summary = "User login", description = "Authenticate user with username and password")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Login successful"),
        @ApiResponse(responseCode = "401", description = "Invalid credentials"),
        @ApiResponse(responseCode = "400", description = "Invalid request data"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {
        try {
            if (loginRequest.getUsername() == null || loginRequest.getPassword() == null) {
                return ResponseEntity.badRequest().body(createErrorResponse("Username and password are required"));
            }

            // Validate credentials using repository
            Admin admin = adminRepository.findByUsername(loginRequest.getUsername());
            
            // Check if admin exists
            if (admin == null) {
                return ResponseEntity.status(401).body(createErrorResponse("Invalid username or password"));
            }
            
            // Verify password - handle both plain text and BCrypt
            boolean passwordMatches = false;
            String storedPassword = admin.getPassword();
            String inputPassword = loginRequest.getPassword();
            
            if (storedPassword.startsWith("$2a$") || storedPassword.startsWith("$2b$") || storedPassword.startsWith("$2y$")) {
                // BCrypt encoded password
                passwordMatches = passwordEncoder.matches(inputPassword, storedPassword);
            } else {
                // Plain text password (for testing/backward compatibility)
                passwordMatches = inputPassword.equals(storedPassword);
            }
            
            if (!passwordMatches) {
                return ResponseEntity.status(401).body(createErrorResponse("Invalid username or password"));
            }
            
            // If we reach here, credentials are valid
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("user", Map.of(
                "id", admin.getId(),
                "username", admin.getUsername(),
                "email", admin.getEmail(),
                "role", "ADMIN"
            ));
            // Note: In a production app, you would generate and return a JWT token here
            response.put("token", "session-based-auth"); // Placeholder for session-based auth
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(createErrorResponse("An error occurred during login"));
        }
    }

    @PostMapping("/register")
    @Operation(summary = "User registration", description = "Register a new admin user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Registration successful"),
        @ApiResponse(responseCode = "400", description = "Invalid registration data"),
        @ApiResponse(responseCode = "409", description = "Username already exists"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<Map<String, Object>> register(@RequestBody Admin admin) {
        try {
            if (admin == null || admin.getUsername() == null || admin.getPassword() == null || admin.getEmail() == null) {
                return ResponseEntity.badRequest().body(createErrorResponse("All fields are required"));
            }

            // Check if username already exists
            if (adminRepository.findByUsername(admin.getUsername()) != null) {
                return ResponseEntity.status(409).body(createErrorResponse("Username already exists"));
            }

            // Register new admin using existing service method
            adminService.registerAdmin(admin.getUsername(), admin.getEmail(), admin.getCity(), admin.getPassword());
            
            // Fetch the saved admin to return in response
            Admin savedAdmin = adminRepository.findByUsername(admin.getUsername());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Registration successful");
            response.put("user", Map.of(
                "id", savedAdmin.getId(),
                "username", savedAdmin.getUsername(),
                "email", savedAdmin.getEmail(),
                "city", savedAdmin.getCity(),
                "role", "ADMIN"
            ));
            
            return ResponseEntity.status(201).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(createErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(createErrorResponse("An error occurred during registration"));
        }
    }

    @PostMapping("/logout")
    @Operation(summary = "User logout", description = "Logout current user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Logout successful"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<Map<String, Object>> logout() {
        try {
            // Clear security context for session-based auth
            SecurityContextHolder.clearContext();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Logout successful");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(createErrorResponse("An error occurred during logout"));
        }
    }

    @GetMapping("/profile")
    @Operation(summary = "Get user profile", description = "Get current authenticated user's profile")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Profile retrieved successfully"),
        @ApiResponse(responseCode = "401", description = "User not authenticated"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<Map<String, Object>> getProfile() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            
            if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
                String username = auth.getName();
                Admin admin = adminRepository.findByUsername(username);
                
                if (admin != null) {
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", true);
                    response.put("user", Map.of(
                        "id", admin.getId(),
                        "username", admin.getUsername(),
                        "email", admin.getEmail(),
                        "role", "ADMIN"
                    ));
                    
                    return ResponseEntity.ok(response);
                }
            }
            
            return ResponseEntity.status(401).body(createErrorResponse("User not authenticated"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(createErrorResponse("An error occurred while fetching profile"));
        }
    }

    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", message);
        return response;
    }

    // Inner class for login request
    public static class LoginRequest {
        private String username;
        private String password;

        public LoginRequest() {}

        public LoginRequest(String username, String password) {
            this.username = username;
            this.password = password;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
