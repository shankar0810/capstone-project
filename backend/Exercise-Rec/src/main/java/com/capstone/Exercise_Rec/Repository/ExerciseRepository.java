package com.capstone.Exercise_Rec.Repository;


import com.capstone.Exercise_Rec.Model.Exercise;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExerciseRepository extends MongoRepository<Exercise, String> {
}

