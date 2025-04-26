// src/components/MapBox/MapBox.js
import React, {
  forwardRef,
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapBox = forwardRef(({ zoom = 14, style, height='400px' }, ref) => {
  const mapRef = useRef(null);
  const containerRef = useRef();
  const [center, setCenter] = useState([-122.2585, 37.8719]);

  // 1) ask for user location
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => setCenter([coords.longitude, coords.latitude]),
      () => {}  // ignore
    );
  }, []);

  // 2) init map
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: style || 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom,
    });

    // prepare an empty geojson source for the route
    map.on('load', () => {
      map.addSource('route', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      });
    });

    mapRef.current = map;
    return () => map.remove();
  }, [style, zoom]);

  // 3) pan when center changes
  useEffect(() => {
    mapRef.current?.easeTo({ center, duration: 1000 });
  }, [center]);

  // 4) expose imperative methods
  useImperativeHandle(ref, () => ({
    async getRoute(start, end) {
      console.log('getRoute', start, end);
      const map = mapRef.current;
      if (!map) return;

      const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/` +
        `${start[0]},${start[1]};${end[0]},${end[1]}` +
        `?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
      );
      const json = await res.json();
      const data = json.routes?.[0]?.geometry;
      if (!data) return;

      const geojson = { type: 'Feature', properties: {}, geometry: data };

      map.getSource('route').setData(geojson);

      if (!map.getLayer('route-line')) {
        map.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75,
          },
        });
      }
    },

    stopRoute() {
      console.log('stopRoute');
      const map = mapRef.current;
      if (!map) return;
      if (map.getLayer('route-line')) map.removeLayer('route-line');
      if (map.getSource('route')) {
        map.removeSource('route');
        map.addSource('route', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: [] },
        });
      }
    },
  }));

  return <div ref={containerRef} style={{ width: '100%', height }} />;
});

export default MapBox;