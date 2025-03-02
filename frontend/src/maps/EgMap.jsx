import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapboxExample = ({ diseaseName }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [fetchedDiseaseName, setFetchedDiseaseName] = useState("");

  // Define color scale for consistent use
  const colorScale = [
    { value: 0, color: "#FFFFFF" },
    { value: 10, color: "#F4E3E3" },
    { value: 20, color: "#E8C6C6" },
    { value: 30, color: "#DDAAAA" },
    { value: 40, color: "#D28E8E" },
    { value: 50, color: "#C67171" },
    { value: 60, color: "#BB5555" },
    { value: 70, color: "#B03939" },
    { value: 80, color: "#A41C1C" },
    { value: 90, color: "#990000" }
  ];

  useEffect(() => {
    if (diseaseName) {
      setFetchedDiseaseName(diseaseName);
    }
  }, [diseaseName]);

  // Initialize the Mapbox map after fetching the disease name
  useEffect(() => {
    if (!fetchedDiseaseName) return;
    if (mapRef.current) return; // Prevent re-initializing map

    mapboxgl.accessToken =
      "pk.eyJ1Ijoic3VzaGFudHN0aDIxIiwiYSI6ImNtN3FleG0wZDAyM3gyam9pY2phZ3lpMXUifQ.OBhfYI9l-OfUHnijgyHrZg";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/navigation-day-v1",
      center: [28.36, 81.51],
      zoom: 2,
      projection: "equirectangular",
    });

    mapRef.current.dragRotate.disable();
    mapRef.current.touchZoomRotate.disableRotation();

    mapRef.current.on("load", () => {
      mapRef.current.setFog({});
      mapRef.current.addSource("country-borders", {
        type: "geojson",
        data: "/data/countries.geojson",
      });

      // Dynamically use fetched disease name for coloring
      mapRef.current.addLayer({
        id: "country-borders-fill",
        type: "fill",
        source: "country-borders",
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", `${fetchedDiseaseName.toLowerCase()}_dB`], // Use fetched disease name
            // Decibel breakpoints followed by corresponding colors
            ...colorScale.flatMap(item => [item.value, item.color])
          ],
        },
      });

      mapRef.current.addLayer({
        id: "country-borders-highlighted",
        type: "line",
        source: "country-borders",
        paint: {
          "line-color": "black",
          "line-width": 0.2,
        },
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [fetchedDiseaseName]); // Re-run when fetchedDiseaseName updates

  // Component for the color legend
  const ColorLegend = () => (
    <div style={{ 
      position: "absolute", 
      bottom: "30px", 
      right: "30px", 
      backgroundColor: "white", 
      padding: "10px", 
      borderRadius: "4px", 
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      zIndex: 10
    }}>
      <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px" }}>
        {fetchedDiseaseName} Intensity (dB)
      </div>
      <div style={{ display: "flex", height: "20px", width: "200px", marginBottom: "5px" }}>
        {colorScale.map((item, index) => (
          <div 
            key={index}
            style={{ 
              backgroundColor: item.color, 
              height: "100%", 
              flex: 1 
            }} 
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
        <span>0</span>
        <span>50</span>
        <span>90+</span>
      </div>
    </div>
  );

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <h2>Disease Map</h2>
      {fetchedDiseaseName && (
        <p>
          Disease Name: <strong>{fetchedDiseaseName}</strong>
        </p>
      )}
      <div
        ref={mapContainerRef}
        className="map-container"
        style={{
          height: "80vh",
          width: "80vw",
          maxWidth: "100%",
          margin: "0 auto",
          position: "relative"
        }}
      />
      {fetchedDiseaseName && <ColorLegend />}
    </div>
  );
};

export default MapboxExample;