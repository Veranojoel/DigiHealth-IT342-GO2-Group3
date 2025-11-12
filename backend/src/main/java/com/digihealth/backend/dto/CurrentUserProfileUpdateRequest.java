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
}