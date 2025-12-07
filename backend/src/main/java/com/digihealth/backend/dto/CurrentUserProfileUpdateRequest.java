package com.digihealth.backend.dto;

import lombok.Data;

@Data
public class CurrentUserProfileUpdateRequest {
    private String fullName;
    private String email;
    private String phone;
    private String role; // read-only, ignore in update
    private String department;
    private String specialization;
    private String medicalLicenseNumber;
    private Integer yearsOfExperience;
    private String professionalBio;

    private Integer age;
    private String gender;
    private String allergies;
    private String medicalConditions;
    private String emergencyContactName;
    private String emergencyContactPhone;
    private String bloodType;
    private java.time.LocalDate birthDate;
    private String street;
    private String city;
    private String state;
    private String postalCode;
    private String country;

    // Explicit getters for Lombok compatibility
    public String getFullName() {
        return fullName;
    }

    public String getPhone() {
        return phone;
    }

    public String getDepartment() {
        return department;
    }

    public String getSpecialization() {
        return specialization;
    }

    public String getMedicalLicenseNumber() {
        return medicalLicenseNumber;
    }

    public Integer getYearsOfExperience() {
        return yearsOfExperience;
    }

    public String getProfessionalBio() {
        return professionalBio;
    }

    public Integer getAge() { return age; }
    public String getGender() { return gender; }
    public String getAllergies() { return allergies; }
    public String getMedicalConditions() { return medicalConditions; }
    public String getEmergencyContactName() { return emergencyContactName; }
    public String getEmergencyContactPhone() { return emergencyContactPhone; }
    public String getBloodType() { return bloodType; }
    public java.time.LocalDate getBirthDate() { return birthDate; }
    public String getStreet() { return street; }
    public String getCity() { return city; }
    public String getState() { return state; }
    public String getPostalCode() { return postalCode; }
    public String getCountry() { return country; }
}
