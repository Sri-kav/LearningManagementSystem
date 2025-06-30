package com.example.lms1.controller;

import com.example.lms1.model.Admin;
import com.example.lms1.repository.AdminRepository;
//import com.example.lms1.model.Course;
import com.example.lms1.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;
    
    @Autowired
    private AdminRepository adminRepository;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {
        Optional<Admin> authenticatedAdmin = adminService.authenticateAdmin(admin.getEmail(), admin.getEmployeeId());
        
        if (authenticatedAdmin.isPresent()) {
            return ResponseEntity.ok(authenticatedAdmin.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body("Invalid email or employee ID");
        }
    }
    
    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

//   @PostMapping("/register")
//    public Admin register(@RequestBody Admin admin) {
//       return adminService.saveAdmin(admin);
//    }
//   
    
   @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        long count = adminRepository.count();
        
       if (count >= 1) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only one admin allowed.");
        }

        Admin savedAdmin = adminRepository.save(admin);
        return ResponseEntity.ok(savedAdmin);
    }

    @PutMapping("/{employeeId}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable String employeeId, @RequestBody Admin updatedAdmin) {
        Optional<Admin> optionalAdmin = adminService.getAdminById(employeeId);
        if (optionalAdmin.isPresent()) {
            Admin existingAdmin = optionalAdmin.get();

            // Update the modifiable fields
            existingAdmin.setEmpName(updatedAdmin.getEmpName());
            existingAdmin.setEmail(updatedAdmin.getEmail());
            existingAdmin.setRole(updatedAdmin.getRole());
            existingAdmin.setStatus(updatedAdmin.getStatus());

            return ResponseEntity.ok(adminService.saveAdmin(existingAdmin));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{employeeId}")
    public ResponseEntity<Void> deleteAdminById(@PathVariable String employeeId) {
        Optional<Admin> optionalAdmin = adminService.getAdminById(employeeId);
        if (optionalAdmin.isPresent()) {
            adminService.deleteAdminById(employeeId);
            return ResponseEntity.noContent().build(); // 204
        } else {
            return ResponseEntity.notFound().build(); // 404
        }
    }

}

