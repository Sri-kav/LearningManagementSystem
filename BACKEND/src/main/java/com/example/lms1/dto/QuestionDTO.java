package com.example.lms1.dto;

import java.util.List;

public class QuestionDTO {
    private String question;
    private List<String> options; // Can be empty for programming
    private String correctAnswer;
    private String type; // "MCQ" or "Programming"

    // Getters and Setters
    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    @Override
    public String toString() {
        return "QuestionDTO{" +
                "question='" + question + '\'' +
                ", options=" + options +
                ", correctAnswer='" + correctAnswer + '\'' +
                ", type='" + type + '\'' +
                '}';
    }

}

