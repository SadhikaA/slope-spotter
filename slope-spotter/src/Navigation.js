import "./App.css";

import BottomNav from './components/BottomNav/BottomNav';
import SpeechButton from './components/SpeechText/SpeechButton.js';
import MapBox from "./components/MapBox/MapBox.js";

import { useNavigate } from 'react-router-dom';
/* eventually import MapBox stuff here */

function Navigation() {
  const navigate = useNavigate();

  const handleTranscript = (text) => {
    console.log('🗣️ Transcript:', text);
    // Here you can handle the transcript, e.g., send it to your backend or process it further
  };

  return (
    <div className="App">
      <div className="container">
        <div className="page-header">
          <button className="back-arrow" onClick={() => navigate('/')}>⬅</button>
          <h2 className="page-title">Navigation</h2>
        </div>
        {/* TODO: input text to route where you're going */}
        {/* TODO: speech to text button */}
        <SpeechButton onTranscript={handleTranscript} />
        {/* TODO: mapbox map */}
        <div style={{ width: '100%', height: '400px', margin: '1rem 0' }}>
          <MapBox/>
        </div>
        
        {/* TODO: elevation viewer */}
        {/* TODO: remaining miles, time info at the bottom */}
      </div>
      <BottomNav />
    </div>
  );
}

export default Navigation;
