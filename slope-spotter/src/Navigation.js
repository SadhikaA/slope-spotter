import "./App.css";

import BottomNav from './components/BottomNav/BottomNav';
import SpeechButton from './components/SpeechText/SpeechButton.js';

import { useNavigate } from 'react-router-dom';
import { FaMicrophone } from 'react-icons/fa';
/* eventually import MapBox stuff here */

function Map() {
  const navigate = useNavigate();

  const handleTranscript = (text) => {
    console.log('🗣️ Transcript:', text);
    // Here you can handle the transcript, e.g., send it to your backend or process it further
  };

  return (
    <div className="App">
      <div className="container">
        <button className="back-arrow" onClick={() => navigate('/')}>⬅</button>
        <p>navigation goes here</p>
        {/* TODO: input text to route where you're going */}
        {/* TODO: speech to text button */}
        <SpeechButton onTranscript={handleTranscript} />
        {/* TODO: mapbox map */}
        {/* TODO: elevation viewer */}
        {/* TODO: remaining miles, time info at the bottom */}
      </div>
      <BottomNav />
    </div>
  );
}

export default Map;
