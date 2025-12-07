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

    public void setAge(Integer age) { this.age = age; }
    public void setGender(String gender) { this.gender = gender; }
    public void setAllergies(String allergies) { this.allergies = allergies; }
    public void setMedicalConditions(String medicalConditions) { this.medicalConditions = medicalConditions; }
    public void setEmergencyContactName(String emergencyContactName) { this.emergencyContactName = emergencyContactName; }
    public void setEmergencyContactPhone(String emergencyContactPhone) { this.emergencyContactPhone = emergencyContactPhone; }
    public void setBloodType(String bloodType) { this.bloodType = bloodType; }
    public void setBirthDate(java.time.LocalDate birthDate) { this.birthDate = birthDate; }
    public void setStreet(String street) { this.street = street; }
    public void setCity(String city) { this.city = city; }
    public void setState(String state) { this.state = state; }
    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }
    public void setCountry(String country) { this.country = country; }
}
