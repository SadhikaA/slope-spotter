import './App.css';
import { useNavigate } from 'react-router-dom';
import { FaMap, FaUser, FaCog } from 'react-icons/fa';
import { MdPlace } from "react-icons/md";
import { FaArrowRight } from 'react-icons/fa';


function Main() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="container">
        <h3>Slope Spotter</h3>
        <button className="main-button" onClick={() => navigate('/navigation')}>
            <FaMap className="main-icon" />
            <span>Navigation</span>
            <FaArrowRight className="arrow-icon" />
        </button>
        <button className="main-button" onClick={() => navigate('/places')}>
            <MdPlace className="main-icon" />
            <span>Accessible Places</span>
            <FaArrowRight className="arrow-icon" />
        </button>
        <button className="main-button" onClick={() => navigate('/profile')}>
            <FaUser className="main-icon" />
            <span>Profile</span>
            <FaArrowRight className="arrow-icon" />
        </button>
        <button className="main-button" onClick={() => navigate('/settings')}>
            <FaCog className="main-icon" />
            <span>Settings</span>
            <FaArrowRight className="arrow-icon" />
        </button>
    </div>
    </div>
  );
}

export default Main;


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