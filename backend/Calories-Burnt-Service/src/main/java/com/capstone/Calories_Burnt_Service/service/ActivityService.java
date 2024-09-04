package com.capstone.Calories_Burnt_Service.service;

import com.capstone.Calories_Burnt_Service.dto.ActivityRequestDto;
import com.capstone.Calories_Burnt_Service.dto.ActivityResponseDto;
import com.capstone.Calories_Burnt_Service.feign.UserClient;
import com.capstone.Calories_Burnt_Service.feign.UserData;
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

    @Autowired
    private UserClient userClient;  // Inject Feign client

    private final String appId = "6049b699"; // Replace with your x-app-id
    private final String appKey = "723c95d84a64906fcf41899b7a4a4635"; // Replace with your x-app-key

    public List<ActivityResponseDto> fetchAndSaveActivities(ActivityRequestDto requestDto) {
        List<ActivityResponseDto> responseDtos = new ArrayList<>();

        try {
            // Fetch user details using Feign
            ResponseEntity<UserData> userResponse = userClient.getUserById(requestDto.getUserId());
            UserData userData = userResponse.getBody();

            if (userData != null) {
                // Use the user data as needed
                System.out.println("User fetched: " + userData.getUsername());
            } else {
                throw new Exception("User not found");
            }

            // Prepare API request for fetching activity data
            String apiUrl = "https://trackapi.nutritionix.com/v2/natural/exercise";

            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            headers.set("x-app-id", appId);
            headers.set("x-app-key", appKey);

            String requestBody = String.format("{\"query\": \"%s\", \"weight_kg\": %d, \"height_cm\": %d, \"age\": %d}",
                    requestDto.getQuery(), requestDto.getWeight_kg(), requestDto.getHeight_cm(), requestDto.getAge());

            ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, new org.springframework.http.HttpEntity<>(requestBody, headers), String.class);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());

            List<Activity> activities = new ArrayList<>();
            for (JsonNode node : root.path("exercises")) {
                Activity activity = new Activity();
                activity.setActivityName(node.path("name").asText());
                activity.setNfCalories(node.path("nf_calories").asInt());
                activity.setTimestamp(System.currentTimeMillis());

                // Map activity to user
                activity.setUserId(requestDto.getUserId());

                activities.add(activity);

                // Prepare response DTO
                ActivityResponseDto responseDto = new ActivityResponseDto();
                responseDto.setActivityName(activity.getActivityName());
                responseDto.setNfCalories(activity.getNfCalories());
                responseDto.setTimestamp(activity.getTimestamp());

                responseDtos.add(responseDto);
            }

            activityRepository.saveAll(activities);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return responseDtos;
    }

    public List<ActivityResponseDto> getActivitiesByUserId(String userId) {
        List<Activity> activities = activityRepository.findByUserId(userId);
        List<ActivityResponseDto> responseDtos = new ArrayList<>();

        for (Activity activity : activities) {
            ActivityResponseDto responseDto = new ActivityResponseDto();
            responseDto.setActivityName(activity.getActivityName());
            responseDto.setNfCalories(activity.getNfCalories());
            responseDto.setTimestamp(activity.getTimestamp());

            responseDtos.add(responseDto);
        }

        return responseDtos;
    }
}

