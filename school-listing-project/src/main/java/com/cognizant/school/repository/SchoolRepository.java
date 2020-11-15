package com.cognizant.school.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.school.model.School;

@Repository
public interface SchoolRepository extends CrudRepository<School, Integer> {

}
