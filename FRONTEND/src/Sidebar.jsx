// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Sidebar.css';

// function Sidebar() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.clear();
//     navigate('/');
//   };

//   return (
//     <div className="sidebar bg-light p-3 shadow-sm">
//       <h5 className="sidebar-title mb-4 text-primary">Trainer Panel</h5>
//       <ul className="list-unstyled">
       
//         <li>
//           <button className="btn btn-outline-success w-100 text-start mb-2" onClick={() => navigate('/add-trainer')}>
//             Add Student
//           </button>
//         </li>
//         <li>
//           <button className="btn btn-outline-secondary w-100 text-start mb-2" onClick={() => navigate('/view-trainer')}>
//             View Students
//           </button>
//         </li>
//         <li>
//           <button className="btn btn-outline-danger w-100 text-start" onClick={logout}>Logout</button>
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;
