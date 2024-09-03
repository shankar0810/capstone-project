package com.capstone.Health_Management_Service.repository;

import com.capstone.Health_Management_Service.model.DailyCaloricNeedsResult;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DailyCaloricNeedsResultRepository extends MongoRepository<DailyCaloricNeedsResult, String> {
}
