package com.digihealth.backend.dto;

import java.util.List;
import java.util.Map;

public class RegisterDto {
    private String fullName;
    private String email;
    private String password;
    private String specialization;
    private String licenseNumber;
    private String phoneNumber;
    private List<String> workDays;
    private Map<String, DayAvailabilityDto> availability;
    private Integer experienceYears;
    private String hospitalAffiliation;
    private String bio;

    public static class DayAvailabilityDto {
        private String startTime;
        private String endTime;

        public DayAvailabilityDto() {
        }

        public String getStartTime() {
            return startTime;
        }

        public void setStartTime(String startTime) {
            this.startTime = startTime;
        }

        public String getEndTime() {
            return endTime;
        }

        public void setEndTime(String endTime) {
            this.endTime = endTime;
        }
    }

    // Getters and Setters

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<String> getWorkDays() {
        return workDays;
    }

    public void setWorkDays(List<String> workDays) {
        this.workDays = workDays;
    }

    public Map<String, DayAvailabilityDto> getAvailability() {
        return availability;
    }

    public void setAvailability(Map<String, DayAvailabilityDto> availability) {
        this.availability = availability;
    }

    public Integer getExperienceYears() {
        return experienceYears;
    }

    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }

    public String getHospitalAffiliation() {
        return hospitalAffiliation;
    }

    public void setHospitalAffiliation(String hospitalAffiliation) {
        this.hospitalAffiliation = hospitalAffiliation;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
