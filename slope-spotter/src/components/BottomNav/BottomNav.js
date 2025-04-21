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
    <div className="bottom-nav">
      <FaMap
        className={`nav-icon ${activeTab === 'map' ? 'active' : ''}`}
        onClick={() => navigate('/navigation')}
      />
      <FaUser
        className={`nav-icon ${activeTab === 'user' ? 'active' : ''}`}
        onClick={() => navigate('/profile')}
      />
      <MdPlace
        className={`nav-icon ${activeTab === 'place' ? 'active place-icon' : 'place-icon'}`}
        onClick={() => navigate('/places')}
      />
      <FaCog
        className={`nav-icon ${activeTab === 'settings' ? 'active' : ''}`}
        onClick={() => navigate('/settings')}
      />
    </div>
  );
};

export default BottomNav;
