import React from "react";
import { FiShare2, FiCheck } from "react-icons/fi";
import MapBox from "../MapBox/MapBox";
import ReloadingHeader from "../Header/ReloadingHeader";

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
  goBack,
}) => {
  return (
    <div className="w-full max-w-md px-4 pt-4 pb-[5.5rem] mx-auto space-y-6">
      <ReloadingHeader title="Share My Location" goBack={goBack} />

      {/* Map Section */}
      <div className="rounded-xl overflow-hidden shadow-md mt-2">
        <MapBox />
        <div className="bg-white p-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-[#010133]">
            {locationName}
          </h3>
          {userLocation && (
            <p className="text-gray-600 text-sm mt-1">
              {userLocation[1].toFixed(6)}, {userLocation[0].toFixed(6)}
            </p>
          )}
        </div>
      </div>

      {/* Share Options */}
      <div>
        <h3 className="text-lg font-semibold text-[#010133] mb-2">
          Share with
        </h3>
        <div className="flex gap-2">
          {shareOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleShareOption(option.id)}
              className={`flex-1 py-2 rounded-lg text-base font-medium border ${
                option.active
                  ? "bg-[#004aae] text-white"
                  : "bg-gray-100 text-gray-700"
              } transition`}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      {/* Duration Slider */}
      <div>
        <h3 className="text-lg font-semibold text-[#010133] mb-2">Share for</h3>
        <input
          type="range"
          min="15"
          max="120"
          step="15"
          value={shareDuration}
          onChange={handleDurationChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>15m</span>
          <span>1h</span>
          <span>2h</span>
        </div>
        <p className="mt-2 text-center font-medium text-[#010133] text-lg">
          {shareDuration} minutes
        </p>
      </div>

      {/* Share Link */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={generateShareLink()}
          readOnly
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 rounded-lg bg-[#004aae] text-white font-semibold hover:bg-[#00367a] transition"
        >
          {copySuccess ? <FiCheck /> : "Copy Link"}
        </button>
      </div>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="w-full py-3 mt-2 bg-[#004aae] text-white text-lg font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#00367a] transition"
      >
        <FiShare2 className="text-xl" />
        Share My Location
      </button>
    </div>
  );
};

export default LocationShare;
