package com.capstone.Exercise_Rec.Service;

import com.capstone.Exercise_Rec.dto.ExerciseResponseDTO;
import com.capstone.Exercise_Rec.Model.Exercise;
import com.capstone.Exercise_Rec.Repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExerciseService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ExerciseRepository exerciseRepository;

    private final String API_URL = "https://exercisedb.p.rapidapi.com/exercises/target/{bodyPart}?limit=10&offset=0";
    private final String API_HOST = "exercisedb.p.rapidapi.com";
    private final String API_KEY = "3e0868bd9cmshe41fd0d4ace0c42p1e30e6jsnc41042503f62";

    public List<ExerciseResponseDTO> getExercisesByBodyPart(String bodyPart) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-rapidapi-host", API_HOST);
        headers.set("x-rapidapi-key", API_KEY);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Exercise[]> response = restTemplate.exchange(
                API_URL,
                HttpMethod.GET,
                entity,
                Exercise[].class,
                bodyPart
        );

        List<Exercise> exercises = Arrays.asList(response.getBody());

        // Save the exercises to the database
        exerciseRepository.saveAll(exercises);

        // Map the Exercise entities to ExerciseResponseDTOs
        return exercises.stream()
                .map(exercise -> new ExerciseResponseDTO(
                        exercise.getId(),
                        exercise.getBodyPart(),
                        exercise.getEquipment(),
                        exercise.getGifUrl(),
                        exercise.getName(),
                        exercise.getTarget(),
                        exercise.getSecondaryMuscles(),
                        exercise.getInstructions()
                ))
                .collect(Collectors.toList());
    }
}