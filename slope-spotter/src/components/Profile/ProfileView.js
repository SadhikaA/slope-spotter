import React from "react";
import { FiUser, FiMapPin, FiBookmark, FiStar } from "react-icons/fi";

const ProfileView = ({ profile, onTabChange, onSignOut }) => {
  return (
    <div className="flex flex-col items-center text-[#010133] text-base w-full">
      {/* Profile Name */}
      <h3 className="text-xl font-semibold mb-2">{`${profile.firstName} ${profile.lastName}`}</h3>

      {/* Profile Picture */}
      <div className="w-28 h-28 rounded-full overflow-hidden shadow mb-6">
        <img
          src="/john duo profile.png"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Menu */}
      <div className="w-full flex flex-col gap-4">
        <button
          onClick={() => onTabChange("edit")}
          className="flex items-center px-4 py-3 rounded-xl border border-gray-200 shadow-sm bg-white hover:bg-gray-50 transition"
        >
          <FiUser className="text-xl mr-3 text-[#004aae]" />
          <span className="text-base font-medium">Edit My Profile</span>
        </button>

        <button
          onClick={() => onTabChange("location")}
          className="flex items-center px-4 py-3 rounded-xl border border-gray-200 shadow-sm bg-white hover:bg-gray-50 transition"
        >
          <FiMapPin className="text-xl mr-3 text-[#004aae]" />
          <span className="text-base font-medium">Share My Location</span>
        </button>

        <button
          onClick={() => onTabChange("saved")}
          className="flex items-center px-4 py-3 rounded-xl border border-gray-200 shadow-sm bg-white hover:bg-gray-50 transition"
        >
          <FiBookmark className="text-xl mr-3 text-[#004aae]" />
          <span className="text-base font-medium">My Saved Places</span>
        </button>

        <button
          onClick={() => onTabChange("reviews")}
          className="flex items-center px-4 py-3 rounded-xl border border-gray-200 shadow-sm bg-white hover:bg-gray-50 transition"
        >
          <FiStar className="text-xl mr-3 text-[#004aae]" />
          <span className="text-base font-medium">My Reviews</span>
        </button>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={onSignOut}
        className="mt-6 text-red-500 text-sm underline"
      >
        Sign Out
      </button>
    </div>
  );
};

export default ProfileView;
