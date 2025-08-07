package com.dmehta.school.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.dmehta.school.model.Admin;
import com.dmehta.school.model.Mail;
import com.dmehta.school.services.AdminServiceImpl;
import com.dmehta.school.services.MailServiceImpl;

@Controller
@SessionAttributes({ "city", "area" })
public class HomeController {
	
	@Autowired
	AdminServiceImpl service;
	
	@Autowired
	MailServiceImpl mailService;

	// here the mapping for home page
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String showHomePage() {
		return "home";
	}

	// After clicking the the search button this method will execute
	@RequestMapping(value = "/", method = RequestMethod.POST)
	public String getData(ModelMap model, @RequestParam String city, @RequestParam String area) {

		model.put("city", city);
		model.put("area", area);
		return "redirect:/listSchools";
	}

	@RequestMapping("/login")
	public String loginPage() {
		return "login";
	}

	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public String showAdmin(Model model) {
		model.addAttribute(new Admin("", "", "", ""));
		return "register";
	}

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public String addTeacher(Model model, Admin admin) {
		service.registerAdmin(admin.getUsername(), admin.getEmail(), admin.getCity(), admin.getPassword());
		return "welcome";
	}

	@RequestMapping("/logout-success")
	public String logoutPage() {
		return "logout";
	}
	
	

	@RequestMapping(value = "/mail",method=RequestMethod.GET)
	public String sendMail() {
		
		Mail mail = new Mail();
		mail.setMailFrom("dhiraj.intuit@gmail.com");
		mail.setMailTo("dhiraj.intuit@gmail.com");
		mail.setMailSubject("Spring Boot - Email Example");
		mail.setMailContent("Learn How to send Email using Spring Boot!!!\n\nThanks\nwww.dhiraniGroup.com");

		System.out.println("Starting send mail...");
		mailService.sendMail(mail);
		System.out.println("Mail sent successfully");
		
		return "Hello";
		
	}

}
