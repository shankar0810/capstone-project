package com.capstone.Exercise_Rec.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "exercises")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Exercise {

    @Id
    private String id;
    private String bodyPart;
    private String equipment;
    private String gifUrl;
    private String name;
    private String target;
    private List<String> secondaryMuscles;
    private List<String> instructions;

    // Getters and Setters
}
