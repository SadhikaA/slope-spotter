import "./App.css";
import "./Places.css";
import BottomNav from './components/BottomNav/BottomNav';
import { useNavigate } from 'react-router-dom';
import Header from "./components/Header/Header.js";
import React, { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const allPlaces = [
  { id: 1, name: "Doe Library", image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Doe_Library%2C_main_facade%2C_July_2018.jpg", alt: "Front view of Doe Library", hasIndoorMap: false, hasParkingInfo: true },
  { id: 2, name: "Cory Hall", image: "https://engineering.berkeley.edu/wp-content/uploads/2020/01/1950cory_aerial.jpg", alt: "Aerial view of Cory Hall", hasIndoorMap: false, hasParkingInfo: true },
  { id: 3, name: "Dwinelle Hall", image: "https://dac.berkeley.edu/sites/default/files/styles/panopoly_image_spotlight/public/dwinelle_building.jpg?itok=Fm-XLnkq", alt: "Outside of Dwinelle Hall", hasIndoorMap: true, hasParkingInfo: true },
  { id: 4, name: "Chou Hall", image: "https://dac.berkeley.edu/sites/default/files/styles/panopoly_image_spotlight/public/buildings-1_0/buildings-1/Haas-Chou-Building.jpg?itok=tQstg3Cz", alt: "Chou Hall entrance view", hasIndoorMap: true, hasParkingInfo: false },
  { id: 5, name: "Bauer Wurster Hall", image: "https://dac.berkeley.edu/sites/default/files/styles/panopoly_image_spotlight/public/buildings-2/buildings-2/Wurster-Building.jpg?itok=9CrQJm-P", alt: "Bauer Wurster Hall exterior", hasIndoorMap: false, hasParkingInfo: true }
];

function Places() {
  const navigate = useNavigate();
  const [savedPlaces, setSavedPlaces] = useState(allPlaces.slice(0, 3)); // Start with 3
  const [availablePlaces, setAvailablePlaces] = useState(allPlaces.slice(3)); // 2 places available
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center', skipSnaps: false, dragFree: false, draggable: true });

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
                <div className="place-card">
                  <img src={place.image} alt={place.alt} className="place-image" />
                  <h3>{place.name}</h3>

                  {place.name === "Doe Library" && (
                    <button className="map-button" onClick={() => navigate("/indoor-map")}>
                      View Indoor Map
                    </button>
                  )}
                  {place.hasParkingInfo && (
                    <div className="parking-info">🚗 Accessible Parking Available</div>
                  )}
                  
                  {/* Remove Button */}
                  <button 
                    className="remove-button" 
                    onClick={() => removePlace(place)}
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
