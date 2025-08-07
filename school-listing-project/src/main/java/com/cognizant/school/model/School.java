package com.cognizant.school.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class School {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String city;
	private String area;
	private String address;
	private String fees;
	private String bus;
	private String infrastructure;
	private String rating;

	public School() {
		super();
		// TODO Auto-generated constructor stub
	}

	public School(String name, String city, String area, String address, String fees, String bus, String infrastructure,
			String rating) {
		super();
		this.name = name;
		this.city = city;
		this.area = area;
		this.address = address;
		this.fees = fees;
		this.bus = bus;
		this.infrastructure = infrastructure;
		this.rating = rating;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getFees() {
		return fees;
	}

	public void setFees(String fees) {
		this.fees = fees;
	}

	public String getBus() {
		return bus;
	}

	public void setBus(String bus) {
		this.bus = bus;
	}

	public String getInfrastructure() {
		return infrastructure;
	}

	public void setInfrastructure(String infrastructure) {
		this.infrastructure = infrastructure;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	@Override
	public String toString() {
		return "School [id=" + id + ", name=" + name + ", city=" + city + ", area=" + area + ", address=" + address
				+ ", fees=" + fees + ", bus=" + bus + ", infrastructure=" + infrastructure + ", rating=" + rating + "]";
	}

}
