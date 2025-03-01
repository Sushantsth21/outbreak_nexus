import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  
  useEffect(() => {
    // Initialize the map
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3VzaGFudHN0aDIxIiwiYSI6ImNtN3FleG0wZDAyM3gyam9pY2phZ3lpMXUifQ.OBhfYI9l-OfUHnijgyHrZg';
    
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Add a default style
      center: [-74.5, 40],
      zoom: 9
    });
    
    // Clean up on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []); // Empty dependency array so it only runs once
  
  return (
    <div 
      ref={mapContainerRef}
      className="map-container"
      style={{ height: '500px', width: '100%' }} // Define explicit dimensions
    />
  );
};

export default MapboxExample;