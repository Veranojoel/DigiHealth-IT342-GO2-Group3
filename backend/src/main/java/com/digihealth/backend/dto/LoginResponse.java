package com.digihealth.backend.dto;

import com.digihealth.backend.entity.User;
import lombok.Data;

@Data
public class LoginResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private UserDto user;

    public LoginResponse(String accessToken, User user) {
        this.accessToken = accessToken;
        this.user = new UserDto(user);
    }
    
    @Data
    public static class UserDto {
        private String id;
        private String fullName;
        private String email;
        private String role;
        private Boolean isApproved;
        
        public UserDto(User user) {
            this.id = user.getId().toString();
            this.fullName = user.getFullName();
            this.email = user.getEmail();
            this.role = user.getRole().toString();
            this.isApproved = user.getIsApproved();
        }
    }
}
