import React from "react";
import MapboxExample from "./EgMap";
// import DiseaseData from "./diseaseData"; // Import the DiseaseData component

const FinalMap = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Left Section: Disease Data */}
      {/* <div className="w-full md:w-1/3 p-6 bg-white shadow-md overflow-y-auto">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">
          Disease Outbreaks
        </h1>
        <DiseaseData />
      </div> */}

      {/* Right Section: Map */}
      <div className="w-full md:w-2/3 h-full">
        <MapboxExample />
      </div>
    </div>
  );
};

export default FinalMap;
