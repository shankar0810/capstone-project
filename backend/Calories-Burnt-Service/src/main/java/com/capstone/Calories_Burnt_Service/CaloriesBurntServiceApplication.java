package com.capstone.Calories_Burnt_Service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class CaloriesBurntServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CaloriesBurntServiceApplication.class, args);
	}

}
