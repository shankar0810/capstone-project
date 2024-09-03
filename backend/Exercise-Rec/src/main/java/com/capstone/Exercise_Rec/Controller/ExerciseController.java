package com.capstone.Exercise_Rec.Controller;

import com.capstone.Exercise_Rec.dto.ExerciseResponseDTO;
import com.capstone.Exercise_Rec.Service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/exercise")
public class ExerciseController {

    @Autowired
    private ExerciseService exerciseService;

    @GetMapping("/{bodyPart}")
    public ResponseEntity<List<ExerciseResponseDTO>> getExercisesByBodyPartPath(@PathVariable String bodyPart) {
        List<ExerciseResponseDTO> exercises = exerciseService.getExercisesByBodyPart(bodyPart);
        return ResponseEntity.ok(exercises);
    }
}
