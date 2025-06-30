import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JavaFullStack from './JavaFullStack';
import DataScience from './DataScience';
import PowerBI from './PowerBI';
import Database from './Database';
import './StudentDashboard.css';
import PythonFullStack from './PythonFullStack';

function StudentDashboard() {
  const studentData = JSON.parse(localStorage.getItem('studentData')) || { email: 'student@example.com' };
  const studentEmail = studentData.email;
  const firstLetter = studentEmail.charAt(0).toUpperCase();
  const studentPhoto = studentData.photo || `https://ui-avatars.com/api/?name=${firstLetter}`;
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showCourses, setShowCourses] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const renderCourse = () => {
    switch (selectedCourse) {
      case 'Java': return <JavaFullStack />;
      case 'Python': return <PythonFullStack />;
      case 'Data Science': return <DataScience />;
      case 'Power BI': return <PowerBI />;
      case 'Database': return <Database />;
      default: return <h4 className="text-center">Welcome to the Student Dashboard.</h4>;
    }
  };

  return (
    <div className="d-flex">
      <div className="sidebar bg-light p-3">
        <h5 className="sidebar-title text-primary">Student Panel</h5>
        <div>
          <button className="btn btn-outline-primary w-100 text-start mb-2" onClick={() => setShowCourses(!showCourses)}>
            Courses
          </button>
          {showCourses && (
            <ul className="list-unstyled ps-3">
              {['Java', 'Python', 'Data Science', 'Power BI', 'Database'].map(course => (
                <li key={course}>
                  <button
                    className="btn btn-link w-100 text-start"
                    onClick={() => setSelectedCourse(course)}>
                    {course}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="btn btn-outline-success w-100 text-start mb-2">View Trainer</button>
        <button className="btn btn-outline-danger w-100 text-start" onClick={logout}>Logout</button>
      </div>
      <div className="flex-grow-1">
      <nav className="navbar navbar-light bg-light justify-content-end px-4">
          <div className="d-flex align-items-center">
            <img
              src={studentPhoto}
              alt="Profile"
              className="rounded-circle me-2"
              style={{ width: '35px', height: '35px', objectFit: 'cover' }}
            />
            <span>{studentEmail || 'student@example.com'}</span>
          </div>
        </nav>
        <div className="p-4">
          {renderCourse()}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
