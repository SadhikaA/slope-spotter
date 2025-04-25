import React, { useState } from 'react';
import "./App.css";
import BottomNav from './components/BottomNav/BottomNav';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    maxSlope: 10,
    wheelchairType: "Manual",
    prefer: "Least Steep",
    fontSize: 16,
    altText: false,
    highContrast: false,
    voiceNav: false,
    showSlope: false,
    indoorNav: false
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSliderChange = (e, key) => {
    const value = parseInt(e.target.value, 10);
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveChanges = () => {
    localStorage.setItem("userSettings", JSON.stringify(settings));
    alert("Settings saved!");
  };

  return (
    <div className="App">
      <div className="container">
        <div className="page-header">
          <button className="back-arrow" onClick={() => navigate('/main')}>⬅</button>
          <h2 className="page-title">Settings</h2>
        </div>
        {/* Route Preferences */}
        <div className="section">
          <h3 className="section-title">Route Preferences</h3><hr></hr>

          <label className="slider-label">
            <label htmlFor="slopeRange" className="heading-2">Max Slope Incline</label>
            <div aria-live="polite">Currently set to: {settings.maxSlope}%</div>
            <input
              id="slopeRange"
              type="range"
              min="0"
              max="20"
              value={settings.maxSlope}
              onChange={(e) => handleSliderChange(e, "maxSlope")}
            />
            <small>Set the steepest incline your wheelchair can handle</small>
          </label>


          <div className="select-row">
            
            <div className="select-group">
              <label className="heading-2">Wheelchair Type</label>
              <br></br>
              <select
                value={settings.wheelchairType}
                onChange={(e) => setSettings({ ...settings, wheelchairType: e.target.value })}
              >
                <option>Manual</option>
                <option>Powered</option>
              </select>
            </div>

            <div className="select-group">
              <label className="heading-2">Prefer</label>
              <br></br>
              <select
                value={settings.prefer}
                onChange={(e) => setSettings({ ...settings, prefer: e.target.value })}
              >
                <option>Least Steep</option>
                <option>Shortest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Accessibility Options */}
        <div className="section">
          <h3 className="section-title">Accessibility Options</h3><hr></hr>
          {/* TODO: set all slider labels to false*/}

          <label className="slider-label">
            Font Size: ({settings.fontSize}px)
            <input
              type="range"
              min="12"
              max="24"
              value={settings.fontSize}
              onChange={(e) => handleSliderChange(e, "fontSize")}
            />
          </label>

          <div className="toggle-list">
            <div className="toggle-row">
              <span>Alt Text:</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.altText}
                  onChange={() => handleToggle("altText")}
                />
                <span className="slider" />
              </label>
            </div>
            <div className="toggle-row">
              <span>High Contrast:</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.highContrast}
                  onChange={() => handleToggle("highContrast")}
                />
                <span className="slider" />
              </label>
            </div>
            <div className="toggle-row">
              <span>Voice Navigation:</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.voiceNav}
                  onChange={() => handleToggle("voiceNav")}
                />
                <span className="slider" />
              </label>
            </div>
            <div className="toggle-row">
              <span>Show Slope Elevation:</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.showSlope}
                  onChange={() => handleToggle("showSlope")}
                />
                <span className="slider" />
              </label>
            </div>
            <div className="toggle-row">
              <span>Indoor Navigation:</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.indoorNav}
                  onChange={() => handleToggle("indoorNav")}
                />
                <span className="slider" />
              </label>
            </div>
          </div>
        </div>

        <button className="button" onClick={saveChanges}>
          Save Changes
        </button>
      </div>
      <BottomNav />
    </div>
  );
}

export default Settings;
