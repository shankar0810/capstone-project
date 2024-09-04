package com.capstone.Nutrition_Rec.Service;

import com.capstone.Nutrition_Rec.Model.NutritionData;
import com.capstone.Nutrition_Rec.Repository.NutritionRepository;
import com.capstone.Nutrition_Rec.dto.NutritionRequestDto;
import com.capstone.Nutrition_Rec.dto.NutritionResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class NutritionService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private NutritionRepository nutritionRepository;

    private static final String API_URL = "https://api.edamam.com/api/nutrition-data";

    public NutritionResponseDto saveNutritionData(NutritionRequestDto requestDto) {
        String appId = "7c0847b5";
        String appKey = "298965f796d46e7677b52f5698c608a8";
        String url = String.format("%s?app_id=%s&app_key=%s&ingr=%s", API_URL, appId, appKey, requestDto.getIngredient());

        String response = restTemplate.getForObject(url, String.class);

        // Save to MongoDB
        NutritionData data = new NutritionData();
        data.setIngredient(requestDto.getIngredient());
        data.setNutritionInfo(response);
        data.setUserId(requestDto.getUserId());
        nutritionRepository.save(data);

        // Prepare response DTO
        NutritionResponseDto responseDto = new NutritionResponseDto();
        responseDto.setIngredient(requestDto.getIngredient());
        responseDto.setNutritionInfo(response);  // String JSON response

        return responseDto;
    }

    public List<NutritionResponseDto> getNutritions(String userId) {
        // Retrieve nutrition data from MongoDB based on userId
        List<NutritionData> dataList = nutritionRepository.findAllByUserId(userId);

        // Initialize the list of response DTOs
        List<NutritionResponseDto> responseDtos = new ArrayList<>();

        // Check if the dataList is empty or null
        if (dataList == null || dataList.isEmpty()) {
            // Optionally create a default response when no data is available
            NutritionResponseDto responseDto = new NutritionResponseDto();
            responseDto.setIngredient("No data available");
            responseDto.setNutritionInfo(String.valueOf(new HashMap<>())); // Empty nutrition info
            responseDtos.add(responseDto);
            return responseDtos;
        }

        // If data is found, map each data entry to the response DTO
        for (NutritionData data : dataList) {
            NutritionResponseDto responseDto = new NutritionResponseDto();
            responseDto.setIngredient(data.getIngredient());
            responseDto.setNutritionInfo(data.getNutritionInfo());
            responseDtos.add(responseDto);
        }

        return responseDtos;
    }


}
