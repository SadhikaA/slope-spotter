import "./App.css";
import "./IndoorMap.css";
import BottomNav from "./components/BottomNav/BottomNav";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header/Header.js";
import PageContainer from "./components/BottomNav/PageContainer";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useState, useRef } from "react";
import { ReactComponent as ZoomInIcon } from "./assets/zoom-in.svg";
import { ReactComponent as ZoomOutIcon } from "./assets/zoom-out.svg";
import { ReactComponent as ResetIcon } from "./assets/reset.svg";

const floorImages = [
  { name: "Basement", src: require("./assets/doe_floor_0.jpg") },
  { name: "Floor 1", src: require("./assets/doe_floor_1.jpg") },
  { name: "Floor 2", src: require("./assets/doe_floor_2.jpg") },
  { name: "Floor 3", src: require("./assets/doe_floor_3.jpg") },
  { name: "Floor 4", src: require("./assets/doe_floor_4.jpg") },
];

export default function IndoorMap() {
  const navigate = useNavigate();
  const [floorIndex, setFloorIndex] = useState(1);
  const resetZoomRef = useRef(() => {});

  const goUp = () => {
    if (floorIndex < floorImages.length - 1) {
      setFloorIndex(floorIndex + 1);
      resetZoomRef.current();
    }
  };

  const goDown = () => {
    if (floorIndex > 0) {
      setFloorIndex(floorIndex - 1);
      resetZoomRef.current();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageContainer className="flex flex-col flex-grow pt-16 px-4">
        <Header title="Indoor Map" onBack={() => navigate("/places")} />

        <div className="flex flex-col flex-grow">
          {/* Top Section */}
          <div className="flex-grow-[3] flex items-center justify-center">
            <button
              className="w-11/12 max-w-xs py-3 bg-[#004aae] text-white font-semibold text-md rounded-xl shadow hover:bg-[#003580]"
              onClick={goUp}
            >
              ↑ Floor Up
            </button>
          </div>

          {/* Middle Section */}
          <div className="flex-grow-[7] flex items-center justify-center relative">
            <div className="relative w-full max-w-md mx-auto flex justify-center">
              <TransformWrapper
                limitToBounds={true}
                centerOnInit={true}
                smooth={false}
                velocityEqualToMove={0.02}
                zoomAnimation={{ disabled: true }}
                panning={{ velocityDisabled: true }}
                pinch={{ disabled: false }}
                doubleClick={{ disabled: false }}
                onInit={({ resetTransform }) => {
                  resetZoomRef.current = resetTransform;
                }}
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    <div className="zoom-controls absolute top-2 right-2 bg-white rounded-xl shadow-md z-10 flex flex-col overflow-hidden">
                      <button className="zoom-button" onClick={zoomIn}>
                        <ZoomInIcon />
                      </button>
                      <button className="zoom-button" onClick={zoomOut}>
                        <ZoomOutIcon />
                      </button>
                      <button className="zoom-button" onClick={resetTransform}>
                        <ResetIcon />
                      </button>
                    </div>

                    <TransformComponent>
                      <img
                        src={floorImages[floorIndex].src}
                        alt={floorImages[floorIndex].name}
                        className="rounded-xl w-full shadow-md"
                      />
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex-grow-[3] flex flex-col items-center justify-start gap-3">
            <button
              className="w-11/12 max-w-xs py-3 bg-[#004aae] text-white font-semibold text-md rounded-xl shadow hover:bg-[#003580]"
              onClick={goDown}
            >
              ↓ Floor Down
            </button>

            <h3 className="text-lg font-semibold text-center">
              {floorImages[floorIndex].name}
            </h3>
          </div>
        </div>
      </PageContainer>

      <BottomNav />
    </div>
  );
}
