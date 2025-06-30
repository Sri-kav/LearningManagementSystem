package com.example.lms1.repository;

import com.example.lms1.model.AssessmentDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AssessmentDetailsRepository extends JpaRepository<AssessmentDetails, Long> {

    // Find by assessment name
    Optional<AssessmentDetails> findByAssessmentName(String assessmentName);

    // Find assessment by ID and trainer's trainerId (business identifier)
    Optional<AssessmentDetails> findByIdAndTrainer_TrainerId(Long id, String trainerId);

    // Optional: If you need to delete directly (can also be handled in service/controller)
    void deleteByIdAndTrainer_TrainerId(Long id, String trainerId);

	List<AssessmentDetails> findByTrainer_TrainerId(String trainerId);

	void deleteByTrainer_TrainerId(String trainerId);

    
}
