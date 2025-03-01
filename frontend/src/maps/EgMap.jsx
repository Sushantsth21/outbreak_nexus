import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Prevent duplicate map initialization
    if (mapRef.current) return;
    
    // Initialize the map
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3VzaGFudHN0aDIxIiwiYSI6ImNtN3FleG0wZDAyM3gyam9pY2phZ3lpMXUifQ.OBhfYI9l-OfUHnijgyHrZg';
    
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9
    });
    
    // Clean up on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div
      ref={mapContainerRef}
      className="map-container"
      style={{ 
        height: '80vh',     // Use 80vh to make the map container 80% of the viewport height
        width: '80vw',      // Use viewport width for full width
        maxWidth: '100%',    // Prevent horizontal scrolling
        margin: '0 auto'     // Center the map if it's not full width
      }}
    />
  );
};

export default MapboxExample;