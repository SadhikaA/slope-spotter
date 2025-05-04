import React, { useState } from 'react';
import "./App.css";
import BottomNav from './components/BottomNav/BottomNav';
import Header from './components/Header/Header';

function Settings() {
  const [settings, setSettings] = useState({
    maxSlope: 10,
    wheelchairType: "Manual",
    prefer: "Less Steep",
    fontSize: 16,
    altText: false,
    highContrast: false,
    voiceNav: false,
    showSlope: false,
    indoorNav: false
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSliderChange = (e, key) => {
    const value = parseInt(e.target.value, 10);
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveChanges = () => {
    localStorage.setItem("userSettings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className={`App ${settings.highContrast ? 'high-contrast' : ''}`}>
      <div className="container">
        <Header title="Settings" />

        {/* Scrollable Settings Container */}
        <div className="settings-scroll-container">
          {/* Route Preferences Section */}
          <div className="section">
            <div className="section-header">
              <div className="settings-compact-box">
                <h3 className="section-title">Route Preferences</h3>
              </div>
            </div>
            
            <div className="settings-group">
              <label className="slider-label">
                <span className="slider-title">Max Slope Incline</span>
                <div
                  aria-live="polite"
                  className="slider-subtext"
                >
                  Currently set to: {settings.maxSlope}%
                </div>
                <small className="slider-description">Set the steepest incline your wheelchair can handle</small>
                <input
                  id="slopeRange"
                  type="range"
                  min="0"
                  max="20"
                  value={settings.maxSlope}
                  onChange={(e) => handleSliderChange(e, "maxSlope")}
                  style={{ "--value": settings.maxSlope / 20 }}
                />
              </label>
              
              <div className="select-group">
                <label className="select-label">Wheelchair Type</label>
                <select
                  value={settings.wheelchairType}
                  onChange={(e) => setSettings({ ...settings, wheelchairType: e.target.value })}
                >
                  <option>Manual</option>
                  <option>Powered</option>
                </select>
              </div>
              
              <div className="select-group">
                <label className="select-label">Route Preference</label>
                <select
                  value={settings.prefer}
                  onChange={(e) => setSettings({ ...settings, prefer: e.target.value })}
                >
                  <option>Less Steep</option>
                  <option>Shorter Distance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Accessibility Options Section */}
          <div className="section">
            <div className="section-header">
              <div className="settings-compact-box">
                <h3 className="section-title">Accessibility Options</h3>
              </div>
            </div>
            
            <div className="settings-group">
              <label className="slider-label">
                <span className="slider-title">Font Size</span>
                <div className="slider-subtext">({settings.fontSize}px)</div>
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={settings.fontSize}
                  onChange={(e) => handleSliderChange(e, "fontSize")}
                  style={{ "--value": (settings.fontSize - 12) / 12 }}
                />
              </label>
              <div className="toggle-list">
                {[
                  { label: "Alt Text", key: "altText" },
                  { label: "High Contrast", key: "highContrast" },
                  { label: "Voice Navigation", key: "voiceNav" },
                  { label: "Show Slope Elevation", key: "showSlope" },
                  { label: "Indoor Navigation", key: "indoorNav" }
                ].map(({ label, key }) => (
                  <div className="toggle-row" key={key}>
                    <span>{label}:</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={settings[key]}
                        onChange={() => handleToggle(key)}
                      />
                      <span className="slider" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Save Button + Feedback */}
          <div className="section">
            <button className="button" onClick={saveChanges}>
              Save Changes
            </button>
            {saved && (
              <div style={{ color: "#28a745", marginTop: "10px", fontWeight: 500 }}>
                ✅ Settings saved successfully!
              </div>
            )}
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

export default Settings;