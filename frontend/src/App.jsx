<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use 'Routes' in v6+
import Home from './pages/Home'; // Ensure Home page exists and is properly imported
import Person from './pages/PersonPage'; // Create these components
import Government from './pages/GovernmentPage'; // Create these components

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/person" element={<Person />} />
        <Route path="/government" element={<Government />} />
        {/* Add more routes here if necessary */}
      </Routes>
    </Router>
  );
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Mapbox from './maps/finalMap'


function App() {
  return (
    <div>
      <Mapbox />
    </div>
  )
>>>>>>> 4f25b63b7ef65e2ac91549ca7ee0f622358cf6e5
}

export default App;