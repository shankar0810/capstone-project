package com.capstone.Nutrition_Rec.Service;

import com.capstone.Nutrition_Rec.Model.NutritionData;
import com.capstone.Nutrition_Rec.Repository.NutritionRepository;
import com.capstone.Nutrition_Rec.dto.NutritionRequestDto;
import com.capstone.Nutrition_Rec.dto.NutritionResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class NutritionService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private NutritionRepository nutritionRepository;

    private static final String API_URL = "https://api.edamam.com/api/nutrition-data";

    public NutritionResponseDto getNutritionData(NutritionRequestDto requestDto) {
        String appId = "7c0847b5";
        String appKey = "298965f796d46e7677b52f5698c608a8";
        String url = String.format("%s?app_id=%s&app_key=%s&ingr=%s", API_URL, appId, appKey, requestDto.getIngredient());

        String response = restTemplate.getForObject(url, String.class);

        // Save to MongoDB
        NutritionData data = new NutritionData();
        data.setIngredient(requestDto.getIngredient());
        data.setNutritionInfo(response);
        nutritionRepository.save(data);

        // Prepare response DTO
        NutritionResponseDto responseDto = new NutritionResponseDto();
        responseDto.setIngredient(requestDto.getIngredient());
        responseDto.setNutritionInfo(response);  // String JSON response

        return responseDto;
    }
}
