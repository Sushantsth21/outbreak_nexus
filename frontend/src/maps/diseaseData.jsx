import React, { useState } from 'react';

const DiseaseData = () => {
  const [selectedDisease, setSelectedDisease] = useState('');
  
  const diseases = [
    { id: 1, name: 'Measels', category: 'Viral' },
    { id: 2, name: 'COVID-19', category: 'Bacterial' },
    { id: 3, name: 'Cholera', category: 'Metabolic' },
  ]
  
  const handleDiseaseChange = (e) => {
    setSelectedDisease(e.target.value);
  };
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Disease Information Portal</h2>
      
      <div className="mb-4">
        <label htmlFor="disease-select" className="block mb-2 font-medium">
          Select a Disease:
        </label>
        <select
          id="disease-select"
          value={selectedDisease}
          onChange={handleDiseaseChange}
          className="w-full p-2 border rounded-md bg-white"
        >
          <option value="">-- Select a disease --</option>
          {diseases.map((disease) => (
            <option key={disease.id} value={disease.name}>
              {disease.name} ({disease.category})
            </option>
          ))}
        </select>
      </div>
      
      {selectedDisease && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">
            {selectedDisease} Information
          </h3>
          <p className="text-gray-700">
            Detailed information about {selectedDisease} would appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default DiseaseData;