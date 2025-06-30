package com.example.lms1.repository;

import com.example.lms1.model.AssessmentPaper;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AssessmentPaperRepository extends JpaRepository<AssessmentPaper, Long> {

	boolean existsByAssessmentDetailsId(Long assessmentDetailsId);
    // Custom queries can be added later
	void deleteByAssessmentDetailsId(Long assessmentId);
	//Optional<AssessmentPaper> findByAssessmentDetailsId(Long assessmentId);
	//AssessmentPaper findByAssessmentDetailsId(Long assessmentDetailsId);
	Optional<AssessmentPaper> findByAssessmentDetailsId(Long id);



}
