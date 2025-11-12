package com.digihealth.backend.dto;

import lombok.Data;

/**
 * Standard login payload used by AuthController and AuthService.
 * Matches the React login form (email + password).
 */
@Data
public class LoginRequest {
    private String email;
    private String password;

    // Explicit getters for Lombok compatibility
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
