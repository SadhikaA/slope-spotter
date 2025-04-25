import './App.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="container">
        <h1>Slope Spotter</h1>
        <p className="subtitle">finding a path, slope by slope</p>
        <div className="input-section">
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
        </div> 
        <button className="home-button" onClick={() => navigate('/navigation')}>Navigate</button>
    </div>
    </div>
  );
}

export default Home;
