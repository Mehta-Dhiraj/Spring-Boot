package com.cognizant.school.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.school.model.School;
import com.cognizant.school.repository.SchoolRepository;

@Service
public class SchoolServiceImpl implements SchoolService {

	@Autowired
	private SchoolRepository schoolRepository;

	@Override
	public void addSchool(String name, String city, String area, String address, String fees, String bus,
			String infrastructure, String rating) {
		schoolRepository.save(new School(name, city, area, address, fees, bus, infrastructure, rating));

	}

	@Override
	public List<School> findAll() {
		return (List<School>) schoolRepository.findAll();
	}

	@Override
	public List<School> findByCity(String city) {
		List<School> allSchools = (List<School>) schoolRepository.findAll();
		List<School> byCity = new ArrayList<School>();// craeting new arrayList
		for (School school : allSchools) {
			if (school.getCity().equalsIgnoreCase(city)) {
				byCity.add(school);
			}
		}
		return byCity;
	}

	@Override
	public List<School> findByArea(String area) {
		List<School> allSchools = (List<School>) schoolRepository.findAll();
		List<School> byArea = new ArrayList<School>();
		for (School school : allSchools) {
			if (school.getArea().equalsIgnoreCase(area)) {
				byArea.add(school);
			}
		}
		return byArea;
	}

	@Override
	public void deleteById(int id) {
		schoolRepository.deleteById(id);

	}

	@Override
	public Optional<School> getSchoolById(Integer id) {
		return schoolRepository.findById(id);
	}

	@Override
	public School updateSchool(School school) {
		
		return schoolRepository.save(school);
	}


}
