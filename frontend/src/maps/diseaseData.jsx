import React, { useState } from 'react';
import axios from 'axios';

const DiseaseData = () => {
  const [selectedDisease, setSelectedDisease] = useState('');
  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDiseaseChange = (e) => {
    setSelectedDisease(e.target.value);
    setDiseaseInfo(null); // Clear previous disease info
  };

  const fetchDiseaseInfo = async () => {
    if (!selectedDisease) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Using the GET endpoint
      const response = await axios.get(`http://localhost:8000/disease/${selectedDisease}`);
      setDiseaseInfo(response.data);
    } catch (err) {
      setError('Error fetching disease information. Please try again.');
      console.error('Error fetching disease data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    fetchDiseaseInfo();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Disease Information Portal</h2>
      <div className="mb-4">
        <label htmlFor="disease-input" className="block mb-2 font-medium">
          Enter a Disease Name:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="disease-input"
            value={selectedDisease}
            onChange={handleDiseaseChange}
            className="w-full p-2 border rounded-md"
            placeholder="Type disease name..."
          />
          <button
            onClick={handleSearchClick}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>
      
      {loading && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          <p>Loading disease information...</p>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-4 border rounded-md bg-red-50 text-red-700">
          <p>{error}</p>
        </div>
      )}
      
      {!loading && !error && diseaseInfo && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">
            {diseaseInfo.name} Information
          </h3>
          
          <div className="space-y-4">
            {diseaseInfo.introduction && (
              <div>
                <h4 className="font-medium">Introduction</h4>
                <p className="text-gray-700">{diseaseInfo.introduction}</p>
              </div>
            )}
            
            {diseaseInfo.symptoms && (
              <div>
                <h4 className="font-medium">Symptoms</h4>
                <p className="text-gray-700">{diseaseInfo.symptoms}</p>
              </div>
            )}
            
            {diseaseInfo.causes && (
              <div>
                <h4 className="font-medium">Causes</h4>
                <p className="text-gray-700">{diseaseInfo.causes}</p>
              </div>
            )}
            
            {diseaseInfo.diagnosis && (
              <div>
                <h4 className="font-medium">Diagnosis</h4>
                <p className="text-gray-700">{diseaseInfo.diagnosis}</p>
              </div>
            )}
            
            {diseaseInfo.treatment && (
              <div>
                <h4 className="font-medium">Treatment</h4>
                <p className="text-gray-700">{diseaseInfo.treatment}</p>
              </div>
            )}
            
            {diseaseInfo.prevention && (
              <div>
                <h4 className="font-medium">Prevention</h4>
                <p className="text-gray-700">{diseaseInfo.prevention}</p>
              </div>
            )}
            
            {diseaseInfo.pathogen_name && (
              <div>
                <h4 className="font-medium">Pathogen</h4>
                <p className="text-gray-700">
                  {diseaseInfo.pathogen_name} ({diseaseInfo.pathogen_type})
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseData;