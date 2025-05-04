import React, { useState } from "react";
import "./PlaceDetails.css";
import { ReactComponent as CloseIcon } from "./assets/exit.svg";

function PlaceDetails({ place, onClose }) {
  const [showAllHours, setShowAllHours] = useState(false);

  if (!place) return null;

  const getToday = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const todayIndex = new Date().getDay();
    return days[todayIndex];
  };

  const today = getToday();

  return (
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <button className="close-button" onClick={onClose} aria-label="Close">
          <CloseIcon className="close-icon" />
        </button>
        <h2>{place.name}</h2>
      </div>

      <img src={place.image} alt={place.alt} className="place-image" />

      <div className="modal-description">
        <div className="detail-row">
          <span className="icon">📍</span>
          <span className="text">{place.address}</span>
        </div>
        <div className="detail-row">
          <span className="icon">♿</span>
          <span className="text">{place.accessibility}</span>
        </div>
        <div className="detail-row">
          <span className="icon">🚪</span>
          <span className="text">Accessible entrance: {place.entrance}</span>
        </div>
        <div className="detail-row">
          <span className="icon">📞</span>
          <span className="text">{place.phone}</span>
        </div>
      </div>

      {place.hour && (
        <div className="hours-dropdown">
          <p>
            <strong>Hours:</strong> {today} <strong>{place.hour[today]}</strong>
          </p>
          <button
            className="toggle-hours"
            onClick={() => setShowAllHours(!showAllHours)}
          >
            {showAllHours ? "▲ Hide full schedule" : "▼ Show full schedule"}
          </button>
          {showAllHours && (
            <ul>
              {Object.entries(place.hour).map(([day, time]) => (
                <li key={day}>
                  <strong>{day}:</strong> {time}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default PlaceDetails;
