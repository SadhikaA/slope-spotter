// components/Profile/SavedPlaces.js
import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

const SavedPlaces = ({ savedPlaces, onRemove, onSelect, goBack, navigate }) => {
  return (
    <>
      <div className="header">
        <button className="back-button" onClick={goBack}>
          <FiArrowLeft />
        </button>
        <h2>My Saved Places</h2>
      </div>

      <div className="places-scroll-container">
        {savedPlaces.length > 0 ? (
          savedPlaces.map((place) => (
            <div className="place-card" key={place.id} onClick={() => onSelect(place.id)}>
              <div className="place-card-content">
                <img 
                  src={place.image} 
                  alt={place.alt} 
                  className="saved-place-image"
                />
                <h3 className="saved-place-name">{place.name}</h3>

                {place.hasIndoorMap && (
                  <button 
                    className="map-button" 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/indoor-map");
                    }}
                  >
                    View Indoor Map
                  </button>
                )}

                {place.hasParkingInfo && (
                  <div className="parking-info">
                    🚗 Accessible Parking Available
                  </div>
                )}
              </div>

              <button 
                className="remove-button" 
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(place.id);
                }}
                aria-label={`Remove ${place.name}`}
              >
                ✖️
              </button>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>You haven't saved any places yet.</p>
            <button 
              className="button" 
              onClick={() => navigate('/places')}
            >
              Explore Places
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SavedPlaces;
