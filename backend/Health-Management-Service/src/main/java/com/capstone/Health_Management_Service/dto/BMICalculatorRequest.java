package com.capstone.Health_Management_Service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BMICalculatorRequest {
    private double weight; // Weight in kilograms
    private double height; // Height in meters
}
