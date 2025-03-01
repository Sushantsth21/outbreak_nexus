import React, { useEffect, useState } from "react";
import axios from "axios";

const DiseaseData = () => {
  const [diseases, setDiseases] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [diseaseDetails, setDiseaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newDisease, setNewDisease] = useState("");

  // Fetch the list of diseases
  useEffect(() => {
    const fetchDiseaseData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/diseases");
        setDiseases(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDiseaseData();
  }, []);

  // Fetch details when a disease is selected
  const handleDiseaseSelect = async (diseaseName) => {
    setDetailsLoading(true);
    setSelectedDisease(diseaseName);
    setDiseaseDetails(null); // Clear previous details

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/disease?name=${encodeURIComponent(diseaseName)}`
      );
      setDiseaseDetails(response.data);
    } catch (err) {
      setError(`Error fetching disease details: ${err.message}`);
    } finally {
      setDetailsLoading(false);
    }
  };

  // Handle new disease submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newDisease.trim()) return;

    try {
      const response = await axios.post("http://127.0.0.1:8000/diseases", {
        name: newDisease,
      });
      setDiseases([...diseases, response.data]); // Update state with new disease
      setNewDisease("");
    } catch (err) {
      setError(`Error adding disease: ${err.message}`);
    }
  };

  // Filter diseases based on search term
  const filteredDiseases = diseases.filter((disease) =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
        Disease Encyclopedia
      </h2>

      {/* New Disease Input Form */}
      <div className="mb-6">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            placeholder="Enter new disease..."
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={newDisease}
            onChange={(e) => setNewDisease(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Disease
          </button>
        </form>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for a disease..."
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Disease List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Disease List */}
        <div className="lg:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-3">Select a Disease:</h3>
            {filteredDiseases.length === 0 ? (
              <p className="text-gray-500 p-3">
                No diseases found matching "{searchTerm}"
              </p>
            ) : (
              <ul className="divide-y overflow-y-auto max-h-[60vh]">
                {filteredDiseases.map((disease, index) => (
                  <li
                    key={index}
                    className={`p-3 cursor-pointer hover:bg-blue-50 transition-colors ${
                      selectedDisease === disease.name ? "bg-blue-100" : ""
                    }`}
                    onClick={() => handleDiseaseSelect(disease.name)}
                  >
                    <strong className="text-blue-800">{disease.name}</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Disease Details */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md min-h-[60vh]">
            {detailsLoading ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Loading disease details...</p>
              </div>
            ) : selectedDisease ? (
              diseaseDetails ? (
                <div>
                  <h3 className="text-2xl font-semibold text-blue-800">
                    {diseaseDetails.name}
                  </h3>
                  <p className="text-gray-700">{diseaseDetails.description}</p>
                </div>
              ) : (
                <p className="text-gray-500">
                  No details available for this disease.
                </p>
              )
            ) : (
              <p className="text-gray-500">
                Select a disease from the list to view details.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseData;
