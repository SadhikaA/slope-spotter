import "./App.css";
import mapboxgl from 'mapbox-gl';
import React, { use, useRef, useState, useEffect } from 'react';

import BottomNav from './components/BottomNav/BottomNav';
import SpeechButton from './components/SpeechText/SpeechButton.js';
import MapBox from "./components/MapBox/MapBox.js";
import Header from "./components/Header/Header.js";
/* eventually import MapBox stuff here */

function Navigation() {
  const mapRef = useRef();
  const [startAddr, setStartAddr] = useState('');
  const [endAddr, setEndAddr] = useState('');
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const handleTranscript = (text) => {
    console.log('🗣️ Transcript:', text);
    // Here you can handle the transcript, e.g., send it to your backend or process it further
  };

  useEffect(() => {
    if (!navigator.geolocation) { return; }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserLocation([coords.longitude, coords.latitude]);
      },
      err => {
        console.warn("Geolocation failed:", err);
      }
    );
  }, []);
  const handleStart = async () => {
    if (!endAddr.trim()) {
      alert("Please enter a destination");
      return;
    }
    setLoading(true);
    try {
      // use user location if startAddr is empty
      const startCoords = startAddr.trim()
        ? await geocode(startAddr)
        : userLocation ?? (() => { throw new Error("Please enter start address"); })();
      const endCoords = await geocode(endAddr);
      mapRef.current?.getRoute(startCoords, endCoords);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStop = () => mapRef.current?.stopRoute();

  return (
    <div className="App">
      <div className="container">
        <Header title="Navigation" />
        <div className="input-section">
          <input
            type="text"
            placeholder="Your Location"
            value={startAddr}
            onChange={e => setStartAddr(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Destination"
            value={endAddr}
            onChange={e => setEndAddr(e.target.value)}
          />
        </div>
        <div className="button-section">
          <button onClick={handleStart} disabled={loading || (!startAddr.trim() && userLocation === null)}>
            {loading ? 'Loading...' : 'Start Navigation'}
          </button>
          <button className="nav-button" onClick={handleStop}>
            Stop Navigation
          </button>
          <SpeechButton onTranscript={handleTranscript} />
        </div>

        <div style={{ width: '100%', height: '300px', margin: '1rem 0' }}>
          <MapBox ref={mapRef} />
        </div>
        <p>Remaining Miles</p>
      </div>
      <BottomNav />
    </div>
  );
}

async function geocode(address) {
  console.log('geocode', address);
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
