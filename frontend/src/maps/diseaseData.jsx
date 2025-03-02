import React, { useState } from "react";
import axios from "axios";

const DiseaseData = () => {
  const [diseaseDetails, setDiseaseDetails] = useState(null);
  const [error, setError] = useState(null);
  const [diseaseName, setDiseaseName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchDetails = async () => {
    if (!diseaseName.trim()) {
      setError("Please enter a disease name");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `http://localhost:8000/disease`,
        { params: { name: diseaseName.trim() } }
      );
      setDiseaseDetails(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch disease details");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Disease Information Finder</h1>
      <div className="search-box">
        <input
          type="text"
          value={diseaseName}
          onChange={(e) => setDiseaseName(e.target.value)}
          placeholder="Enter disease name (e.g., Diabetes)"
          onKeyPress={(e) => e.key === "Enter" && handleFetchDetails()}
        />
        <button 
          onClick={handleFetchDetails}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <div className="error-message">⚠️ {error}</div>}

      {diseaseDetails && (
        <div className="result-card">
          <h2>{diseaseDetails.name}</h2>
          <div className="details-section">
            <h3>Description</h3>
            <p>{diseaseDetails.description}</p>
            
            {diseaseDetails.symptoms && (
              <>
                <h3>Symptoms</h3>
                <ul>
                  {diseaseDetails.symptoms.map((symptom, index) => (
                    <li key={index}>{symptom}</li>
                  ))}
                </ul>
              </>
            )}

            {diseaseDetails.treatment && (
              <>
                <h3>Treatment</h3>
                <p>{diseaseDetails.treatment}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseData;