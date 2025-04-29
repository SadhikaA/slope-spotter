import { useNavigate } from "react-router-dom";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./Header.css";

export default function Header({ title = "", onBack }) {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="header-wrapper">
        <header className="header">
          <button 
            onClick={onBack ? onBack : () => navigate('/main')} 
            className="back-button"
          >
            <FaArrowLeft />
          </button>
          <h2>{title}</h2>
        </header>
      </div>
    </div>
  );
}
