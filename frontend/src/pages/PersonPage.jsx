import React from 'react';
import { Link } from 'react-router-dom';

function PersonPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Person Information</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Disease Resources for Individuals</h2>
        <p className="mb-4">
          Here you'll find comprehensive information about disease prevention, symptoms, and 
          treatment options for individuals. Our resources are designed to empower you with 
          knowledge to protect yourself and your loved ones.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <h3 className="font-medium text-blue-700 mb-2">Prevention Guidelines</h3>
            <p>Learn about the latest prevention measures recommended by health experts.</p>
          </div>
          
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <h3 className="font-medium text-blue-700 mb-2">Symptom Checker</h3>
            <p>Identify potential symptoms and get guidance on when to seek medical attention.</p>
          </div>
          
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <h3 className="font-medium text-blue-700 mb-2">Treatment Information</h3>
            <p>Overview of treatment options and what to expect during recovery.</p>
          </div>
          
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <h3 className="font-medium text-blue-700 mb-2">Support Resources</h3>
            <p>Connect with support groups and mental health resources.</p>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default PersonPage;