import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;
    
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3VzaGFudHN0aDIxIiwiYSI6ImNtN3FleG0wZDAyM3gyam9pY2phZ3lpMXUifQ.OBhfYI9l-OfUHnijgyHrZg';
    
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/navigation-day-v1',
      center: [28.36, 81.51],
      zoom: 2,
      projection: 'equirectangular',
    });

    mapRef.current.on('load', () => {
      mapRef.current.setFog({});

      mapRef.current.addSource('country-borders', {
        type: 'geojson',
        data: '/data/countries.geojson',
      });

      // Add fill layer for country shapes
      mapRef.current.addLayer({
        id: 'country-borders-fill',
        type: 'fill',
        source: 'country-borders',
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.4,
        },
      });

      // Add border highlight layer
      mapRef.current.addLayer({
        id: 'country-borders-highlighted',
        type: 'line',
        source: 'country-borders',
        paint: {
          'line-color': 'black',
          'line-width': 2,
        },
      });
    });

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      className="map-container"
      style={{ 
        height: '80vh',
        width: '80vw',
        maxWidth: '100%',
        margin: '0 auto'
      }}
    />
  );
};

export default MapboxExample;
