package com.digihealth.backend.dto;

import lombok.Data;

@Data
public class CreateUpdateMedicalNoteRequest {
    private String appointmentId;
    private String noteText;
    private String diagnosis;
    private String prescriptions;
    private String observations;
}
