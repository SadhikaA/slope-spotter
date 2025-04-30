import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navigation from './Navigation';
import Places from './Places';
import PlaceDetails from './PlaceDetails';
import Profile from './Profile';
import Settings from './Settings';
import Main from './Main';
import IndoorMap from './IndoorMap';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/places" element={<Places />} />
        <Route path="/place/:id" element={<PlaceDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/main" element={<Main />} />
        <Route path="/indoor-map" element={<IndoorMap />} /> 
      </Routes>
    </Router>
  );
}

export default App;
