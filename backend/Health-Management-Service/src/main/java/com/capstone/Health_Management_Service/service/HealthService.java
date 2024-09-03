package com.capstone.Health_Management_Service.service;

import com.capstone.Health_Management_Service.dto.*;
import com.capstone.Health_Management_Service.exception.HealthServiceException;
import com.capstone.Health_Management_Service.feign.UserClient;
import com.capstone.Health_Management_Service.feign.UserData;
import com.capstone.Health_Management_Service.model.*;
import com.capstone.Health_Management_Service.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;

@Service
public class HealthService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private UserDataRepository userDataRepository;

    @Autowired
    private WaterIntakeResultRepository waterIntakeResultRepository;

    @Autowired
    private TargetHeartRateResultRepository  targetHeartRateResultRepository;

    @Autowired
    private DailyCaloricNeedsResultRepository  dailyCaloricNeedsResultRepository;

    @Autowired
    private UserClient userClient;

    @Autowired
    private NutritionResultRepository  nutritionResultRepository;

    private static final String API_KEY = "4c35b8533emsh487e269ac315f00p147ccajsn06f2c4472a0a";
    private static final String API_HOST = "health-calculator-api.p.rapidapi.com";

    public WaterIntakeResponse calculateWaterIntake(String userId) {
        try {
            // Fetch UserDTO from User_Management_Service based on userId
            UserData user = userClient.getUserById(userId).getBody();
            if (user == null) {
                throw new HealthServiceException("User not found");
            }

            System.out.println("Fetched User: " + user);
            Optional<HealthData> userData = userDataRepository.findByUserId(user.getUserId());
            if (userData.isEmpty()) {
                throw new HealthServiceException("User data not found in Health Service");
            }

            // Build the API request URL using the data from UserDTO
            String apiUrl = UriComponentsBuilder.fromHttpUrl("https://health-calculator-api.p.rapidapi.com/dwi")
                    .queryParam("weight", userData.get().getWeight())
                    .queryParam("activity_level", userData.get().getActivityLevel())
                    .queryParam("climate", userData.get().getClimate())
                    .queryParam("unit", userData.get().getUnit())
                    .toUriString();

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.set("x-rapidapi-key", API_KEY);
            headers.set("x-rapidapi-host", API_HOST);

            // Create HttpEntity with headers
            HttpEntity<String> entity = new HttpEntity<>(headers);

            // Call the external API
            ResponseEntity<WaterIntakeResponse> responseEntity = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, WaterIntakeResponse.class);
            WaterIntakeResponse response = responseEntity.getBody();

            if (response == null) {
                throw new HealthServiceException("Failed to calculate water intake");
            }

            // Save WaterIntakeResult to the database
            WaterIntakeResult result = new WaterIntakeResult();
            result.setUnit(response.getUnit());
            result.setWaterIntake(response.getWaterIntake());
            result.setUserId(userData.get().getUserId());
            waterIntakeResultRepository.save(result);

            return response;
        } catch (HttpClientErrorException e) {
            throw new HealthServiceException("HTTP error occurred: " + e.getMessage());
        } catch (RestClientException e) {
            throw new HealthServiceException("API error occurred: " + e.getMessage());
        } catch (Exception e) {
            throw new HealthServiceException("An unexpected error occurred: " + e.getMessage());
        }
    }

    public TargetHeartRateResponse calculateTargetHeartRate(String userId) {
        try {
            // Fetch UserDTO from User_Management_Service based on userId
            ResponseEntity<UserData> userResponse = userClient.getUserById(userId);
            UserData user = userResponse.getBody();

            if (user == null) {
                throw new HealthServiceException("User not found in User Management Service");
            }

            Optional<HealthData> userDataOptional = userDataRepository.findByUserId(user.getUserId());
            if (userDataOptional.isEmpty()) {
                throw new HealthServiceException("User data not found in Health Service");
            }

            HealthData userData = userDataOptional.get();

            // Build the API request URL using the data from UserDTO
            String apiUrl = UriComponentsBuilder.fromHttpUrl("https://health-calculator-api.p.rapidapi.com/thr")
                    .queryParam("age", userData.getAge())
                    .queryParam("fitness_level", userData.getFitnessLevel())
                    .toUriString();

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.set("x-rapidapi-key", API_KEY);
            headers.set("x-rapidapi-host", API_HOST);

            // Create HttpEntity with headers
            HttpEntity<String> entity = new HttpEntity<>(headers);

            // Call the external API
            ResponseEntity<TargetHeartRateResponse> responseEntity = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, TargetHeartRateResponse.class);
            TargetHeartRateResponse response = responseEntity.getBody();

            if (response == null) {
                throw new HealthServiceException("Failed to retrieve target heart rate data from API");
            }

            // Save TargetHeartRateResult to the database
            TargetHeartRateResult result = new TargetHeartRateResult();
            result.setThrMax(response.getThrMax());
            result.setThrMin(response.getThrMin());
            result.setId(userData.getUserId());
            targetHeartRateResultRepository.save(result);

            return response;

        } catch (HttpClientErrorException e) {
            // Handle HTTP errors
            throw new HealthServiceException("HTTP error occurred: " + e.getMessage());
        } catch (RestClientException e) {
            // Handle RestTemplate errors
            throw new HealthServiceException("API error occurred: " + e.getMessage());
        } catch (Exception e) {
            // Handle unexpected errors
            throw new HealthServiceException("An unexpected error occurred: " + e.getMessage());
        }
    }

    public DailyCaloricNeedsResponse calculateDailyCaloricNeeds(String userId) {
        try {
            // Fetch UserDTO from User_Management_Service based on userId
            ResponseEntity<UserData> userResponse = userClient.getUserById(userId);
            UserData user = userResponse.getBody();

            if (user == null) {
                throw new HealthServiceException("User not found in User Management Service");
            }

            Optional<HealthData> userDataOptional = userDataRepository.findByUserId(user.getUserId());
            if (userDataOptional.isEmpty()) {
                throw new HealthServiceException("User data not found in Health Service");
            }

            HealthData userData = userDataOptional.get();

            // Build the API request URL using the data from UserDTO
            String apiUrl = UriComponentsBuilder.fromHttpUrl("https://health-calculator-api.p.rapidapi.com/dcn")
                    .queryParam("age", userData.getAge())
                    .queryParam("weight", userData.getWeight())
                    .queryParam("height", userData.getHeight())
                    .queryParam("gender", userData.getGender())
                    .queryParam("activity_level", userData.getActivityLevel())
                    .queryParam("goal", userData.getGoal())
                    .queryParam("equation", userData.getEquation())
                    .toUriString();

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.set("x-rapidapi-key", API_KEY);
            headers.set("x-rapidapi-host", API_HOST);

            // Create HttpEntity with headers
            HttpEntity<String> entity = new HttpEntity<>(headers);

            // Call the external API
            ResponseEntity<DailyCaloricNeedsResponse> responseEntity = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, DailyCaloricNeedsResponse.class);
            DailyCaloricNeedsResponse response = responseEntity.getBody();

            if (response == null) {
                throw new HealthServiceException("Failed to retrieve daily caloric needs data from API");
            }

            // Save DailyCaloricNeedsResult to the database
            DailyCaloricNeedsResult result = new DailyCaloricNeedsResult();
            result.setUserId(userData.getUserId());

            // Setting the nested caloric_needs data
            DailyCaloricNeedsResult.CaloricNeeds caloricNeeds = new DailyCaloricNeedsResult.CaloricNeeds();
            caloricNeeds.setCalories(response.getCaloric_needs().getCalories());
//            caloricNeeds.setEquation(response.getCaloric_needs().getEquation());
//            caloricNeeds.setGoal(response.getCaloric_needs().getGoal());

            result.setCaloric_needs(caloricNeeds);

            dailyCaloricNeedsResultRepository.save(result);

            return response;

        } catch (HttpClientErrorException e) {
            // Handle HTTP errors
            throw new HealthServiceException("HTTP error occurred: " + e.getMessage());
        } catch (RestClientException e) {
            // Handle RestTemplate errors
            throw new HealthServiceException("API error occurred: " + e.getMessage());
        } catch (Exception e) {
            // Handle unexpected errors
            throw new HealthServiceException("An unexpected error occurred: " + e.getMessage());
        }
    }


    public NutritionResponse calculateNutrtionRequired(String userId) {
        try {
            // Fetch UserDTO from User_Management_Service based on userId
            ResponseEntity<UserData> userResponse = userClient.getUserById(userId);
            UserData user = userResponse.getBody();

            if (user == null) {
                throw new HealthServiceException("User not found in User Management Service");
            }

            Optional<HealthData> userDataOptional = userDataRepository.findByUserId(user.getUserId());
            if (userDataOptional.isEmpty()) {
                throw new HealthServiceException("User data not found in Health Service");
            }

            HealthData userData = userDataOptional.get();

            // Build the API request URL using the data from UserDTO
            String apiUrl = UriComponentsBuilder.fromHttpUrl("https://health-calculator-api.p.rapidapi.com/mnd")
                    .queryParam("activity_level", userData.getActivityLevel())
                    .queryParam("body_composition_goal", userData.getBodyCompositionalGoal())
                    .queryParam("dietary_preferences", userData.getDietaryPreferences())
                    .toUriString();

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.set("x-rapidapi-key", API_KEY);
            headers.set("x-rapidapi-host", API_HOST);

            // Create HttpEntity with headers
            HttpEntity<String> entity = new HttpEntity<>(headers);

            // Call the external API
            ResponseEntity<NutritionResponse> responseEntity = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, NutritionResponse.class);
            NutritionResponse response = responseEntity.getBody();

            if (response == null) {
                throw new HealthServiceException("Failed to retrieve nutrition data from API");
            }

            // Save NutritionResult to the database
            NutritionResult result = new NutritionResult();
            result.setCarbohydrates(response.getCarbohydrates());
            result.setFats(response.getFats());
            result.setProteins(response.getProteins());
            result.setUserId(userData.getUserId());
            nutritionResultRepository.save(result);

            return response;

        } catch (HttpClientErrorException e) {
            // Handle HTTP errors
            throw new HealthServiceException("HTTP error occurred: " + e.getMessage());
        } catch (RestClientException e) {
            // Handle RestTemplate errors
            throw new HealthServiceException("API error occurred: " + e.getMessage());
        } catch (Exception e) {
            // Handle unexpected errors
            throw new HealthServiceException("An unexpected error occurred: " + e.getMessage());
        }
    }

    public BMICalculatorResponse calculateBMI(String userId) {
        try {
            // Fetch UserDTO from User_Management_Service based on userId
            ResponseEntity<UserData> userResponse = userClient.getUserById(userId);
            UserData user = userResponse.getBody();

            if (user == null) {
                throw new HealthServiceException("User not found in User Management Service");
            }

            Optional<HealthData> userDataOptional = userDataRepository.findByUserId(user.getUserId());
            if (userDataOptional.isEmpty()) {
                throw new HealthServiceException("User data not found in Health Service");
            }

            HealthData userData = userDataOptional.get();

            // Calculate BMI
            double weight = userData.getWeight();
            double height = userData.getHeight();
            if (height <= 0) {
                throw new HealthServiceException("Height must be greater than zero");
            }
            double bmi = (weight / (height * height)) * 10000;

            // Determine BMI category
            String category;
            if (bmi < 18.5) {
                category = "Underweight";
            } else if (bmi < 24.9) {
                category = "Normal weight";
            } else if (bmi < 29.9) {
                category = "Overweight";
            } else {
                category = "Obesity";
            }

            // Create response
            BMICalculatorResponse response = new BMICalculatorResponse();
            response.setBmi(bmi);
            response.setCategory(category);

            return response;

        } catch (Exception e) {
            throw new HealthServiceException("An unexpected error occurred: " + e.getMessage());
        }
    }




    public HealthData createUser(HealthData healthData) {
        return userDataRepository.save(healthData);
    }


    public HealthData updateUser(String userId, HealthData healthData) {
        HealthData healthdata = userDataRepository.findByUserId(userId).get();
        healthdata.setAge(healthData.getAge());
        healthdata.setWeight(healthData.getWeight());
        healthdata.setHeight(healthData.getHeight());
        healthdata.setGender(healthData.getGender());
        healthdata.setActivityLevel(healthData.getActivityLevel());
        healthdata.setGoal(healthData.getGoal());
        healthdata.setFitnessLevel(healthData.getFitnessLevel());
        healthdata.setClimate(healthData.getClimate());
        healthdata.setUnit(healthData.getUnit());
        healthdata.setEquation(healthData.getEquation());
        healthdata.setBodyCompositionalGoal(healthData.getBodyCompositionalGoal());
        healthdata.setDietaryPreferences(healthData.getDietaryPreferences());
        healthdata.setEquation(healthData.getEquation());
        return userDataRepository.save(healthdata);
    }

    public HealthData getUserData(String userId) {
        return userDataRepository.findByUserId(userId).get();
    }
}



