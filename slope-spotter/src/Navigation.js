import "./App.css";
import { useNavigate } from 'react-router-dom';
import BottomNav from './components/BottomNav/BottomNav';
/* eventually import MapBox stuff here */

function Map() {
  return (
    <div className="App">
      <div className="container">
        <h1>Slope Spotter</h1>
        <p className="subtitle">finding a path, slope by slope</p>
      </div>
      <BottomNav />
    </div>
  );
}

export default Map;
