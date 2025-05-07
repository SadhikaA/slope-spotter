import "./App.css";
import BottomNav from "./components/BottomNav/BottomNav";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header/Header.js";
import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { allPlaces } from "./data/placesData";
import PlaceDetails from "./PlaceDetails";
import { ReactComponent as DeleteIcon } from "./assets/deleta.svg";
import PageContainer from "./components/BottomNav/PageContainer";

function Places() {
  const navigate = useNavigate();
  const [savedPlaces, setSavedPlaces] = useState(allPlaces.slice(0, 3));
  const [availablePlaces, setAvailablePlaces] = useState(allPlaces.slice(3));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    skipSnaps: false,
    dragFree: false,
    draggable: true,
  });
  const [selectedPlace, setSelectedPlace] = useState(null);

  function addPlace(place) {
    setSavedPlaces([...savedPlaces, place]);
    setAvailablePlaces(availablePlaces.filter((p) => p.id !== place.id));
    setIsModalOpen(false);

    setTimeout(() => {
      emblaApi && emblaApi.scrollTo(savedPlaces.length);
    }, 100);
  }

  function removePlace(place) {
    setSavedPlaces(savedPlaces.filter((p) => p.id !== place.id));
    setAvailablePlaces([...availablePlaces, place]);
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageContainer className="flex flex-col flex-grow">
        <Header title="Places" />
        {/* Cards should grow */}
        <div className="flex-grow overflow-hidden mt-14" ref={emblaRef}>
          <div
            className="flex gap-4 ml-4"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {savedPlaces.map((place) => (
              <div
                key={place.id}
                className="flex-shrink-0 w-full max-w-sm snap-start px-4 sm:px-6"
              >
                <div
                  className="bg-white rounded-2xl shadow-md p-6 min-h-[500px] flex-grow flex flex-col justify-between relative hover:shadow-lg transition w-full"
                  onClick={() => setSelectedPlace(place.id)}
                >
                  <img
                    src={place.image}
                    alt={place.alt}
                    className="rounded-lg object-cover h-52 w-full"
                  />
                  <h3 className="mt-3 text-2xl font-bold text-center pb-1">
                    {place.name}
                  </h3>

                  <div className="mt-2 text-lg text-gray-700 space-y-2 text-left px-2 pb-2">
                    {place.accessibility && (
                      <div className="flex gap-2 items-start">
                        <span>♿</span>
                        <span>{place.accessibility}</span>
                      </div>
                    )}
                    {place.entrance && (
                      <div className="flex gap-2 items-start">
                        <span>🚪</span>
                        <span>Accessible entrance: {place.entrance}</span>
                      </div>
                    )}
                    {place.hasParkingInfo && (
                      <div className="flex gap-2 items-start">
                        <span>🚗</span>
                        <span>Accessible Parking Available</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center mt-auto">
                    {place.name === "Doe Library" && (
                      <button
                        className="bg-[#004aae] text-white py-2 rounded-xl w-4/5 mx-auto text-sm font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/indoor-map");
                        }}
                      >
                        View Indoor Map
                      </button>
                    )}
                    <div className="bg-[#004aae] text-white mt-2 py-2 rounded-xl w-4/5 mx-auto text-sm font-medium text-center cursor-default select-none">
                      Show More
                    </div>
                  </div>

                  <button
                    className="absolute top-3 left-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePlace(place);
                    }}
                    aria-label="Remove place"
                  >
                    <DeleteIcon className="w-5 h-5 fill-gray-700 hover:fill-red-600 transition" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center px-6 gap-4 mt-4 mb-6">
          {/* Left Arrow */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="w-16 h-16 bg-[#004aae] text-white rounded-xl flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Plus Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-16 h-16 bg-[#004aae] text-white rounded-xl flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="w-16 h-16 bg-[#004aae] text-white rounded-xl flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        {selectedPlace && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            onClick={() => setSelectedPlace(null)}
          >
            <PlaceDetails
              placeId={selectedPlace}
              onClose={() => setSelectedPlace(null)}
            />
          </div>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-11/12 max-w-md p-8 rounded-3xl flex flex-col items-center space-y-6 shadow-lg">
              <h2 className="text-2xl font-bold text-[#010133]">
                Add a Place:
              </h2>

              <div className="w-full flex flex-col gap-3">
                {availablePlaces.map((place) => (
                  <button
                    key={place.id}
                    onClick={() => addPlace(place)}
                    className="bg-[#004aae] text-white text-lg py-3 rounded-xl font-semibold hover:bg-[#00367a] transition"
                  >
                    {place.name}
                  </button>
                ))}
              </div>

              <button
                className="w-full py-3 rounded-xl bg-gray-200 text-gray-700 text-lg font-medium hover:bg-gray-300 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </PageContainer>
      <BottomNav />
    </div>
  );
}

export default Places;
