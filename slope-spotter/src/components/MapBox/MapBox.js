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

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhbmt6aHUxNjAiLCJhIjoiY205amN4cWt2MDk1MTJqcHM2ZmxseXE4cCJ9.vmdZkfIdPVYRkaRus1_IRg'

// Map slope angle (degrees) to a warm color ranging from yellow (flat) to red (steep)
function getColorForAngle(angleDeg) {
  if (angleDeg < 0) {
    if (angleDeg >= -1) return '#deebf7';
    if (angleDeg >= -3) return '#9ecae1';
    return '#3182bd';
  } else {
    if (angleDeg <= 1) return '#ffffb2';
    if (angleDeg <= 3) return '#fed976';
    if (angleDeg <= 6) return '#fd8d3c';
    return '#e31a1c';
  }
}

// Custom control to render the vertical "SLOPE" legend on the map
class LegendControl {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl legend-control legend-vertical-list';
    this.collapsed = true;

    this._container.innerHTML = `
      <div class="legend-header">
        <span class="legend-title">Slope</span>
        <button class="legend-toggle">▼</button>
      </div>
      <div class="legend-body collapsed">
        <div class="legend-subtitle">Downhill</div>
        <div class="legend-item">
          <span class="legend-color" style="background:#deebf7"></span>
          ≥ -1°
        </div>
        <div class="legend-item">
          <span class="legend-color" style="background:#9ecae1"></span>
          ≥ -3°
        </div>
        <div class="legend-item">
          <span class="legend-color" style="background:#3182bd"></span>
          &lt; -3°
        </div>

        <div class="legend-subtitle">Uphill</div>
        <div class="legend-item">
          <span class="legend-color" style="background:#ffffb2"></span>
          ≤ 1°
        </div>
        <div class="legend-item">
          <span class="legend-color" style="background:#fed976"></span>
          ≤ 3°
        </div>
        <div class="legend-item">
          <span class="legend-color" style="background:#fd8d3c"></span>
          ≤ 6°
        </div>
        <div class="legend-item">
          <span class="legend-color" style="background:#e31a1c"></span>
          &gt; 6°
        </div>
      </div>
    `;

    this._container
      .querySelector('.legend-toggle')
      .addEventListener('click', () => {
        this.collapsed = !this.collapsed;
        const body = this._container.querySelector('.legend-body');
        body.classList.toggle('collapsed', this.collapsed);
        this._container.querySelector('.legend-toggle').textContent =
          this.collapsed ? '▼' : '▲';
      });

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

const MapBox = forwardRef(({ zoom = 14, style, height = '500px' }, ref) => {
  const mapRef = useRef(null);
  const startMarkerRef = useRef(null);
  const endMarkerRef = useRef(null);
  const containerRef = useRef();
  const [center, setCenter] = useState([-122.2585, 37.8719]);
  const [maxSlope, setMaxSlope] = useState(null); // Add state to track maxSlope

  // Obtain user location to center the map
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => setCenter([coords.longitude, coords.latitude]),
      () => { }
    );
  }, []);

  // Initialize the Mapbox map and controls
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: style || 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom,
      projection: 'mercator',
    });

    // Add zoom/navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-left');
    // Add the custom slope legend control
    map.addControl(new LegendControl(), 'top-right');

    map.on('load', () => {
      // Add DEM source and enable terrain for elevation queries
      map.addSource('raster-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
      });
      map.setTerrain({ source: 'raster-dem', exaggeration: 1 });

      // Prepare an empty GeoJSON source and layer for colored route segments
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

  // Smoothly pan when center state changes
  useEffect(() => {
    mapRef.current?.easeTo({ center, duration: 1000 });
  }, [center]);

  // Expose getRoute, stopRoute, and maxSlope methods to parent components
  useImperativeHandle(ref, () => ({
    // Expose maxSlope directly in the ref
    get maxSlope() {
      return maxSlope;
    },
    
    async getRoute(start, end) {
      const map = mapRef.current;
      if (!map) return null;

      // Fetch walking route with step-by-step geometry
      const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/` +
        `${start[0]},${start[1]};${end[0]},${end[1]}` +
        `?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
      );
      const json = await res.json();
      const route = json.routes?.[0];
      const leg = route?.legs?.[0];
      if (!leg) return null;

      // Build features for each step, colored by slope angle
      const segmentFeatures = leg.steps.map(step => {
        const coords = step.geometry.coordinates;
        const startPt = coords[0];
        const endPt = coords[coords.length - 1];
        const elevStart = map.queryTerrainElevation(startPt) ?? 0;
        const elevEnd = map.queryTerrainElevation(endPt) ?? 0;
        const dist = step.distance;
        const deltaZ = elevEnd - elevStart;
        const angleDeg = (Math.atan2(deltaZ, dist) * 180) / Math.PI;
        const color = getColorForAngle(angleDeg);
        return {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: coords },
          properties: { angle: angleDeg, color },
        };
      });

      // Determine the highest slope angle for the entire route
      const calculatedMaxSlope = Math.max(
        ...segmentFeatures.map(f => Math.abs(f.properties.angle))
      );
      
      // Update the maxSlope state
      setMaxSlope(parseFloat(calculatedMaxSlope.toFixed(1)));
      
      console.log('Max slope angle:', calculatedMaxSlope);

      // Update the GeoJSON source with new features
      const src = map.getSource('route-color');
      if (src) {
        src.setData({ type: 'FeatureCollection', features: segmentFeatures });
      }

      // Compute overall bounding box for the route and fit the view
      const allCoords = route.geometry.coordinates;
      const lons = allCoords.map(c => c[0]);
      const lats = allCoords.map(c => c[1]);
      const bounds = [
        [Math.min(...lons), Math.min(...lats)],
        [Math.max(...lons), Math.max(...lats)],
      ];
      map.fitBounds(bounds, { padding: 20, duration: 1000 });

      startMarkerRef.current?.remove();
      endMarkerRef.current?.remove();

      startMarkerRef.current = new mapboxgl.Marker({ color: 'green' })
        .setLngLat(start)
        .addTo(map);

      endMarkerRef.current = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(end)
        .addTo(map);
      
      // Return route information with the max slope
      return {
        maxSlope: parseFloat(calculatedMaxSlope.toFixed(1))
      };
    },

    stopRoute() {
      const map = mapRef.current;
      if (!map) return;
      const src = map.getSource('route-color');
      if (src) {
        // Clear the route by setting an empty feature collection
        src.setData({ type: 'FeatureCollection', features: [] });
      }

      startMarkerRef.current?.remove();
      endMarkerRef.current?.remove();
      
      // Reset max slope when route is cleared
      setMaxSlope(null);
    },
  }));

  return <div ref={containerRef} style={{ width: '100%', height }} />;
});

export default MapBox;