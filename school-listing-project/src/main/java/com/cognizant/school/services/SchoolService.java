package com.cognizant.school.services;

import java.util.List;
import java.util.Optional;

import com.cognizant.school.model.School;

public interface SchoolService {

	void addSchool(String name, String city, String area, String address, String fees, String bus,
			String infrastructure, String rating);

	List<School> findAll();

	List<School> findByCity(String city);

	List<School> findByArea(String area);

	void deleteById(int id);

	Optional<School> getSchoolById(Integer id);

	School updateSchool(School school);

}
