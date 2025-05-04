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

  const handleTranscript = async (text) => {
    try {
      const url = `https://noggin.rea.gent/immediate-swallow-7716`
        + `?key=rg_v1_qvtwpohfqmwaamnevl9sntvw4824a5ew70dj_ngk`
        + `&request=${encodeURIComponent(text)}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Reagent error: ${res.status}`);

      const data = await res.json();
      // expect Reagent to return an object: { Origin: "...", Destination: "..." }
      if (
        data &&
        typeof data === 'object' &&
        'Origin' in data &&
        'Destination' in data
      ) {
        const origin = data.Origin.trim();
        const destination = data.Destination.trim();

        // if Origin is empty string, clear the startAddr to show placeholder
        setStartAddr(origin === '' ? '' : origin);
        setEndAddr(destination);
      } else {
        throw new Error('Unexpected response shape from Reagent');
      }
    } catch (err) {
      console.error(err);
      alert('Error getting address from speech. Please try to be more specific or use text input.');
    }
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

  const REAGENT_URL = 'https://noggin.rea.gent/joint-aardvark-1976';
  const API_KEY = 'rg_v1_66frrzepnpcp5yqgm1o8pp08qtf3a0mwazxm_ngk';

  const handleStart = async () => {
    // 1. Validate destination
    if (!endAddr.trim()) {
      alert('Please enter a destination');
      return;
    }

    // 2. Validate origin or geolocation
    if (!startAddr.trim() && !userLocation) {
      alert('Please enter a start address or enable location services');
      return;
    }

    setLoading(true);
    try {
      let normalizedOrigin = '';
      let normalizedDestination = '';

      // 3. Normalize addresses via Reagent (individually)
      if (startAddr.trim()) {
        const originUrl = `${REAGENT_URL}?key=${API_KEY}&address=${encodeURIComponent(startAddr)}`;
        const originRes = await fetch(originUrl);
        if (!originRes.ok) throw new Error(`Failed to normalize origin: ${originRes.status}`);
        normalizedOrigin = await originRes.text();
      }

      const destUrl = `${REAGENT_URL}?key=${API_KEY}&address=${encodeURIComponent(endAddr)}`;
      const destRes = await fetch(destUrl);
      if (!destRes.ok) throw new Error(`Failed to normalize destination: ${destRes.status}`);
      normalizedDestination = await destRes.text();
      console.log('Normalized Origin:', normalizedOrigin);
      console.log('Normalized Destination:', normalizedDestination);

      // 4. Geocode
      const originCoords = normalizedOrigin
        ? await geocode(normalizedOrigin)
        : userLocation;
      const destCoords = await geocode(normalizedDestination);

      console.log('Origin:', originCoords);
      console.log('Destination:', destCoords);

      // 5. Trigger navigation
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
  // console.log('geocode', address);
  const encoded = encodeURIComponent(address);
  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
    `${encoded}.json?access_token=${mapboxgl.accessToken}&limit=1`
  );
  const json = await res.json();
  if (!json.features?.length) throw new Error("Cannot find location");
  // console.log('geocode result', json.features[0].center);
  return json.features[0].center;
}

export default Navigation;
