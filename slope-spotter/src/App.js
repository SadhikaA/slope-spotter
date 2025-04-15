import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navigation from './Navigation';
import Places from './Places';
import Profile from './Profile';
import Settings from  './Settings';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/navigation" element={<Navigation />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/places" element={<Places />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>
  );
}

export default App;
