package com.capstone.Nutrition_Rec.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "User-Management-Service", url = "http://localhost:3332/user") // Adjust URL as needed
public interface UserClient {

    @GetMapping("/{userId}")
    ResponseEntity<UserData> getUserById(@PathVariable String userId);
}
