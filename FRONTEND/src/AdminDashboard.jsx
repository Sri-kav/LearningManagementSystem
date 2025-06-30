import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const adminData = JSON.parse(localStorage.getItem('adminData')) || { email: 'admin@example.com' , employeeId: 'EMP000' };
  const adminEmail = adminData.email;
  const adminEmployeeId = adminData.employeeId;
  const firstLetter = adminEmail.charAt(0).toUpperCase();
  const adminPhoto = adminData.photo || `https://ui-avatars.com/api/?name=${firstLetter}`;

  const [activeTab, setActiveTab] = useState('dashboard');

  const initialTrainerForm = {
    id: null,
    trainerId: '',
    name: '',
    email: '',
    role: '',
    status: 'active',
    course: '',
    subject: '',
    addedOn: '',
    adminId: adminEmployeeId,
  };

  const [trainerForm, setTrainerForm] = useState(initialTrainerForm);
  const [trainers, setTrainers] = useState([]);

  const courseOptions = ['JavaFullStack', 'PythonFullStack', 'DataScience', 'PowerBI', 'Database'];

  const subjectsMap = {
    JavaFullStack: ['Frontend', 'Backend', 'Database'],
    PythonFullStack: ['Frontend', 'Backend', 'Database'],
    DataScience: ['Machine Learning', 'Python', 'Database'],
    PowerBI: ['Frontend', 'Backend', 'Database'],
    Database: ['Frontend', 'Backend', 'Database'],
  };

  const [subjectOptions, setSubjectOptions] = useState([]);

  useEffect(() => {
    // Fetch all trainers on component load or when activeTab changes to viewTrainer
    if (activeTab === 'viewTrainer') {
      fetchTrainers();
    }
  }, [activeTab]);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/trainers');
      setTrainers(response.data);
    } catch (error) {
      console.error('Error fetching trainers:', error);
      alert('Failed to fetch trainers from server.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'course') {
      setSubjectOptions(subjectsMap[value] || []);
      setTrainerForm((prev) => ({
        ...prev,
        course: value,
        subject: '',
      }));
    } else {
      setTrainerForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTrainerSubmit = async (e) => {
  e.preventDefault();

  const { trainerId, name, email, role, status, course, subject, id } = trainerForm;

  if (!trainerId || !name || !email || !role || !status || !course || !subject) {
    alert('Please fill all fields.');
    return;
  }

  const payload = {
    ...trainerForm,
    addedOn: new Date().toISOString(),
    admin: {
    employeeId: adminEmployeeId // ✅ Embed inside an admin object
  }
  };

  try {
    if (id !== null) {
      await axios.put(`http://localhost:8080/api/trainers/${trainerForm.trainerId}`, payload);
      alert('Trainer updated successfully!');
    } else {
      await axios.post('http://localhost:8080/api/trainers', payload);
      alert('Trainer added successfully!');
    }

    setTrainerForm({ ...initialTrainerForm, adminId: adminEmployeeId });
    setSubjectOptions([]);
    setActiveTab('viewTrainer');
    fetchTrainers();
  } catch (error) {
    console.error('Error submitting trainer:', error.response?.data || error.message);
    alert('Failed to submit trainer data.');
  }
};


  const handleCancel = () => {
    setTrainerForm({ ...initialTrainerForm, adminId: adminEmployeeId });
    setSubjectOptions([]);
    setActiveTab('dashboard');
  };

  const handleDelete = async (trainerId) => {
  if (window.confirm("Are you sure you want to delete this trainer?")) {
    try {
      await axios.delete(`http://localhost:8080/api/trainers/${trainerId}`);
      alert("Trainer deleted successfully!");
      fetchTrainers(); // Refresh list
    } catch (error) {
      console.error("Error deleting trainer:", error.response?.data || error.message);
      alert("Failed to delete trainer.");
    }
  }
};

  const handleEdit = (trainer) => {
    setTrainerForm({
      ...trainer,
      addedOn: trainer.addedOn ? new Date(trainer.addedOn).toLocaleString() : '',
    });
    setSubjectOptions(subjectsMap[trainer.course] || []);
    setActiveTab('addTrainer');
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-light p-4 shadow-sm" style={{ width: '250px', minHeight: '100vh' }}>
        <h4 className="text-primary mb-4">Admin Panel</h4>
        <div className="d-grid gap-2">
          <button
            className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`btn ${activeTab === 'addTrainer' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => {
              setTrainerForm({ ...initialTrainerForm, adminId: adminEmployeeId });
              setSubjectOptions([]);
              setActiveTab('addTrainer');
            }}
          >
            Add Trainer
          </button>
          <button
            className={`btn ${activeTab === 'viewTrainer' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('viewTrainer')}
          >
            View Trainer
          </button>
          <button className="btn btn-outline-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        <nav className="navbar navbar-light bg-light justify-content-end px-4">
          <div className="d-flex align-items-center">
            <img
              src={adminPhoto}
              alt="Profile"
              className="rounded-circle me-2"
              style={{ width: '35px', height: '35px' }}
            />
            <span>{adminEmail}</span>
          </div>
        </nav>

        <div className="flex-grow-1 p-4">
          {activeTab === 'dashboard' && (
            <div className="text-center">
              <h2>Welcome to Admin Dashboard</h2>
              <p className="text-muted">Use the sidebar to manage trainers and more.</p>
            </div>
          )}

          {activeTab === 'addTrainer' && (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
              <div className="card shadow p-4" style={{ minWidth: '400px', maxWidth: '500px', width: '100%' }}>
                <h3 className="mb-4 text-center text-primary">
                  {trainerForm.id ? 'Edit Trainer' : 'Add Trainer'}
                </h3>
                <form onSubmit={handleTrainerSubmit}>
                  {/* Input fields here (Trainer ID, Name, Email, etc.) */}
                  <div className="mb-3">
                    <label>Trainer ID</label>
                    <input
                      type="text"
                      name="trainerId"
                      value={trainerForm.trainerId}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Trainer ID"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={trainerForm.name}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Trainer Name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={trainerForm.email}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Trainer Email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Role</label>
                    <input
                      type="text"
                      name="role"
                      value={trainerForm.role}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Role"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Status</label>
                    <select
                      name="status"
                      value={trainerForm.status}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>Course</label>
                    <select
                      name="course"
                      value={trainerForm.course}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Course</option>
                      {courseOptions.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>Subject</label>
                    <select
                      name="subject"
                      value={trainerForm.subject}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                      disabled={!trainerForm.course}
                    >
                      <option value="">Select Subject</option>
                      {subjectOptions.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3 text-center">
                    <button type="submit" className="btn btn-primary me-2">
                      {trainerForm.id ? 'Update' : 'Add'}
                    </button>
                    <button type="button" onClick={handleCancel} className="btn btn-secondary">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'viewTrainer' && (
            <div>
              <h3>Trainers List</h3>
              {trainers.length === 0 ? (
                <p>No trainers found.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead className="table-primary">
                      <tr>
                        <th>Trainer ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Course</th>
                        <th>Subject</th>
                        <th>Added On</th>
                        <th>Admin ID</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainers.map((trainer) => (
                        <tr key={trainer.id}>
                          <td>{trainer.trainerId}</td>
                          <td>{trainer.name}</td>
                          <td>{trainer.email}</td>
                          <td>{trainer.role}</td>
                          <td>{trainer.status}</td>
                          <td>{trainer.course}</td>
                          <td>{trainer.subject}</td>
                          <td>{new Date(trainer.addedOn).toLocaleString()}</td>
                          <td>{adminData.employeeId}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-info me-2"
                              onClick={() => handleEdit(trainer)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(trainer.trainerId)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
   
  );
};

export default AdminDashboard;
