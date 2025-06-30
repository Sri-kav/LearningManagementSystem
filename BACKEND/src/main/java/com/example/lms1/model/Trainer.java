package com.example.lms1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
//import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
public class Trainer {
	
    @Id
    @Column(name = "t_emp_id", unique = true, nullable = false)
    private String trainerId; //primary key
    
    @Column(name = "id", insertable = false, updatable = false)
    private Long id; // Auto-incremented but not primary key


    private String name;
    private String email;

    private String role;

    @Column(nullable = false)
    private String status = "active"; // Default value

    private String course;
    private String subject;
    

    //private LocalDateTime addedOn = LocalDateTime.now(); // Set to current date by default
    @CreationTimestamp
    @Column(name = "added_on", nullable = false, updatable = false, columnDefinition = "DATETIME(6)")
    private LocalDateTime addedOn;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "employee_id")
    @JsonBackReference
   // @JsonIgnoreProperties("trainers") 
    private Admin admin;

    public Trainer() {}

   
  

    public Trainer(Long id, String trainerId, String name, String email, String role, String status, String course,
			String subject, LocalDateTime addedOn, Admin admin) {
		super();
		this.id = id;
		this.trainerId = trainerId;
		this.name = name;
		this.email = email;
		this.role = role;
		this.status = status;
		this.course = course;
		this.subject = subject;
		this.addedOn = addedOn;
		this.admin = admin;
	}

    // Getters and Setters 
    
	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getTrainerId() {
		return trainerId;
	}


	public void setTrainerId(String trainerId) {
		this.trainerId = trainerId;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getCourse() {
		return course;
	}


	public void setCourse(String course) {
		this.course = course;
	}


	public String getSubject() {
		return subject;
	}


	public void setSubject(String subject) {
		this.subject = subject;
	}


	public LocalDateTime getAddedOn() {
		return addedOn;
	}


	public void setAddedOn(LocalDateTime addedOn) {
		this.addedOn = addedOn;
	}


	public Admin getAdmin() {
		return admin;
	}


	public void setAdmin(Admin admin) {
		this.admin = admin;
	}


	
}

