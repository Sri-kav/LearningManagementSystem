import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/admin/login', {
      email: email,
      employeeId: employeeId,
    });

    const adminData = response.data;
    localStorage.setItem('adminData', JSON.stringify(adminData));
    console.log("✅ Admin logged in:", adminData);
    navigate('/admin-dashboard');

  } catch (error) {
    alert('Invalid credentials');
  }
};


  // Styles
  const containerStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage:'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnmx01k7-YNQwD0S4AlkPx2a7l7n5tWH7LkiOkz7QFl5UV53DgNAGJd_zEuaooJ1763jg&usqp=CAU")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const formStyle = {
    backgroundColor: 'rgba(250, 252, 252, 0.3)',
    padding: '40px 30px',
    borderRadius: '12px',
    boxShadow: '0 4px 25px rgba(0,0,0,0.15)',
    width: '320px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headingStyle = {
    marginBottom: '25px',
    textAlign: 'center',
    color: '#333',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    color: '#555',
    fontSize: '14px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    marginBottom: '20px',
    borderRadius: '6px',
    border: '1.5px solid #ccc',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  const inputFocusStyle = {
    borderColor: '#007BFF',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '15px',
    fontWeight: '600',
    textAlign: 'center',
  };

  // For input focus styling, we can use React state or inline onFocus/onBlur.
  // For simplicity, I will skip that here, but you can add it if you want.

  return (
    <div style={containerStyle}>
      <form
        style={formStyle}
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h2 style={headingStyle}>Admin Login</h2>

        <label htmlFor="email" style={labelStyle}>
          Email
        </label>
        <input
          style={inputStyle}
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="employeeId" style={labelStyle}>
          Employee ID
        </label>
        <input
          style={inputStyle}
          type="password"
          id="employeeId"
          placeholder="Enter your Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />

        {error && <p style={errorStyle}>{error}</p>}

        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007BFF')}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
