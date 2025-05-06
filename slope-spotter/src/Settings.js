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
      <div className="w-full max-w-md flex flex-col px-4 py-6 flex-grow overflow-y-auto pb-[5.5rem]">
        <Header title="Settings" />
        <div className="h-5" />

        {/* Route Preferences */}
        <div className="mb-8 mt-4">
          <h3 className="text-xl font-semibold text-[#010133] mb-4">
            Route Preferences
          </h3>

          {/* Max Slope Slider */}
          <label className="block mb-4">
            <span className="block font-medium text-[#010133] mb-1">
              Max Slope Incline
            </span>
            <div className="text-sm text-gray-600 mb-1">
              Currently set to: {settings.maxSlope}%
            </div>
            <small className="text-xs text-gray-500">
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

          {/* Wheelchair Type */}
          <div className="mb-4">
            <label className="block font-medium text-[#010133] mb-1">
              Wheelchair Type
            </label>
            <select
              value={settings.wheelchairType}
              onChange={(e) =>
                setSettings({ ...settings, wheelchairType: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Manual</option>
              <option>Powered</option>
            </select>
          </div>

          {/* Route Preference */}
          <div className="mb-4">
            <label className="block font-medium text-[#010133] mb-1">
              Route Preference
            </label>
            <select
              value={settings.prefer}
              onChange={(e) =>
                setSettings({ ...settings, prefer: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Less Steep</option>
              <option>Shorter Distance</option>
            </select>
          </div>
        </div>

        {/* Accessibility Options */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-[#010133] mb-4">
            Accessibility Options
          </h3>

          {/* Font Size Slider */}
          <label className="block mb-4">
            <span className="block font-medium text-[#010133] mb-1">
              Font Size
            </span>
            <div className="text-sm text-gray-600 mb-1">
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

          {/* Toggles */}
          <div className="space-y-4">
            {[
              { label: "Alt Text", key: "altText" },
              { label: "High Contrast", key: "highContrast" },
              { label: "Voice Navigation", key: "voiceNav" },
              { label: "Show Slope Elevation", key: "showSlope" },
              { label: "Indoor Navigation", key: "indoorNav" },
            ].map(({ label, key }) => (
              <div className="flex items-center justify-between" key={key}>
                <span className="text-sm font-medium text-[#010133]">
                  {label}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[key]}
                    onChange={() => handleToggle(key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[#004aae] transition"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 mb-4">
          <button
            onClick={saveChanges}
            className="bg-[#004aae] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#00367a] transition w-full"
          >
            Save Changes
          </button>
          {saved && (
            <div className="text-green-600 mt-3 font-medium text-center">
              ✅ Settings saved successfully!
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default Settings;
