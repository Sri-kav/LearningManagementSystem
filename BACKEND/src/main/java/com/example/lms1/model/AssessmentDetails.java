package com.example.lms1.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class AssessmentDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Admin = manager
    @ManyToOne
    @JoinColumn(name = "manager_id", referencedColumnName = "employee_id")
    private Admin manager;

    // Trainer reference
    @ManyToOne
    @JoinColumn(name = "trainer_id", referencedColumnName = "t_emp_id")
    private Trainer trainer;

    private String assessmentType;

    private int numberOfQuestions;

    private int numberOfMcq;

    private int numberOfPrograms;

    @Column(unique = true)
    private String assessmentName;

    @Enumerated(EnumType.STRING)
    @Column(name = "assessment_status")
    private AssessmentStatus assessmentStatus;

    private String createdBy;

    private LocalDateTime addedOn = LocalDateTime.now();

    private int paperAddedStatus = 0;

    private boolean status = true;

    // Constructors
    public AssessmentDetails() {}

    public AssessmentDetails(Admin manager, Trainer trainer, String assessmentType, int numberOfQuestions,
                             int numberOfMcq, int numberOfPrograms, String assessmentName,
                             AssessmentStatus assessmentStatus, String createdBy,
                             LocalDateTime addedOn, int paperAddedStatus, boolean status) {
        this.manager = manager;
        this.trainer = trainer;
        this.assessmentType = assessmentType;
        this.numberOfQuestions = numberOfQuestions;
        this.numberOfMcq = numberOfMcq;
        this.numberOfPrograms = numberOfPrograms;
        this.assessmentName = assessmentName;
        this.assessmentStatus = assessmentStatus;
        this.createdBy = createdBy;
        this.addedOn = addedOn != null ? addedOn : LocalDateTime.now();
        this.paperAddedStatus = paperAddedStatus;
        this.status = status;
    }

    // Getters and Setters

    public Long getId() {
        return id;
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

    public AssessmentStatus getAssessmentStatus() {
        return assessmentStatus;
    }

    public void setAssessmentStatus(AssessmentStatus assessmentStatus) {
        this.assessmentStatus = assessmentStatus;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getAddedOn() {
        return addedOn;
    }

    public void setAddedOn(LocalDateTime addedOn) {
        this.addedOn = addedOn;
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
