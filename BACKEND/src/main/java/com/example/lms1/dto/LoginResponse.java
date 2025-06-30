package com.example.lms1.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginResponse {

    @JsonProperty("t_emp_id")
    private String trainerId;

    private String email;

    private String adminId;

    public LoginResponse(String trainerId, String email, String adminId) {
        this.trainerId = trainerId;
        this.email = email;
        this.adminId = adminId;
    }

    public String getTrainerId() {
        return trainerId;
    }

    public void setTrainerId(String trainerId) {
        this.trainerId = trainerId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
    }
}
