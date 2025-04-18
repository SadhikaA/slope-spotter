import "./App.css";
import BottomNav from './components/BottomNav/BottomNav';
import { useNavigate } from 'react-router-dom';
/* eventually import MapBox stuff here */

function Settings() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="container">
        <button className="back-arrow" onClick={() => navigate('/')}>⬅</button>
        <p>settings goes here</p>
        {/* TODO: add route preferences */}
        {/* TODO: customization: wheelchair type, prefer */}
        {/* TODO: save changes to localStorage */}
      </div>
      <BottomNav />
    </div>
  );
}

export default Settings;
