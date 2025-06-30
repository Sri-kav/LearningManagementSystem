package com.example.lms1.service;

import com.example.lms1.model.Admin;
import com.example.lms1.model.Trainer;
import com.example.lms1.repository.AdminRepository;
import com.example.lms1.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;
    
    @Autowired
    private AdminRepository adminRepository;

    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    public Optional<Trainer> getTrainerById(String trainerId) {
        return trainerRepository.findById(trainerId);
    }

//    public Trainer saveTrainer(Trainer trainer) {
//        return trainerRepository.save(trainer);
//    }
    public Trainer saveTrainer(Trainer trainer) {
        if (trainer.getAdmin() == null || trainer.getAdmin().getEmployeeId() == null) {
            throw new RuntimeException("Admin employeeId is required.");
        }

        String employeeId = trainer.getAdmin().getEmployeeId();

        Admin admin = adminRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Admin not found with employeeId: " + employeeId));

        trainer.setAdmin(admin); // Set full admin object
        return trainerRepository.save(trainer);
    }
    
    public void deleteTrainer(String trainerId) {
        if (trainerRepository.existsById(trainerId)) {
            trainerRepository.deleteById(trainerId);
        } else {
            throw new RuntimeException("Trainer not found with ID: " + trainerId);
        }
    }


    public Trainer updateTrainer(String trainerId, Trainer updatedTrainer) {
        Optional<Trainer> existingTrainerOpt = trainerRepository.findByTrainerId(trainerId);

        if (existingTrainerOpt.isPresent()) {
            Trainer existingTrainer = existingTrainerOpt.get();
            existingTrainer.setName(updatedTrainer.getName());
            existingTrainer.setEmail(updatedTrainer.getEmail());
            existingTrainer.setStatus(updatedTrainer.getStatus());
            existingTrainer.setRole(updatedTrainer.getRole());
            existingTrainer.setCourse(updatedTrainer.getCourse());
            existingTrainer.setSubject(updatedTrainer.getSubject());
            existingTrainer.setAddedOn(updatedTrainer.getAddedOn());
            existingTrainer.setAdmin(updatedTrainer.getAdmin());
            return trainerRepository.save(existingTrainer);
        } else {
            throw new RuntimeException("Trainer with ID " + trainerId + " not found.");
        }
    }

	public List<Trainer> saveAllTrainers(List<Trainer> trainers) {
		return trainerRepository.saveAll(trainers);
	}

	public List<Trainer> getTrainersByAdminEmployeeId(String employeeId) {
		 return adminRepository.findByEmployeeId(employeeId)
	                .map(Admin::getTrainers)
	                .orElse(Collections.emptyList());
		
	}

	public Trainer updateTrainerByAdminAndTrainerId(String adminEmployeeId, String trainerId, Trainer updatedTrainer) {
	    return adminRepository.findByEmployeeId(adminEmployeeId)
	            .flatMap(admin -> admin.getTrainers().stream()
	                    .filter(t -> t.getTrainerId().equals(trainerId))
	                    .findFirst()
	            ).map(existingTrainer -> {
	                existingTrainer.setName(updatedTrainer.getName());
	                existingTrainer.setEmail(updatedTrainer.getEmail());
	                existingTrainer.setStatus(updatedTrainer.getStatus());
	                existingTrainer.setRole(updatedTrainer.getRole());
	                existingTrainer.setCourse(updatedTrainer.getCourse());
	                existingTrainer.setSubject(updatedTrainer.getSubject());
	                existingTrainer.setAddedOn(updatedTrainer.getAddedOn());
	                return trainerRepository.save(existingTrainer);
	            }).orElseThrow(() -> new RuntimeException("Trainer not found for this admin."));
	}
 
	
	public void deleteTrainerByAdminAndTrainerId(String adminEmployeeId, String trainerId) {
	    Optional<Trainer> trainerOpt = trainerRepository.findById(trainerId);

	    if (trainerOpt.isPresent()) {
	        Trainer trainer = trainerOpt.get();
	        if (trainer.getAdmin() != null &&
	            trainer.getAdmin().getEmployeeId().equals(adminEmployeeId)) {
	            trainerRepository.deleteById(trainerId);
	        } else {
	            throw new RuntimeException("Trainer does not belong to the specified admin.");
	        }
	    } else {
	        throw new RuntimeException("Trainer with ID " + trainerId + " not found.");
	    }
	}


}
