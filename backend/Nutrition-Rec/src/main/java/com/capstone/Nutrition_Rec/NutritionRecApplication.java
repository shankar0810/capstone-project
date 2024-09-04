package com.capstone.Nutrition_Rec;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class NutritionRecApplication {

	public static void main(String[] args) {
		SpringApplication.run(NutritionRecApplication.class, args);

	}

}
