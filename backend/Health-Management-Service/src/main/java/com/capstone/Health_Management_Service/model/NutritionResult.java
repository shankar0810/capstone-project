package com.capstone.Health_Management_Service.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "nutrition_results")
public class NutritionResult {
    @Id
    private String id;
    private String carbohydrates;
    private String fats;
    private String proteins;
    private String userId;
}
