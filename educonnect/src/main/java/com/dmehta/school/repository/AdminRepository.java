package com.dmehta.school.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dmehta.school.model.Admin;

@Repository
public interface AdminRepository extends CrudRepository<Admin, Integer> {

	Admin findByUsername(String username);

}