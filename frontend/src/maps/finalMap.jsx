import React from 'react'
import MapboxExample from './EgMap'

function finalMap() {
    return (
      <div className="app-container" style={{ width: '100%', padding: 0, margin: 0 }}>
        <h1 style={{ textAlign: 'center', color:'black' }}>My Map App</h1>
        <MapboxExample />
      </div>
    )
  }

export default finalMap