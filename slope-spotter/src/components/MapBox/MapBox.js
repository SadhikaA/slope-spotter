import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapBox = ({
  zoom   = 14,
  style  = 'mapbox://styles/mapbox/streets-v11',
  height = '400px',
}) => {
  const mapRef = useRef(null);
  const containerRef = useRef();
  const [center, setCenter] = useState([-122.2585, 37.8719]);

  // default center is Berkeley, CA, stored in a ref
  const initialCenterRef = useRef(center);

  // 1) ask for user location
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setCenter([coords.longitude, coords.latitude]),
      err => console.warn('Geolocation failed:', err)
    );
  }, []);

  // 2) initialize map
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style,
      center: initialCenterRef.current,
      zoom,
    });
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [style, zoom]);

  // change center on user location
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.easeTo({ center, duration: 1000 });
    }
  }, [center]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height }}
    />
  );
};

export default MapBox;
