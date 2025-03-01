import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapboxExample from './maps/EgMap'


function App() {
  return (
    <div className="app-container">
      <h1>My Map App</h1>
      <MapboxExample />
    </div>
  )
}

export default App
