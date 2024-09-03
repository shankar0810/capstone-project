package com.capstone.Health_Management_Service.repository;

import com.capstone.Health_Management_Service.model.TargetHeartRateResult;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TargetHeartRateResultRepository extends MongoRepository<TargetHeartRateResult, String> {
}
