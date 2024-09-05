package com.capstone.User_Management_Service.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "users")
@AllArgsConstructor
@NoArgsConstructor
public class UserData {

    @Id
    private String userId;
    private String username;
    private String email;
    private String password;
    private Date lastLogin;  // New field for last login timestamp
    private Date recentLogin;  // New field for recent login timestamp

    // Constructor for user registration without login timestamps
    public UserData(String userId, String username, String email, String password) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.password = password;
        this.lastLogin = null; // Initialize to null for new users
        this.recentLogin = null; // Initialize to null for new users
    }

    // Getters and setters for all fields
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
