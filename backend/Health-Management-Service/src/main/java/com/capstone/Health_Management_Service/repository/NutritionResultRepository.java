package com.capstone.Health_Management_Service.repository;

import com.capstone.Health_Management_Service.model.NutritionResult;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NutritionResultRepository extends MongoRepository<NutritionResult, String> {
}
