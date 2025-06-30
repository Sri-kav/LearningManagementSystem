package com.example.lms1.service;

import com.example.lms1.dto.AssessmentPaperDTO;
import com.example.lms1.model.Admin;
import com.example.lms1.model.AssessmentDetails;
import com.example.lms1.model.AssessmentPaper;
import com.example.lms1.model.Trainer;
import com.example.lms1.repository.AdminRepository;
import com.example.lms1.repository.AssessmentDetailsRepository;
import com.example.lms1.repository.AssessmentPaperRepository;
import com.example.lms1.repository.TrainerRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AssessmentPaperService {

    @Autowired
    private AssessmentPaperRepository paperRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private AssessmentDetailsRepository assessmentDetailsRepository;
    
    @Autowired
    private AssessmentPaperRepository assessmentPaperRepository;
    


    public AssessmentPaper createPaper(AssessmentPaperDTO dto) {
    	 System.out.println("📥 createPaper() called");
         System.out.println("AssessmentDetails ID: " + dto.getAssessmentDetailsId());
         System.out.println("📌 Manager ID received from DTO: '" + dto.getAdminId() + "'");
    	AssessmentDetails details = assessmentDetailsRepository.findById(dto.getAssessmentDetailsId())
    	        .orElseThrow(() -> new RuntimeException("AssessmentDetails not found"));

    	Admin admin =adminRepository.findByEmployeeId(dto.getAdminId())
    		    .orElseThrow(() -> new RuntimeException("Admin not found"));
    	// ✅ Fetch the trainer by trainerId
    	Trainer trainer = trainerRepository.findByTrainerId(dto.getTrainerId())
    		    .orElseThrow(() -> new RuntimeException("Trainer not found"));


//        // ✅ Use the trainer's email as createdBy
      String createdBy = trainer.getEmail();


        AssessmentPaper paper = new AssessmentPaper();
        paper.setManager(admin);
        paper.setTrainer(trainer);
        paper.setAssessmentDetails(details);
        paper.setAssessmentDate(dto.getAssessmentDate());
        paper.setAssessmentTime(dto.getAssessmentTime());
        paper.setAssessmentDuration(dto.getAssessmentDuration());
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String questionJson = objectMapper.writeValueAsString(dto.getQuestions());

            // 👇 Add this log
            System.out.println("🔍 Serialized Questions JSON: " + questionJson);

            paper.setQuestions(questionJson);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert questions to JSON", e);
        }

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String filesJson = objectMapper.writeValueAsString(dto.getQuestionFiles());
            paper.setQuestionFiles(filesJson);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert questionFiles to JSON", e);
        }
        paper.setCourseName(dto.getCourseName());
        paper.setAssessmentName(dto.getAssessmentName());
        paper.setAddedOn(LocalDate.now()); // instead of LocalDate
        paper.setStatus(dto.isStatus());
//        paper.setCreatedBy(createdBy); 
//        paper.setCreatedBy(dto.getCreatedBy());
        paper.setCreatedBy(trainer.getEmail());
        System.out.println("Final createdBy stored: " + paper.getCreatedBy());
        
        System.out.println("Saving paper: " + paper);

        return paperRepository.save(paper);
    }

    public List<AssessmentPaper> getAllPapers() {
        return paperRepository.findAll();
    }

    public void deletePaper(Long id) {
        paperRepository.deleteById(id);
    }
    
    public Optional<AssessmentPaper> getPaperByAssessmentId(Long assessmentId) {
        return assessmentPaperRepository.findByAssessmentDetailsId(assessmentId);
    }


    public AssessmentPaper getPaperById(Long id) {
        return paperRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("AssessmentPaper not found"));
    }
    
    public AssessmentPaper updatePaper(Long id, AssessmentPaperDTO dto) {
        AssessmentPaper existingPaper = assessmentPaperRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Assessment paper not found"));

        existingPaper.setAssessmentDate(dto.getAssessmentDate());
        existingPaper.setAssessmentTime(dto.getAssessmentTime());
        existingPaper.setAssessmentDuration(dto.getAssessmentDuration());
        existingPaper.setCourseName(dto.getCourseName());
        existingPaper.setAssessmentName(dto.getAssessmentName());
        existingPaper.setStatus(dto.isStatus());
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String filesJson = objectMapper.writeValueAsString(dto.getQuestionFiles());
            existingPaper.setQuestionFiles(filesJson);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert questionFiles to JSON", e);
        }

        try {
            ObjectMapper mapper = new ObjectMapper();
            String questionsJson = mapper.writeValueAsString(dto.getQuestions());
            existingPaper.setQuestions(questionsJson);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error serializing questions", e);
        }

        return assessmentPaperRepository.save(existingPaper);
    }

    public AssessmentPaper updatePaperByDetailId(Long detailId, AssessmentPaperDTO dto) {
        Optional<AssessmentPaper> optionalPaper = paperRepository.findByAssessmentDetailsId(detailId);
        if (optionalPaper.isEmpty()) {
            throw new RuntimeException("Paper not found for detail ID " + detailId);
        }

        AssessmentPaper paper = optionalPaper.get();

        paper.setAssessmentDate(dto.getAssessmentDate());
        paper.setAssessmentTime(dto.getAssessmentTime());
        paper.setAssessmentDuration(dto.getAssessmentDuration());
        paper.setCourseName(dto.getCourseName());

        // ✅ Handle null for questionFiles
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String filesJson = objectMapper.writeValueAsString(
                dto.getQuestionFiles() == null ? new ArrayList<>() : dto.getQuestionFiles()
            );
            paper.setQuestionFiles(filesJson);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert questionFiles to JSON", e);
        }

        paper.setAssessmentName(dto.getAssessmentName());

        // ✅ Convert and set JSON questions
        try {
            ObjectMapper mapper = new ObjectMapper();
            String questionJson = mapper.writeValueAsString(dto.getQuestions());
            paper.setQuestions(questionJson);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert questions to JSON", e);
        }

        paper.setStatus(dto.isStatus());

        // ✅ Set Trainer and use email as createdBy
        Trainer trainer = trainerRepository.findByTrainerId(dto.getTrainerId())
            .orElseThrow(() -> new RuntimeException("Trainer not found"));
        paper.setTrainer(trainer);
        paper.setCreatedBy(trainer.getEmail()); // or admin.getEmail()

        // ✅ Set Admin
        Admin admin = adminRepository.findByEmployeeId(dto.getAdminId())
            .orElseThrow(() -> new RuntimeException("Admin not found"));
        paper.setManager(admin);

        // ✅ Handle addedOn date
        if (dto.getAddedOn() != null) {
            paper.setAddedOn(dto.getAddedOn());
        }

        return paperRepository.save(paper);
    }
    
}

