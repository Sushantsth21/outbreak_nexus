import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapboxExample = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [inputDisease, setInputDisease] = useState("");
  const [fetchedDiseaseName, setFetchedDiseaseName] = useState("");

  // Function to fetch the standardized disease name from the API
  const fetchDiseaseName = async () => {
    if (!inputDisease.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:8000/disease-name/${inputDisease}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch disease name");
      }

      const data = await response.json();
      setFetchedDiseaseName(data.standardized_name);
      return data.standardized_name; // Return the standardized name
    } catch (error) {
      console.error("Error fetching disease name:", error);
    }
  };

  const handleSearchClick = async () => {
    const standardizedName = await fetchDiseaseName();
    if (standardizedName) {
      // Pass the standardized name to the map component
      setFetchedDiseaseName(standardizedName);
    }
  };

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
            ["get", `mpox_dB`], // Use API response

            // Decibel breakpoints followed by corresponding colors
            0,
            "#FFFFFF",
            10,
            "#F4E3E3",
            20,
            "#E8C6C6",
            30,
            "#DDAAAA",
            40,
            "#D28E8E",
            50,
            "#C67171",
            60,
            "#BB5555",
            70,
            "#B03939",
            80,
            "#A41C1C",
            90,
            "#990000",
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

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Disease Map</h2>

      {/* Input field to enter disease name */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={inputDisease}
          onChange={(e) => setInputDisease(e.target.value)}
          placeholder="Enter disease name"
        />
        <button onClick={handleSearchClick}>Fetch Disease</button>
      </div>

      {fetchedDiseaseName && (
        <p>
          Standardized Name: <strong>{fetchedDiseaseName}</strong>
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
        }}
      />
    </div>
  );
};

export default MapboxExample;
