package com.capstone.Nutrition_Rec.Repository;


import com.capstone.Nutrition_Rec.Model.NutritionData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NutritionRepository extends MongoRepository<NutritionData, String> {
}
