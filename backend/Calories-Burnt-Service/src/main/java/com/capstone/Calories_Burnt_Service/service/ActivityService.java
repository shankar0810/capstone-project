package com.capstone.Calories_Burnt_Service.service;

import com.capstone.Calories_Burnt_Service.dto.ActivityRequestDto;
import com.capstone.Calories_Burnt_Service.dto.ActivityResponseDto;
import com.capstone.Calories_Burnt_Service.model.Activity;
import com.capstone.Calories_Burnt_Service.repository.ActivityRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private RestTemplate restTemplate;

    private final String apiKey = "r6uHP3uFJMdH03tIUu2AUg==pOSQtMH4qlLP2Si0"; // Replace with your API key

    public List<ActivityResponseDto> fetchAndSaveActivities(ActivityRequestDto requestDto) {
        List<ActivityResponseDto> responseDtos = new ArrayList<>();

        try {
            // Convert weight from kg to pounds
            double weightInPounds = requestDto.getWeight() * 2.20462;

            String apiUrl = String.format("https://api.api-ninjas.com/v1/caloriesburned?activity=%s&weight=%.2f&duration=%d",
                    requestDto.getActivityName(), weightInPounds, requestDto.getDuration());

            HttpHeaders headers = new HttpHeaders();
            headers.set("accept", "application/json");
            headers.set("X-Api-Key", apiKey);

            ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.GET, new org.springframework.http.HttpEntity<>(headers), String.class);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());

            List<Activity> activities = new ArrayList<>();
            for (JsonNode node : root) {
                Activity activity = new Activity();
                activity.setActivityName(node.path("name").asText());
                activity.setCaloriesPerHour(node.path("calories_per_hour").asInt());
                activity.setDurationMinutes(node.path("duration_minutes").asInt());
                activity.setTotalCalories(node.path("total_calories").asInt());
                activity.setWeight(requestDto.getWeight()); // Store the original weight in kg

                activities.add(activity);

                // Prepare response DTO
                ActivityResponseDto responseDto = new ActivityResponseDto();
                responseDto.setActivityName(activity.getActivityName());
                responseDto.setTotalCalories(activity.getTotalCalories());

                responseDtos.add(responseDto);
            }

            activityRepository.saveAll(activities);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return responseDtos;
    }
}
