import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

function TrainerLogin() {
  const [trainerId, setTrainerId] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
  if (!trainerId || !email) {
    alert('Please enter both Trainer ID and Email.');
    return;
  }

  try {
    const response = await axios.post('http://localhost:8080/api/auth/trainer/login', {
      email: email,
      trainerId: trainerId, // ✅ use correct field
    });

    console.log("Login Success - Trainer Data:", response.data);
      // ✅ Save token from backend (add this line)
    localStorage.setItem("token", response.data.token);

    localStorage.setItem("trainerData", JSON.stringify({
      trainerId: response.data.trainerId,
      name: response.data.name,     
      email: response.data.email,
      adminId: response.data.adminId, // ✅ correctly flattened field
      course: response.data.course,       // ✅ Add this
      subject: response.data.subject      // ✅ Optional: Add this too
    }));

     console.log("Saved trainerData:", JSON.parse(localStorage.getItem("trainerData")));


    navigate('/trainer-dashboard');
  } catch (err) {
    console.error('Login failed', err);
    setError('Invalid Trainer ID or Email.');
  }
};
  return (
    <div className="login-container">
      <h2 className="text-center mb-4">Trainer Login</h2>
      <div className="form-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Trainer ID"
          value={trainerId}
          onChange={(e) => setTrainerId(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {error && <p className="text-danger">{error}</p>}
      <div className="d-grid">
        <button className="btn btn-success" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default TrainerLogin;
