# 📚 Learning Management System (LMS) – Full Stack Project

A full-stack **Learning Management System** built using:

- 🎨 **Frontend:** React JS  
- ⚙️ **Backend:** Spring Boot  
- 🛢️ **Database:** MySQL  

This system enables **admins** to manage trainers, and **trainers** to create and manage assessments, papers, and view student results.

---

## 🚀 Features

### 👨‍💼 Admin Module
- Login using email and employee ID
- Add trainers with:
  - Auto-generated trainer ID
  - Name, Email, Role
  - Course and Subjects
  - Active/Inactive status
- Trainer addedOn time and admin ID are auto-stored
  ![]

### 👩‍🏫 Trainer Module
- Login using email and trainer ID
- View registered students
- Add new assessments (MCQ, Programming, or both)
- Add paper/questions (manually or via file)
- View assessments and edit/delete them
- View student results (currently static/demo)

---

## 📊 Assessment & Question Management

- Save assessment metadata (name, type, date, duration, createdBy)
- Auto-calculate question types (MCQ, Programming)
- Add questions directly or upload from file
- Validate question distribution before saving
- Associate assessments with trainer and manager (admin)

---

## 📈 Results Dashboard

- Results view includes:
  - Student Name
  - Course
  - Assessment Name
  - Total Marks
  - Obtained Marks  
  *(Static data for now; backend integration planned)*

---

## 🔧 How to Run the Project

### ▶️ Backend (Spring Boot)
1. Open the `BACKEND` folder in Eclipse or IntelliJ
2. Set your MySQL credentials in `application.properties`
3. Run `Lms1Application.java`

### 🌐 Frontend (React)
1. Open the `FRONTEND` folder in VS Code
2. Run:
   ```bash
   npm install
   npm start

---
### 📦 Tech Stack & Dependencies
### Frontend

* React

* Axios

* Bootstrap

* React Router DOM

### Backend

* Spring Boot (Web, JPA)

* MySQL

---

### 🛠️ Future Enhancements
-- Student module with login & test taking ability

-- Live result generation from backend

-- Admin dashboard with trainer management analytics

-- Assessment history tracking

-- File upload validation & formatting

---

👩‍💻 Author
Developed by **Kavya Raavi**

---

## 📸 Screenshots
![landerpage](https://github.com/Sri-kav/LearningManagementSystem/blob/c66cd735f4029a31a9abd4ace7e37e2a9a9aac5c/ss1.png)


![admin login](https://github.com/Sri-kav/LearningManagementSystem/blob/a63f9b2e90bb9a4e4fbb66be208b1a7f844ae96a/ss2.png)


![trainer dashboard](https://github.com/Sri-kav/LearningManagementSystem/blob/a63f9b2e90bb9a4e4fbb66be208b1a7f844ae96a/ss3.png)


![view assessment](https://github.com/Sri-kav/LearningManagementSystem/blob/a63f9b2e90bb9a4e4fbb66be208b1a7f844ae96a/ss4.png)

