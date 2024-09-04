package com.capstone.Nutrition_Rec.Repository;


import com.capstone.Nutrition_Rec.Model.NutritionData;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NutritionRepository extends MongoRepository<NutritionData, String> {

    List<NutritionData> findAllByUserId(String userId);
}
