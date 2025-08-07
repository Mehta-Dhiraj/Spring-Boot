package com.dmehta.school.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {
	
	
	
	@Autowired
	private UserDetailsService userDetailsService;

	@Bean
	public AuthenticationProvider authProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(userDetailsService);
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}
	
//	//this for user Authentication
//	@Override
//	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//		auth.inMemoryAuthentication()
//		.withUser("dhiraj")
//		.password("dhiraj")
//		.roles("ADMIN").and()
//		.withUser("cognizant")
//		.password("cognizant")
//		.roles("ADMIN")
//		;
//	}
	
//	@Bean
//	public PasswordEncoder getPasswordEncoder() {
//		return NoOpPasswordEncoder.getInstance();
//	}
//	//this is for user authorization
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//		http.authorizeRequests()
//		
//		.antMatchers("/").permitAll()
//		.antMatchers("/admin","/update","/delete","/updateSchool","/deleteSchool","/addSchool","/allList").hasRole("ADMIN")
//		.and().formLogin();
//		http.csrf().disable();
//	}
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(12); // Strong hashing with 12 rounds
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http
			// Disable CSRF for API endpoints, enable for JSP endpoints
			.csrf(csrf -> csrf
				.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
				.ignoringRequestMatchers("/api/**"))
			// Security headers
			.headers(headers -> headers
				.frameOptions(frameOptions -> frameOptions.deny())
				.contentTypeOptions(contentTypeOptions -> contentTypeOptions.and())
				.httpStrictTransportSecurity(hstsConfig -> hstsConfig
					.maxAgeInSeconds(31536000)
					.includeSubDomains(true))
				.referrerPolicy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN))
			// Authorization rules - order matters, most specific first
			.authorizeHttpRequests(authz -> authz
				// API endpoints - MUST be first for React frontend
				.requestMatchers("/api/**").permitAll()
				// Swagger/OpenAPI endpoints
				.requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html").permitAll()
				// Public JSP endpoints
				.requestMatchers("/", "/login", "/register", "/test", "/listSchools", "/cityList", "/css/**", "/js/**", "/img/**", "/webjars/**", "/error").permitAll()
				// JSP endpoints - admin protected
				.requestMatchers("/admin","/update/**","/delete/**","/updateSchool","/deleteSchool","/addSchool","/allList").hasAuthority("ADMIN")
				.anyRequest().authenticated())
			// Form login configuration
			.formLogin(form -> form
				.loginPage("/login")
				.loginProcessingUrl("/login")
				.defaultSuccessUrl("/admin", true)
				.failureUrl("/login?error=true")
				.usernameParameter("username")
				.passwordParameter("password")
				.permitAll())
			// Session management
			.sessionManagement(session -> session
				.maximumSessions(1)
				.maxSessionsPreventsLogin(false))
			// Logout configuration
			.logout(logout -> logout
				.invalidateHttpSession(true)
				.clearAuthentication(true)
				.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
				.logoutSuccessUrl("/logout-success")
				.permitAll())
			.build();
	}

}
