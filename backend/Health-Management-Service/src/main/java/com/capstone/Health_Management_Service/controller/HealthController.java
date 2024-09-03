package com.capstone.Health_Management_Service.controller;

import com.capstone.Health_Management_Service.dto.*;
import com.capstone.Health_Management_Service.model.HealthData;
import com.capstone.Health_Management_Service.service.HealthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/health")
public class HealthController {

    @Autowired
    private HealthService healthService;

    @GetMapping(value = "/water-intake/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public WaterIntakeResponse getWaterIntake(@PathVariable String userId) {
        return healthService.calculateWaterIntake(userId);
    }

    @GetMapping(value = "/heart-rate/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public TargetHeartRateResponse getTargetHeartRateResponse(@PathVariable String userId) {
        return healthService.calculateTargetHeartRate(userId);
    }

    @GetMapping(value = "/daily-caloric-intake/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public DailyCaloricNeedsResponse getDailyCaloricIntake(@PathVariable String userId) {
        return healthService.calculateDailyCaloricNeeds(userId);
    }

    @GetMapping(value = "/macro-nutrients/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public NutritionResponse getMacroNutrients(@PathVariable String userId) {
        return healthService.calculateNutrtionRequired(userId);
    }

    @GetMapping(value = "/bmi/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public BMICalculatorResponse getBMI(@PathVariable String userId) {
        return healthService.calculateBMI(userId);
    }

    @PostMapping("/createuser")
    public HealthData createUser(@RequestBody HealthData healthData) {
        return healthService.createUser(healthData);
    }

    @PutMapping("/updateuser/{userId}")
    public HealthData updateUser(@PathVariable String userId, @RequestBody HealthData healthData) {
        return healthService.updateUser(userId, healthData);
    }

    @GetMapping("/userdata/{userId}")
    public HealthData getUserData(@PathVariable String userId) {
        return healthService.getUserData(userId);
    }

}
