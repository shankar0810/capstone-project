package com.capstone.Diet_Recommendation_Service.controller;

import com.capstone.Diet_Recommendation_Service.dto.ExerciseResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capstone.Diet_Recommendation_Service.service.RecommendationService;

import java.util.List;

@RestController
@RequestMapping("/recommendations")
public class RecommendationController {

    @Autowired
    RecommendationService recommendationService;

    @GetMapping("/diet")
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

        return recommendationService.callApi(geminiKey, age, gender, height, currentWeight, medicalConditions, foodAllergies,
                primaryHealthAndNutritionGoals, dietPreference, howManyMealsPerDay, howMuchCaloriesIWantToHit, foodsYouDislike);
    }

    @GetMapping("/stress")
    public String getRecommendations(
            @RequestParam String stressors,
            @RequestParam String copingMethod,
            @RequestParam String geminiKey) {

        return recommendationService.generateRecommendations(geminiKey, stressors, copingMethod);
    }

    @GetMapping("/{bodyPart}")
    public ResponseEntity<List<ExerciseResponseDTO>> getExercisesByBodyPartPath(@PathVariable String bodyPart) {
        List<ExerciseResponseDTO> exercises = recommendationService.getExercisesByBodyPart(bodyPart);
        return ResponseEntity.ok(exercises);
    }




}
