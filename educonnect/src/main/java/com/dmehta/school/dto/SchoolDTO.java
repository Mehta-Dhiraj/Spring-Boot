package com.dmehta.school.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Data Transfer Object for School entity
 * Used for API requests and responses to provide better data encapsulation
 */
public class SchoolDTO {

    private Integer id;

    @NotBlank(message = "School name is required")
    @Size(min = 2, max = 255, message = "School name must be between 2 and 255 characters")
    private String name;

    @NotBlank(message = "City is required")
    @Size(min = 2, max = 100, message = "City must be between 2 and 100 characters")
    private String city;

    @NotBlank(message = "Area is required")
    @Size(min = 2, max = 100, message = "Area must be between 2 and 100 characters")
    private String area;

    @NotBlank(message = "Address is required")
    @Size(min = 10, max = 500, message = "Address must be between 10 and 500 characters")
    private String address;

    @NotBlank(message = "Fees information is required")
    @Pattern(regexp = "\\d+/year", message = "Fees must be in format 'amount/year' (e.g., '15000/year')")
    private String fees;

    @NotBlank(message = "Bus facility information is required")
    @Pattern(regexp = "Yes|No", message = "Bus facility must be 'Yes' or 'No'")
    private String bus;

    @NotBlank(message = "Infrastructure rating is required")
    @Pattern(regexp = "\\d+\\.\\d+/5", message = "Infrastructure rating must be in format 'x.x/5' (e.g., '4.2/5')")
    private String infrastructure;

    @NotBlank(message = "Overall rating is required")
    @Pattern(regexp = "\\d+\\.\\d+/5", message = "Overall rating must be in format 'x.x/5' (e.g., '4.5/5')")
    private String rating;

    // Default constructor
    public SchoolDTO() {}

    // Constructor with all fields
    public SchoolDTO(Integer id, String name, String city, String area, String address, 
                     String fees, String bus, String infrastructure, String rating) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.area = area;
        this.address = address;
        this.fees = fees;
        this.bus = bus;
        this.infrastructure = infrastructure;
        this.rating = rating;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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
        return "SchoolDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", city='" + city + '\'' +
                ", area='" + area + '\'' +
                ", address='" + address + '\'' +
                ", fees='" + fees + '\'' +
                ", bus='" + bus + '\'' +
                ", infrastructure='" + infrastructure + '\'' +
                ", rating='" + rating + '\'' +
                '}';
    }
}
