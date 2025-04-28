import "./App.css";
import BottomNav from './components/BottomNav/BottomNav';
import Header from "./components/Header/Header.js"; 
import { FiExternalLink } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import hearst from "./components/Places/hearst.jpg";
import jacobs from "./components/Places/jacobs.jpg";

function Places() {
  return (
    <div className="App">
      <div className="container">
        <Header title="Saved Places"/>
        {/* HMMB */}
        <div className="place-card">
          <div className="place-header">
            <h3 className="place-name">Hearst Memorial Mining Building <FiExternalLink className="external-link-icon" /></h3>
            <div className="place-rating">
              <FaStar className="star-icon" />
              <FaStar className="star-icon" />
            </div>
          </div>
          <p className="place-score">3.5</p>
          <img
            className="place-image"
            src={hearst}
            alt="Hearst Memorial Mining Building"
          />
        </div>

        {/* Jacobs Hall */}
        <div className="place-card">
          <div className="place-header">
            <h3 className="place-name">Jacobs Hall <FiExternalLink className="external-link-icon" /></h3>
            <div className="place-rating">
              <FaStar className="star-icon" />
              <FaStar className="star-icon" />
              <FaStar className="star-icon" />
            </div>
          </div>
          <p className="place-score">5.0</p>
          <img
            className="place-image"
            src={jacobs}
            alt="Jacobs Hall"
          />
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

export default Places;
