import React from 'react';
import { FaMap, FaUser, FaCog } from 'react-icons/fa';
import './BottomNav.css';

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <FaMap className="nav-icon" />
      <FaUser className="nav-icon" />
      <FaCog className="nav-icon" />
    </div>
  );
};

export default BottomNav;
