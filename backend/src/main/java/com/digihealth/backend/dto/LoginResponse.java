package com.digihealth.backend.dto;

import com.digihealth.backend.entity.User;

public class LoginResponse {
    private String accessToken;
    private User user;

    public LoginResponse() {}

    public LoginResponse(String accessToken, User user) {
        this.accessToken = accessToken;
        this.user = user;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
