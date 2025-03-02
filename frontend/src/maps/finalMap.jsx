import React, { useState } from 'react';
import DiseaseData from './diseaseData';
import MapboxExample from './EgMap';

const ParentComponent = () => {
  const [diseaseName, setDiseaseName] = useState('');

  const handleDiseaseNameChange = (name) => {
    setDiseaseName(name);
  };

  return (
    <div>
      <DiseaseData onDiseaseNameChange={handleDiseaseNameChange} />
      <MapboxExample diseaseName={diseaseName} />
    </div>
  );
};

export default ParentComponent;
