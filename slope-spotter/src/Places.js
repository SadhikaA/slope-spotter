import "./App.css";
import "./Places.css";
import BottomNav from './components/BottomNav/BottomNav';
import { useNavigate } from 'react-router-dom';
import Header from "./components/Header/Header.js";
import React, { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { allPlaces } from './data/placesData';
import PlaceDetails from './PlaceDetails';

function Places() {
  const navigate = useNavigate();
  const [savedPlaces, setSavedPlaces] = useState(allPlaces.slice(0, 3)); // Start with 3
  const [availablePlaces, setAvailablePlaces] = useState(allPlaces.slice(3)); // 2 places available
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center', skipSnaps: false, dragFree: false, draggable: true });
  const [selectedPlace, setSelectedPlace] = useState(null);

  function addPlace(place) {
    setSavedPlaces([...savedPlaces, place]);
    setAvailablePlaces(availablePlaces.filter(p => p.id !== place.id));
    setIsModalOpen(false);

    // Scroll to the new card
    setTimeout(() => {
      emblaApi && emblaApi.scrollTo(savedPlaces.length);
    }, 100);
  }

  function removePlace(place) {
    setSavedPlaces(savedPlaces.filter(p => p.id !== place.id));
    setAvailablePlaces([...availablePlaces, place]);
  }

  return (
    <div className="App">
      <div className="container">
        <Header title="Places"/>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {savedPlaces.map((place) => (
              <div className="embla__slide" key={place.id}>
                <div className="place-card" onClick={() => setSelectedPlace(place)} style={{ cursor: 'pointer' }}                  >
                  <img src={place.image} alt={place.alt} className="place-image" />
                  <h3>{place.name}</h3>

                  {place.name === "Doe Library" && (
                    <button className="map-button" 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/indoor-map");
                      }}
                    >
                      View Indoor Map
                    </button>
                  )}
                  {place.hasParkingInfo && (
                    <div className="parking-info">🚗 Accessible Parking Available</div>
                  )}
                  
                  {/* Remove Button */}
                  <button 
                    className="remove-button" 
                    onClick={(e) => {
                      e.stopPropagation();
                      removePlace(place)
                    }}
                  >
                    ✖️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows and Add Button */}
        <div className="embla-buttons">
          <button onClick={() => emblaApi && emblaApi.scrollPrev()}>
            {/* Left Arrow SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="32" height="32">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>

          <button onClick={() => setIsModalOpen(true)}>
            {/* Add Button SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="32" height="32">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>
          </button>

          <button onClick={() => emblaApi && emblaApi.scrollNext()}>
            {/* Right Arrow SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="32" height="32">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        {/* Place Details Popup */}
        {selectedPlace && (
          <div className="modal-overlay" onClick={() => setSelectedPlace(null)}>
            <PlaceDetails place={selectedPlace} onClose={() => setSelectedPlace(null)} />
          </div>
        )}

        {/* Modal Popup */}
        {isModalOpen && (
          <div className="modal-overlay">
          <div className="modal-content">

            <div className="modal-header">
              <h2>Select a place to add:</h2>
            </div>

            <div className="modal-place-list">
              {availablePlaces.map(place => (
                <button key={place.id} className="add-place-button" onClick={() => addPlace(place)}>
                  {place.name}
                </button>
              ))}
            </div>

            <button className="close-modal-button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
        )}
        <BottomNav />
      </div>
    </div>
  );
}

export default Places;
