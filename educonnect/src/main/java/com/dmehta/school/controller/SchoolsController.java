package com.dmehta.school.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.dmehta.school.model.School;
import com.dmehta.school.services.SchoolService;
import com.dmehta.school.services.SchoolServiceImpl;

/**
 * Controller for handling school listing and search operations
 */
@Controller
@SessionAttributes({ "city", "area" })
public class SchoolsController {

	private static final Logger logger = LoggerFactory.getLogger(SchoolsController.class);

	@Autowired
	private SchoolService schoolService;
	
	@Autowired
	private SchoolServiceImpl schoolServiceImpl; // For accessing additional methods

	/**
	 * List schools based on city and area from session
	 */
	@RequestMapping(value = "/listSchools", method = RequestMethod.GET)
	public String listSchools(ModelMap model) {
		String city = (String) model.get("city");
		String area = (String) model.get("area");
		
		logger.info("Searching schools in city: {} and area: {}", city, area);
		
		// Validate session data
		if (!StringUtils.hasText(city) || !StringUtils.hasText(area)) {
			logger.warn("Missing city or area in session");
			model.addAttribute("errorMessage", "Please select both city and area to search for schools.");
			return "errorPage";
		}
		
		try {
			// Use optimized query for city and area combination
			List<School> schools = schoolServiceImpl.findByCityAndArea(city, area);
			
			if (schools.isEmpty()) {
				logger.info("No schools found in city: {} and area: {}", city, area);
				model.addAttribute("errorMessage", 
					String.format("Sorry! No schools found in %s, %s. We are working to expand our coverage.", area, city));
				model.addAttribute("searchCity", city);
				model.addAttribute("searchArea", area);
				return "errorPage";
			} else {
				logger.info("Found {} schools in city: {} and area: {}", schools.size(), city, area);
				model.addAttribute("allSchools", schools);
				model.addAttribute("searchCity", city);
				model.addAttribute("searchArea", area);
				model.addAttribute("schoolCount", schools.size());
				return "allSchools";
			}
		} catch (Exception e) {
			logger.error("Error searching schools in city: {} and area: {}", city, area, e);
			model.addAttribute("errorMessage", "An error occurred while searching for schools. Please try again.");
			return "errorPage";
		}
	}

	/**
	 * Show all schools available in database
	 */
	@RequestMapping(value = "/allList", method = RequestMethod.GET)
	public String showAll(ModelMap model) {
		logger.info("Fetching all schools for admin view");
		
		try {
			List<School> allList = schoolService.findAll();
			model.addAttribute("allList", allList);
			model.addAttribute("totalSchools", allList.size());
			logger.info("Retrieved {} schools for admin view", allList.size());
			return "allList";
		} catch (Exception e) {
			logger.error("Error fetching all schools", e);
			model.addAttribute("errorMessage", "Unable to load schools. Please try again.");
			return "errorPage";
		}
	}

	/**
	 * Filter schools by city from session
	 */
	@RequestMapping(value = "/cityList", method = RequestMethod.GET)
	public String showByCity(ModelMap model) {
		String city = (String) model.get("city");
		
		logger.info("Filtering schools by city: {}", city);
		
		if (!StringUtils.hasText(city)) {
			logger.warn("No city specified in session");
			model.addAttribute("errorMessage", "Please select a city first.");
			return "errorPage";
		}
		
		try {
			List<School> citySchools = schoolService.findByCity(city);
			
			if (!citySchools.isEmpty()) {
				logger.info("Found {} schools in city: {}", citySchools.size(), city);
				model.addAttribute("citySchool", citySchools);
				model.addAttribute("cityName", city);
				model.addAttribute("schoolCount", citySchools.size());
			} else {
				logger.info("No schools found in city: {}", city);
				model.addAttribute("errorMessage", 
					String.format("Sorry! We have not reached %s yet. We are working on expanding our coverage.", city));
				model.addAttribute("cityName", city);
			}
			return "citySchool";
		} catch (Exception e) {
			logger.error("Error filtering schools by city: {}", city, e);
			model.addAttribute("errorMessage", "An error occurred while filtering schools. Please try again.");
			return "errorPage";
		}
	}

	/**
	 * Show schools for deletion (admin function)
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.GET)
	public String delete(ModelMap model) {
		logger.info("Loading schools for deletion view");
		
		try {
			List<School> allList = schoolService.findAll();
			model.addAttribute("delete", allList);
			model.addAttribute("totalSchools", allList.size());
			logger.info("Loaded {} schools for deletion view", allList.size());
			return "delete";
		} catch (Exception e) {
			logger.error("Error loading schools for deletion", e);
			model.addAttribute("errorMessage", "Unable to load schools for deletion. Please try again.");
			return "errorPage";
		}
	}

	/**
	 * Show schools for update (admin function)
	 */
	@RequestMapping(value = "/update", method = RequestMethod.GET)
	public String update(ModelMap model) {
		logger.info("Loading schools for update view");
		
		try {
			List<School> allList = schoolService.findAll();
			model.addAttribute("update", allList);
			model.addAttribute("totalSchools", allList.size());
			logger.info("Loaded {} schools for update view", allList.size());
			return "update";
		} catch (Exception e) {
			logger.error("Error loading schools for update", e);
			model.addAttribute("errorMessage", "Unable to load schools for update. Please try again.");
			return "errorPage";
		}
	}
	
	/**
	 * Search schools by name (new feature)
	 */
	@GetMapping("/search")
	public String searchSchools(@RequestParam(required = false) String name, ModelMap model) {
		if (!StringUtils.hasText(name)) {
			model.addAttribute("errorMessage", "Please enter a school name to search.");
			return "search";
		}
		
		logger.info("Searching schools by name: {}", name);
		
		try {
			List<School> schools = ((SchoolServiceImpl) schoolService).findByNameContaining(name);
			
			if (schools.isEmpty()) {
				logger.info("No schools found with name containing: {}", name);
				model.addAttribute("errorMessage", 
					String.format("No schools found with name containing '%s'.", name));
			} else {
				logger.info("Found {} schools with name containing: {}", schools.size(), name);
				model.addAttribute("searchResults", schools);
				model.addAttribute("searchTerm", name);
				model.addAttribute("resultCount", schools.size());
			}
			
			return "search";
		} catch (Exception e) {
			logger.error("Error searching schools by name: {}", name, e);
			model.addAttribute("errorMessage", "An error occurred while searching. Please try again.");
			return "search";
		}
	}
}
