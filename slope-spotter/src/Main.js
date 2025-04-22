import './App.css';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="container">
        <h1>Slope Spotter</h1>
        <button className="main-button" onClick={() => navigate('/navigation')}>Navigation</button>
        <button className="main-button" onClick={() => navigate('/places')}>Accessible Places</button>
        <button className="main-button" onClick={() => navigate('/profile')}>Profile</button>
        <button className="main-button" onClick={() => navigate('/settings')}>Settings</button>
    </div>
    </div>
  );
}

export default Main;
