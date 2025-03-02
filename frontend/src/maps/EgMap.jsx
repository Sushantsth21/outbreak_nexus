import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapboxExample = ({ diseaseName }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [fetchedDiseaseName, setFetchedDiseaseName] = useState("");

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
        }}
      />
    </div>
  );
};

export default MapboxExample;
