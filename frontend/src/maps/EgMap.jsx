import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  // State to store the disease name fetched from FastAPI
  const [diseaseName, setDiseaseName] = useState(null);

  // 1) Fetch disease name from your FastAPI endpoint on component mount
  useEffect(() => {
    fetch('http://localhost:8000/disease') // adjust your endpoint URL
      .then((res) => res.json())
      .then((data) => {
        // Suppose data = { "disease": "measles" }
        setDiseaseName(data.disease);
      })
      .catch((err) => console.error(err));
  }, []);

  // 2) Initialize and configure the Mapbox map *after* we have the disease name
  useEffect(() => {
    if (!diseaseName) return; // Wait until diseaseName is fetched
    if (mapRef.current) return; // Prevent re-initializing map

    mapboxgl.accessToken = 'pk.eyJ1Ijoic3VzaGFudHN0aDIxIiwiYSI6ImNtN3FleG0wZDAyM3gyam9pY2phZ3lpMXUifQ.OBhfYI9l-OfUHnijgyHrZg';

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/navigation-day-v1',
      center: [28.36, 81.51],
      zoom: 2,
      projection: 'equirectangular',
    });

    mapRef.current.dragRotate.disable();
    mapRef.current.touchZoomRotate.disableRotation();

    mapRef.current.on('load', () => {
      mapRef.current.setFog({});

      mapRef.current.addSource('country-borders', {
        type: 'geojson',
        data: '/data/countries.geojson',
      });

      // 3) Use the fetched disease name in the Mapbox fill-color expression
      mapRef.current.addLayer({
        id: 'country-borders-fill',
        type: 'fill',
        source: 'country-borders',
        paint: {
          'fill-color': [
            'interpolate',
            ['linear'],
            // Dynamically build the property name: e.g., "measles_dB"
            ['get', `${diseaseName}_dB`],

            // Decibel breakpoints followed by corresponding colors
            0,   '#FFFFFF',  // 0 dB
            10,  '#F4E3E3',
            20,  '#E8C6C6',
            30,  '#DDAAAA',
            40,  '#D28E8E',
            50,  '#C67171',
            60,  '#BB5555',
            70,  '#B03939',
            80,  '#A41C1C',
            90,  '#990000'   // 90 dB
          ],
        },
      });

      mapRef.current.addLayer({
        id: 'country-borders-highlighted',
        type: 'line',
        source: 'country-borders',
        paint: {
          'line-color': 'black',
          'line-width': 0.2,
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
  }, [diseaseName]); // Re-run when diseaseName changes

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
