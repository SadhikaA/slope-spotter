// components/Profile/LocationShare.js
import React from 'react';
import { FiArrowLeft, FiShare2, FiCheck } from 'react-icons/fi';
import MapBox from '../MapBox/MapBox';

const LocationShare = ({
  locationName,
  userLocation,
  shareOptions,
  shareDuration,
  copySuccess,
  handleDurationChange,
  toggleShareOption,
  generateShareLink,
  copyToClipboard,
  handleShare,
  goBack
}) => {
  return (
    <>
      <div className="header">
        <button className="back-button" onClick={goBack}>
          <FiArrowLeft />
        </button>
        <h2>Share My Location</h2>
      </div>
      
      <div className="location-scroll-container">
        <div className="location-map-container">
          <MapBox />
          <div className="location-info">
            <h3>{locationName}</h3>
            {userLocation && (
              <p className="location-coordinates">
                {userLocation[1].toFixed(6)}, {userLocation[0].toFixed(6)}
              </p>
            )}
          </div>
        </div>

        <div className="share-options-container">
          <h3>Share with</h3>
          <div className="share-options">
            {shareOptions.map(option => (
              <button 
                key={option.id}
                className={`share-option-button ${option.active ? 'active' : ''}`}
                onClick={() => toggleShareOption(option.id)}
              >
                {option.name}
              </button>
            ))}
          </div>

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

          <div className="share-link-container">
            <input
              type="text"
              value={generateShareLink()}
              readOnly
              className="share-link-input"
            />
            <button 
              className="copy-side-button"
              onClick={copyToClipboard}
            >
              {copySuccess ? <FiCheck /> : "Copy Link"}
            </button>
          </div>

          <button 
            className="share-button"
            onClick={handleShare}
          >
            <FiShare2 className="share-icon" />
            Share My Location
          </button>
        </div>
      </div>
    </>
  );
};

export default LocationShare;
