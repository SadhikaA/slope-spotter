import React from 'react';
import { useParams } from 'react-router-dom';

const allPlaces = [
    { id: 1, name: "Doe Library", image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Doe_Library%2C_main_facade%2C_July_2018.jpg", alt: "Front view of Doe Library", hasIndoorMap: false, hasParkingInfo: true },
    { id: 2, name: "Cory Hall", image: "https://engineering.berkeley.edu/wp-content/uploads/2020/01/1950cory_aerial.jpg", alt: "Aerial view of Cory Hall", hasIndoorMap: false, hasParkingInfo: true },
    { id: 3, name: "Dwinelle Hall", image: "https://dac.berkeley.edu/sites/default/files/styles/panopoly_image_spotlight/public/dwinelle_building.jpg?itok=Fm-XLnkq", alt: "Outside of Dwinelle Hall", hasIndoorMap: true, hasParkingInfo: true },
    { id: 4, name: "Chou Hall", image: "https://dac.berkeley.edu/sites/default/files/styles/panopoly_image_spotlight/public/buildings-1_0/buildings-1/Haas-Chou-Building.jpg?itok=tQstg3Cz", alt: "Chou Hall entrance view", hasIndoorMap: true, hasParkingInfo: false },
    { id: 5, name: "Bauer Wurster Hall", image: "https://dac.berkeley.edu/sites/default/files/styles/panopoly_image_spotlight/public/buildings-2/buildings-2/Wurster-Building.jpg?itok=9CrQJm-P", alt: "Bauer Wurster Hall exterior", hasIndoorMap: false, hasParkingInfo: true }
  ];

function PlaceDetails() {
  const { id } = useParams();
  const place = allPlaces.find(p => p.id === parseInt(id));

  if (!place) return <div>Place not found</div>;

  return (
    <div className="place-details">
      <h1>{place.name}</h1>
      <img src={place.image} alt={place.alt} style={{ maxWidth: '100%', height: 'auto' }} />
      <p>📍 Berkeley, CA 94720</p>
      <p>♿ Fully wheelchair accessible</p>
      <p>🚪 Accessible entrance: East side of the building</p>
      <p>📞 +1 510-643-1582</p>
    </div>
  );
}

export default PlaceDetails;
