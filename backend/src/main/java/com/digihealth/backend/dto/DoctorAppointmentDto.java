package com.digihealth.backend.dto;

import lombok.Data;

@Data
public class DoctorAppointmentDto {
    private String id;
    private String startDateTime;
    private String patientName;
    private String patientId;
    private String doctorName;
    private String type;
    private String status;

    // Explicit setters for tests
    public void setId(String id) {
        this.id = id;
    }

    public void setStartDateTime(String startDateTime) {
        this.startDateTime = startDateTime;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
