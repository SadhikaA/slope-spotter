import React, { useState } from 'react';
import "./App.css";
import BottomNav from './components/BottomNav/BottomNav';
import Header from './components/Header/Header';
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
        <Header title="Settings" />
        {/* Route Preferences */}
        <div className="section">
          <h3 className="section-title" style={{paddingTop: '30px'}}>Route Preferences</h3><hr></hr>
          <label className="slider-label">
            <label htmlFor="slopeRange">Max Slope Incline</label>
            <div aria-live="polite">Currently set to: {settings.maxSlope}%</div>
            <small>Set the steepest incline your wheelchair can handle</small>
            <input
              id="slopeRange"
              type="range"
              min="0"
              max="20"
              value={settings.maxSlope}
              onChange={(e) => handleSliderChange(e, "maxSlope")}
            />
          </label>
          <div className="select-row">
            <div className="select-group">
              <label>Wheelchair Type</label>
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
              <label>Prefer</label>
              <br></br>
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

        {/* Accessibility Options */}
        <div className="section">
          <h3 className="section-title">Accessibility Options</h3><hr></hr>
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

        <div className="section">
        <button className="button" onClick={saveChanges}>
          Save Changes
        </button>
          </div>
          <BottomNav />
      </div>
    </div>
  );
}

export default Settings;
