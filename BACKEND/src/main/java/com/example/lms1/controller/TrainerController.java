package com.example.lms1.controller;

import com.example.lms1.model.Trainer;
import com.example.lms1.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trainers")
@CrossOrigin(origins = "http://localhost:3000") // Frontend port
public class TrainerController {

    @Autowired
    private TrainerService trainerService;

    @GetMapping
    public List<Trainer> getAllTrainers() {
        return trainerService.getAllTrainers();
    }

    @GetMapping("/{trainerId}")
    public Optional<Trainer> getTrainerById(@PathVariable String trainerId) {
        return trainerService.getTrainerById(trainerId);
    }

    @PostMapping
    public Trainer createTrainer(@RequestBody Trainer trainer) {
        return trainerService.saveTrainer(trainer);
    }
    
    @PostMapping("/bulk")
    public List<Trainer> createMutlipleTrainers(@RequestBody List<Trainer> trainers){
    	return trainerService.saveAllTrainers(trainers);
    }

    @PutMapping("/{trainerId}")
    public ResponseEntity<?> updateTrainer(@PathVariable String trainerId, @RequestBody Trainer trainer) {
        try {
            Trainer updated = trainerService.updateTrainer(trainerId, trainer);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace();  // Log the exception
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update trainer: " + e.getMessage());
        }
    }


    @DeleteMapping("/{trainerId}")
    public ResponseEntity<String> deleteTrainer(@PathVariable String trainerId) {
        try {
            trainerService.deleteTrainer(trainerId);
            return ResponseEntity.ok("Trainer deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trainer not found.");
        }
    }

    
    @GetMapping("/by-admin/{employeeId}")
    public ResponseEntity<List<Trainer>> getTrainersByAdmin(@PathVariable String employeeId) {
        List<Trainer> trainers = trainerService.getTrainersByAdminEmployeeId(employeeId);
        if (trainers.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(trainers);
    }
    
 // ✅ Update Trainer--->using both admin and trainer employee id
    @PutMapping("/update/{adminEmployeeId}/{trainerId}")
    public ResponseEntity<Trainer> updateTrainer(
            @PathVariable String adminEmployeeId,
            @PathVariable String trainerId,
            @RequestBody Trainer updatedTrainer) {

        Trainer updated = trainerService.updateTrainerByAdminAndTrainerId(adminEmployeeId, trainerId, updatedTrainer);
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete Trainer--->using both admin and trainer employee id
    @DeleteMapping("/delete/{adminEmployeeId}/{trainerId}")
    public ResponseEntity<String> deleteTrainer(
            @PathVariable String adminEmployeeId,
            @PathVariable String trainerId) {

        trainerService.deleteTrainerByAdminAndTrainerId(adminEmployeeId, trainerId);
        return ResponseEntity.ok("Trainer deleted successfully.");
    }
    
    
}
