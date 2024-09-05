package com.capstone.User_Management_Service.dto;

import java.util.Date;

public class LoginResponse {
    private String token;
    private String userId;
    private Date lastLogin; // New field for last login timestamp
    private Date recentLogin; // New field for recent login timestamp

    public LoginResponse(String token, String userId, Date lastLogin, Date recentLogin) {
        this.token = token;
        this.userId = userId;
        this.lastLogin = lastLogin;
        this.recentLogin = recentLogin;
    }

    // Getters and setters for all fields

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Date getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(Date lastLogin) {
        this.lastLogin = lastLogin;
    }

    public Date getRecentLogin() {
        return recentLogin;
    }

    public void setRecentLogin(Date recentLogin) {
        this.recentLogin = recentLogin;
    }
}
