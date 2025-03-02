import React, { useState } from 'react';
import axios from 'axios';

const DiseaseData = () => {
  const [selectedDisease, setSelectedDisease] = useState('');
  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isGeminiResponse, setIsGeminiResponse] = useState(false);

  const handleDiseaseChange = (e) => {
    setSelectedDisease(e.target.value);
    setDiseaseInfo(null);
    setIsGeminiResponse(false);
  };

  const fetchDiseaseInfo = async () => {
    if (!selectedDisease) return;
    
    setLoading(true);
    setError(null);
    setIsGeminiResponse(false);
    
    try {
      const response = await axios.get(`http://localhost:8000/disease/${selectedDisease}`);
      setDiseaseInfo(response.data);
      
      // Handle the hyphenated key name properly
      const isGemini = response.data['gemini_reply'] === true || 
                       response.data['gemini_reply'] === "true" ||
                       response.data['gemini_reply'] === "True";
      setIsGeminiResponse(isGemini);
      
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

  const renderSymptoms = (symptoms) => {
    if (!symptoms || (Array.isArray(symptoms) && symptoms.length === 0)) {
      return <p className="text-gray-500 italic">No symptoms information available</p>;
    }
    
    if (Array.isArray(symptoms)) {
      return (
        <ul className="list-disc pl-5">
          {symptoms.map((symptom, index) => (
            <li key={index} className="text-gray-700">
              {symptom || "Not specified"}
            </li>
          ))}
        </ul>
      );
    }
    return <p className="text-gray-700">{symptoms}</p>;
  };

  const renderTextField = (text, isGeminiField = false) => {
    if (!text) {
      return (
        <p className="text-gray-500 italic">
          {isGeminiField ? "Information not available" : "No information available"}
        </p>
      );
    }
    return <p className="text-gray-700">{text}</p>;
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Disease Information Portal</h2>
      <div className="mb-6">
        <label htmlFor="disease-input" className="block mb-2 font-medium text-gray-700">
          Enter a Disease Name:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="disease-input"
            value={selectedDisease}
            onChange={handleDiseaseChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
            placeholder="Type disease name..."
          />
          <button
            onClick={handleSearchClick}
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors min-w-[100px]"
          >
            Search
          </button>
        </div>
      </div>

      {loading && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50 animate-pulse">
          <p className="text-gray-600">Loading disease information...</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 border rounded-md bg-red-50 text-red-700">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && diseaseInfo && (
        <div className={`mt-4 p-6 border rounded-md shadow-sm ${
          isGeminiResponse ? "bg-gradient-to-br from-indigo-50 to-blue-50" : "bg-white"
        }`}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {diseaseInfo.name || selectedDisease} Information
            </h3>
            {isGeminiResponse && (
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                AI Generated
              </span>
            )}
          </div>

          <div className="space-y-5">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Introduction</h4>
              {renderTextField(diseaseInfo.introduction, isGeminiResponse)}
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">Symptoms</h4>
              {renderSymptoms(diseaseInfo.symptoms)}
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">Causes</h4>
              {renderTextField(diseaseInfo.causes, isGeminiResponse)}
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">Diagnosis</h4>
              {renderTextField(diseaseInfo.diagnosis, isGeminiResponse)}
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">Treatment</h4>
              {renderTextField(diseaseInfo.treatment, isGeminiResponse)}
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">Prevention</h4>
              {renderTextField(diseaseInfo.prevention, isGeminiResponse)}
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">Pathogen</h4>
              {diseaseInfo.pathogen_name || diseaseInfo.pathogen_type ? (
                <p className="text-gray-700">
                  {diseaseInfo.pathogen_name} {diseaseInfo.pathogen_type && `(${diseaseInfo.pathogen_type})`}
                </p>
              ) : (
                renderTextField(null, isGeminiResponse)
              )}
            </div>

            {isGeminiResponse && (
              <div className="mt-6 pt-4 border-t border-indigo-100">
                <p className="text-sm text-indigo-700 italic">
                  ℹ️ AI-generated content: This information is produced by artificial intelligence and 
                  may contain inaccuracies. Always consult a healthcare professional for medical advice.
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