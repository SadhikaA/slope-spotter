import { useNavigate } from "react-router-dom";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./Header.css";

export default function Header({ title = "" }) {
  const navigate = useNavigate();
  return (
    <div className="App">
    <div className="header-wrapper">
      <header className="header">
        <button onClick={() => navigate('/main')} className="back-button">
          <FaArrowLeft />
        </button>
        <h2>{title}</h2>
      </header>
    </div>
    </div>
  );
}

