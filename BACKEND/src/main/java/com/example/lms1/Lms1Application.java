package com.example.lms1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
public class Lms1Application {

	public static void main(String[] args) {
		SpringApplication.run(Lms1Application.class, args);
	}
		
	@PostConstruct
	public void init() {
		// Set JVM time zone to IST
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Kolkata"));
		System.out.println("TimeZone set to: " + TimeZone.getDefault().getID());
	}

}
