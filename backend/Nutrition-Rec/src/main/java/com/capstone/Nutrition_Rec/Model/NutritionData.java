package com.capstone.Nutrition_Rec.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "nutritionData")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NutritionData {
    @Id
    private String id;
    private String ingredient;
    private String nutritionInfo;
}


