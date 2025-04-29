import "./App.css";
import "./IndoorMap.css"; 
import BottomNav from './components/BottomNav/BottomNav';
import { useNavigate } from 'react-router-dom';
import Header from "./components/Header/Header.js";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useState } from "react";

const floorImages = [
  { name: "Basement", src: require("./assets/doe_floor_0.jpg") },
  { name: "Floor 1", src: require("./assets/doe_floor_1.jpg") },
  { name: "Floor 2", src: require("./assets/doe_floor_2.jpg") },
  { name: "Floor 3", src: require("./assets/doe_floor_3.jpg") },
  { name: "Floor 4", src: require("./assets/doe_floor_4.jpg") }
];

export default function IndoorMap() {
  const navigate = useNavigate();
  const [floorIndex, setFloorIndex] = useState(1);

  const goUp = () => {
    if (floorIndex < floorImages.length - 1) {
      setFloorIndex(floorIndex + 1);
    }
  };

  const goDown = () => {
    if (floorIndex > 0) {
      setFloorIndex(floorIndex - 1);
    }
  };

  return (
    <div className="App">
      <div className="container">
      <Header title="Indoor Map" onBack={() => navigate("/places")} />
        <div className="floor-controls">
          <button className="floor-button" onClick={goUp}>
            ↑ Floor Up
          </button>

          <TransformWrapper
            limitToBounds={true}
            velocityEqualToMove={0.02}
            centerOnInit={true}
            smooth={false}
            panning={{ velocityDisabled: true }}
            doubleClick={{ disabled: false }}
            pinch={{ disabled: false }}
            zoomAnimation={{ disabled: true }}
          >
            <TransformComponent>
              <img
                src={floorImages[floorIndex].src}
                alt={floorImages[floorIndex].name}
                className="floor-image"
              />
            </TransformComponent>
          </TransformWrapper>

          <button className="floor-button" onClick={goDown}>
            ↓ Floor Down
          </button>

          <h3>{floorImages[floorIndex].name}</h3>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
