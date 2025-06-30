package com.example.lms1.controller;

import com.example.lms1.dto.LoginRequest;
import com.example.lms1.dto.LoginResponse;
import com.example.lms1.dto.TrainerLoginRequest;
import com.example.lms1.model.Admin;
import com.example.lms1.model.Trainer;
import com.example.lms1.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;
    @PostMapping("/admin/login")
    public ResponseEntity<?> loginAdmin(@RequestBody LoginRequest loginRequest) {
        Optional<Admin> admin = authService.loginAdmin(loginRequest.getEmail(), loginRequest.getEmployeeId());
        return admin.<ResponseEntity<?>>map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(401).body("Invalid admin credentials"));
    }

//    @PostMapping("/trainer/login")
//    public ResponseEntity<?> loginTrainer(@RequestBody LoginRequest loginRequest) {
//        Optional<Trainer> trainer = authService.loginTrainer(loginRequest.getEmail(), loginRequest.getEmployeeId());
//        return trainer.<ResponseEntity<?>>map(ResponseEntity::ok)
//                      .orElseGet(() -> ResponseEntity.status(401).body("Invalid trainer credentials"));
//    }

    @PostMapping("/trainer/login")
    public ResponseEntity<?> loginTrainer(@RequestBody TrainerLoginRequest loginRequest) {
        Optional<Trainer> trainerOpt = authService.loginTrainer(
            loginRequest.getEmail(),
            loginRequest.getTrainerId()
        );

        if (trainerOpt.isPresent()) {
            Trainer trainer = trainerOpt.get();
            Map<String, Object> response = new HashMap<>();
            response.put("trainerId", trainer.getTrainerId());
            response.put("email", trainer.getEmail());
            response.put("adminId", trainer.getAdmin() != null ? trainer.getAdmin().getEmployeeId() : null);
            response.put("name", trainer.getName());
            response.put("course", trainer.getCourse());   // ✅ added
            response.put("subject", trainer.getSubject()); // ✅ added
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or trainerId");
        }
    }

    @PostMapping("/admin/logout")
    public ResponseEntity<?> logoutAdmin() {
        // In a stateless app, logout is handled on frontend. Just return 200 OK.
        return ResponseEntity.ok("Admin logged out successfully.");
    }

    @PostMapping("/trainer/logout")
    public ResponseEntity<?> logoutTrainer() {
        return ResponseEntity.ok("Trainer logged out successfully.");
    }

}