import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TrainerDashboard = () => {
  const navigate = useNavigate();
  // const trainerData = JSON.parse(localStorage.getItem('trainerData')) || { email: 'trainer@example.com' };
  const [trainerData, setTrainerData] = useState(() =>
  JSON.parse(localStorage.getItem('trainerData')) || { email: 'trainer@example.com' }
);

  const trainerEmail = trainerData.email;
  const firstLetter = trainerEmail.charAt(0).toUpperCase();
  const trainerPhoto = trainerData.photo || `https://ui-avatars.com/api/?name=${firstLetter}`;

  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [assessmentInfo, setAssessmentInfo] = useState({
    title: '',
    type: '',
    numQuestions: '',
    mcqCount: '',
    progCount: ''
  });
  const trainerId = trainerData?.trainerId; // ✅ Correct
  console.log("Fetched trainerId from localStorage:", trainerId);
  const createdBy = trainerData?.email;
  const managerId = trainerData?.adminId;
  const adminEmployeeId = trainerData?.adminId;

  const [isViewing, setIsViewing] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [error, setError] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showAddPaper, setShowAddPaper] = useState(false);
  const [newQuestions, setNewQuestions] = useState({
    title: '',
    type: '',
    totalQuestions: '',
    mcqQuestions: '',
    programmingQuestions: '',
  });
  const [editingAssessment, setEditingAssessment] = useState(null);
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [progQuestions, setProgQuestions] = useState([]);
   
  const [mcqCount, setMcqCount] = useState(0);
  const [progCount, setProgCount] = useState(0);

  const [questionFiles, setQuestionFiles] = useState([]);

  const adminData=JSON.parse(localStorage.getItem("adminData"));

const fetchAssessments = async () => {
  const trainerId = JSON.parse(localStorage.getItem("trainerData")).trainerId;


  try {
    const res = await axios.get(`http://localhost:8080/api/assessments/trainer/${trainerId}`);;
    const assessmentsFromBackend = res.data.map(a => ({
      id: a.id,
      title: a.assessmentName,
      type: a.assessmentType,
      numQuestions: a.numberOfQuestions,
      mcqCount: a.numberOfMcq,
      progCount: a.numberOfPrograms,
      questions: [],
      createdBy: a.createdBy,
      addedOn: new Date(a.addedOn).toLocaleDateString('en-GB'),
      status: a.assessmentStatus
    }));
    setAssessments(assessmentsFromBackend);
  } catch (err) {
    console.error("Failed to fetch assessments:", err);
  }
};

const [studentData, setStudentData] = useState([]);
const [showResults, setShowResults] = useState(false);

// Hardcoded assessment results
const resultData = [
  {
    studentId: "S001",
    assessmentName: "Java Basics Quiz",
    totalMarks: 50,
    obtainedMarks: 45
  },
  {
    studentId: "S002",
    assessmentName: "Python Midterm",
    totalMarks: 60,
    obtainedMarks: 52
  },
  {
    studentId: "S003",
    assessmentName: "Data Science Intro Test",
    totalMarks: 40,
    obtainedMarks: 35
  }
];

// Combine student info with result info
const mergedResults = studentData.map((student) => {
  const result = resultData.find(r => r.studentId === student.studentId);
  return {
    ...student,
    ...result
  };
});

useEffect(() => {
  fetch('/studentdata.json')
    .then((res) => res.json())
    .then((data) => setStudentData(data))
    .catch((err) => console.error('Error loading student data:', err));
}, []);


  useEffect(() => {
  fetchAssessments();
}, []);


 // to fetch the student data
  useEffect(() => {
    fetch('/studentdata.json')
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error('Failed to load students:', err));
  }, []);

  //fetching the assessment details
useEffect(() => {
  const trainerId = trainerData?.trainerId;

  if (activeTab === 'viewAssessment' && trainerId) {
    fetch(`http://localhost:8080/api/assessments/trainer/${trainerId}`)
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((item) => ({
          id: item.id || item.assessmentId, // ✅ Ensure `id` exists
          title: item.assessmentName,
          type: item.assessmentType,
          numQuestions: item.numberOfQuestions,
          mcqCount: item.numberOfMcq,
          progCount: item.numberOfPrograms,
          status: item.assessmentStatus,
          createdBy: item.trainerEmail || item.createdBy || "Unknown",
          addedOn: item.addedOn
            ? new Date(item.addedOn).toLocaleDateString('en-GB')
            : "Unknown",
        }));

        setAssessments(mapped);
        console.log("Assessments array:", mapped); // ✅ See if `id` is present
      })
      .catch(err => console.error('Error fetching assessments:', err));
  }
}, [activeTab, trainerData]);

//fetching 
// useEffect(() => {
//   axios.get(`http://localhost:8080/api/assessments/trainer/${trainerId}`)
//     .then((res) => {
//       const normalized = res.data.map((a) => ({
//         id: a.id,
//         title: a.assessmentName,
//         type: a.assessmentType,
//         numQuestions: a.numberOfQuestions,
//         mcqCount: a.numberOfMcq,
//         progCount: a.numberOfPrograms,
//         status: a.assessmentStatus,
//         createdBy: a.createdBy,
//         addedOn: new Date(a.addedOn).toLocaleDateString(), // optional formatting
//       }));
//       setAssessments(normalized); // ✅ Now each object has an `id`
//       console.log("Assessments array:", normalized); // ✅ Add here
//     })
//     .catch((err) => console.error(err));
// }, []);


  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

const handleAssessmentChange = (e) => {
  const { name, value } = e.target;
  setAssessmentInfo((prev) => ({
    ...prev,
    [name]: name === "numQuestions" || name === "mcqCount" || name === "progCount" ? parseInt(value) : value
  }));
};

 
 const handleAssessmentAdd = async () => {
  const { title, type, numQuestions, mcqCount, progCount } = assessmentInfo;

  if (!title || !type || !numQuestions) {
    setError('Please fill in all required fields.');
    return;
  }

  let numberOfMcq = 0;
  let numberOfPrograms = 0;

  if (type === 'Both') {
    if (!mcqCount || !progCount) {
      setError('Please enter both MCQ and Programming question counts.');
      return;
    }

    const total = parseInt(mcqCount) + parseInt(progCount);
    if (total !== parseInt(numQuestions)) {
      setError(`Total of MCQ and Programming questions must equal ${numQuestions}.`);
      return;
    }

    numberOfMcq = parseInt(mcqCount);
    numberOfPrograms = parseInt(progCount);
  } else if (type === 'MCQ') {
    numberOfMcq = parseInt(numQuestions);
    numberOfPrograms = 0;
  } else if (type === 'Programming') {
    numberOfPrograms = parseInt(numQuestions);
    numberOfMcq = 0;
  }

  const trainerData = JSON.parse(localStorage.getItem("trainerData"));

  const payload = {
    trainerId: trainerData.trainerId,
    trainerEmail: trainerData.email,
    adminEmployeeId: trainerData.adminId,
    assessmentType: type,
    numberOfQuestions: parseInt(numQuestions),
    numberOfMcq,
    numberOfPrograms,
    assessmentName: title,
    assessmentStatus: "ACTIVE",
    paperAddedStatus: 0,
    status: true
  };

  try {
    const response = await axios.post("http://localhost:8080/api/assessments/add", payload);
    const saved = response.data;  // has id, addedOn, etc.
     console.log("Saved ID:", saved.id);
    alert("Assessment saved successfully!");

    const newAssessment = {
  id: saved.id,
  title: saved.assessmentName,
  type: saved.assessmentType,
  numQuestions: saved.numberOfQuestions,
  mcqCount: saved.numberOfMcq,
  progCount: saved.numberOfPrograms,
  questions: [],
  createdBy: saved.createdBy,
  addedOn: new Date(saved.addedOn).toLocaleDateString('en-GB'),
  status: saved.assessmentStatus
};
    if (isEditing) {
      const updatedAssessments = [...assessments];
      updatedAssessments[editIndex] = newAssessment;
      setAssessments(updatedAssessments);
    } else {
      setAssessments((prev) => [...prev, newAssessment]);
    }

    setAssessmentInfo({ title: '', type: '', numQuestions: '', mcqCount: '', progCount: '' });
    setIsEditing(false);
    setEditIndex(null);
    setError('');
    setActiveTab('viewAssessment');

  } catch (error) {
    console.error("Error saving assessment:", error);
    setError("Failed to save assessment.");
  }
};

const handleAssessmentEdit = async (idx) => {
  const selected = assessments[idx];

  try {
    console.log("Fetching assessment paper for ID:", selected);
    const res = await axios.get(`http://localhost:8080/api/assessment-paper/by-detail-id/${selected.id}`);
    const fullPaper = res.data;

    console.log("Fetched paper with questions:", fullPaper);

    let questions = fullPaper.questions || [];

    if (typeof questions === "string") {
      try {
        questions = JSON.parse(questions);
      } catch (e) {
        console.error("Failed to parse questions JSON:", e);
        questions = [];
      }
    }

    const mcqs = questions.filter(q => q.type === "MCQ");
    const progs = questions.filter(q => q.type === "Programming");

//    setEditingAssessment({
//   ...selected,
//   assessmentType: selected.assessmentType || '',
//   assessmentName: selected.assessmentName || '',
//   numberOfQuestions: selected.numberOfQuestions || mcqs.length + progs.length,
//   numberOfMcq: selected.numberOfMcq || mcqs.length,
//   numberOfPrograms: selected.numberOfPrograms || progs.length,
//   assessmentStatus: selected.assessmentStatus || 'PENDING',
//   paperAddedStatus: selected.paperAddedStatus ?? 0,
//   status: selected.status || 'ACTIVE'
// });
const combinedQuestions = [
  ...mcqs.map((mcq) => ({
    question: mcq.question,
    type: "MCQ",
    options: mcq.options,
    correctAnswer: mcq.correctAnswer
  })),
  ...progs.map((prog) => ({
    question: prog.question,
    type: "Programming",
    options: [], // or ["N/A"] if needed
    correctAnswer: prog.correctAnswer || "N/A"
  }))
];

setEditingAssessment({
  ...selected,
  title: selected.assessmentName || selected.title || 'Untitled Assessment',
 type: selected.assessmentType || selected.type || 'MCQ',
  numQuestions: selected.numberOfQuestions || mcqs.length + progs.length,
  mcqCount: selected.numberOfMcq || mcqs.length,
  progCount: selected.numberOfPrograms || progs.length,
  assessmentStatus: selected.assessmentStatus || 'PENDING',
  paperAddedStatus: selected.paperAddedStatus ?? 0,
  status: selected.status ?? true,
  questions: combinedQuestions,

  // ✅ New fields needed for AssessmentPaperDTO
  assessmentTime: selected.assessmentTime || '',         // If available
  assessmentDuration: selected.assessmentDuration || '', // If available
  questionFiles: selected.questionFiles || '',
 courseName: trainerData?.course || '',
createdBy: selected.createdBy || adminEmployeeId || '',
  // addedOn: selected.addedOn || new Date().toISOString(),
});

    setMcqQuestions(mcqs);
    setProgQuestions(progs);
    setMcqCount(mcqs.length);
    setProgCount(progs.length);
    setActiveTab("editAssessment");
  } catch (error) {
    console.error("Failed to fetch assessment paper:", error);
    alert("Could not load questions for editing.");
  }
};


  // Open Add Paper tab
const handleAddPaper = (assessment) => {
    console.log("Assessment passed to Add Paper:", assessment);
  const completeAssessment = {
    id: assessment.id, // ✅ Explicitly ensure `id` is present
    title: assessment.title,
    type: assessment.type,
    numQuestions: assessment.numQuestions,
    mcqCount: assessment.mcqCount,
    progCount: assessment.progCount,
    date: assessment.date || new Date().toISOString().split('T')[0],
    time: assessment.time || "10:00",
    duration: assessment.duration || "1 hour",
  };
   console.log("✅ Selected assessment set with ID:", completeAssessment.id);

  setSelectedAssessment(completeAssessment);

  const initialQuestions = [];
  for (let i = 0; i < assessment.numQuestions; i++) {
    initialQuestions.push({
      question: '',
      options: assessment.type !== 'Programming' ? ['', '', '', ''] : [],
      correctAnswer: '',
      type: i < assessment.mcqCount ? 'MCQ' : 'Programming',
    });
  }

  setQuestions(initialQuestions);
  setActiveTab('addPaper');
};


  // Handle changes in questions inputs
  const handleQuestionChange = (index, field, value, optionIndex = null) => {
    const updatedQuestions = [...questions];
    if (field === 'option') {
      updatedQuestions[index].options[optionIndex] = value;
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuestions(updatedQuestions);
  };
console.log(JSON.parse(localStorage.getItem("trainerData")));

  // Save questions to assessment
const handleSaveQuestions = async () => {
  const trainerData = JSON.parse(localStorage.getItem("trainerData"));
  const adminId = trainerData?.adminId;

const adminData = JSON.parse(localStorage.getItem("adminData"));
const courseName = trainerData?.course || "N/A"; 

    console.log("Admin data from localStorage:", adminData); 
    console.log("adminId is ====>"+adminId);

  //console.log("Selected Assessment:", selectedAssessment);
  console.log("Trainer ID in save function:", trainerId);
  console.log("(*)Manager ID being sent:", adminId);
  if (!selectedAssessment) {
    alert("No assessment selected");
    return;
  }
const addedOnDate = new Date().toISOString().split('T')[0];

const payload = {
  assessmentDetailsId: selectedAssessment.id,
  assessmentDate: selectedAssessment.date || new Date().toISOString().split('T')[0],
  assessmentTime: selectedAssessment.time || "10:00",
  assessmentDuration: selectedAssessment.duration || "60",  // ✅ Fixed here
  questions: questions,
  questionFiles:
  questionFiles.length > 0
    ? questionFiles.map(file => file.name)
    : null,
     // ✅ Fixed here
  courseName: courseName,
  assessmentName: selectedAssessment.title,
  createdBy: trainerData?.email || "Unknown",
  addedOn: addedOnDate,  // ✅ Only date, matches LocalDate on backend
  status: true,
  adminId: adminId,
  trainerId: trainerId,
};
  console.log("📤 Submitting payload:", payload);
  console.log("Payload:", payload);
  console.log("Submitting assessment paper DTO:", payload);
  console.log("Trainer course in payload:", trainerData.course);

  try {
    const res = await axios.post('http://localhost:8080/api/assessment-paper/add', payload);
    alert("Assessment paper saved successfully!");
    setQuestions([]);
    setSelectedAssessment(null);
    setActiveTab('viewAssessment');
  } catch (err) {
    if (err.response && err.response.status === 409) {
    // 💥 Paper already exists
    alert("❌ A paper already exists for this assessment. You can't add another.");
  } else {
    console.error("❌ Error saving assessment paper:", err);
    alert("Failed to save assessment paper. Please try again.");
  }
  }
};

  // Cancel adding paper
  const handleCancel = () => {
    setSelectedAssessment(null);
    setQuestions([]);
    setActiveTab('viewAssessment');
  };


 const handleAssessmentDelete = async (index, assessmentId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this assessment?");
  if (!confirmDelete) return;

  const trainerId = JSON.parse(localStorage.getItem("trainerData")).trainerId;
  console.log("Deleting assessment ID:", assessmentId);
  console.log("Trainer ID:", trainerId);

  try {
  await axios.delete(`http://localhost:8080/api/assessments/delete/${assessmentId}/trainer/${trainerId}`);
    setAssessments(prev => prev.filter((_, i) => i !== index));
    alert("Deleted successfully!");
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Failed to delete assessment.");
  }
};
const handleView = async (assessment) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/assessment-paper/by-assessment/${assessment.id}`
    );

    let questions = [];

    if (response.data?.questions) {
      if (typeof response.data.questions === 'string') {
        try {
          questions = JSON.parse(response.data.questions);
        } catch (parseErr) {
          console.error("Failed to parse questions JSON:", parseErr);
        }
      } else if (Array.isArray(response.data.questions)) {
        questions = response.data.questions;
      }
    }

    const fullAssessment = {
      ...assessment,
      questions,
    };

    setSelectedAssessment(fullAssessment);
    setIsViewing(true);

    console.log("Selected Assessment with questions:", fullAssessment);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      const fullAssessment = {
        ...assessment,
        questions: [],
      };
      setSelectedAssessment(fullAssessment);
      setIsViewing(true);
      console.warn("No assessment paper found for this assessment.");
    } else {
      console.error("Error fetching questions:", error);
    }
  }
};


const handleBack = () => {
  setIsViewing(false);
  setSelectedAssessment(null);
};
const handleEditSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const trainerData = JSON.parse(localStorage.getItem("trainerData")) || {};
  const trainerId = trainerData?.trainerId || '';

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // "YYYY-MM-DD"

  try {
    // ✅ Merge mcqQuestions and progQuestions into a unified questions array
    const mergedQuestions = [
      ...mcqQuestions.map((q) => ({ ...q, type: 'MCQ' })),
      ...progQuestions.map((q) => ({ ...q, type: 'Programming' })),
    ];

    // ✅ Update editingAssessment.questions before cleaning
    const updatedAssessment = {
      ...editingAssessment,
      questions: mergedQuestions,
      id: editingAssessment.id,
      trainerEmail,
      adminEmployeeId,
      assessmentType: editingAssessment.assessmentType?.trim() || 'MCQ',
      numberOfQuestions: parseInt(editingAssessment.numQuestions) || 0,
      numberOfMcq: parseInt(editingAssessment.mcqCount) || 0,
      numberOfPrograms: parseInt(editingAssessment.progCount) || 0,
      assessmentName: editingAssessment.title?.trim() || 'Untitled Assessment',
      assessmentStatus: editingAssessment.assessmentStatus?.trim() || 'ACTIVE',
      paperAddedStatus: editingAssessment.paperAddedStatus ?? 0,
      status: !!editingAssessment.status,
    };

    console.log("Payload to update:", updatedAssessment);

    // 1. Update Assessment Metadata
    const response = await axios.put(
      `http://localhost:8080/api/assessments/update/${editingAssessment.id}`,
      updatedAssessment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Assessment updated:", response.data);

    // ✅ Clean and filter merged questions
    const cleanedQuestions = mergedQuestions
      .map((q) => {
        if (q.type === 'MCQ') {
          return {
            ...q,
            question: q.question?.trim() || "",
            options: q.options?.map(opt => opt.trim()) || [],
            correctAnswer: q.correctAnswer?.trim() || ""
          };
        } else {
          return {
            ...q,
            question: q.question?.trim() || "",
            correctAnswer: q.correctAnswer?.trim() || ""
          };
        }
      })
      .filter((q) => {
        if (q.type === 'MCQ') {
          return (
            q.question &&
            Array.isArray(q.options) &&
            q.options.length === 4 &&
            q.options.every(opt => opt) &&
            q.correctAnswer
          );
        } else {
          return q.question && q.correctAnswer;
        }
      });

    if (cleanedQuestions.length === 0) {
      alert("Please add at least one valid question before submitting.");
      return;
    }

    // 2. Update Assessment Paper
    const updatedPaper = {
      assessmentDetailsId: editingAssessment.id,
      assessmentDate: new Date().toISOString().split("T")[0],
      assessmentTime: editingAssessment.assessmentTime || "10:00",
      assessmentDuration: editingAssessment.assessmentDuration || 60,
      questions: cleanedQuestions,
      questionFiles: Array.isArray(editingAssessment.questionFiles)
        ? editingAssessment.questionFiles.map(file =>
            typeof file === 'string'
              ? file
              : file?.name || ''
          ).filter(name => name !== '')
        : [],
      courseName: editingAssessment.courseName || "",
      assessmentName: editingAssessment.title?.trim() || "Untitled Assessment",
      createdBy: adminEmployeeId,
         addedOn: formattedDate,
      status: !!editingAssessment.status,
      trainerId: trainerId,
    };

    console.log("📦 Final updatedPaper payload:", JSON.stringify(updatedPaper, null, 2));


    const paperResponse = await axios.put(
      `http://localhost:8080/api/assessment-paper/update-by-detail-id/${editingAssessment.id}`,
      updatedPaper,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Assessment paper updated:", paperResponse.data);

    // 3. Refresh & Reset
    await fetchAssessments();
    setIsEditing(false);
    setEditingAssessment(null);
    alert("Assessment updated successfully!");
    setActiveTab("viewAssessment");
  } catch (error) {
    console.error("Error updating assessment or paper:", error);
    setError("Failed to update assessment or paper.");
  }
};

  return (
    <div className="d-flex">
      <div className="sidebar bg-light p-3 shadow-sm">
        <h5 className="text-primary mb-4">Trainer Panel</h5>
        <ul className="list-unstyled">
          <li><button className="btn btn-outline-primary w-100 mb-2" onClick={() => setActiveTab('dashboard')}>Dashboard</button></li>
          <li><button className="btn btn-outline-info w-100 mb-2" onClick={() => setActiveTab('viewStudents')}>View Students</button></li>
          <li><button className="btn btn-outline-success w-100 mb-2" onClick={() => setActiveTab('addAssessment')}>Add Assessment</button></li>
          <li><button className="btn btn-outline-warning w-100 mb-2" onClick={() => setActiveTab('viewAssessment')}>View Assessment</button></li>
          <li><button className="btn btn-outline-secondary w-100 mb-2" onClick={() => setActiveTab('viewResults')}>View Results</button></li>
          <li><button className="btn btn-outline-danger w-100" onClick={logout}>Logout</button></li>
        </ul>
      </div>

      <div className="flex-grow-1">
        <nav className="navbar navbar-light bg-light justify-content-end px-4">
          <div className="d-flex align-items-center">
            <img src={trainerPhoto} alt="Profile" className="rounded-circle me-2" style={{ width: '35px', height: '35px' }} />
            <span>{trainerEmail}</span>
          </div>
        </nav>

        <div className="container mt-4">
          {activeTab === 'dashboard' && (
            <div className="text-center">
              <h3>Welcome to Trainer Dashboard</h3>
              <p>Use the sidebar to navigate through your dashboard.</p>
            </div>
          )}

          {activeTab === 'viewStudents' && (
            <div>
              <h3>Students List</h3>
              <table className="table table-bordered mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Student ID</th>
                    <th>Course</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length === 0 ? (
                    <tr><td colSpan="3">No student data available.</td></tr>
                  ) : (
                    students.map((student, index) => (
                      <tr key={index}>
                        <td>{student.name}</td>
                        <td>{student.studentId}</td>
                        <td>{student.course}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'addAssessment' && (
            <div>
              <h3>{isEditing ? 'Update Assessment' : 'Add Assessment'}</h3>
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="form-group mt-3">
                <label>Assessment Name</label>
                <input type="text" name="title" className="form-control" value={assessmentInfo.title} onChange={handleAssessmentChange} />
              </div>

              <div className="form-group mt-3">
                <label>Assessment Type</label>
                <select name="type" className="form-control" value={assessmentInfo.type} onChange={handleAssessmentChange}>
                  <option value="">Select Type</option>
                  <option value="MCQ">MCQ</option>
                  <option value="Programming">Programming</option>
                  <option value="Both">Both</option>
                </select>
              </div>

              <div className="form-group mt-3">
                <label>Number of Questions</label>
                <input type="number" name="numQuestions" className="form-control" min="1" value={assessmentInfo.numQuestions} onChange={handleAssessmentChange} />
              </div>

              {assessmentInfo.type === 'Both' && (
                <div className="row">
                  <div className="form-group col-md-6">
                    <label>Number of MCQs</label>
                    <input type="number" name="mcqCount" className="form-control" min="0" value={assessmentInfo.mcqCount} onChange={handleAssessmentChange} />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Number of Programming Questions</label>
                    <input type="number" name="progCount" className="form-control" min="0" value={assessmentInfo.progCount} onChange={handleAssessmentChange} />
                  </div>
                </div>
              )}

              <button className="btn btn-primary mt-4" onClick={handleAssessmentAdd}>
                {isEditing ? 'Update Assessment' : 'Add Assessment'}
              </button>
            </div>
          )}

          {activeTab === 'viewAssessment' && (
  <div>
    {isViewing && selectedAssessment ? (
      <div>
        <button className="btn btn-sm btn-secondary mb-3" onClick={handleBack}>← Back to Assessments</button>
        <div className="card p-3">
          <h5>Assessment: {selectedAssessment.title || selectedAssessment.assessmentName}</h5>

          {/* Handle and display questions safely */}
          {(() => {
  let questions = [];

  try {
    const rawQuestions = selectedAssessment.questions;
    if (typeof rawQuestions === 'string') {
      questions = JSON.parse(rawQuestions);
    } else if (Array.isArray(rawQuestions)) {
      questions = rawQuestions;
    }
  } catch (err) {
    console.error("Invalid JSON in questions:", err);
    return <p>Invalid question format.</p>;
  }

  if (!questions || questions.length === 0) {
    return <p>No assessment paper found for this assessment.</p>;
  }

  return questions.map((q, i) => (
    <div key={i} className="mb-3">
      <p><strong>Q{i + 1} ({q.type}):</strong> {q.question}</p>
      {q.type === 'MCQ' ? (
        <>
          <p><strong>Options:</strong></p>
          <ul>
            {(Array.isArray(q.options) ? q.options : []).map((opt, idx) => (
              <li key={idx}>
                {String.fromCharCode(97 + idx)}) {opt}
              </li>
            ))}
          </ul>
          <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
        </>
      ) : (
        <p><strong>Expected Output:</strong> {q.correctAnswer}</p>
      )}
    </div>
  ));
})()}
  </div>
      </div>
    ) : (
      // --- Assessment Table Section ---
      <div>
        <h3>All Assessments</h3>
        {assessments.length === 0 ? (
          <p>No assessments added yet.</p>
        ) : (
          <table className="table table-bordered mt-3">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Total Questions</th>
                <th>MCQs</th>
                <th>Programs</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Added On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((a, idx) => (
                <tr key={a.id || idx}>
                  <td>{a.title}</td>
                  <td>{a.type}</td>
                  <td>{a.numQuestions}</td>
                  <td>{a.mcqCount}</td>
                  <td>{a.progCount}</td>
                  <td>{a.status}</td>
                  <td>{a.createdBy}</td>
                  <td>{a.addedOn}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleAssessmentEdit(idx)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger me-2" onClick={() => handleAssessmentDelete(idx, a.id)}>Delete</button>
                    <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleAddPaper(a)}>Add</button>
                    <button className="btn btn-sm btn-outline-warning" onClick={() => handleView(a)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )}
  </div>
)}


          {activeTab === 'addPaper' && (
  <div>
    <h3>Add Questions to Assessment: {selectedAssessment?.title}</h3>
    <form onSubmit={(e) => { e.preventDefault(); handleSaveQuestions(); }}>
      
      {/* Assessment Date */}
      <div className="mb-3">
        <label>Assessment Date</label>
        <input
          type="date"
          className="form-control"
          value={selectedAssessment?.date || ''}
          onChange={(e) =>
            setSelectedAssessment({ ...selectedAssessment, date: e.target.value })
          }
          required
        />
      </div>

      {/* Assessment Time */}
      <div className="mb-3">
        <label>Assessment Time</label>
        <input
          type="time"
          className="form-control"
          value={selectedAssessment?.time || ''}
          onChange={(e) =>
            setSelectedAssessment({ ...selectedAssessment, time: e.target.value })
          }
          required
        />
      </div>

      {/* Assessment Duration */}
      <div className="mb-4">
        <label>Assessment Duration </label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. 60 mins"
          value={selectedAssessment?.duration || ''}
          onChange={(e) =>
            setSelectedAssessment({ ...selectedAssessment, duration: e.target.value })
          }
          required
        />
      </div>
      {questions.map((q, idx) => (
        <div key={idx} className="mb-4 p-3 border rounded">
          <label>Question {idx + 1} ({q.type})</label>
          <input
            type="text"
            className="form-control mb-2"
            value={q.question}
            onChange={(e) => handleQuestionChange(idx, 'question', e.target.value)}
            required
          />
          
          {q.type === 'MCQ' && (
            <div className="ms-3">
              {q.options.map((opt, oidx) => (
                <input
                  key={oidx}
                  type="text"
                  className="form-control mb-1"
                  placeholder={`Option ${oidx + 1}`}
                  value={opt}
                  onChange={(e) => handleQuestionChange(idx, 'option', e.target.value, oidx)}
                  required
                />
              ))}
              <label>Correct Answer</label>
              <input
                type="text"
                className="form-control"
                value={q.correctAnswer}
                onChange={(e) => handleQuestionChange(idx, 'correctAnswer', e.target.value)}
                required
              />
            </div>
          )}

          {q.type === 'Programming' && (
            <div className="ms-3">
              <label>Expected Output / Answer</label>
              <textarea
                className="form-control"
                value={q.correctAnswer}
                onChange={(e) => handleQuestionChange(idx, 'correctAnswer', e.target.value)}
                required
              />
            </div>
          )}
        </div>
      ))}

      <button type="submit" className="btn btn-success me-2">Save Questions</button>
      <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
    </form>
  </div>
)}

{activeTab === 'editAssessment' && editingAssessment && (
  <div>
    <h3>Edit Assessment: {editingAssessment.title}</h3>
    <form onSubmit={handleEditSubmit}>

      {/* Title */}
      <div>
        <label>Assessment Title:</label>
        <input
          type="text"
          value={editingAssessment.title}
          onChange={(e) =>
            setEditingAssessment({ ...editingAssessment, title: e.target.value })
          }
          required
        />
      </div>

      {/* Assessment Type */}
      <div>
        <label>Assessment Type:</label>
        <select
          value={editingAssessment.assessmentType}
          onChange={(e) =>
            setEditingAssessment({ ...editingAssessment, assessmentType: e.target.value })
          }
        >
          <option value="MCQ">MCQ</option>
          <option value="Programming">Programming</option>
          <option value="Both">Both</option>
        </select>
      </div>

      {/* Number of Questions */}
      <div>
        <label>Total Questions:</label>
        <input
          type="number"
          min="0"
          value={editingAssessment.numQuestions}
          onChange={(e) => {
            const newTotal = Number(e.target.value);
            setEditingAssessment((prev) => {
              let newQuestions = [...prev.questions];
              while (newQuestions.length < newTotal) {
                newQuestions.push({
                  question: '',
                  type: prev.type === 'Both'
                    ? (newQuestions.length < prev.mcqCount ? 'MCQ' : 'Programming')
                    : prev.type,
                  options: [],
                  correctAnswer: '',
                });
              }
              if (newQuestions.length > newTotal) {
                newQuestions = newQuestions.slice(0, newTotal);
              }

              return {
                ...prev,
                numQuestions: newTotal,
                questions: newQuestions,
              };
            });
          }}
        />
      </div>

      {/* Number of MCQs */}
      {(editingAssessment.type === 'MCQ' || editingAssessment.type === 'Both') && (
        <div>
          <label>Number of MCQs:</label>
          <input
            type="number"
            min="0"
            value={editingAssessment.mcqCount}
            onChange={(e) => {
              const newMCQCount = Number(e.target.value);
              setEditingAssessment((prev) => {
                let newQuestions = [...prev.questions];
                const progCount = prev.numQuestions - newMCQCount;

                while (newQuestions.length < prev.numQuestions) {
                  newQuestions.push({
                    question: '',
                    type: 'Programming',
                    options: [],
                    correctAnswer: '',
                  });
                }

                newQuestions = newQuestions.map((q, idx) => {
                  if (idx < newMCQCount) {
                    return {
                      ...q,
                      type: 'MCQ',
                      options: q.options.length ? q.options : ['', '', '', ''],
                    };
                  } else {
                    return {
                      ...q,
                      type: 'Programming',
                      options: [],
                    };
                  }
                });

                return {
                  ...prev,
                  mcqCount: newMCQCount,
                  progCount: progCount,
                  questions: newQuestions.slice(0, prev.numQuestions),
                };
              });
            }}
          />
        </div>
      )}

      {/* Number of Programming Questions */}
      {(editingAssessment.type === 'Programming' || editingAssessment.type === 'Both') && (
        <div>
          <label>Number of Programming Questions:</label>
          <input
            type="number"
            min="0"
            value={editingAssessment.progCount}
            onChange={(e) => {
              const newProgCount = Number(e.target.value);
              setEditingAssessment((prev) => {
                const newMCQCount = prev.numQuestions - newProgCount;
                let newQuestions = [...prev.questions];

                while (newQuestions.length < prev.numQuestions) {
                  newQuestions.push({
                    question: '',
                    type: 'Programming',
                    options: [],
                    correctAnswer: '',
                  });
                }

                newQuestions = newQuestions.map((q, idx) => {
                  if (idx < newMCQCount) {
                    return {
                      ...q,
                      type: 'MCQ',
                      options: q.options.length ? q.options : ['', '', '', ''],
                    };
                  } else {
                    return {
                      ...q,
                      type: 'Programming',
                      options: [],
                    };
                  }
                });

                return {
                  ...prev,
                  progCount: newProgCount,
                  mcqCount: newMCQCount,
                  questions: newQuestions.slice(0, prev.numQuestions),
                };
              });
            }}
          />
        </div>
      )}

      <hr />

      {/* MCQ and Programming Question Counts */}
      <div>
        <label>Number of MCQs:</label>
        <input
          type="number"
          value={mcqCount}
          min={0}
          onChange={(e) => {
            const newCount = parseInt(e.target.value);
            setMcqCount(newCount);
            const updated = [...mcqQuestions];
            while (updated.length < newCount) {
              updated.push({ type: 'MCQ', question: '', options: ['', '', '', ''], correctAnswer: '' });
            }
            setMcqQuestions(updated.slice(0, newCount));
          }}
        />
      </div>

      <div>
        <label>Number of Programming Questions:</label>
        <input
          type="number"
          value={progCount}
          min={0}
          onChange={(e) => {
            const newCount = parseInt(e.target.value);
            setProgCount(newCount);
            const updated = [...progQuestions];
            while (updated.length < newCount) {
              updated.push({ type: 'Programming', question: '', correctAnswer: '' });
            }
            setProgQuestions(updated.slice(0, newCount));
          }}
        />
      </div>

      {/* Render MCQ Questions */}
      <h4>MCQ Questions</h4>
      {mcqQuestions.map((q, idx) => (
        <div key={`mcq-${idx}`} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
          <label>Q{idx + 1}:</label>
          <input
            type="text"
            value={q.question}
            onChange={(e) => {
              const updated = [...mcqQuestions];
              updated[idx].question = e.target.value;
              setMcqQuestions(updated);
            }}
          />
          <div>
            {Array(4).fill('').map((_, optIdx) => (
              <input
                key={optIdx}
                value={q.options[optIdx] || ''}
                onChange={(e) => {
                  const updated = [...mcqQuestions];
                  const opts = [...(updated[idx].options || [])];
                  opts[optIdx] = e.target.value;
                  updated[idx].options = opts;
                  setMcqQuestions(updated);
                }}
                placeholder={`Option ${String.fromCharCode(97 + optIdx)})`}
              />
            ))}
          </div>
          <input
            value={q.correctAnswer}
            onChange={(e) => {
              const updated = [...mcqQuestions];
              updated[idx].correctAnswer = e.target.value;
              setMcqQuestions(updated);
            }}
            placeholder="Correct Answer"
          />
        </div>
      ))}

      {/* Render Programming Questions */}
      <h4>Programming Questions</h4>
      {progQuestions.map((q, idx) => (
        <div key={`prog-${idx}`} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
          <label>Q{idx + 1}:</label>
          <input
            type="text"
            value={q.question}
            onChange={(e) => {
              const updated = [...progQuestions];
              updated[idx].question = e.target.value;
              setProgQuestions(updated);
            }}
          />
          <input
            type="text"
            value={q.correctAnswer}
            onChange={(e) => {
              const updated = [...progQuestions];
              updated[idx].correctAnswer = e.target.value;
              setProgQuestions(updated);
            }}
            placeholder="Expected Output"
          />
        </div>
      ))}

      {/* Save and Cancel Buttons */}
      <button type="submit">Save Changes</button>
      <button
        type="button"
        onClick={() => {
          setEditingAssessment(null);
          setActiveTab('viewAssessment');
        }}
      >
        Cancel
      </button>
    </form>
  </div>
)}
         {activeTab === 'viewResults' && (
  <div className="p-4">
    <h3 className="text-xl font-bold mb-4">Assessment Results</h3>

    <button
      onClick={() => setShowResults(!showResults)}
      className="btn btn-primary mb-3"
    >
      {showResults ? 'Hide Results' : 'View Results'}
    </button>

    {showResults && (
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>Student Name</th>
              <th>Course</th>
              <th>Assessment Name</th>
              <th>Total Marks</th>
              <th>Obtained Marks</th>
            </tr>
          </thead>
          <tbody>
            {mergedResults.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.course}</td>
                <td>{item.assessmentName || 'N/A'}</td>
                <td>{item.totalMarks ?? 'N/A'}</td>
                <td>{item.obtainedMarks ?? 'N/A'}</td>
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

      <style>{`
        .sidebar {
          min-height: 100vh;
          width: 250px;
        }
        .form-group label {
          font-weight: 500;
        }
        .btn {
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

export default TrainerDashboard; 