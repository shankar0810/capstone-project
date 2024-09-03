package com.capstone.Nutrition_Rec.Controller;

import com.capstone.Nutrition_Rec.Service.NutritionService;
import com.capstone.Nutrition_Rec.dto.NutritionRequestDto;
import com.capstone.Nutrition_Rec.dto.NutritionResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/nutrition")

public class NutritionController {

    @Autowired
    private NutritionService nutritionService;

    @PostMapping
    public NutritionResponseDto getNutritionData(@RequestBody NutritionRequestDto requestDto) {
        return nutritionService.getNutritionData(requestDto);
    }
}
