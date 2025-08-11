package com.dmehta.school.controller.api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dmehta.school.model.School;
import com.dmehta.school.services.SchoolServiceImpl;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/schools")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8090", "http://educonnect-frontend"}) // React dev server and containerized setup
@Tag(name = "School Management", description = "APIs for managing school information")
public class SchoolApiController {

    @Autowired
    private SchoolServiceImpl schoolService;

    @GetMapping
    @Operation(summary = "Get all schools", description = "Retrieve a list of all schools in the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved schools"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<School>> getAllSchools() {
        try {
            List<School> schools = schoolService.findAll();
            return ResponseEntity.ok(schools);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/city/{city}")
    @Operation(summary = "Get schools by city", description = "Retrieve schools filtered by city name")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved schools for the city"),
        @ApiResponse(responseCode = "404", description = "No schools found for the specified city"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<School>> getSchoolsByCity(
            @Parameter(description = "City name to filter schools") @PathVariable String city) {
        try {
            List<School> schools = schoolService.findByCity(city);
            if (schools.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(schools);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/search")
    @Operation(summary = "Search schools", description = "Search schools by city and area")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved search results"),
        @ApiResponse(responseCode = "400", description = "Invalid search parameters"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<School>> searchSchools(
            @Parameter(description = "City name") @RequestParam String city,
            @Parameter(description = "Area name") @RequestParam String area) {
        try {
            if (city == null || city.trim().isEmpty() || area == null || area.trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            List<School> schools = schoolService.findByCityAndArea(city, area);
            return ResponseEntity.ok(schools);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/search/name")
    @Operation(summary = "Search schools by name", description = "Search schools by school name (case-insensitive)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved search results"),
        @ApiResponse(responseCode = "400", description = "Invalid search parameters"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<School>> searchSchoolsByName(
            @Parameter(description = "School name to search") @RequestParam String name) {
        try {
            if (name == null || name.trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            List<School> schools = schoolService.findByNameContaining(name);
            return ResponseEntity.ok(schools);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get school by ID", description = "Retrieve a specific school by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved school"),
        @ApiResponse(responseCode = "404", description = "School not found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<School> getSchoolById(
            @Parameter(description = "School ID") @PathVariable Integer id) {
        try {
            Optional<School> school = schoolService.getSchoolById(id);
            return school.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    @Operation(summary = "Create new school", description = "Add a new school to the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "School created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid school data"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<String> createSchool(@RequestBody School school) {
        try {
            if (school == null || school.getName() == null || school.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("School name is required");
            }
            schoolService.addSchool(school.getName(), school.getCity(), school.getArea(), 
                                  school.getAddress(), school.getFees(), school.getBus(), 
                                  school.getInfrastructure(), school.getRating());
            return ResponseEntity.status(201).body("School created successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error creating school: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update school", description = "Update an existing school's information")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "School updated successfully"),
        @ApiResponse(responseCode = "404", description = "School not found"),
        @ApiResponse(responseCode = "400", description = "Invalid school data"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<School> updateSchool(
            @Parameter(description = "School ID") @PathVariable Integer id, 
            @RequestBody School school) {
        try {
            if (school == null || school.getName() == null || school.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            school.setId(id);
            School updatedSchool = schoolService.updateSchool(school);
            if (updatedSchool != null) {
                return ResponseEntity.ok(updatedSchool);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete school", description = "Remove a school from the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "School deleted successfully"),
        @ApiResponse(responseCode = "404", description = "School not found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<String> deleteSchool(
            @Parameter(description = "School ID") @PathVariable Integer id) {
        try {
            schoolService.deleteById(id);
            return ResponseEntity.ok("School deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error deleting school: " + e.getMessage());
        }
    }
}
