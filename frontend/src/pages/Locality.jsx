import React, { useState } from 'react';
import { Search, AlertTriangle, Loader2 } from 'lucide-react';

const Locality = () => {
  const [location, setLocation] = useState('');
  const [outbreaks, setOutbreaks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const response = await fetch(`http://localhost:8000/recent-outbreaks/${encodeURIComponent(location)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch outbreak data');
      }
      
      const data = await response.json();
      setOutbreaks(data.outbreaks || []);
    } catch (err) {
      setError(err.message);
      setOutbreaks([]);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    if (status.toLowerCase().includes('ongoing')) {
      return 'bg-yellow-100 text-yellow-800';
    } else if (status.toLowerCase().includes('contained')) {
      return 'bg-blue-100 text-blue-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Recent Disease Outbreaks</h1>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter location (country, state, city...)"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex justify-center my-12">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          <span className="ml-2 text-gray-600">Fetching outbreak data...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 my-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span className="ml-2 text-red-700">{error}</span>
          </div>
        </div>
      )}

      {searched && !loading && !error && outbreaks.length === 0 && (
        <div className="text-center my-8 p-4 bg-gray-50 rounded-md">
          <p className="text-gray-600">No recent disease outbreaks found for this location.</p>
        </div>
      )}

      {outbreaks.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent outbreaks in {location}</h2>
          <div className="space-y-4">
            {outbreaks.map((outbreak, index) => (
              <div key={index} className="border rounded-lg shadow-sm p-4 bg-white">
                <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                  <h3 className="text-lg font-medium">{outbreak.disease}</h3>
                  <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(outbreak.severity)}`}>
                      {outbreak.severity} severity
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(outbreak.status)}`}>
                      {outbreak.status}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  Started: {outbreak.start_date}
                </div>
                <p className="text-gray-700">{outbreak.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Locality;