package com.capstone.Exercise_Rec;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ExerciseRecApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExerciseRecApplication.class, args);
	}


}
