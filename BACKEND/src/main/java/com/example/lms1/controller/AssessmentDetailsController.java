package com.example.lms1.controller;

import com.example.lms1.dto.AssessmentDetailsDTO;
import com.example.lms1.model.Admin;
import com.example.lms1.model.AssessmentDetails;
import com.example.lms1.model.AssessmentStatus;
import com.example.lms1.model.Trainer;
import com.example.lms1.repository.AdminRepository;
import com.example.lms1.repository.AssessmentDetailsRepository;
import com.example.lms1.repository.AssessmentPaperRepository;
import com.example.lms1.repository.TrainerRepository;
import com.example.lms1.service.AssessmentDetailsService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/assessments")
@CrossOrigin(origins = "http://localhost:3000")
public class AssessmentDetailsController {

    @Autowired
    private AssessmentDetailsRepository assessmentDetailsRepository;

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private AssessmentDetailsService assessmentDetailsService;
    
    @Autowired
    private AssessmentPaperRepository assessmentPaperRepository;

    @PostMapping("/add")
    public ResponseEntity<AssessmentDetails> createAssessment(@RequestBody AssessmentDetailsDTO dto) {
    	Optional<Trainer> trainerOpt = trainerRepository.findByEmail(dto.getTrainerEmail());
    	Optional<Admin> adminOpt = adminRepository.findByEmployeeId(dto.getAdminEmployeeId());

    	if (trainerOpt.isEmpty() || adminOpt.isEmpty()) {
    	    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
    	                         .body(null); // or send a meaningful error
    	}

    	Trainer trainer = trainerOpt.get();
    	Admin admin = adminOpt.get();

        if (trainer == null || admin == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(null); // or return error response
        }

        AssessmentDetails assessment = new AssessmentDetails(
            admin,                          // stored as foreign key in DB
            trainer,                        // stored as foreign key in DB
            dto.getAssessmentType(),
            dto.getNumberOfQuestions(),
            dto.getNumberOfMcq(),
            dto.getNumberOfPrograms(),
            dto.getAssessmentName(),
            AssessmentStatus.valueOf(dto.getAssessmentStatus()),
            trainer.getEmail(),            // createdBy (not a foreign key, just for info)
            null,                           // addedOn will be default current timestamp
            dto.getPaperAddedStatus(),
            dto.isStatus()
          
        );

        AssessmentDetails saved = assessmentDetailsRepository.save(assessment);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }


    @GetMapping("/all")
    public List<AssessmentDetails> getAllAssessments() {
        return assessmentDetailsRepository.findAll();
    }
    
    @GetMapping("/trainer/{trainerId}")
    public ResponseEntity<List<AssessmentDetails>> getAssessmentsByTrainerId(@PathVariable String trainerId) {
        List<AssessmentDetails> assessments = assessmentDetailsRepository.findByTrainer_TrainerId(trainerId);
        return ResponseEntity.ok(assessments);
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateAssessment(
            @PathVariable Long id,
            @RequestBody AssessmentDetailsDTO dto) {

        System.out.println("Updating assessment with ID: " + id);
        System.out.println("Payload: " + dto);

        try {
            AssessmentDetails existing = assessmentDetailsRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Assessment not found with id: " + id));

            existing.setAssessmentName(dto.getAssessmentName());
            existing.setAssessmentType(dto.getAssessmentType());
            existing.setNumberOfQuestions(dto.getNumberOfQuestions());
            existing.setNumberOfMcq(dto.getNumberOfMcq());
            existing.setNumberOfPrograms(dto.getNumberOfPrograms());

            try {
                existing.setAssessmentStatus(AssessmentStatus.valueOf(dto.getAssessmentStatus().toUpperCase()));
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body("Invalid assessmentStatus value: " + dto.getAssessmentStatus());
            }

            existing.setPaperAddedStatus(dto.getPaperAddedStatus());
            existing.setStatus(dto.isStatus());

            AssessmentDetails updated = assessmentDetailsRepository.save(existing);
            return ResponseEntity.ok(updated);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating assessment: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/trainer/{trainerId}")
    public ResponseEntity<String> deleteAssessmentsByTrainerId(@PathVariable String trainerId) {
        assessmentDetailsRepository.deleteByTrainer_TrainerId(trainerId);
        return ResponseEntity.ok("Assessments deleted for trainer ID: " + trainerId);
    }
    
    @DeleteMapping("/delete/{id}/trainer/{trainerId}")
    @Transactional
    public ResponseEntity<?> deleteAssessmentAndPapers(
            @PathVariable Long id,
            @PathVariable String trainerId) {
        try {
            // First delete all papers associated with the assessment
            if (assessmentPaperRepository.existsByAssessmentDetailsId(id)) {
                assessmentPaperRepository.deleteByAssessmentDetailsId(id);
            }

            // Then delete the assessment
            assessmentDetailsRepository.deleteById(id);

            return ResponseEntity.ok("✅ Assessment and related papers deleted.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Delete failed: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAssessment(@PathVariable Long id) {
        return assessmentDetailsService.deleteAssessmentWithPapers(id);
    }

}
