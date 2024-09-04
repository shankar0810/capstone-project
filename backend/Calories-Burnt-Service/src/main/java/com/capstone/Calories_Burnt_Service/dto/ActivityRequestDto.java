package com.capstone.Calories_Burnt_Service.dto;

import lombok.Data;

@Data
public class ActivityRequestDto {
    private String query; // E.g., "swam for 1 hour"
    private int weight_kg;
    private int height_cm;
    private int age;
    private String userId;
}
