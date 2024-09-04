package com.capstone.Health_Management_Service.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "user_data")
public class HealthData {
    @Id
    private String id;
    private int age;
    private double weight; //(kg)
    private double height; //(cm)
    private String gender; //(male, female)
    private String goal; //(weight_loss, maintenance, weight_gain)
    private String activityLevel; //(sedentary, lightly_active, moderately_active, very_active, extra_active)
    private String fitnessLevel; //(beginner, intermediate,  advanced)
    private String climate; //(normal, hot, cold)
    private String unit; //(liters, ounces)
    private String bodyCompositionalGoal; //(weight_loss, maintenance, muscle_gain)
    private String dietaryPreferences; //(vegetarian, vegan, pescatarian, gluten-free)
    private String equation="mifflin"; //(harris, mifflin)
    private String userId;
}