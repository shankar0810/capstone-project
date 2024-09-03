package com.capstone.Health_Management_Service.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "daily_caloric_needs_results")
@Data
public class DailyCaloricNeedsResult {
    @Id
    private String id;
    private String userId;
    private CaloricNeeds caloric_needs;

    @Data
    public static class CaloricNeeds {
        private String calories;
        private String equation;
        private String goal;
    }
}
