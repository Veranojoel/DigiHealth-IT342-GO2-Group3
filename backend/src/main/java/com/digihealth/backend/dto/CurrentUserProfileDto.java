package com.digihealth.backend.dto;

import lombok.Data;

@Data
public class CurrentUserProfileDto {
    private String fullName;
    private String email;
    private String phone;
    private String role;
    private String department;
    private String specialization;
    private String medicalLicenseNumber;
    private Integer yearsOfExperience;
    private String professionalBio;

    // Explicit setters for tests
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public void setMedicalLicenseNumber(String medicalLicenseNumber) {
        this.medicalLicenseNumber = medicalLicenseNumber;
    }

    public void setYearsOfExperience(Integer yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    public void setProfessionalBio(String professionalBio) {
        this.professionalBio = professionalBio;
    }
}