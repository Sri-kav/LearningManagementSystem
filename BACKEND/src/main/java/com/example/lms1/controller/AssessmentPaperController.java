package com.example.lms1.controller;

import com.example.lms1.dto.AssessmentPaperDTO;
import com.example.lms1.dto.QuestionDTO;
import com.example.lms1.model.AssessmentDetails;
import com.example.lms1.model.AssessmentPaper;
import com.example.lms1.model.Trainer;
import com.example.lms1.repository.AssessmentDetailsRepository;
import com.example.lms1.repository.AssessmentPaperRepository;
import com.example.lms1.repository.TrainerRepository;
import com.example.lms1.service.AssessmentPaperService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/assessment-paper")
@CrossOrigin(origins = "http://localhost:3000")
public class AssessmentPaperController {

    @Autowired
    private AssessmentPaperService paperService;
//    @Autowired
//    private AssessmentPaperRepository paperRepository; // ✅ Inject the repository
//    @Autowired
//    private AssessmentPaperRepository assessmentPaperRepository;
    @Autowired
    private AssessmentDetailsRepository assessmentDetailsRepository;
    
    @Autowired
    private AssessmentPaperRepository assessmentPaperRepository;
    @Autowired
    private TrainerRepository trainerRepository;


    @PostMapping("/add")
    public ResponseEntity<?> createAssessmentPaper(@RequestBody AssessmentPaperDTO dto) {
        try {
            // ✅ Check if paper already exists
            boolean exists = assessmentPaperRepository.existsByAssessmentDetailsId(dto.getAssessmentDetailsId());
            if (exists) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("❌ Assessment paper already exists for this assessment.");
            }

            // ✅ Proceed if it doesn't exist
            AssessmentPaper paper = paperService.createPaper(dto);
            return ResponseEntity.ok(paper);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to save assessment paper: " + e.getMessage());
        }
    }
    @GetMapping("/all")
    public List<AssessmentPaper> getAllAssessmentPapers() {
        return paperService.getAllPapers();
    }

    @DeleteMapping("/{id}")
    public void deleteAssessmentPaper(@PathVariable Long id) {
        paperService.deletePaper(id);
    }

    @GetMapping("/{id}")
    public AssessmentPaper getAssessmentPaperById(@PathVariable Long id) {
        return paperService.getPaperById(id);
    }
    
    @GetMapping("/by-assessment/{assessmentId}")
    public ResponseEntity<AssessmentPaper> getByAssessmentId(@PathVariable Long assessmentId) {
        Optional<AssessmentPaper> paper = paperService.getPaperByAssessmentId(assessmentId);
        return paper.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/by-detail-id/{id}")
    public ResponseEntity<AssessmentPaper> getByAssessmentDetailId(@PathVariable Long id) {
    	Optional<AssessmentPaper> paper = assessmentPaperRepository.findByAssessmentDetailsId(id);
        return paper.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePaper(@PathVariable Long id, @RequestBody AssessmentPaperDTO dto) {
        try {
            AssessmentPaper updated = paperService.updatePaper(id, dto);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to update assessment paper: " + e.getMessage());
        }
    }

//    @PutMapping("/update-by-detail-id/{id}")
//    public ResponseEntity<?> updateAssessmentPaperByDetailId(@PathVariable Long id,
//                                                             @RequestBody AssessmentPaperDTO dto) {
//        try {
//            System.out.println("Updating AssessmentPaper for id: " + id);
//            System.out.println("DTO: " + dto);
//            System.out.println("Questions DTO: " + dto.getQuestions());
//
//            Optional<AssessmentDetails> adOpt = assessmentDetailsRepository.findById(id);
//            if (adOpt.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("AssessmentDetails not found for id: " + id);
//            }
//
//            Optional<AssessmentPaper> paperOpt = assessmentPaperRepository.findByAssessmentDetailsId(id);
//            if (paperOpt.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                                     .body("AssessmentPaper not found for assessmentDetailsId: " + id);
//            }
//
//            AssessmentPaper paper = paperOpt.get();
//
//            paper.setAssessmentDate(dto.getAssessmentDate());
//            paper.setAssessmentTime(dto.getAssessmentTime());
//            paper.setAssessmentDuration(dto.getAssessmentDuration());
//
//            List<String> validQuestionFiles = dto.getQuestionFiles();
//            paper.setQuestionFiles(validQuestionFiles != null ? validQuestionFiles : new ArrayList<>());
//
//            paper.setCourseName(dto.getCourseName());
//
//            // Try-catch just for question serialization
//            try {
//                ObjectMapper objectMapper = new ObjectMapper();
//                String questionsJson = objectMapper.writeValueAsString(dto.getQuestions());
//                paper.setQuestions(questionsJson);
//            } catch (JsonProcessingException jsonEx) {
//                jsonEx.printStackTrace();
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                                     .body("Failed to serialize questions: " + jsonEx.getMessage());
//            }
//
//            AssessmentPaper updated = assessmentPaperRepository.save(paper);
//            return ResponseEntity.ok(updated);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Error: " + e.getMessage());
//        }
//    }


    @PutMapping("/update-by-detail-id/{id}")
    public ResponseEntity<?> updateAssessmentPaperByDetailId(@PathVariable Long id,
                                                             @RequestBody AssessmentPaperDTO dto) {
        try {
            System.out.println("Updating AssessmentPaper for id: " + id);
            System.out.println("DTO: " + dto);

            Optional<AssessmentDetails> adOpt = assessmentDetailsRepository.findById(id);
            if (adOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("AssessmentDetails not found for id: " + id);
            }

            Optional<AssessmentPaper> optionalPaper = assessmentPaperRepository.findByAssessmentDetailsId(id);
            if (optionalPaper.isEmpty()) {
                throw new RuntimeException("AssessmentPaper not found for assessmentDetailsId: " + id);
            }
            AssessmentPaper paper = optionalPaper.get();

            if (paper == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("AssessmentPaper not found for assessmentDetailsId: " + id);
            }

            // Re-link entities
            Optional<Trainer> trainerOpt = trainerRepository.findByTrainerId(dto.getTrainerId());
            if (trainerOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Trainer not found with ID: " + dto.getTrainerId());
            }

            Trainer trainer = trainerOpt.get(); // Extract Trainer from Optional
            paper.setTrainer(trainer); // ✅ Now this works
            paper.setAssessmentDetails(adOpt.get());
            paper.setAssessmentDate(dto.getAssessmentDate());
            paper.setAssessmentTime(dto.getAssessmentTime());
            paper.setAssessmentDuration(dto.getAssessmentDuration());
            paper.setCourseName(dto.getCourseName());
            paper.setAssessmentName(dto.getAssessmentName());
            paper.setCreatedBy(dto.getCreatedBy());
            paper.setAddedOn(dto.getAddedOn());
            paper.setStatus(dto.isStatus());

            List<String> validQuestionFiles = dto.getQuestionFiles();
            String filesAsString = (validQuestionFiles != null && !validQuestionFiles.isEmpty())
                    ? String.join(",", validQuestionFiles)
                    : "";
            paper.setQuestionFiles(filesAsString);

            // Optional: fill default options if missing
            for (QuestionDTO q : dto.getQuestions()) {
                if (q.getOptions() == null) {
                    q.setOptions(Arrays.asList("", "", "", ""));
                }
            }

            ObjectMapper objectMapper = new ObjectMapper();
            String questionsJson = objectMapper.writeValueAsString(dto.getQuestions());
            paper.setQuestions(questionsJson);

            AssessmentPaper updated = assessmentPaperRepository.save(paper);
            return ResponseEntity.ok(updated);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

}
