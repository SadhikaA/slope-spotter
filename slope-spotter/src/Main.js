import { useNavigate } from "react-router-dom";
import { FaMap, FaUser, FaCog, FaArrowRight } from "react-icons/fa";
import { MdPlace } from "react-icons/md";

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen items-center justify-start pt-20 px-4 bg-white">
      <h1 className="text-3xl font-bold text-[#010133] mb-14">Slope Spotter</h1>

      <div className="w-full max-w-md flex flex-col gap-6">
        {[
          { label: "Map", icon: <FaMap />, route: "/navigation" },
          { label: "Accessible Places", icon: <MdPlace />, route: "/places" },
          { label: "Profile", icon: <FaUser />, route: "/profile" },
          { label: "Settings", icon: <FaCog />, route: "/settings" },
        ].map(({ label, icon, route }) => (
          <button
            key={label}
            onClick={() => navigate(route)}
            className="relative w-full h-[10vh] min-h-[60px] flex items-center bg-[#f4f4f8] text-[#004aae] font-semibold text-base px-6 rounded-xl shadow-sm"
          >
            {/* Left-aligned icon */}
            <span className="absolute left-5 text-xl">{icon}</span>

            {/* Centered label */}
            <span className="mx-auto text-center w-full">{label}</span>

            {/* Right-aligned arrow */}
            <FaArrowRight className="absolute right-5 text-base" />
          </button>
        ))}
      </div>
    </div>
  );
}

//  <FaMap
//         className={`nav-icon ${activeTab === 'map' ? 'active' : ''}`}
//         onClick={() => navigate('/navigation')}
//       />
//       <FaUser
//         className={`nav-icon ${activeTab === 'user' ? 'active' : ''}`}
//         onClick={() => navigate('/profile')}
//       />
//       <MdPlace
//         className={`nav-icon ${activeTab === 'place' ? 'active place-icon' : 'place-icon'}`}
//         onClick={() => navigate('/places')}
//       />
//       <FaCog
//         className={`nav-icon ${activeTab === 'settings' ? 'active' : ''}`}
//         onClick={() => navigate('/settings')}
//       />
