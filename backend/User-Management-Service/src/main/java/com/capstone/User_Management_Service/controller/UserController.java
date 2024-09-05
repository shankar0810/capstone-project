package com.capstone.User_Management_Service.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.capstone.User_Management_Service.dto.LoginRequest;
import com.capstone.User_Management_Service.dto.LoginResponse;
import com.capstone.User_Management_Service.dto.SignUpRequest;
import com.capstone.User_Management_Service.model.UserData;
import com.capstone.User_Management_Service.service.JwtService;
import com.capstone.User_Management_Service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody SignUpRequest signUpRequest) {
        try {
            if (userService.existsByUsername(signUpRequest.getUsername())) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Username already exists. Try another Username!");
                return ResponseEntity.status(400).body(response);
            }

            UserData user = new UserData(signUpRequest.getUserId(), signUpRequest.getUsername(), signUpRequest.getEmail(), signUpRequest.getPassword());
            userService.registerUser(user);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User registered successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "User registration failed");
            return ResponseEntity.status(400).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginDTO) {
        UserData user = userService.getUserByUsername(loginDTO.getUsername());

        if (user != null && userService.authenticate(loginDTO.getUsername(), loginDTO.getPassword())) {
            // Handle login timestamp logic
            Date now = new Date();

            // Update lastLogin to previous recentLogin
            user.setLastLogin(user.getRecentLogin());

            // Set recentLogin to current timestamp
            user.setRecentLogin(now);

            // Save the updated user data
            userService.updateUser(user);

            String token = jwtService.generateToken(loginDTO.getUsername());

            // Include both login timestamps in the response
            LoginResponse loginResponse = new LoginResponse(token, user.getUserId(), user.getLastLogin(), user.getRecentLogin());
            return ResponseEntity.ok(loginResponse);
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserData> getUserById(@PathVariable String userId) {
        UserData userDTO = userService.getUserById(userId);
        return ResponseEntity.ok(userDTO);
    }
}
