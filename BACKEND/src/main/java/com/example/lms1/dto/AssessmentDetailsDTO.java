package com.example.lms1.dto;

public class AssessmentDetailsDTO {
	private Long id;  
    private String trainerEmail;          // to fetch Trainer entity
    private String adminEmployeeId;       // to fetch Admin entity
    private String assessmentType;
    private int numberOfQuestions;
    private int numberOfMcq;
    private int numberOfPrograms;
    private String assessmentName;
    private String assessmentStatus;      // should match enum values
    private int paperAddedStatus;
    private boolean status;

    // Getters and Setters
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
    
    public String getTrainerEmail() {
        return trainerEmail;
    }

	public void setTrainerEmail(String trainerEmail) {
        this.trainerEmail = trainerEmail;
    }

    public String getAdminEmployeeId() {
        return adminEmployeeId;
    }

    public void setAdminEmployeeId(String adminEmployeeId) {
        this.adminEmployeeId = adminEmployeeId;
    }

    public String getAssessmentType() {
        return assessmentType;
    }

    public void setAssessmentType(String assessmentType) {
        this.assessmentType = assessmentType;
    }

    public int getNumberOfQuestions() {
        return numberOfQuestions;
    }

    public void setNumberOfQuestions(int numberOfQuestions) {
        this.numberOfQuestions = numberOfQuestions;
    }

    public int getNumberOfMcq() {
        return numberOfMcq;
    }

    public void setNumberOfMcq(int numberOfMcq) {
        this.numberOfMcq = numberOfMcq;
    }

    public int getNumberOfPrograms() {
        return numberOfPrograms;
    }

    public void setNumberOfPrograms(int numberOfPrograms) {
        this.numberOfPrograms = numberOfPrograms;
    }

    public String getAssessmentName() {
        return assessmentName;
    }

    public void setAssessmentName(String assessmentName) {
        this.assessmentName = assessmentName;
    }

    public String getAssessmentStatus() {
        return assessmentStatus;
    }

    public void setAssessmentStatus(String assessmentStatus) {
        this.assessmentStatus = assessmentStatus;
    }

    public int getPaperAddedStatus() {
        return paperAddedStatus;
    }

    public void setPaperAddedStatus(int paperAddedStatus) {
        this.paperAddedStatus = paperAddedStatus;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
