package com.capstone.Calories_Burnt_Service.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ActivityResponseDto {
    private String activityName;
    private int nfCalories; // Calories burned
    private long timestamp;
}
