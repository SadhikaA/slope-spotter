import React from "react";
import { ReactComponent as DeleteIcon } from "../../assets/deleta.svg";
import ReloadingHeader from "../Header/ReloadingHeader";

const SavedPlaces = ({ savedPlaces, onRemove, onSelect, goBack, navigate }) => {
  return (
    <div className="w-full max-w-md px-4 pt-4 pb-[5.5rem] mx-auto space-y-6">
      <ReloadingHeader title="My Saved Places" goBack={goBack} />

      {savedPlaces.length > 0 ? (
        savedPlaces.map((place) => (
          <div
            key={place.id}
            onClick={() => onSelect(place.id)}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between relative hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={place.image}
              alt={place.alt}
              className="w-full h-48 object-cover rounded-xl mb-3"
            />

            <h3 className="text-xl font-bold text-[#010133] text-center mb-1">
              {place.name}
            </h3>

            {place.hasParkingInfo && (
              <div className="flex gap-2 items-center justify-center mt-2 text-base text-gray-700">
                <span>🚗</span>
                <span>Accessible Parking Available</span>
              </div>
            )}

            <div className="flex flex-col items-center mt-auto pt-3">
              {place.hasIndoorMap && (
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
                onRemove(place.id);
              }}
              aria-label={`Remove ${place.name}`}
            >
              <DeleteIcon className="w-5 h-5 fill-gray-700 hover:fill-red-600 transition" />
            </button>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-600 mt-10 space-y-4">
          <p>You haven't saved any places yet.</p>
          <button
            className="bg-[#004aae] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#00367a] transition"
            onClick={() => navigate("/places")}
          >
            Explore Places
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedPlaces;
