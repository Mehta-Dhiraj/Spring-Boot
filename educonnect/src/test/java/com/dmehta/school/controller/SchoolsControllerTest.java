package com.dmehta.school.controller;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.dmehta.school.model.School;
import com.dmehta.school.services.SchoolService;
import com.dmehta.school.services.SchoolServiceImpl;

/**
 * Integration tests for SchoolsController
 * Tests web layer functionality and security
 */
@WebMvcTest(SchoolsController.class)
class SchoolsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SchoolService schoolService;

    @MockBean
    private SchoolServiceImpl schoolServiceImpl;

    private School testSchool;
    private List<School> testSchools;

    @BeforeEach
    void setUp() {
        testSchool = new School("Test School", "Mumbai", "Andheri", "123 Test Street", "50000", "Yes", "Good", "4.5");
        testSchool.setId(1);
        testSchools = Arrays.asList(testSchool);
    }

    @Test
    void testListSchools_WithValidCityAndArea_ReturnsSchools() throws Exception {
        // Given
        when(schoolServiceImpl.findByCityAndArea("Mumbai", "Andheri")).thenReturn(testSchools);

        // When & Then
        mockMvc.perform(get("/listSchools")
                .sessionAttr("city", "Mumbai")
                .sessionAttr("area", "Andheri"))
                .andExpect(status().isOk())
                .andExpect(view().name("allSchools"))
                .andExpect(model().attribute("allSchools", testSchools))
                .andExpect(model().attribute("schoolCount", 1));

        verify(schoolServiceImpl, times(1)).findByCityAndArea("Mumbai", "Andheri");
    }

    @Test
    void testListSchools_WithNoResults_ReturnsErrorPage() throws Exception {
        // Given
        when(schoolServiceImpl.findByCityAndArea("Mumbai", "Andheri")).thenReturn(Collections.emptyList());

        // When & Then
        mockMvc.perform(get("/listSchools")
                .sessionAttr("city", "Mumbai")
                .sessionAttr("area", "Andheri"))
                .andExpect(status().isOk())
                .andExpect(view().name("errorPage"))
                .andExpect(model().attributeExists("errorMessage"));

        verify(schoolServiceImpl, times(1)).findByCityAndArea("Mumbai", "Andheri");
    }

    @Test
    void testListSchools_WithMissingSessionData_ReturnsErrorPage() throws Exception {
        // When & Then
        mockMvc.perform(get("/listSchools"))
                .andExpect(status().isOk())
                .andExpect(view().name("errorPage"))
                .andExpect(model().attributeExists("errorMessage"));

        verify(schoolServiceImpl, never()).findByCityAndArea(anyString(), anyString());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    void testShowAll_WithAdminRole_ReturnsAllSchools() throws Exception {
        // Given
        when(schoolService.findAll()).thenReturn(testSchools);

        // When & Then
        mockMvc.perform(get("/allList"))
                .andExpect(status().isOk())
                .andExpect(view().name("allList"))
                .andExpect(model().attribute("allList", testSchools))
                .andExpect(model().attribute("totalSchools", 1));

        verify(schoolService, times(1)).findAll();
    }

    @Test
    void testShowAll_WithoutAdminRole_ReturnsUnauthorized() throws Exception {
        // When & Then
        mockMvc.perform(get("/allList"))
                .andExpect(status().isUnauthorized());

        verify(schoolService, never()).findAll();
    }

    @Test
    void testShowByCity_WithValidCity_ReturnsSchools() throws Exception {
        // Given
        when(schoolService.findByCity("Mumbai")).thenReturn(testSchools);

        // When & Then
        mockMvc.perform(get("/cityList")
                .sessionAttr("city", "Mumbai"))
                .andExpect(status().isOk())
                .andExpect(view().name("citySchool"))
                .andExpect(model().attribute("citySchool", testSchools))
                .andExpect(model().attribute("schoolCount", 1));

        verify(schoolService, times(1)).findByCity("Mumbai");
    }

    @Test
    void testSearchSchools_WithValidName_ReturnsResults() throws Exception {
        // Given
        when(schoolServiceImpl.findByNameContaining("Test")).thenReturn(testSchools);

        // When & Then
        mockMvc.perform(get("/search")
                .param("name", "Test"))
                .andExpect(status().isOk())
                .andExpect(view().name("search"))
                .andExpect(model().attribute("searchResults", testSchools))
                .andExpect(model().attribute("resultCount", 1));

        verify(schoolServiceImpl, times(1)).findByNameContaining("Test");
    }

    @Test
    void testSearchSchools_WithEmptyName_ReturnsError() throws Exception {
        // When & Then
        mockMvc.perform(get("/search")
                .param("name", ""))
                .andExpect(status().isOk())
                .andExpect(view().name("search"))
                .andExpect(model().attributeExists("errorMessage"));

        verify(schoolServiceImpl, never()).findByNameContaining(anyString());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    void testDelete_WithAdminRole_ReturnsDeletePage() throws Exception {
        // Given
        when(schoolService.findAll()).thenReturn(testSchools);

        // When & Then
        mockMvc.perform(get("/delete"))
                .andExpect(status().isOk())
                .andExpect(view().name("delete"))
                .andExpect(model().attribute("delete", testSchools))
                .andExpect(model().attribute("totalSchools", 1));

        verify(schoolService, times(1)).findAll();
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    void testUpdate_WithAdminRole_ReturnsUpdatePage() throws Exception {
        // Given
        when(schoolService.findAll()).thenReturn(testSchools);

        // When & Then
        mockMvc.perform(get("/update"))
                .andExpect(status().isOk())
                .andExpect(view().name("update"))
                .andExpect(model().attribute("update", testSchools))
                .andExpect(model().attribute("totalSchools", 1));

        verify(schoolService, times(1)).findAll();
    }
}
