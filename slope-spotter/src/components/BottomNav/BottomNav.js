import React, { useState, useEffect } from 'react';
import { FaMap, FaUser, FaCog } from 'react-icons/fa';
import { MdPlace } from "react-icons/md";
import './BottomNav.css';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getPathKey = (path) => {
    switch (path) {
      case '/navigation': return 'map';
      case '/profile': return 'user';
      case '/places': return 'place';
      case '/settings': return 'settings';
      default: return '';
    }
  };

  const [activeTab, setActiveTab] = useState(getPathKey(location.pathname));

  useEffect(() => {
    setActiveTab(getPathKey(location.pathname));
  }, [location.pathname]);

  return (
  <div className="App">
    <div className="bottom-nav">
    <div className="nav-item" onClick={() => navigate('/navigation')}>
      <FaMap className={`nav-icon ${activeTab === 'map' ? 'active' : ''}`} />
      <span className={`nav-label ${activeTab === 'map' ? 'active' : ''}`}>Map</span>
    </div>
    <div className="nav-item" onClick={() => navigate('/places')}>
      <MdPlace className={`nav-icon ${activeTab === 'place' ? 'active place-icon' : 'place-icon'}`} />
      <span className={`nav-label ${activeTab === 'place' ? 'active' : ''}`}>Places</span>
    </div>
    <div className="nav-item" onClick={() => navigate('/profile')}>
      <FaUser className={`nav-icon ${activeTab === 'user' ? 'active' : ''}`} />
      <span className={`nav-label ${activeTab === 'user' ? 'active' : ''}`}>Profile</span>
    </div>
    <div className="nav-item" onClick={() => navigate('/settings')}>
      <FaCog className={`nav-icon ${activeTab === 'settings' ? 'active' : ''}`} />
      <span className={`nav-label ${activeTab === 'settings' ? 'active' : ''}`}>Settings</span>
    </div>
  </div>
  </div>
  );
};

export default BottomNav;
