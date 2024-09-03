package com.capstone.Health_Management_Service.dto;

import lombok.Data;

@Data
public class WaterIntakeRequest {
    private double weight;
    private String activityLevel;
    private String climate;
    private String unit;
}