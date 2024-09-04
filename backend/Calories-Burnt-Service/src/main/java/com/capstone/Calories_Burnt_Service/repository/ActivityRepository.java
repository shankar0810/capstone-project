package com.capstone.Calories_Burnt_Service.repository;

import com.capstone.Calories_Burnt_Service.model.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ActivityRepository extends MongoRepository<Activity, String> {
    List<Activity> findByUserId(String userId);
}
