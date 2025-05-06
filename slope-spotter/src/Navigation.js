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

      mapRef.current?.getRoute(originCoords, destCoords);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStop = () => mapRef.current?.stopRoute();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex flex-col flex-grow px-4 max-w-md w-full mx-auto">
        <Header title="Navigation" />
        <div className="h-4" />

        <div className="mt-6 space-y-4">
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
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <button
            onClick={handleStart}
            disabled={loading || (!startAddr.trim() && userLocation === null)}
            className="bg-[#004aae] text-white font-semibold py-3 rounded-xl hover:bg-[#00367a] transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Start Navigation"}
          </button>

          <button
            onClick={handleStop}
            className="bg-gray-200 text-gray-800 font-medium py-3 rounded-xl hover:bg-gray-300 transition"
          >
            Clear Route
          </button>

          <div className="flex justify-center mt-2">
            <SpeechButton
              onTranscript={handleTranscript}
              className="bg-[#004aae] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#00367a] transition"
            />
          </div>
        </div>

        <div className="mt-6 w-full h-[500px] rounded-xl overflow-hidden shadow-md">
          <MapBox ref={mapRef} />
        </div>
      </div>
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
