import React from "react";
import Header from "../Header/Header";

const EditProfile = ({ editForm, handleInputChange, saveChanges, goBack }) => {
  return (
    <div className="flex flex-col items-center bg-white text-[#010133] text-lg">
      <Header
        title="Edit Profile"
        goBack={() => (window.location.href = "/profile")}
      />

      {/* Constrained content, no forced screen height */}
      <div className="w-full max-w-md flex flex-col px-4 pt-6 overflow-y-auto navigation-scroll-container">
        {/* Name */}
        <div className="h-2"></div>
        <h3 className="text-2xl font-semibold text-center mb-4">
          {`${editForm.firstName} ${editForm.lastName}`}
        </h3>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full overflow-hidden shadow">
            <img
              src="/john duo profile.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-base mt-2 text-gray-600">Profile</span>
        </div>

        {/* Inputs */}
        <div className="space-y-5">
          {["firstName", "lastName", "email", "phoneNumber"].map((field) => (
            <div className="flex flex-col" key={field}>
              <label className="block text-lg text-gray-700 font-semibold mb-2 capitalize">
                {field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </label>
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "phoneNumber"
                    ? "tel"
                    : "text"
                }
                name={field}
                value={editForm[field]}
                onChange={handleInputChange}
                placeholder={`Enter your ${field
                  .replace(/([A-Z])/g, " $1")
                  .toLowerCase()}`}
                className="border border-gray-300 text-lg rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-8 mb-4">
          <button
            className="w-full bg-[#004aae] text-white text-lg font-semibold py-3 rounded-xl hover:bg-[#00367a] transition"
            onClick={saveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
