
import React from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaJava, FaDatabase, FaSnowflake} from 'react-icons/fa';
import { SiSpring,SiSpringboot, SiOracle  } from 'react-icons/si';

function JavaFullStack() {
  return (
    <div>
      <h3>Java Full Stack</h3>
      &nbsp;
      &nbsp;
      &nbsp;
      <div>
        <h5><u>Frontend</u></h5>
        &nbsp;
        <div className="d-flex gap-3">
          <FaHtml5 color="#e44d26" size={30} /> HTML
          <FaCss3Alt color="#1572B6" size={30} /> CSS
          <FaJs color="#f7df1e"  size={30} /> JavaScript
          <FaReact color="#1572B6" size={30} /> React
        </div>
      </div>
     
      <div>
      &nbsp;
      &nbsp;
        <h5 className="mt-4"><u>Backend</u></h5>
        &nbsp;
        <div className="d-flex gap-3">
          <FaJava color="#f89820" size={30} /> Java Core
          <FaJava color="#5382a1"  size={30} /> Java Advanced
          <SiSpring color="green"  size={30} /> Spring
          <SiSpringboot color="green"  size={30} /> Spring Boot
        </div>
      </div>
      <div>
      &nbsp;
      &nbsp;
        <h5 className="mt-4"><u>SQL</u></h5>
        &nbsp;
        <div className="d-flex gap-3">
          <FaDatabase color="#00758F" size={30} /> MySQL
          <FaSnowflake color="00A1D9"  size={30} /> Snowflake
          <SiOracle color="c74634" size={30} /> Oracle
        </div>
      </div>
    </div>
  );
}

export default JavaFullStack;