package com.capstone.Health_Management_Service.dto;

import lombok.Data;

@Data
public class TargetHeartRateRequest {
    private int age;
    private String fitnessLevel;
}
