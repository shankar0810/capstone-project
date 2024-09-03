package com.capstone.Health_Management_Service.dto;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class DailyCaloricNeedsResponse {
    private CaloricNeeds caloric_needs;

    @Data
    public static class CaloricNeeds {
        private String calories;
//        private String equation;
//        private String goal;
    }
}

