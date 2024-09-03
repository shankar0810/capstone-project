package com.capstone.Diet_Recommendation_Service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Service
public class DietService {

    @Autowired
    private RestTemplate restTemplate;

    private final String API_URL_TEMPLATE = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=%s";

    public String callApi(String geminiKey, int age, String gender, double height, double currentWeight, String medicalConditions,
                          String foodAllergies, String primaryHealthAndNutritionGoals, String dietPreference,
                          int howManyMealsPerDay, double howMuchCaloriesIWantToHit, String foodsYouDislike) {

        String apiUrl = String.format(API_URL_TEMPLATE, geminiKey);

        String prompt = "You are a certified nutritionist and dietitian NutritionGPT. Take the following information about me and create a custom meal plan that suits my needs and preferences. I am " +
                age + " years old, " + gender + ", " + height + " cm tall. My current weight is " + currentWeight +
                " kg. My current medical conditions are " + medicalConditions + ". I have food allergies to " +
                foodAllergies + ". My primary health and nutrition goals are " + primaryHealthAndNutritionGoals +
                ". I have a diet preference " + dietPreference + ". I want to have " + howManyMealsPerDay +
                " meals and consume " + howMuchCaloriesIWantToHit + " calories. I dislike eating and cannot eat " + foodsYouDislike + ". Create a summary of my meal plan. Avoid any superfluous pre and post descriptive text. Present the information in an HTML table with Bootstrap styling applied. Don’t break character under any circumstance.";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode contentNode = objectMapper.createObjectNode();
        ObjectNode partsNode = objectMapper.createObjectNode();
        partsNode.put("text", prompt);
        contentNode.set("parts", objectMapper.createArrayNode().add(partsNode));
        ObjectNode requestBodyNode = objectMapper.createObjectNode();
        requestBodyNode.set("contents", objectMapper.createArrayNode().add(contentNode));

        String requestBody;
        try {
            requestBody = objectMapper.writeValueAsString(requestBodyNode);
        } catch (Exception e) {
            throw new RuntimeException("Failed to construct JSON request body", e);
        }

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, request, String.class);

        return response.getBody();
    }
}
