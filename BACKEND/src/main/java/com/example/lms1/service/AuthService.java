package com.example.lms1.service;

import com.example.lms1.model.Admin;
import com.example.lms1.model.Trainer;
import com.example.lms1.repository.AdminRepository;
import com.example.lms1.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private TrainerRepository trainerRepository;

    public Optional<Admin> loginAdmin(String email, String employeeId) {
        return adminRepository.findByEmailAndEmployeeId(email, employeeId);
    }

    public Optional<Trainer> loginTrainer(String email, String trainerId) {
        return trainerRepository.findByEmailAndTrainerId(email, trainerId);
    }

}
