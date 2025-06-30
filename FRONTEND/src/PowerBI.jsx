import React from 'react';
import { FaChartBar , FaDatabase, FaSnowflake} from 'react-icons/fa';
import { SiOracle  } from 'react-icons/si';

function PowerBi() {
  return (
    <div>
      <h3>Power BI Full Stack</h3>
      &nbsp;
      &nbsp;
      &nbsp;
      <div>
        <h5 className="mt-4"><u>Backend</u></h5><br/>
        <div className="d-flex gap-3">
          <FaChartBar color="#FCB714" size={30} /> Power BI 
        </div>
      </div>

      <div>
      &nbsp;
      &nbsp;
        <h5 className="mt-4"><u>SQL</u></h5><br/>
        <div className="d-flex gap-3">
          <FaDatabase color="#00758F" size={30} /> MySQL 
          <FaSnowflake color="00A1D9"  size={30} /> Snowflake 
          <SiOracle color="c74634" size={30} /> Oracle 
        </div>
      </div>
    </div>
  );
}

export default PowerBi;
