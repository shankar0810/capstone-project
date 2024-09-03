package com.capstone.Calories_Burnt_Service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "calories_burned")
public class Activity {

    @Id
    private String id;
    private String activityName;
    private int nfCalories;
    private int duration;
    private long timestamp;
}
