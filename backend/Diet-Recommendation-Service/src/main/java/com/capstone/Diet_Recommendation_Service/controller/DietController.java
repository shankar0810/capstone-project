package com.capstone.Diet_Recommendation_Service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.capstone.Diet_Recommendation_Service.service.DietService;

@RestController
@RequestMapping("/diet")
public class DietController {

    @Autowired
    DietService dietService;

    @GetMapping
    public String getResponse(
            @RequestParam int age,
            @RequestParam String gender,
            @RequestParam double height,
            @RequestParam double currentWeight,
            @RequestParam String medicalConditions,
            @RequestParam String foodAllergies,
            @RequestParam String primaryHealthAndNutritionGoals,
            @RequestParam String dietPreference,
            @RequestParam int howManyMealsPerDay,
            @RequestParam double howMuchCaloriesIWantToHit,
            @RequestParam String foodsYouDislike,
            @RequestParam String geminiKey) {

        return dietService.callApi(geminiKey, age, gender, height, currentWeight, medicalConditions, foodAllergies,
                primaryHealthAndNutritionGoals, dietPreference, howManyMealsPerDay, howMuchCaloriesIWantToHit, foodsYouDislike);
    }

}
