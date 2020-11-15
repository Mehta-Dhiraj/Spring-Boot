package com.cognizant.school.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.cognizant.school.model.School;
import com.cognizant.school.services.SchoolService;

@Controller
public class AdminController {

	@Autowired
	private SchoolService service;

	// for opening the admin page
	@RequestMapping(value = "/admin", method = RequestMethod.GET)
	public String showAdminPage() {

		return "adminPage";
	}

	// for adding new school in database
	@RequestMapping(value = "/addSchool", method = RequestMethod.GET)
	public String showAdmin(Model model) {
		model.addAttribute(new School("", "", "", "", "", "", "", ""));
		return "addSchool";
	}

	@RequestMapping(value = "/addSchool", method = RequestMethod.POST)
	public String addTeacher(School school) {
		service.addSchool(school.getName(), school.getCity(), school.getArea(), school.getAddress(), school.getFees(),
				school.getBus(), school.getInfrastructure(), school.getRating());
		return "redirect:/allList";
	}

	// deleting the school from database
	@RequestMapping(value = "/deleteSchool", method = RequestMethod.GET)
	public String deleteSchool(Model model, @RequestParam int id) {
		service.deleteById(id);
		return "redirect:/delete";
	}

	// updating the school from database
	@RequestMapping(value = "/updateSchool", method = RequestMethod.GET)
	public String updateSchool(ModelMap model, School school, @RequestParam int id) {
		model.addAttribute("schools", service.getSchoolById(id));
		return "updatePage";
	}

	@RequestMapping(value = "/updateSchool", method = RequestMethod.POST)
	public String updateSchoolList(Model model, School school) {
		service.updateSchool(school);
		return "redirect:/update";
	}

}
