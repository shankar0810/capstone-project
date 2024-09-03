package com.capstone.User_Management_Service.repository;

import com.capstone.User_Management_Service.model.UserData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserData, String> {
    UserData findByUsername(String username);
    boolean existsByUsername(String username);
    UserData findByEmail(String email);
    boolean existsByEmail(String email);
}
