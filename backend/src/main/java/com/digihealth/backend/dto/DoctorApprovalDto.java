package com.digihealth.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorApprovalDto {
    private UUID id;
    private String fullName;
    private String specialization;
    private Boolean isApproved;
    private String message;
}
