package com.dmehta.school.controller.api;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ApiController {

    @GetMapping
    public ResponseEntity<Map<String, String>> apiHealthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "healthy");
        response.put("message", "EduConnect API is running");
        return ResponseEntity.ok(response);
    }
}
