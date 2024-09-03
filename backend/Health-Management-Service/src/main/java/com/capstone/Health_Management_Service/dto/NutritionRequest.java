package com.capstone.Health_Management_Service.dto;

import lombok.Data;

@Data
public class NutritionRequest {
    private String activityLevel;
    private String bodyCompositionalGoal;
    private String dietaryPreferences;
}
