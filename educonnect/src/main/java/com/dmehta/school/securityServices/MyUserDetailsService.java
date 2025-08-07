package com.dmehta.school.securityServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dmehta.school.model.Admin;
import com.dmehta.school.repository.AdminRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {

	@Autowired
	private AdminRepository repo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Admin admin = repo.findByUsername(username);
		if (admin == null) {
			throw new UsernameNotFoundException("error 404");
		}
		return new AdminPrincipal(admin);
	}

}