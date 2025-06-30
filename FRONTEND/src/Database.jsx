import React from 'react';
import {  FaSnowflake } from 'react-icons/fa'; // Generic database icons
import { SiOracle, SiMysql  } from 'react-icons/si';

function Database() {
  return (
    <div>
      <h3>Database Full Stack</h3>
      &nbsp;
      &nbsp;
      &nbsp;
      <div>
        <h5><u>Relational Databases</u></h5><br/>
        &nbsp;
        <div className="d-flex gap-3">
          <SiMysql color="#0056b3" size={30} /> MySQL
          <SiOracle  color="c74634" size={30} /> Oracle
        </div>
      </div>

      <div>
        &nbsp;
        &nbsp;
        <h5 className="mt-4"><u>Cloud Databases</u></h5><br/>
        &nbsp;
        <div className="d-flex gap-3">
          <FaSnowflake color="00A1D9" size={30} /> Snowflake
        </div>
      </div>
    </div>
  );
}

export default Database;
