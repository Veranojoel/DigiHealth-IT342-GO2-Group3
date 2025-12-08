package com.digihealth.backend.controller;

import com.digihealth.backend.dto.GoogleLoginRequest;
import com.digihealth.backend.dto.LoginRequest;
import com.digihealth.backend.dto.LoginResponse;
import com.digihealth.backend.dto.RegisterDto;
import com.digihealth.backend.dto.RegisterPatientDto;
import com.digihealth.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleLoginRequest request) {
        try {
            LoginResponse response = authService.googleLogin(request);
            return ResponseEntity.ok(response);
        } catch (ResponseStatusException ex) {
            Map<String, Object> body = new HashMap<>();
            body.put("status", ex.getStatus().value());
            body.put("error", ex.getStatus().toString());
            body.put("message", ex.getReason());
            return ResponseEntity.status(ex.getStatus()).body(body);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto) {
        authService.registerDoctor(registerDto);
        return ResponseEntity.ok("Doctor registered successfully!");
    }

    @PostMapping("/register-patient")
    public ResponseEntity<?> registerPatient(@RequestBody RegisterPatientDto registerDto) {
        authService.registerUser(registerDto);
        return ResponseEntity.ok("Patient registered successfully!");
    }
}
