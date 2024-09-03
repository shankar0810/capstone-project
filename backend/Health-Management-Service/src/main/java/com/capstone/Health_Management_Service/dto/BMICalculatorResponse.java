package com.capstone.Health_Management_Service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BMICalculatorResponse {
    private double bmi;
    private String category;
}
