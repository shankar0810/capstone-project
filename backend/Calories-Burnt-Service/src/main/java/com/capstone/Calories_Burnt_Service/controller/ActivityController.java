package com.capstone.Calories_Burnt_Service.controller;

import com.capstone.Calories_Burnt_Service.dto.ActivityRequestDto;
import com.capstone.Calories_Burnt_Service.dto.ActivityResponseDto;
import com.capstone.Calories_Burnt_Service.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/activity")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @PostMapping("/fetch")
    public List<ActivityResponseDto> fetchAndSaveActivities(@RequestBody ActivityRequestDto requestDto) {
        return activityService.fetchAndSaveActivities(requestDto);
    }

    @GetMapping("/burned/{userId}")
    public List<ActivityResponseDto> getActivitiesByUserId(@PathVariable String userId) {
        return activityService.getActivitiesByUserId(userId);
    }
}
