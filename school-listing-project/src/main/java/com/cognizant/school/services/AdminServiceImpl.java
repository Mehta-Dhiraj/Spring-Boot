package com.cognizant.school.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.school.model.Admin;
import com.cognizant.school.repository.AdminRepository;


@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	AdminRepository adminRepository;

	@Override
	public void registerAdmin(String username, String email, String city, String password) {

		adminRepository.save(new Admin(username, email, city, password));

	}

}
