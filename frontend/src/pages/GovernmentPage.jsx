import React from 'react';
import { Link } from 'react-router-dom';

function GovernmentPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Government Resources</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Locality Management and Resources</h2>
        <p className="mb-4">
          Access specialized tools and information designed for government agencies at all levels. 
          Our platform provides comprehensive data analysis, reporting capabilities, and coordination 
          tools to help manage public health initiatives effectively.
        </p>
        
        <div className="mt-6 space-y-4">
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <h3 className="font-medium text-green-700">Data Visualization Tools</h3>
            <p className="text-gray-600">Interactive dashboards for monitoring trends and outbreaks in your jurisdiction.</p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <h3 className="font-medium text-green-700">Policy Implementation Guides</h3>
            <p className="text-gray-600">Best practices for implementing evidence-based public health policies.</p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <h3 className="font-medium text-green-700">Coordination Framework</h3>
            <p className="text-gray-600">Tools for coordinating emergency response across multiple agencies and jurisdictions.</p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <h3 className="font-medium text-green-700">Resource Allocation Models</h3>
            <p className="text-gray-600">Decision support tools for optimizing the allocation of limited resources.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-green-800">Request Government Access</h2>
        <p className="mb-4">
          Government agencies can request enhanced access to additional features and data sets. 
          Complete the verification process to unlock all government-specific capabilities.
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
          Request Access Verification
        </button>
      </div>
      
      <div className="text-center mt-8">
        <Link to="/" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default GovernmentPage;