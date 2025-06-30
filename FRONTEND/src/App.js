// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import AdminLogin from './AdminLogin';
import TrainerLogin from './TrainerLogin';
import StudentLogin from './StudentLogin';
import AdminDashboard from './AdminDashboard';
import TrainerDashboard from './TrainerDashboard';
import StudentDashboard from './StudentDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/trainer-login" element={<TrainerLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
