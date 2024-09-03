package com.capstone.Health_Management_Service.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "water_intake_results")
public class WaterIntakeResult {
    @Id
    private String id;
    private String unit;
    private double waterIntake;
    private String userId;
}
