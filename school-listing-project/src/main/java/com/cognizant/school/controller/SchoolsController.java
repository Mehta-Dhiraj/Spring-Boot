package com.cognizant.school.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.cognizant.school.model.School;
import com.cognizant.school.services.SchoolService;


@Controller
@SessionAttributes({ "city", "area" })
public class SchoolsController {

	@Autowired
	private SchoolService schoolService;

	// for listing the school based on city and area
	@RequestMapping(value = "/listSchools", method = RequestMethod.GET)
	public String listSchools(ModelMap model) {
		String city = (String) model.get("city");
		String area = (String) model.get("area");
		//int count = 0;
		List<School> byCity = (List<School>) schoolService.findByCity(city);

		List<School> byArea = new ArrayList<School>();
		for (School school : byCity) {
			if (school.getArea().equalsIgnoreCase(area)) {
				byArea.add(school);
				//count++;
			}
		}
		if (byArea.size()==0) {
			return "errorPage";
		} else {
			model.addAttribute("allSchools", byArea);
			return "allSchools";
		}
	}

	// it will show all List of school available in database
	@RequestMapping(value = "/allList", method = RequestMethod.GET)
	public String showAll(ModelMap model) {
		List<School> allList = (List<School>) schoolService.findAll();
		model.addAttribute("allList", allList);
		return "allList";
	}

	// it filter the school according to city
	@RequestMapping(value = "/cityList", method = RequestMethod.GET)
	public String showByCity(ModelMap model) {
		String city = (String) model.get("city");
		List<School> allList = (List<School>) schoolService.findByCity(city);
		if(allList.size()!=0) {
			
			model.addAttribute("citySchool", allList);
		}
		else
		{
			model.put("errorMassage","Sorry!! We have not reached at your city."
					+ "   We are working on it.");
		}
		return "citySchool";
	}

	// for deleting data for database
	@RequestMapping(value = "/delete", method = RequestMethod.GET)
	public String delete(ModelMap model) {
		List<School> allList = (List<School>) schoolService.findAll();
		model.addAttribute("delete", allList);
		return "delete";
	}

	// for updating the data in database
	@RequestMapping(value = "/update", method = RequestMethod.GET)
	public String update(ModelMap model) {
		List<School> allList = (List<School>) schoolService.findAll();
		model.addAttribute("update", allList);
		return "update";
	}
}
