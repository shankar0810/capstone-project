package com.capstone.Health_Management_Service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class TargetHeartRateResponse {
    @JsonProperty("thr_max")
    private String thrMax;
    @JsonProperty("thr_min")
    private String thrMin;
}
