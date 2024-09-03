package com.capstone.Health_Management_Service.repository;


import com.capstone.Health_Management_Service.model.HealthData;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserDataRepository extends MongoRepository<HealthData, String> {
    Optional<HealthData> findByUserId(String userId);
}