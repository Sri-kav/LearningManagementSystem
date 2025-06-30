// StudentLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Make sure this file exists with your styling

function StudentLogin() {
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (studentId.trim() !== '' && email.trim() !== '') {
      localStorage.setItem('studentData', JSON.stringify({ studentId, email }));
      navigate('/student-dashboard');
    } else {
      alert('Please enter both Student ID and Email');
    }
  };

  return (
    <div className="login-container">
      <h2 className="mb-4">Student Login</h2>
      <input
        className="form-control mb-3"
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <input
        className="form-control mb-3"
        type="email"
        placeholder="Email ID"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-primary w-100" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default StudentLogin;

