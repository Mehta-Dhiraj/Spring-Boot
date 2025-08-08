package com.dmehta.school.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.dmehta.school.model.Admin;
import com.dmehta.school.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	AdminRepository adminRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public void registerAdmin(String username, String email, String city, String password) {
		// Input validation
		if (!StringUtils.hasText(username) || !StringUtils.hasText(email) || 
			!StringUtils.hasText(city) || !StringUtils.hasText(password)) {
			throw new IllegalArgumentException("All fields are required");
		}
		
		// Email validation
		if (!isValidEmail(email)) {
			throw new IllegalArgumentException("Invalid email format");
		}
		
		// Password strength validation
		if (password.length() < 6) {
			throw new IllegalArgumentException("Password must be at least 6 characters long");
		}
		
		// Check if username already exists
		if (adminRepository.findByUsername(username) != null) {
			throw new IllegalArgumentException("Username already exists");
		}
		
		// Encode password before saving
		String encodedPassword = passwordEncoder.encode(password);
		adminRepository.save(new Admin(username, email, city, encodedPassword));
	}
	
	private boolean isValidEmail(String email) {
		return email != null && email.matches("^[A-Za-z0-9+_.-]+@([A-Za-z0-9.-]+\\.[A-Za-z]{2,})$");
	}

}
