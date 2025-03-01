import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use 'Routes' in v6+
import Home from './pages/Home'; // Ensure Home page exists and is properly imported
import Person from './pages/PersonPage'; // Create these components
import Government from './pages/GovernmentPage'; // Create these components
import PersonDisease from './pages/personDisease';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/person" element={<Person />} />
        <Route path="/government" element={<Government />} />
        <Route path="/personDisease" element={<PersonDisease />} />
        {/* Add more routes here if necessary */}
      </Routes>
    </Router>
  );
}

export default App;