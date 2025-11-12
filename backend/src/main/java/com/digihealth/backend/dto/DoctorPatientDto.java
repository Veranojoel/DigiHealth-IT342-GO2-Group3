package com.digihealth.backend.dto;

import lombok.Data;

@Data
public class DoctorPatientDto {
    private String id;
    private String name;
    private String phone;
    private String email;
    private String lastVisit;

    // Explicit setters for tests
    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setLastVisit(String lastVisit) {
        this.lastVisit = lastVisit;
    }
}