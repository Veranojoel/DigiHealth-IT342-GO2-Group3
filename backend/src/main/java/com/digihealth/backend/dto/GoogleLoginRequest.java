package com.digihealth.backend.dto;

import lombok.Data;

@Data
public class GoogleLoginRequest {
    private String idToken;
    private String intendedRole; // \"PATIENT\" or \"DOCTOR\"
}