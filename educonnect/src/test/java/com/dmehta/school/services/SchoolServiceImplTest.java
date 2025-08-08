package com.dmehta.school.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.dmehta.school.exception.SchoolNotFoundException;
import com.dmehta.school.model.School;
import com.dmehta.school.repository.SchoolRepository;

/**
 * Unit tests for SchoolServiceImpl
 * Tests all business logic and validation rules
 */
@ExtendWith(MockitoExtension.class)
class SchoolServiceImplTest {

    @Mock
    private SchoolRepository schoolRepository;

    @InjectMocks
    private SchoolServiceImpl schoolService;

    private School testSchool;

    @BeforeEach
    void setUp() {
        testSchool = new School("Test School", "Mumbai", "Andheri", "123 Test Street", "50000", "Yes", "Good", "4.5");
        testSchool.setId(1);
    }

    @Test
    void testAddSchool_ValidInput_Success() {
        // Given
        when(schoolRepository.save(any(School.class))).thenReturn(testSchool);

        // When & Then
        assertDoesNotThrow(() -> 
            schoolService.addSchool("Test School", "Mumbai", "Andheri", "123 Test Street", "50000", "Yes", "Good", "4.5")
        );

        verify(schoolRepository, times(1)).save(any(School.class));
    }

    @Test
    void testAddSchool_InvalidName_ThrowsException() {
        // When & Then
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
            schoolService.addSchool("", "Mumbai", "Andheri", "123 Test Street", "50000", "Yes", "Good", "4.5")
        );

        assertEquals("School name is required", exception.getMessage());
        verify(schoolRepository, never()).save(any(School.class));
    }

    @Test
    void testAddSchool_InvalidRating_ThrowsException() {
        // When & Then
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
            schoolService.addSchool("Test School", "Mumbai", "Andheri", "123 Test Street", "50000", "Yes", "Good", "6.0")
        );

        assertEquals("Rating must be between 1.0 and 5.0", exception.getMessage());
        verify(schoolRepository, never()).save(any(School.class));
    }

    @Test
    void testFindByCity_ValidCity_ReturnsSchools() {
        // Given
        List<School> expectedSchools = Arrays.asList(testSchool);
        when(schoolRepository.findByCityIgnoreCase("Mumbai")).thenReturn(expectedSchools);

        // When
        List<School> result = schoolService.findByCity("Mumbai");

        // Then
        assertEquals(1, result.size());
        assertEquals("Test School", result.get(0).getName());
        verify(schoolRepository, times(1)).findByCityIgnoreCase("Mumbai");
    }

    @Test
    void testFindByCity_EmptyCity_ThrowsException() {
        // When & Then
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
            schoolService.findByCity("")
        );

        assertEquals("City cannot be null or empty", exception.getMessage());
        verify(schoolRepository, never()).findByCityIgnoreCase(anyString());
    }

    @Test
    void testDeleteById_ExistingId_Success() {
        // Given
        when(schoolRepository.existsById(1)).thenReturn(true);

        // When & Then
        assertDoesNotThrow(() -> schoolService.deleteById(1));
        verify(schoolRepository, times(1)).existsById(1);
        verify(schoolRepository, times(1)).deleteById(1);
    }

    @Test
    void testDeleteById_NonExistingId_ThrowsException() {
        // Given
        when(schoolRepository.existsById(1)).thenReturn(false);

        // When & Then
        SchoolNotFoundException exception = assertThrows(SchoolNotFoundException.class, () ->
            schoolService.deleteById(1)
        );

        assertEquals("School not found with ID: 1", exception.getMessage());
        verify(schoolRepository, times(1)).existsById(1);
        verify(schoolRepository, never()).deleteById(anyInt());
    }

    @Test
    void testGetSchoolById_ValidId_ReturnsSchool() {
        // Given
        when(schoolRepository.findById(1)).thenReturn(Optional.of(testSchool));

        // When
        Optional<School> result = schoolService.getSchoolById(1);

        // Then
        assertTrue(result.isPresent());
        assertEquals("Test School", result.get().getName());
        verify(schoolRepository, times(1)).findById(1);
    }

    @Test
    void testGetSchoolById_InvalidId_ThrowsException() {
        // When & Then
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
            schoolService.getSchoolById(-1)
        );

        assertEquals("School ID must be a positive number", exception.getMessage());
        verify(schoolRepository, never()).findById(anyInt());
    }

    @Test
    void testUpdateSchool_ValidSchool_Success() {
        // Given
        when(schoolRepository.existsById(1)).thenReturn(true);
        when(schoolRepository.save(testSchool)).thenReturn(testSchool);

        // When
        School result = schoolService.updateSchool(testSchool);

        // Then
        assertEquals("Test School", result.getName());
        verify(schoolRepository, times(1)).existsById(1);
        verify(schoolRepository, times(1)).save(testSchool);
    }

    @Test
    void testUpdateSchool_NonExistingSchool_ThrowsException() {
        // Given
        when(schoolRepository.existsById(1)).thenReturn(false);

        // When & Then
        SchoolNotFoundException exception = assertThrows(SchoolNotFoundException.class, () ->
            schoolService.updateSchool(testSchool)
        );

        assertEquals("School not found with ID: 1", exception.getMessage());
        verify(schoolRepository, times(1)).existsById(1);
        verify(schoolRepository, never()).save(any(School.class));
    }

    @Test
    void testFindByCityAndArea_ValidInputs_ReturnsSchools() {
        // Given
        List<School> expectedSchools = Arrays.asList(testSchool);
        when(schoolRepository.findByCityIgnoreCaseAndAreaIgnoreCase("Mumbai", "Andheri")).thenReturn(expectedSchools);

        // When
        List<School> result = schoolService.findByCityAndArea("Mumbai", "Andheri");

        // Then
        assertEquals(1, result.size());
        assertEquals("Test School", result.get(0).getName());
        verify(schoolRepository, times(1)).findByCityIgnoreCaseAndAreaIgnoreCase("Mumbai", "Andheri");
    }

    @Test
    void testFindByNameContaining_ValidName_ReturnsSchools() {
        // Given
        List<School> expectedSchools = Arrays.asList(testSchool);
        when(schoolRepository.findByNameContainingIgnoreCase("Test")).thenReturn(expectedSchools);

        // When
        List<School> result = schoolService.findByNameContaining("Test");

        // Then
        assertEquals(1, result.size());
        assertEquals("Test School", result.get(0).getName());
        verify(schoolRepository, times(1)).findByNameContainingIgnoreCase("Test");
    }
}
