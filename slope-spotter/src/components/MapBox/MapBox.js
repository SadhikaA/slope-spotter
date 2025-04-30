import React, {
  forwardRef,
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Map grade angle (degrees) to warm color from yellow (flat) to red (steep)
function getColorForAngle(angleDeg) {
  if (angleDeg <= 1) return '#ffffb2';      // very flat
  if (angleDeg <= 3) return '#fed976';      // gentle slope
  if (angleDeg <= 6) return '#fd8d3c';      // moderate slope
  return '#e31a1c';                         // steep slope
}

const MapBox = forwardRef(({ zoom = 14, style, height = '400px' }, ref) => {
  const mapRef = useRef(null);
  const containerRef = useRef();
  const [center, setCenter] = useState([-122.2585, 37.8719]);

  // center map on user location
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => setCenter([coords.longitude, coords.latitude]),
      () => {}
    );
  }, []);

  // initialize map
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: style || 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom,
      projection: 'mercator',
    });

    map.on('load', () => {
      // placeholder source & layer for colored route
      map.addSource('route-color', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      });
      map.addLayer({
        id: 'route-color',
        type: 'line',
        source: 'route-color',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': ['get', 'color'],
          'line-width': 8,
          'line-opacity': 0.8,
        },
      });
    });

    mapRef.current = map;
    return () => map.remove();
  }, [style, zoom]);

  // animate pan when center updates
  useEffect(() => {
    mapRef.current?.easeTo({ center, duration: 1000 });
  }, [center]);

  // expose methods via ref
  useImperativeHandle(ref, () => ({
    async getRoute(start, end) {
      const map = mapRef.current;
      if (!map) return;

      // fetch route
      const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/` +
          `${start[0]},${start[1]};${end[0]},${end[1]}` +
          `?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
      );
      const json = await res.json();
      const leg = json.routes?.[0]?.legs?.[0];
      if (!leg) return;

      // build colored segments per step
      const segmentFeatures = leg.steps.map((step) => {
        const coords = step.geometry.coordinates;
        const startPt = coords[0];
        const endPt = coords[coords.length - 1];
        const elevStart = map.queryTerrainElevation(startPt) ?? 0;
        const elevEnd = map.queryTerrainElevation(endPt) ?? 0;
        const dist = step.distance;
        const deltaZ = elevEnd - elevStart;
        const angleRad = Math.atan2(deltaZ, dist);
        const angleDeg = (angleRad * 180) / Math.PI;
        const color = getColorForAngle(angleDeg);
        return {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: coords },
          properties: { angle: angleDeg, color },
        };
      });

      // update source data immediately
      const source = map.getSource('route-color');
      if (source) {
        source.setData({ type: 'FeatureCollection', features: segmentFeatures });
      }
    },

    stopRoute() {
      const map = mapRef.current;
      if (!map) return;
      const source = map.getSource('route-color');
      if (source) {
        source.setData({ type: 'FeatureCollection', features: [] });
      }
    },
  }));

  return <div ref={containerRef} style={{ width: '100%', height }} />;
});

export default MapBox;
