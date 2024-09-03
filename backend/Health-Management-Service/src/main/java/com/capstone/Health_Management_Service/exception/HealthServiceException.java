package com.capstone.Health_Management_Service.exception;



public class HealthServiceException extends RuntimeException {
    private String message;

    public HealthServiceException(String message) {
        super(message);
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}

