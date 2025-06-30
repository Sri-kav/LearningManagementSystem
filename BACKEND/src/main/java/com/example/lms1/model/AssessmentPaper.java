package com.example.lms1.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;


@Entity
public class AssessmentPaper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Foreign key to Admin (Manager)
    @ManyToOne
    @JoinColumn(name = "manager_id", referencedColumnName = "employee_id")
    @JsonIgnore
    private Admin manager;

    // Foreign key to Trainer
    @ManyToOne
    @JoinColumn(name = "trainer_id", referencedColumnName = "t_emp_id")
    @JsonIgnore
    private Trainer trainer;

    // Foreign key to AssessmentDetails
    @ManyToOne
    @JoinColumn(name = "assessment_id")
    @JsonIgnore
    private AssessmentDetails assessmentDetails;

    private LocalDate assessmentDate;

    private String assessmentTime;

    private String assessmentDuration;

    
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String questions;


//    @Column(columnDefinition = "json")
//    private List<String> questionFiles; // Store JSON as String or map to @Lob
    @Lob
    @Column(name = "question_files", columnDefinition = "LONGTEXT")
    private String questionFiles;


    private String courseName;

    private String assessmentName;

    private String createdBy;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate addedOn = LocalDate.now();
    
    private boolean status = true;
    
    
 // Getters and setters
public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Admin getManager() {
		return manager;
	}

	public void setManager(Admin manager) {
		this.manager = manager;
	}

	public Trainer getTrainer() {
		return trainer;
	}

	public void setTrainer(Trainer trainer) {
		this.trainer = trainer;
	}

	public AssessmentDetails getAssessmentDetails() {
		return assessmentDetails;
	}

	public void setAssessmentDetails(AssessmentDetails assessmentDetails) {
		this.assessmentDetails = assessmentDetails;
	}

	public LocalDate getAssessmentDate() {
		return assessmentDate;
	}

	public void setAssessmentDate(LocalDate assessmentDate) {
		this.assessmentDate = assessmentDate;
	}

	public String getAssessmentTime() {
		return assessmentTime;
	}

	public void setAssessmentTime(String assessmentTime) {
		this.assessmentTime = assessmentTime;
	}

	public String getAssessmentDuration() {
		return assessmentDuration;
	}

	public void setAssessmentDuration(String assessmentDuration) {
		this.assessmentDuration = assessmentDuration;
	}

	public String getQuestions() {
		return questions;
	}

	public void setQuestions(String questions) {
		this.questions = questions;
	}

//	public List<String> getQuestionFiles() {
//		return questionFiles;
//	}
//
//	public void setQuestionFiles(List<String> list) {
//		this.questionFiles = list;
//	}
	public String getQuestionFiles() {
		return questionFiles;
	}

	public void setQuestionFiles(String questionFiles) {
		this.questionFiles = questionFiles;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getAssessmentName() {
		return assessmentName;
	}

	public void setAssessmentName(String assessmentName) {
		this.assessmentName = assessmentName;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public LocalDate  getAddedOn() {
		return addedOn;
	}

	public void setAddedOn(LocalDate localDate) {
		this.addedOn = localDate;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

}

