import React from "react";
import MapboxExample from "./EgMap";
import DiseaseData from "./diseaseData"; // Import the DiseaseData component

const FinalMap = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <DiseaseData />
      <MapboxExample />
    </div>
  );
};

export default FinalMap;
