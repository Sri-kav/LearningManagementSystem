package com.example.lms1.service;

import com.example.lms1.model.Admin;
import com.example.lms1.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Optional<Admin> authenticateAdmin(String email, String employeeId) {
        return adminRepository.findByEmailAndEmployeeId(email, employeeId);
    }

    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }
    
    public Optional<Admin> getAdminById(String employeeId) {
        return adminRepository.findById(employeeId);
    }

    public void deleteAdminById(String employeeId) {
        adminRepository.deleteById(employeeId);
    }

	public List<Admin> getAllAdmins() {
		return adminRepository.findAll();
	}

}
