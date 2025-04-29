import React, { useState, useEffect, useRef } from 'react';
import { FiArrowLeft, FiShare2, FiCopy, FiCheck } from 'react-icons/fi';
import "./App.css";
import BottomNav from './components/BottomNav/BottomNav';
import MapBox from './components/MapBox/MapBox';
import mapboxgl from 'mapbox-gl';

function ShareLocation({ setActiveTab }) {
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(true);
  const [shareOptions, setShareOptions] = useState([
    { id: 1, name: "Family", active: true },
    { id: 2, name: "Friends", active: false },
    { id: 3, name: "Emergency Contacts", active: false }
  ]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareDuration, setShareDuration] = useState(30); // minutes
  const mapRef = useRef();

  // Get user's location
  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const coords_array = [coords.longitude, coords.latitude];
        setUserLocation(coords_array);
        
        // Reverse geocode to get location name
        try {
          const name = await reverseGeocode(coords_array);
          setLocationName(name);
        } catch (error) {
          console.error("Error getting location name:", error);
          setLocationName("Current Location");
        }
        
        setLoading(false);
      },
      (err) => {
        console.warn("Geolocation failed:", err);
        setLoading(false);
      }
    );
  }, []);

  // Update map when user location changes
  useEffect(() => {
    if (userLocation && mapRef.current) {
      // Center map on user location
      mapRef.current.flyTo(userLocation);
      
      // Add marker at user location
      mapRef.current.addMarker(userLocation);
    }
  }, [userLocation]);

  // Toggle share option selection
  const toggleShareOption = (id) => {
    setShareOptions(shareOptions.map(option => 
      option.id === id ? { ...option, active: !option.active } : option
    ));
  };

  // Handle share duration change
  const handleDurationChange = (e) => {
    setShareDuration(parseInt(e.target.value, 10));
  };

  // Generate shareable link
  const generateShareLink = () => {
    if (!userLocation) return "";
    
    const [longitude, latitude] = userLocation;
    const baseUrl = window.location.origin;
    return `${baseUrl}/location?lat=${latitude}&lng=${longitude}&name=${encodeURIComponent(locationName)}`;
  };

  // Copy link to clipboard
  const copyToClipboard = () => {
    const link = generateShareLink();
    navigator.clipboard.writeText(link)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };

  // Handle share button click
  const handleShare = () => {
    const link = generateShareLink();
    
    // Get active share options
    const activeOptions = shareOptions.filter(option => option.active);
    
    if (activeOptions.length === 0) {
      alert("Please select at least one group to share with");
      return;
    }
    
    // In a real app, this would send the location to selected contacts
    // For now, we'll just show an alert
    alert(`Location shared with: ${activeOptions.map(o => o.name).join(", ")} for ${shareDuration} minutes`);
    
    // Native share if available
    if (navigator.share) {
      navigator.share({
        title: 'My Location',
        text: `Check my location: ${locationName}`,
        url: link,
      })
      .catch((error) => console.log('Error sharing', error));
    }
  };

  // Reverse geocode to get location name
  const reverseGeocode = async (coords) => {
    const [lng, lat] = coords;
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
      `${lng},${lat}.json?access_token=${mapboxgl.accessToken}&limit=1`
    );
    const json = await res.json();
    if (!json.features?.length) return "Current Location";
    return json.features[0].place_name.split(',')[0];
  };

  return (
    <>
      <div className="header">
        <button className="back-button" onClick={() => setActiveTab("profile")}>
          <FiArrowLeft />
        </button>
        <h2>Share My Location</h2>
      </div>
      
      <div className="location-scroll-container">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Getting your location...</p>
          </div>
        ) : (
          <div className="location-content">
            {/* Map */}
            <div className="location-map-container">
              <MapBox ref={mapRef} />
              {userLocation && (
                <div className="location-info">
                  <h3>{locationName}</h3>
                  <p className="location-coordinates">
                    {userLocation[1].toFixed(6)}, {userLocation[0].toFixed(6)}
                  </p>
                </div>
              )}
            </div>
            
            {/* Share options */}
            <div className="share-options-container">
              <h3>Share with</h3>
              <div className="share-options">
                {shareOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`share-option-button ${option.active ? 'active' : ''}`}
                    onClick={() => toggleShareOption(option.id)}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
              
              {/* Duration slider */}
              <div className="duration-container">
                <h3>Share for</h3>
                <div className="slider-container">
                  <input
                    type="range"
                    min="15"
                    max="120"
                    step="15"
                    value={shareDuration}
                    onChange={handleDurationChange}
                    className="duration-slider"
                  />
                  <div className="slider-labels">
                    <span>15m</span>
                    <span>1h</span>
                    <span>2h</span>
                  </div>
                  <p className="duration-value">{shareDuration} minutes</p>
                </div>
              </div>
              
              {/* Share link */}
              <div className="share-link-container">
                <div className="share-link">
                  <input
                    type="text"
                    value={generateShareLink()}
                    readOnly
                    className="share-link-input"
                  />
                  <button 
                    className="copy-button"
                    onClick={copyToClipboard}
                  >
                    {copySuccess ? <FiCheck /> : <FiCopy />}
                  </button>
                </div>
              </div>
              
              {/* Share button */}
              <button 
                className="share-button" 
                onClick={handleShare}
                disabled={!userLocation}
              >
                <FiShare2 className="share-icon" />
                Share My Location
              </button>
            </div>
          </div>
        )}
      </div>
      
      <BottomNav />
    </>
  );
}

export default ShareLocation;