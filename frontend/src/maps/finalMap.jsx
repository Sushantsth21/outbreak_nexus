import React, { useState } from 'react';
import DiseaseData from './diseaseData';
import MapboxExample from './EgMap';

const ParentComponent = () => {
  const [diseaseName, setDiseaseName] = useState('');

  const handleDiseaseNameChange = (name) => {
    setDiseaseName(name);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Disease Mapping Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Current Disease Panel */}
        {diseaseName && (
          <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
            <div className="max-w-7xl mx-auto flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-800">
                  Currently viewing: <span className="font-bold">{diseaseName}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content Layout - Map takes 2/3 of viewport */}
        <div className="flex flex-col lg:flex-row flex-1 w-full max-w-screen-2xl mx-auto">
          {/* Disease Data Section - 1/3 width */}
          <div className="w-full lg:w-1/3 p-4">
            <div className="bg-white rounded-lg border border-gray-200 h-full">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900">Disease Selection</h3>
              </div>
              <div className="p-4">
                <DiseaseData onDiseaseNameChange={handleDiseaseNameChange} />
              </div>
            </div>
          </div>

          {/* Map Section - 2/3 width */}
          <div className="w-full lg:w-2/3 p-4">
            <div className="bg-white rounded-lg border border-gray-200 h-full">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900">Geographic Distribution</h3>
              </div>
              <div className="h-full min-h-[70vh] p-4">
                <MapboxExample diseaseName={diseaseName} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 text-center">
            Disease Mapping Dashboard © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ParentComponent;