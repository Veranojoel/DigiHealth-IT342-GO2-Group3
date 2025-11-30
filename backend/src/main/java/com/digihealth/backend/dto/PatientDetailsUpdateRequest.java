package com.digihealth.backend.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class PatientDetailsUpdateRequest {
    private Integer age;
    private String gender;
    private String allergies;
    private String medicalConditions;
    private String emergencyContactName;
    private String emergencyContactPhone;
    private String bloodType;
    private LocalDate birthDate;
    private String street;
    private String city;
    private String state;
    private String postalCode;
    private String country;
}
