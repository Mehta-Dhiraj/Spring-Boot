package com.dmehta.school.util;

import com.dmehta.school.dto.SchoolDTO;
import com.dmehta.school.model.School;
import org.springframework.stereotype.Component;

/**
 * Utility class for mapping between School entity and SchoolDTO
 * Provides clean separation between internal model and API representation
 */
@Component
public class SchoolMapper {

    /**
     * Convert School entity to SchoolDTO
     * @param school School entity
     * @return SchoolDTO
     */
    public SchoolDTO toDTO(School school) {
        if (school == null) {
            return null;
        }

        return new SchoolDTO(
                school.getId(),
                school.getName(),
                school.getCity(),
                school.getArea(),
                school.getAddress(),
                school.getFees(),
                school.getBus(),
                school.getInfrastructure(),
                school.getRating()
        );
    }

    /**
     * Convert SchoolDTO to School entity
     * @param schoolDTO SchoolDTO
     * @return School entity
     */
    public School toEntity(SchoolDTO schoolDTO) {
        if (schoolDTO == null) {
            return null;
        }

        School school = new School();
        school.setId(schoolDTO.getId());
        school.setName(schoolDTO.getName());
        school.setCity(schoolDTO.getCity());
        school.setArea(schoolDTO.getArea());
        school.setAddress(schoolDTO.getAddress());
        school.setFees(schoolDTO.getFees());
        school.setBus(schoolDTO.getBus());
        school.setInfrastructure(schoolDTO.getInfrastructure());
        school.setRating(schoolDTO.getRating());

        return school;
    }

    /**
     * Update existing School entity with data from SchoolDTO
     * @param existingSchool Existing School entity
     * @param schoolDTO SchoolDTO with updated data
     * @return Updated School entity
     */
    public School updateEntity(School existingSchool, SchoolDTO schoolDTO) {
        if (existingSchool == null || schoolDTO == null) {
            return existingSchool;
        }

        existingSchool.setName(schoolDTO.getName());
        existingSchool.setCity(schoolDTO.getCity());
        existingSchool.setArea(schoolDTO.getArea());
        existingSchool.setAddress(schoolDTO.getAddress());
        existingSchool.setFees(schoolDTO.getFees());
        existingSchool.setBus(schoolDTO.getBus());
        existingSchool.setInfrastructure(schoolDTO.getInfrastructure());
        existingSchool.setRating(schoolDTO.getRating());

        return existingSchool;
    }
}
