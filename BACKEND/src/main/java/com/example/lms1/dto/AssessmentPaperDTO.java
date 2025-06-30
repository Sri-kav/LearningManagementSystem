package com.example.lms1.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class AssessmentPaperDTO {
  
    private Long assessmentDetailsId;
    private LocalDate assessmentDate;
    private String assessmentTime;
    private String assessmentDuration;
    private List<QuestionDTO> questions;
    @JsonInclude(Include.NON_NULL)
    private List<String> questionFiles;
    private String courseName;
    private String assessmentName;
    private String createdBy;
    @JsonFormat(pattern = "yyyy-MM-dd")  // ISO 8601 format
    private LocalDate addedOn;
    private boolean status;
    private String adminId;
   private String  trainerId;
    // Getters and setters
    // (Generate all using your IDE or manually if needed)

	public Long getAssessmentDetailsId() {
		return assessmentDetailsId;
	}
	public void setAssessmentDetailsId(Long assessmentDetailsId) {
		this.assessmentDetailsId = assessmentDetailsId;
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
	public List<QuestionDTO> getQuestions() {
	    return questions;
	}

	public void setQuestions(List<QuestionDTO> questions) {
	    this.questions = questions;
	}
	public List<String> getQuestionFiles() {
		return questionFiles;
	}
	public void setQuestionFiles(List<String> questionFiles) {
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
	public LocalDate getAddedOn() {
		return addedOn;
	}
	public void setAddedOn(LocalDate addedOn) {
		this.addedOn = addedOn;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	
	 public String getAdminId() {
	        return adminId;
	 }

	 public void setAdminId(String adminId) {
	        this.adminId = adminId;
	  }
		
		
     public String getTrainerId() {
            return trainerId;
     }

    public void setTrainerId(String trainerId) {
    this.trainerId = trainerId;
     }
    
    @Override
    public String toString() {
        return "AssessmentPaperDTO{" +
                "assessmentDetailsId=" + assessmentDetailsId +
                ", trainerId='" + trainerId + '\'' +
                ", adminId='" + adminId + '\'' +
                ", assessmentDate=" + assessmentDate +
                ", assessmentTime='" + assessmentTime + '\'' +
                ", assessmentDuration='" + assessmentDuration + '\'' +
                ", questions=" + questions +
                ", questionFiles='" + questionFiles + '\'' +
                ", courseName='" + courseName + '\'' +
                ", assessmentName='" + assessmentName + '\'' +
                ", createdBy='" + createdBy + '\'' +
                ", addedOn=" + addedOn +
                ", status=" + status +
                '}';
    }

}


