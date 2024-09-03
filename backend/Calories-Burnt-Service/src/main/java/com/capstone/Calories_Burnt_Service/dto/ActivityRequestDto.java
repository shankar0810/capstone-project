package com.capstone.Calories_Burnt_Service.dto;

import lombok.Data;

@Data
public class ActivityRequestDto {
    private String activityName;
    private int weight;
    private int duration;
}
