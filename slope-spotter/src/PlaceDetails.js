import React from 'react';
import { useParams } from 'react-router-dom';

const allPlaces = [
    {
      id: 1,
      name: "Doe Library",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Doe_Library%2C_main_facade%2C_July_2018.jpg",
      alt: "Front view of Doe Library",
      hasIndoorMap: false,
      hasParkingInfo: true,
      address: "Doe Library, Campanile Way, Berkeley, CA 94720",
      phone: "+1 (510) 642-6657",
      accessibility: "Fully wheelchair accessible",
      hour: {
        Tuesday: "8 AM–6 PM",
        Wednesday: "8 AM–6 PM",
        Thursday: "8 AM–6 PM",
        Friday: "8 AM–10 PM",
        Saturday: "9 AM–10 PM",
        Sunday: "1–6 PM",
        Monday: "8 AM–6 PM"
      },
      entrance: "North side of the building"
    },
    {
      id: 2,
      name: "Cory Hall",
      image: "https://engineering.berkeley.edu/wp-content/uploads/2020/01/1950cory_aerial.jpg",
      alt: "Aerial view of Cory Hall",
      hasIndoorMap: false,
      hasParkingInfo: true,
      address: "253 Cory Hall, Berkeley, CA 94720-1770",
      phone: "+1 (510) 642-3214",
      accessibility: "Partially wheelchair accessible",
      hour: {
        Monday: "8 AM–12 PM, 1 PM–4:30 PM",
        Tuesday: "8 AM–12 PM, 1 PM–4:30 PM",
        Wednesday: "8 AM–12 PM, 1 PM–4:30 PM",
        Thursday: "8 AM–12 PM, 1 PM–4:30 PM",
        Friday: "8 AM–12 PM, 1 PM–4:30 PM",
        Saturday: "Closed",
        Sunday: "Closed"
      },
      entrance: "SW side of 1st floor and NW side of 2nd floor"
    },
    {
      id: 3,
      name: "Dwinelle Hall",
      image: "https://dac.berkeley.edu/sites/default/files/styles/panopoly_image_spotlight/public/dwinelle_building.jpg?itok=Fm-XLnkq",
      alt: "Outside of Dwinelle Hall",
      hasIndoorMap: true,
      hasParkingInfo: true,
      address: "3229 Dwinelle Hall, Berkeley, CA 94720-2550",
      phone: "+1 (510) 642-1971",
      accessibility: "Partially wheelchair accessible",
      hour: {
        Monday: "9 AM–12 PM, 1 PM–4 PM",
        Tuesday: "9 AM–12 PM, 1 PM–4 PM",
        Wednesday: "9 AM–12 PM, 1 PM–4 PM",
        Thursday: "9 AM–12 PM, 1 PM–4 PM",
        Friday: "10 AM–12 PM",
        Saturday: "Closed",
        Sunday: "Closed"
      },
      entrance: "North side (Level B) and east side (Level D)"
    },
    {
      id: 4,
      name: "Chou Hall",
      image: "https://dac.berkeley.edu/sites/default/files/styles/panopoly_image_spotlight/public/buildings-1_0/buildings-1/Haas-Chou-Building.jpg?itok=tQstg3Cz",
      alt: "Chou Hall entrance view",
      hasIndoorMap: true,
      hasParkingInfo: false,
      address: "Chou Hall, Haas School of Business, Berkeley, CA 94720",
      phone: "N/A",
      accessibility: "Partially wheelchair accessible",
      hour: {
        Monday: "7 AM–10 PM",
        Tuesday: "7 AM–10 PM",
        Wednesday: "7 AM–10 PM",
        Thursday: "7 AM–10 PM",
        Friday: "7 AM–10 PM",
        Saturday: "7 AM–8 PM",
        Sunday: "7 AM–10 PM"
      },
      entrance: "West side (2nd floor) and east side (4th floor)"
    },
    {
      id: 5,
      name: "Bauer Wurster Hall",
      image: "https://dac.berkeley.edu/sites/default/files/styles/panopoly_image_spotlight/public/buildings-2/buildings-2/Wurster-Building.jpg?itok=9CrQJm-P",
      alt: "Bauer Wurster Hall exterior",
      hasIndoorMap: false,
      hasParkingInfo: true,
      address: "230 Bauer Wurster Hall #1820, Berkeley, CA 94720-1820",
      phone: "+1 (510) 642-4943",
      accessibility: "Fully wheelchair accessible",
      hour: {
        Monday: "8 AM–5 PM",
        Tuesday: "8 AM–5 PM",
        Wednesday: "8 AM–5 PM",
        Thursday: "8 AM–5 PM",
        Friday: "8 AM–5 PM",
        Saturday: "Closed",
        Sunday: "Closed"
      },
      entrance: "Main entrance on west side"
    }
  ];
  

function PlaceDetails() {
  const { id } = useParams();
  const place = allPlaces.find(p => p.id === parseInt(id));

  if (!place) return <div>Place not found</div>;

  return (
    <div className="place-details">
      <h1>{place.name}</h1>
      <img src={place.image} alt={place.alt} style={{ maxWidth: '100%', height: 'auto' }} />

      {place.address && <p>📍 {place.address}</p>}
      {place.accessibility && <p>♿ {place.accessibility}</p>}
      {place.hour && (
        <div>
          <p>⏰ Hours:</p>
          <ul>
            {Object.entries(place.hour).map(([day, time]) => (
              <li key={day}><strong>{day}:</strong> {time}</li>
            ))}
          </ul>
        </div>
      )}
      {place.entrance && <p>🚪 Accessible entrance: {place.entrance}</p>}
      {place.phone && <p>📞 {place.phone}</p>}
    </div>
  );
}

export default PlaceDetails;
