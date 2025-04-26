import "./App.css";
import BottomNav from './components/BottomNav/BottomNav';
import { useNavigate } from 'react-router-dom';
import Header from "./components/Header/Header.js"; 
/* eventually import MapBox stuff here */

function Places() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="container">
        <Header title="Places"/>
        <p>places goes here</p>
        {/* TODO: input text to route where you're going */}
        {/* TODO: speech to text button */}
        {/* TODO: mapbox map */}
        {/* TODO: elevation viewer */}
        {/* TODO: remaining miles, time info at the bottom */}
        <BottomNav />
      </div>
    </div>
  );
}

export default Places;
