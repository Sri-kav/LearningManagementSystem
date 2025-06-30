package com.example.lms1.dto;

public class TrainerLoginRequest {
    private String email;
    private String trainerId; // Correct field name

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTrainerId() {
        return trainerId;
    }

    public void setTrainerId(String trainerId) {
        this.trainerId = trainerId;
    }
}
