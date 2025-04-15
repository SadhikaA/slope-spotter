import React from 'react';
import { FaMap, FaUser, FaCog } from 'react-icons/fa';
import { MdPlace } from "react-icons/md";
import './BottomNav.css';
import { useNavigate } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <div className="bottom-nav">
      {/* TODO: have a highlighted boolean component of these to highlight which page we are currently on */}
      <FaMap className="nav-icon"  onClick={() => navigate('/navigation')}/>
      <FaUser className="nav-icon" onClick={() => navigate('/profile')}/>
      {/* TODO: make md place icon slightly large */}
      <MdPlace className="nav-icon" onClick={() => navigate('/places')}/>
      <FaCog className="nav-icon"  onClick={() => navigate('/settings')}/>
    </div>
  );
};

export default BottomNav;
