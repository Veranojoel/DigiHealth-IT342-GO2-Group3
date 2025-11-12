package com.digihealth.backend.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserProfileUpdateRequest {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String profileImageUrl;

    // Patient specific fields
    private Integer age;
    private String gender;
    private String allergies;
    private String medicalConditions;
    private String emergencyContactName;
    private String emergencyContactPhone;
    private String bloodType;
    private LocalDate birthDate;

    // Address
    private String street;
    private String city;
    private String state;
    private String postalCode;
    private String country;

    // Explicit getters for Lombok compatibility
    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Integer getAge() {
        return age;
    }

    public String getGender() {
        return gender;
    }

    public String getAllergies() {
        return allergies;
    }

    public String getMedicalConditions() {
        return medicalConditions;
    }

    public String getEmergencyContactName() {
        return emergencyContactName;
    }

    public String getEmergencyContactPhone() {
        return emergencyContactPhone;
    }

    public String getBloodType() {
        return bloodType;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public String getStreet() {
        return street;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public String getCountry() {
        return country;
    }
}
