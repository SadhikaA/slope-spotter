import { useNavigate } from 'react-router-dom';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './Header.css';

export default function Header({ title = "" }) {
    const navigate = useNavigate();
  return (
    <header>
      <button onClick={() => navigate('/main')} className="back-button">
      <FaArrowLeft />
      </button>
      <h2>{title}</h2>
    </header>
  );
}
