import React, { useState } from 'react';
import axios from 'axios';

function Report() {
    const [disease, setDisease] = useState('');
    const [state, setState] = useState('');
    const [report, setReport] = useState(null);
    const [error, setError] = useState('');

    const handleFetchReport = async () => {
        setReport(null);
        setError('');

        if (!disease || !state) {
            setError('Please select both disease and state.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8000/disease-report`, {
                params: { disease, state }
            });
            if (response.data.status === 'success') {
                setReport(response.data.report);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('Failed to fetch report. Please check backend or network.');
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Disease Report Generator</h2>
            
            <div className="mb-4">
                <label className="block text-gray-700">Select Disease:</label>
                <select 
                    value={disease} 
                    onChange={(e) => setDisease(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value="">-- Choose Disease --</option>
                    <option value="measles">Measles</option>
                    <option value="covid">Covid</option>
                    <option value="dengue">Dengue</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Enter USA State:</label>
                <input 
                    type="text" 
                    value={state} 
                    onChange={(e) => setState(e.target.value)} 
                    placeholder="e.g., Kentucky/Ohio/New York"
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <button 
                onClick={handleFetchReport} 
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
                Get Report
            </button>

            {error && (
                <div className="mt-4 text-red-600 text-sm">{error}</div>
            )}

            {report && (
                <div className="mt-4 p-4 border rounded-md bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Disease Report for {state}</h3>
                    <p className="text-gray-800 whitespace-pre-wrap">{report}</p>
                </div>
            )}
        </div>
    );
}

export default Report;
