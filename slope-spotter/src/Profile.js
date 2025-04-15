import "./App.css";
import BottomNav from './components/BottomNav/BottomNav';
import { useNavigate } from 'react-router-dom';
/* eventually import MapBox stuff here */

function Profile() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="container">
        <button className="back-arrow" onClick={() => navigate('/')}>⬅</button>
        <p>profile goes here</p>
        {/* TODO: input text to route where you're going */}
        {/* TODO: speech to text button */}
        {/* TODO: mapbox map */}
        {/* TODO: elevation viewer */}
        {/* TODO: remaining miles, time info at the bottom */}
      </div>
      <BottomNav />
    </div>
  );
}

export default Profile;
