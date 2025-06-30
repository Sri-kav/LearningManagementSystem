package com.example.lms1.repository;

import com.example.lms1.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, String> {
    Optional<Admin> findByEmailAndEmployeeId(String email, String employeeId);
    
    Optional<Admin> findByEmployeeId(String employeeId);
    
}
