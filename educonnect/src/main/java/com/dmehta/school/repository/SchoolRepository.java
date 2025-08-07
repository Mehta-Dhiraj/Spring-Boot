package com.dmehta.school.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dmehta.school.model.School;

/**
 * Repository interface for School entity with optimized query methods
 */
@Repository
public interface SchoolRepository extends JpaRepository<School, Integer> {

	/**
	 * Find schools by city (case-insensitive)
	 * @param city the city name
	 * @return list of schools in the specified city
	 */
	List<School> findByCityIgnoreCase(String city);

	/**
	 * Find schools by area (case-insensitive)
	 * @param area the area name
	 * @return list of schools in the specified area
	 */
	List<School> findByAreaIgnoreCase(String area);

	/**
	 * Find schools by city and area combination (case-insensitive)
	 * @param city the city name
	 * @param area the area name
	 * @return list of schools in the specified city and area
	 */
	List<School> findByCityIgnoreCaseAndAreaIgnoreCase(String city, String area);

	/**
	 * Find schools with rating above a certain threshold
	 * @param rating minimum rating
	 * @return list of schools with rating >= specified value
	 */
	@Query("SELECT s FROM School s WHERE CAST(s.rating AS double) >= :rating ORDER BY CAST(s.rating AS double) DESC")
	List<School> findByRatingGreaterThanEqual(@Param("rating") double rating);

	/**
	 * Find schools by name containing search term (case-insensitive)
	 * @param name search term for school name
	 * @return list of schools with names containing the search term
	 */
	List<School> findByNameContainingIgnoreCase(String name);

	/**
	 * Check if a school exists by name in a specific city
	 * @param name school name
	 * @param city city name
	 * @return true if school exists, false otherwise
	 */
	boolean existsByNameIgnoreCaseAndCityIgnoreCase(String name, String city);

	/**
	 * Count schools by city
	 * @param city the city name
	 * @return number of schools in the city
	 */
	long countByCityIgnoreCase(String city);

}
