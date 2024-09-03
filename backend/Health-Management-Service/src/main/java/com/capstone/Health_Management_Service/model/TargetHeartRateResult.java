package com.capstone.Health_Management_Service.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "target_Heart_Rate_Results")
@Data
public class TargetHeartRateResult {
    @Id
    private String id;
    private String thrMax;
    private String thrMin;
    private String userId;
}
