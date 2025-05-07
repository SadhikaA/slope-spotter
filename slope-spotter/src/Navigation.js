import "./App.css";
import mapboxgl from "mapbox-gl";
import React, { useRef, useState, useEffect } from "react";

import BottomNav from "./components/BottomNav/BottomNav";
import SpeechButton from "./components/SpeechText/SpeechButton.js";
import MapBox from "./components/MapBox/MapBox.js";
import Header from "./components/Header/Header.js";

function Navigation() {
  const mapRef = useRef();
  const [startAddr, setStartAddr] = useState("");
  const [endAddr, setEndAddr] = useState("");
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null); // Add state for route information

  const handleTranscript = async (text) => {
    try {
      const url =
        `https://noggin.rea.gent/immediate-swallow-7716` +
        `?key=rg_v1_qvtwpohfqmwaamnevl9sntvw4824a5ew70dj_ngk` +
        `&request=${encodeURIComponent(text)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Reagent error: ${res.status}`);
      const data = await res.json();

      if (
        data &&
        typeof data === "object" &&
        "Origin" in data &&
        "Destination" in data
      ) {
        const origin = data.Origin.trim();
        const destination = data.Destination.trim();
        setStartAddr(origin === "" ? "" : origin);
        setEndAddr(destination);
      } else {
        throw new Error("Unexpected response shape from Reagent");
      }
    } catch (err) {
      console.error(err);
      alert(
        "Error getting address from speech. Please try to be more specific or use text input."
      );
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserLocation([coords.longitude, coords.latitude]);
      },
      (err) => console.warn("Geolocation failed:", err)
    );
  }, []);

  const REAGENT_URL = "https://noggin.rea.gent/joint-aardvark-1976";
  const API_KEY = "rg_v1_66frrzepnpcp5yqgm1o8pp08qtf3a0mwazxm_ngk";

  // Function to get walking distance and duration
  const getWalkingDistance = async (originCoords, destCoords) => {
    try {
      // Build the URL for the Mapbox Directions API (walking profile)
      const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${originCoords[0]},${originCoords[1]};${destCoords[0]},${destCoords[1]}?access_token=${mapboxgl.accessToken}&geometries=geojson`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch walking directions");

      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const distance = data.routes[0].distance; // distance in meters
        const duration = data.routes[0].duration; // duration in seconds

        // Convert to more readable formats
        const distanceKm = (distance / 1000).toFixed(2);
        const distanceMiles = (distance / 1609.34).toFixed(2);
        const durationMinutes = Math.round(duration / 60);

        return {
          distanceMeters: distance,
          distanceKm,
          distanceMiles,
          durationSeconds: duration,
          durationMinutes,
        };
      } else {
        throw new Error("No routes found");
      }
    } catch (err) {
      console.error("Error getting walking distance:", err);
      throw err;
    }
  };

  const handleStart = async () => {
    if (!endAddr.trim()) return alert("Please enter a destination");
    if (!startAddr.trim() && !userLocation)
      return alert("Please enter a start address or enable location services");

    setLoading(true);
    try {
      let normalizedOrigin = "";
      let normalizedDestination = "";

      if (startAddr.trim()) {
        const originUrl = `${REAGENT_URL}?key=${API_KEY}&address=${encodeURIComponent(
          startAddr
        )}`;
        const originRes = await fetch(originUrl);
        if (!originRes.ok)
          throw new Error(`Failed to normalize origin: ${originRes.status}`);
        normalizedOrigin = await originRes.text();
      }

      const destUrl = `${REAGENT_URL}?key=${API_KEY}&address=${encodeURIComponent(
        endAddr
      )}`;
      const destRes = await fetch(destUrl);
      if (!destRes.ok)
        throw new Error(`Failed to normalize destination: ${destRes.status}`);
      normalizedDestination = await destRes.text();

      const originCoords = normalizedOrigin
        ? await geocode(normalizedOrigin)
        : userLocation;
      const destCoords = await geocode(normalizedDestination);

      console.log("Origin:", originCoords);
      console.log("Destination:", destCoords);

      // 5. Get walking distance and duration
      const walkingInfo = await getWalkingDistance(originCoords, destCoords);

      // 6. Trigger navigation and get mapRoute info that now includes maxSlope
      const mapRouteInfo = await mapRef.current?.getRoute(
        originCoords,
        destCoords
      );

      // Wait a moment for the maxSlope property to be updated
      setTimeout(() => {
        // 7. Access the maxSlope from the MapBox component ref
        const maxSlope = mapRef.current?.maxSlope || 0;

        // 8. Combine walking info with slope data
        const combinedRouteInfo = {
          ...walkingInfo,
          maxSlope,
        };

        setRouteInfo(combinedRouteInfo);
        console.log("Route Info:", combinedRouteInfo);
      }, 500);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStop = () => {
    mapRef.current?.stopRoute();
    setRouteInfo(null); // Clear route info when route is cleared
    mapRef.current?.clearDraw();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Scrollable content excluding BottomNav */}
      <div className="flex flex-col flex-grow px-4 max-w-md w-full mx-auto">
        <Header title="Map" />
        <div className="h-10" />

        {/* Inner flex column (inputs + map) */}
        <div className="flex flex-col flex-grow gap-3 py-4">
          {/* Inputs and buttons */}
          <div className="flex flex-col gap-3 flex-grow-[4]">
            <input
              type="text"
              placeholder="Your Location"
              value={startAddr}
              onChange={(e) => setStartAddr(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Enter Destination"
              value={endAddr}
              onChange={(e) => setEndAddr(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-center">
              <SpeechButton
                onTranscript={handleTranscript}
                className="bg-[#004aae] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#00367a] transition"
              />
            </div>
            <button
              onClick={handleStop}
              className="bg-gray-200 text-gray-800 font-medium py-3 rounded-xl hover:bg-gray-300 transition"
            >
              Clear Route
            </button>
            <button
              onClick={handleStart}
              disabled={loading || (!startAddr.trim() && userLocation === null)}
              className="bg-[#004aae] text-white font-semibold py-3 rounded-xl hover:bg-[#00367a] transition disabled:opacity-50"
            >
              {loading ? "Loading..." : "Start Navigation"}
            </button>
          </div>

          {/* Map */}
          <div className="flex-grow-[6] min-h-[300px]">
            <MapBox ref={mapRef} height="100%" />
          </div>
        </div>

        {/* Display walking distance, time, and slope information */}
        {routeInfo && (
          <div
            className="route-info"
            style={{
              margin: "1rem 0",
              padding: "10px",
              background: "#f0f0f0",
              borderRadius: "8px",
            }}
          >
            <p className="route-details">
              Distance <br></br>
              <strong>{routeInfo.distanceMiles} mi</strong>
            </p>
            <p className="route-details">
              Time<br></br>
              <strong>{routeInfo.durationMinutes} min</strong>
            </p>
            <p className="route-details" style={{ borderRight: "0px" }}>
              Max Slope <br></br>
              <strong>{routeInfo.maxSlope}°</strong>
            </p>
          </div>
        )}
      </div>

      {/* Persistent bottom nav */}
      <BottomNav />
    </div>
  );
}

async function geocode(address) {
  const encoded = encodeURIComponent(address);
  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
      `${encoded}.json?access_token=${mapboxgl.accessToken}&limit=1`
  );
  const json = await res.json();
  if (!json.features?.length) throw new Error("Cannot find location");
  return json.features[0].center;
}

export default Navigation;
