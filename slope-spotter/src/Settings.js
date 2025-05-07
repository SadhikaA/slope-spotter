import React, { useState } from "react";
import BottomNav from "./components/BottomNav/BottomNav";
import Header from "./components/Header/Header";

function Settings() {
  const [settings, setSettings] = useState({
    maxSlope: 10,
    wheelchairType: "Manual",
    prefer: "Less Steep",
    fontSize: 16,
    altText: false,
    highContrast: false,
    voiceNav: true,
    showSlope: true,
    indoorNav: true,
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSliderChange = (e, key) => {
    const value = parseInt(e.target.value, 10);
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const saveChanges = () => {
    localStorage.setItem("userSettings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center bg-white ${
        settings.highContrast ? "high-contrast" : ""
      }`}
    >
      {saved && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300">
          ✅ Settings saved successfully!
        </div>
      )}

      <div className="w-full max-w-md flex flex-col px-4 py-6 flex-grow pb-[5.5rem] navigation-scroll-container">
        <Header title="Settings" />

        <div className="mb-8 mt-6">
          <h3 className="text-2xl font-bold text-[#010133] text-center mb-6">
            Route Preferences
          </h3>

          <label className="block mb-6">
            <span className="block text-lg font-semibold text-[#010133] mb-1">
              Max Slope Incline
            </span>
            <div className="text-base text-gray-700 mb-1">
              Currently set to: {settings.maxSlope}%
            </div>
            <small className="text-sm text-gray-500">
              Set the steepest incline your wheelchair can handle
            </small>
            <input
              type="range"
              min="0"
              max="20"
              value={settings.maxSlope}
              onChange={(e) => handleSliderChange(e, "maxSlope")}
              className="w-full mt-2"
            />
          </label>

          <div className="mb-6">
            <label className="block text-lg font-semibold text-[#010133] mb-1">
              Wheelchair Type
            </label>
            <select
              value={settings.wheelchairType}
              onChange={(e) =>
                setSettings({ ...settings, wheelchairType: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Manual</option>
              <option>Powered</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="text-2xl font-bold text-[#010133] text-center mb-6">
              Route Preference
            </label>
            <select
              value={settings.prefer}
              onChange={(e) =>
                setSettings({ ...settings, prefer: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Less Steep</option>
              <option>Shorter Distance</option>
            </select>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-[#010133] text-center mb-6">
            Accessibility Options
          </h3>

          <label className="block mb-6">
            <span className="block text-lg font-semibold text-[#010133] mb-1">
              Font Size
            </span>
            <div className="text-base text-gray-700 mb-1">
              ({settings.fontSize}px)
            </div>
            <input
              type="range"
              min="12"
              max="24"
              value={settings.fontSize}
              onChange={(e) => handleSliderChange(e, "fontSize")}
              className="w-full mt-2"
            />
          </label>

          <div className="space-y-5">
            {[
              { label: "Alt Text", key: "altText" },
              { label: "High Contrast", key: "highContrast" },
              { label: "Voice Navigation", key: "voiceNav" },
              { label: "Show Slope Elevation", key: "showSlope" },
              { label: "Indoor Navigation", key: "indoorNav" },
            ].map(({ label, key }) => (
              <div className="flex items-center justify-between" key={key}>
                <span className="text-lg font-medium text-[#010133]">
                  {label}
                </span>
                <label className="relative inline-block w-12 h-7">
                  <input
                    type="checkbox"
                    checked={settings[key]}
                    onChange={() => handleToggle(key)}
                    className="sr-only peer"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-full peer-checked:bg-[#004aae] transition-colors duration-300"></div>
                  <div className="absolute top-[2px] left-[2px] w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-5"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 mb-4">
          <button
            onClick={saveChanges}
            className="bg-[#004aae] text-white text-xl px-6 py-3 rounded-xl font-semibold hover:bg-[#00367a] transition w-full"
          >
            Save Changes
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default Settings;
