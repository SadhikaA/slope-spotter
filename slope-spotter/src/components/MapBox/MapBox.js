// src/components/MapBox/MapBox.js

import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapBox = ({
  longitude = -122.2585,
  latitude  = 37.8719,
  zoom      = 14,
  style     = 'mapbox://styles/mapbox/streets-v11',
  height    = '400px',
}) => {
  const mapRef = useRef()
  const mapContainerRef = useRef()

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [longitude, latitude],
      zoom: zoom,
    });

    return () => {
      mapRef.current.remove()
    }
  }, [longitude, latitude, zoom, style]);

  return (
    <>
      <div id='map-container' 
      ref={mapContainerRef}
      style={{ width: '100%', height }}/>
    </>
  )
};

export default MapBox;
