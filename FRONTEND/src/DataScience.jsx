import React from 'react';

import { SiPython,SiR, SiTensorflow, SiNumpy,SiPandas, SiScikitlearn,SiKeras} from 'react-icons/si';

function DataScience() {
  return (
    <div>
      <h3>Data Science Full Stack</h3>
      <div>
        <h5 className="mt-4"><u>Backend</u></h5>
        &nbsp;
        <div className="d-flex gap-3">
          <SiPython color="#3776AB" size={30} /> Python
          <SiR color="#3776AB" size={30} /> R
        </div>
      </div>
      <div>
        &nbsp;
        &nbsp;
        <h5 className="mt-4"><u>Data Science Libraries</u></h5>
        &nbsp;
        <div className="d-flex gap-3">
          <SiPandas color="#150458"  size={30} /> Pandas
          <SiNumpy color="#013243"  size={30} /> NumPy
          <SiScikitlearn color="#F7931E" size={30} /> Scikit-learn
          <SiTensorflow color="#ff7f0e" size={30} /> TensorFlow
          <SiKeras color="red"  size={30} /> Keras
        </div>
      </div>
    </div>
  );
}

export default DataScience;
