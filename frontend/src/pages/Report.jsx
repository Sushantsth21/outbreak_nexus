import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function Report() {
  const [disease, setDisease] = useState('');
  const [state, setState] = useState('');
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateReport = async () => {
    setError('');
    setSuccessMessage('');
    setReport(null);
    
    if (!disease || !state) {
      setError('Please select both disease and state.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/disease-report/${encodeURIComponent(disease)}/${encodeURIComponent(state)}`
      );
      setReport(response.data.report);
      setSuccessMessage('Report generated successfully');
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to generate report');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(report);
      setSuccessMessage('Report copied to clipboard!');
    } catch (err) {
      setError('Failed to copy report to clipboard');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Public Health Report Generator
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Disease
            </label>
            <select
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Choose Disease --</option>
              <option value="Measles">Measles</option>
              <option value="Covid">COVID-19</option>
              <option value="Dengue">Dengue</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter U.S. State
            </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="e.g., Ohio, California, Texas"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
        >
          {isLoading ? 'Generating Report...' : 'Generate Report'}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
            ⚠️ {error}
          </div>
        )}

        {successMessage && (
          <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
            ✅ {successMessage}
          </div>
        )}
      </div>

      {report && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {disease} Report for {state}
            </h2>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
            >
              📋 Copy Report
            </button>
          </div>

          <div className="prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                table: ({ node, ...props }) => (
                  <div className="overflow-auto">
                    <table {...props} className="min-w-full divide-y divide-gray-200" />
                  </div>
                ),
                th: ({ node, ...props }) => (
                  <th {...props} className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" />
                ),
                td: ({ node, ...props }) => (
                  <td {...props} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" />
                ),
              }}
            >
              {report}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default Report;