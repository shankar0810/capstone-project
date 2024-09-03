package com.capstone.Health_Management_Service.dto;

import lombok.Data;

@Data
public class DailyCaloricNeedsRequest {
    private int age;
    private double weight;
    private double height;
    private String gender;
    private String activityLevel;
    private String goal;
    private String equation;
}
