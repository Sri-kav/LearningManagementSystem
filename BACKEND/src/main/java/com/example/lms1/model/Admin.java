package com.example.lms1.model;

import java.util.ArrayList;
import java.util.List; // ✅ Correct import for Java Collections

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
public class Admin {

    @Id
    @Column(name = "employee_id", nullable = false, unique = true)
    private String employeeId;
    
    private String empName;
    private String email;
    
    @Column(nullable = false)
    private String role;
    
    @Column(nullable = false)
    private String status = "active"; // Default value set to "active"

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Trainer> trainers = new ArrayList<>(); // initialize the list

    public Admin() {}

    public Admin(String employeeId, String empName, String email, String role, String status) {
        this.employeeId = employeeId;
        this.empName = empName;
        this.email = email;
        this.role = role;
        this.status = status != null ? status : "active"; // Default to "active" if status is null
    }

    // Getters and setters
    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Trainer> getTrainers() {
        return trainers;
    }

    public void setTrainers(List<Trainer> trainers) {
        this.trainers = trainers;
    }
}
