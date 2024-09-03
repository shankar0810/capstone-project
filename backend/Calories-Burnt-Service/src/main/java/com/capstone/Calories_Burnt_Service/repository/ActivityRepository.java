package com.capstone.Calories_Burnt_Service.repository;

import com.capstone.Calories_Burnt_Service.model.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ActivityRepository extends MongoRepository<Activity, String> {
}

