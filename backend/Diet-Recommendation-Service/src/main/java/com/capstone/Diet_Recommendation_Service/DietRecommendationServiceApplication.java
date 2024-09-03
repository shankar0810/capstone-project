package com.capstone.Diet_Recommendation_Service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class DietRecommendationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DietRecommendationServiceApplication.class, args);
	}

}
