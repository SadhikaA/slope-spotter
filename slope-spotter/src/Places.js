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
        <div className="flex-grow overflow-hidden mt-10" ref={emblaRef}>
          <div
            className="flex gap-4 ml-4"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {savedPlaces.map((place) => (
              <div
                key={place.id}
                className="flex-shrink-0 w-full max-w-xs snap-start px-2"
              >
                <div
                  className="bg-white rounded-2xl shadow-md p-4 flex flex-col relative hover:shadow-lg transition w-full"
                  onClick={() => setSelectedPlace(place.id)}
                >
                  <img
                    src={place.image}
                    alt={place.alt}
                    className="rounded-lg object-cover h-40 w-full"
                  />
                  <h3 className="mt-3 text-lg font-semibold text-center">
                    {place.name}
                  </h3>

                  <div className="mt-2 text-sm text-gray-700 space-y-2 text-left px-2">
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

                  {place.name === "Doe Library" && (
                    <button
                      className="bg-[#004aae] text-white mt-4 py-2 rounded-xl w-4/5 mx-auto text-sm font-medium"
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

                  <button
                    className="absolute top-3 right-3"
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
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="w-14 h-14 bg-[#004aae] text-white rounded-xl flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-14 h-14 bg-[#004aae] text-white rounded-xl flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            onClick={() => emblaApi?.scrollNext()}
            className="w-14 h-14 bg-[#004aae] text-white rounded-xl flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
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
            <div className="bg-white w-11/12 max-w-sm p-6 rounded-2xl flex flex-col items-center space-y-4">
              <h2 className="text-xl font-semibold text-[#010133]">
                Add a Place:
              </h2>

              <div className="w-full flex flex-col gap-2">
                {availablePlaces.map((place) => (
                  <button
                    key={place.id}
                    onClick={() => addPlace(place)}
                    className="bg-[#004aae] text-white py-2 rounded-lg font-medium hover:bg-[#002c73]"
                  >
                    {place.name}
                  </button>
                ))}
              </div>

              <button
                className="w-full mt-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium"
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
