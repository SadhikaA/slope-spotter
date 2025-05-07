import React, { useState, useEffect } from "react";
import { FaMap, FaUser, FaCog } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getPathKey = (path) => {
    switch (path) {
      case "/navigation":
        return "map";
      case "/profile":
        return "user";
      case "/places":
        return "place";
      case "/settings":
        return "settings";
      default:
        return "";
    }
  };

  const [activeTab, setActiveTab] = useState(getPathKey(location.pathname));

  useEffect(() => {
    setActiveTab(getPathKey(location.pathname));
  }, [location.pathname]);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#004AAE] px-4 py-2 flex justify-around items-center shadow-md z-50">
      <div
        className="flex flex-col items-center text-white text-sm font-semibold cursor-pointer"
        onClick={() => navigate("/navigation")}
      >
        <FaMap
          className={`text-[24px] transition-transform duration-300 ${
            activeTab === "map" ? "text-[#FFC31B] scale-110" : ""
          }`}
        />
        <span
          className={`${
            activeTab === "map" ? "text-[#FFC31B] font-bold" : ""
          } text-xs`}
        >
          Map
        </span>
      </div>

      <div
        className="flex flex-col items-center text-white text-sm font-semibold cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        <FaUser
          className={`text-[24px] transition-transform duration-300 ${
            activeTab === "user" ? "text-[#FFC31B] scale-110" : ""
          }`}
        />
        <span
          className={`${
            activeTab === "user" ? "text-[#FFC31B] font-bold" : ""
          } text-xs`}
        >
          Profile
        </span>
      </div>

      <div
        className="flex flex-col items-center text-white text-sm font-semibold cursor-pointer"
        onClick={() => navigate("/places")}
      >
        <MdPlace
          className={`text-[25px] transition-transform duration-300 ${
            activeTab === "place" ? "text-[#FFC31B] scale-110" : ""
          }`}
        />
        <span
          className={`${
            activeTab === "place" ? "text-[#FFC31B] font-bold" : ""
          } text-xs`}
        >
          Places
        </span>
      </div>

      <div
        className="flex flex-col items-center text-white text-sm font-semibold cursor-pointer"
        onClick={() => navigate("/settings")}
      >
        <FaCog
          className={`text-[24px] transition-transform duration-300 ${
            activeTab === "settings" ? "text-[#FFC31B] scale-110" : ""
          }`}
        />
        <span
          className={`${
            activeTab === "settings" ? "text-[#FFC31B] font-bold" : ""
          } text-xs`}
        >
          Settings
        </span>
      </div>
    </div>
  );
};

export default BottomNav;
