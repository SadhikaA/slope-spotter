import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function ReloadingHeader({ title = "" }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b-2 border-[#004AAE] shadow-sm px-4 py-2 flex items-center justify-between">
      {/* Back Button that reloads the page */}
      <button
        onClick={() => window.location.reload()}
        className="!bg-transparent text-[#010133] text-lg hover:text-[#FC9313] focus:outline-none p-1"
      >
        <FaArrowLeft />
      </button>

      {/* Centered Title */}
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-base font-semibold text-[#010133] m-0">
        {title}
      </h1>

      {/* Right Spacer */}
      <div className="w-6" />
    </header>
  );
}
