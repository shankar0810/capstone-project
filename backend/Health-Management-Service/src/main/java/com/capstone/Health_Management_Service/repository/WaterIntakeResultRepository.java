package com.capstone.Health_Management_Service.repository;

import com.capstone.Health_Management_Service.model.WaterIntakeResult;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WaterIntakeResultRepository extends MongoRepository<WaterIntakeResult, String> {
}
