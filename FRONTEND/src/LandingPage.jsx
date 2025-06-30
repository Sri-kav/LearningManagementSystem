import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  const backgroundStyle = {
    minHeight: '100vh',
    background: 'url(https://t3.ftcdn.net/jpg/04/00/77/64/360_F_400776431_5JxdDYRr1mn9yISiUFMPcLtLp3zt6NA1.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
  };

  const navbarStyle = {
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
  };

  // const buttonStyle = {
  //   fontWeight: 'bold',
  //   padding: '0.5rem 1rem',
  // };

  // const headingStyle = {
  //   flex: 1,
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   fontSize: '2.5rem',
  //   fontWeight: 'bold',
  //   color: '#1e3a8a',
    
  // };

  return (
    <div style={backgroundStyle}>
      
      {/* Navbar with login buttons */}
      <div style={navbarStyle}>
        
        {/* Navbar */}
      <nav className="navbar navbar-light bg-light px-4 d-flex justify-content-between align-items-center fixed-top shadow">
        {/* Left side - Logo and App Name */}
        <div className="d-flex align-items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf-VN-L067Lv5kv8aAt46UBPrDmltkSvCS8LDdbKmNDjNbCNnFCwqfMka5eS1Dp24Sjoo&usqp=CAU"
            alt="Kapil IT Logo"
            style={{ width: '35px', height: '35px', marginRight: '10px' }}
          />
          <span style={{ fontWeight: 'bold', fontSize: '1.50rem', color: 'orange' , fontFamily:'cursive'}}>
            Kapil <span style={{ fontWeight: 'bold', fontSize: '1rem', color: 'black' }}>IT Skill Hub</span>
          </span>
        </div>

        {/* Right side - Login Buttons */}
        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={() => navigate('/admin-login')}>
            Admin Login
          </button>
          <button className="btn btn-success" onClick={() => navigate('/trainer-login')}>
            Trainer Login
          </button>
          <button className="btn btn-warning" onClick={() => navigate('/student-login')}>
            Student Login
          </button>
        </div>
      </nav>
      </div>

      {/* Centered Page Title */}
      <div >
        <p style={{ fontWeight: 'bold', fontSize: '2.50rem', flex: 1, display: 'flex',alignItems: 'center',color: '#1e3a8a', marginTop:'250px',marginLeft:'200px'}}>Learning Management System</p><br/>
        <div style={{marginLeft:'250px', color:'purple'}}>
        <p>OneYes Academy is a massive open online course provider, and its </p>
        <p>learning experience arranges cousework into a series of modules and</p>
        <p>lessons that can include videos, text notes, and assessments tests</p>
        </div>
      </div>
      
    </div>
  );
}

export default LandingPage;
