package com.capstone.Health_Management_Service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class WaterIntakeResponse {
    private String unit;
    @JsonProperty("water_intake")
    private double waterIntake;
}