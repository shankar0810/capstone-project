package com.capstone.Nutrition_Rec.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NutritionResponseDto {
    private String ingredient;
    private String nutritionInfo;
}
