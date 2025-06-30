package com.example.lms1.repository;

import com.example.lms1.model.Trainer;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TrainerRepository extends JpaRepository<Trainer, String> {
    Optional<Trainer> findByEmailAndTrainerId(String email, String trainerId);

	Optional<Trainer> findByTrainerId(String trainerId);
	 //Trainer findByTrainerId(String trainerId);
	 
	
	Optional<Trainer> findByEmail(String email);
	
	 // ✅ Custom query to fetch Admin with Trainer
	@Query("SELECT t FROM Trainer t JOIN FETCH t.admin WHERE t.email = :email AND t.trainerId = :trainerId")
	Optional<Trainer> findWithAdminByEmailAndTrainerId(@Param("email") String email, @Param("trainerId") String trainerId);

}
