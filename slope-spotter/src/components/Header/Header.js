import { useNavigate } from "react-router-dom";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function Header({ title = "", onBack }) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b-2 border-[#004AAE] shadow-sm px-4 py-2 flex items-center justify-between">
      {/* Back Button */}
      <button
        onClick={onBack ? onBack : () => navigate("/main")}
        className="!bg-transparent text-[#010133] text-lg hover:text-[#FC9313] focus:outline-none p-1"
      >
        <FaArrowLeft />
      </button>

      {/* Centered Title */}
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-base font-semibold text-[#010133] m-0">
        {title}
      </h1>

      {/* Right Spacer for symmetry */}
      <div className="w-6" />
    </header>
  );
}
