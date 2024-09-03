package com.capstone.User_Management_Service.service;

import com.capstone.User_Management_Service.model.UserData;
import com.capstone.User_Management_Service.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public boolean authenticate(String username, String password) {
        UserData user = userRepository.findByUsername(username);
        if (user != null) {
            return passwordEncoder.matches(password, user.getPassword());
        }
        return false;
    }

    public UserData registerUser(UserData userData) {
        if (userRepository.existsByUsername(userData.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        userData.setPassword(passwordEncoder.encode(userData.getPassword()));
        return userRepository.save(userData);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public UserData getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }


    public UserData getUserById(String userId) {
        UserData user = userRepository.findById(userId).orElse(null);
        return user;
    }
}
