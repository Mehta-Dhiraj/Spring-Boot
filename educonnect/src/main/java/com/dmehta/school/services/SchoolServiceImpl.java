package com.dmehta.school.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.dmehta.school.exception.SchoolNotFoundException;
import com.dmehta.school.model.School;
import com.dmehta.school.repository.SchoolRepository;

@Service
public class SchoolServiceImpl implements SchoolService {

	private static final Logger logger = LoggerFactory.getLogger(SchoolServiceImpl.class);

	@Autowired
	private SchoolRepository schoolRepository;

	@Override
	public void addSchool(String name, String city, String area, String address, String fees, String bus,
			String infrastructure, String rating) {
		
		// Input validation
		validateSchoolInput(name, city, area, address, fees, bus, infrastructure, rating);
		
		logger.info("Adding new school: {} in {}, {}", name, city, area);
		schoolRepository.save(new School(name, city, area, address, fees, bus, infrastructure, rating));
		logger.info("Successfully added school: {}", name);
	}

	@Override
	public List<School> findAll() {
		logger.debug("Fetching all schools from database");
		List<School> schools = (List<School>) schoolRepository.findAll();
		logger.debug("Found {} schools", schools.size());
		return schools;
	}

	@Override
	public List<School> findByCity(String city) {
		if (!StringUtils.hasText(city)) {
			throw new IllegalArgumentException("City cannot be null or empty");
		}
		
		logger.debug("Searching schools in city: {}", city);
		// Use custom repository method for better performance
		List<School> schools = schoolRepository.findByCityIgnoreCase(city);
		logger.debug("Found {} schools in city: {}", schools.size(), city);
		return schools;
	}

	@Override
	public List<School> findByArea(String area) {
		if (!StringUtils.hasText(area)) {
			throw new IllegalArgumentException("Area cannot be null or empty");
		}
		
		logger.debug("Searching schools in area: {}", area);
		// Use custom repository method for better performance
		List<School> schools = schoolRepository.findByAreaIgnoreCase(area);
		logger.debug("Found {} schools in area: {}", schools.size(), area);
		return schools;
	}

	@Override
	public void deleteById(int id) {
		logger.info("Attempting to delete school with ID: {}", id);
		
		// Check if school exists before deleting
		if (!schoolRepository.existsById(id)) {
			throw new SchoolNotFoundException(id);
		}
		
		schoolRepository.deleteById(id);
		logger.info("Successfully deleted school with ID: {}", id);
	}

	@Override
	public Optional<School> getSchoolById(Integer id) {
		if (id == null || id <= 0) {
			throw new IllegalArgumentException("School ID must be a positive number");
		}
		
		logger.debug("Fetching school with ID: {}", id);
		Optional<School> school = schoolRepository.findById(id);
		
		if (!school.isPresent()) {
			logger.warn("School not found with ID: {}", id);
		}
		
		return school;
	}

	@Override
	public School updateSchool(School school) {
		if (school == null) {
			throw new IllegalArgumentException("School object cannot be null");
		}
		
		Integer schoolId = school.getId();
		if (schoolId == null || schoolId <= 0) {
			throw new IllegalArgumentException("School ID must be provided for update");
		}
		
		// Check if school exists
		if (!schoolRepository.existsById(school.getId())) {
			throw new SchoolNotFoundException(school.getId());
		}
		
		// Validate school data
		validateSchoolInput(school.getName(), school.getCity(), school.getArea(), 
			school.getAddress(), school.getFees(), school.getBus(), 
			school.getInfrastructure(), school.getRating());
		
		logger.info("Updating school with ID: {} - {}", school.getId(), school.getName());
		School updatedSchool = schoolRepository.save(school);
		logger.info("Successfully updated school: {}", school.getName());
		
		return updatedSchool;
	}
	
	/**
	 * Find schools by city and area combination for better performance
	 */
	public List<School> findByCityAndArea(String city, String area) {
		if (!StringUtils.hasText(city) || !StringUtils.hasText(area)) {
			throw new IllegalArgumentException("City and area cannot be null or empty");
		}
		
		logger.debug("Searching schools in city: {} and area: {}", city, area);
		List<School> schools = schoolRepository.findByCityIgnoreCaseAndAreaIgnoreCase(city, area);
		logger.debug("Found {} schools in city: {} and area: {}", schools.size(), city, area);
		return schools;
	}
	
	/**
	 * Find schools by name containing search term (case-insensitive)
	 */
	public List<School> findByNameContaining(String name) {
		if (!StringUtils.hasText(name)) {
			throw new IllegalArgumentException("Search name cannot be null or empty");
		}
		
		logger.debug("Searching schools with name containing: {}", name);
		List<School> schools = schoolRepository.findByNameContainingIgnoreCase(name);
		logger.debug("Found {} schools with name containing: {}", schools.size(), name);
		return schools;
	}
	
	private void validateSchoolInput(String name, String city, String area, String address, 
			String fees, String bus, String infrastructure, String rating) {
		
		if (!StringUtils.hasText(name)) {
			throw new IllegalArgumentException("School name is required");
		}
		
		if (!StringUtils.hasText(city)) {
			throw new IllegalArgumentException("City is required");
		}
		
		if (!StringUtils.hasText(area)) {
			throw new IllegalArgumentException("Area is required");
		}
		
		if (!StringUtils.hasText(address)) {
			throw new IllegalArgumentException("Address is required");
		}
		
		if (!StringUtils.hasText(fees)) {
			throw new IllegalArgumentException("Fees information is required");
		}
		
		if (!StringUtils.hasText(bus)) {
			throw new IllegalArgumentException("Bus availability information is required");
		}
		
		if (!StringUtils.hasText(infrastructure)) {
			throw new IllegalArgumentException("Infrastructure information is required");
		}
		
		if (!StringUtils.hasText(rating)) {
			throw new IllegalArgumentException("Rating information is required");
		}
		
		// Validate rating format (should be a number between 1-5)
		try {
			double ratingValue = Double.parseDouble(rating);
			if (ratingValue < 1.0 || ratingValue > 5.0) {
				throw new IllegalArgumentException("Rating must be between 1.0 and 5.0");
			}
		} catch (NumberFormatException e) {
			throw new IllegalArgumentException("Rating must be a valid number");
		}
	}
}
