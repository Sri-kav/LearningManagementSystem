package com.example.lms1.service;

import com.example.lms1.dto.AssessmentDetailsDTO;
import com.example.lms1.model.Admin;
import com.example.lms1.model.AssessmentDetails;
import com.example.lms1.model.AssessmentStatus;
import com.example.lms1.model.Trainer;
import com.example.lms1.repository.AdminRepository;
import com.example.lms1.repository.AssessmentDetailsRepository;
import com.example.lms1.repository.AssessmentPaperRepository;
import com.example.lms1.repository.TrainerRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

//import java.util.List;
//import java.util.Optional;

@Service
public class AssessmentDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private AssessmentDetailsRepository assessmentDetailsRepository;

    @Autowired
    private AssessmentPaperRepository assessmentPaperRepository;
    
    @Transactional
    public ResponseEntity<?> deleteAssessmentWithPapers(Long id) {
        assessmentPaperRepository.deleteByAssessmentDetailsId(id);  // First delete child
        assessmentDetailsRepository.deleteById(id);                  // Then delete parent
        return ResponseEntity.ok("✅ Assessment and its papers deleted.");
    }

    public AssessmentDetails createAssessment(AssessmentDetailsDTO dto) {
        Admin manager = adminRepository.findById(dto.getAdminEmployeeId())
                .orElseThrow(() -> new RuntimeException("Admin not found with ID: " + dto.getAdminEmployeeId()));

        Trainer trainer = trainerRepository.findById(dto.getTrainerEmail())
                .orElseThrow(() -> new RuntimeException("Trainer not found with ID: " + dto.getTrainerEmail()));

        AssessmentStatus statusEnum;
        try {
            statusEnum = AssessmentStatus.valueOf(dto.getAssessmentStatus());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid assessment status: " + dto.getAssessmentStatus());
        }

        AssessmentDetails assessment = new AssessmentDetails(
        	    manager,
        	    trainer,
        	    dto.getAssessmentType(),
        	    dto.getNumberOfQuestions(),
        	    dto.getNumberOfMcq(),
        	    dto.getNumberOfPrograms(),
        	    dto.getAssessmentName(),
        	    statusEnum,
        	    trainer.getEmail(),      // use trainer's email as createdBy
        	    null,                    // addedOn (use default current time)
        	    dto.getPaperAddedStatus(),
        	    dto.isStatus()
        	);


        return assessmentDetailsRepository.save(assessment);
    }
}