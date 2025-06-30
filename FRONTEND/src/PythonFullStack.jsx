import React from 'react';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact } from 'react-icons/fa';
import { SiDjango, SiFlask, SiPython, SiMysql, SiPostgresql, SiSqlite } from 'react-icons/si';

function PythonFullStack() {
  return (
    <div>
      <h3>Python Full Stack</h3>
      &nbsp;
      &nbsp;
      &nbsp;
      <div>
        <h5><u>Frontend</u></h5>
        &nbsp;
        <div className="d-flex gap-3">
          <FaHtml5 color="#e44d26" size={30} /> HTML
          <FaCss3Alt color="#1572B6" size={30} /> CSS
          <FaJsSquare color="#f7df1e" size={30} /> JavaScript
          <FaReact color="#1572B6" size={30} /> React
        </div>
      </div>
      <div>
      &nbsp;
      &nbsp;
        <h5 className="mt-4"><u>Backend</u></h5>
        &nbsp;
        <div className="d-flex gap-3">
          <SiPython color="#3776AB" size={30} /> Python
          <SiDjango color="#092e20" size={30} /> Django
          <SiFlask color="#000000" size={30} /> Flask
        </div>
      </div>
      <div>
      &nbsp;
      &nbsp;
        <h5 className="mt-4"><u>SQL</u></h5>
        &nbsp;
        <div className="d-flex gap-3">
          <SiMysql color="#00758F" size={30} /> MySQL
          <SiPostgresql color="#336791" size={30} /> PostgreSQL
          <SiSqlite color="#003B57" size={30} /> SQLite
        </div>
      </div>
    </div>
  );
}

export default PythonFullStack;

