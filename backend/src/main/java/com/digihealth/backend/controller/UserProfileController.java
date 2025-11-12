package com.digihealth.backend.controller;

import com.digihealth.backend.dto.CurrentUserProfileDto;
import com.digihealth.backend.dto.CurrentUserProfileUpdateRequest;
import com.digihealth.backend.dto.UserProfileResponse;
import com.digihealth.backend.dto.UserProfileUpdateRequest;
import com.digihealth.backend.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @GetMapping("/profile/{userId}")
    public ResponseEntity<UserProfileResponse> getUserProfile(@PathVariable UUID userId) {
        UserProfileResponse userProfile = userProfileService.getUserProfile(userId);
        return ResponseEntity.ok(userProfile);
    }

    @PutMapping("/profile/{userId}")
    public ResponseEntity<UserProfileResponse> updateUserProfile(@PathVariable UUID userId, @RequestBody UserProfileUpdateRequest request) {
        UserProfileResponse updatedProfile = userProfileService.updateUserProfile(userId, request);
        return ResponseEntity.ok(updatedProfile);
    }

    @DeleteMapping("/profile/{userId}")
    public ResponseEntity<String> deleteUserProfile(@PathVariable UUID userId) {
        userProfileService.deleteUserProfile(userId);
        return ResponseEntity.ok("User profile deactivated successfully.");
    }

    @GetMapping("/users/me")
    public ResponseEntity<CurrentUserProfileDto> getCurrentUserProfile() {
        CurrentUserProfileDto profile = userProfileService.getCurrentUserProfile();
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/users/me")
    public ResponseEntity<CurrentUserProfileDto> updateCurrentUserProfile(@RequestBody CurrentUserProfileUpdateRequest request) {
        CurrentUserProfileDto updatedProfile = userProfileService.updateCurrentUserProfile(request);
        return ResponseEntity.ok(updatedProfile);
    }
}
