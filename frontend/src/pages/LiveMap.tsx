import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useVehicleStore from '../store/useVehicleStore';
import TopAppBar from '../components/TopAppBar';
import HonestStatusBar from '../components/HonestStatusBar';

// Custom Marker Icon
const busIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


const LiveMap: React.FC = () => {
  const markerRef = useRef<L.Marker>(null);
  const { updateVehicle, lat, lng, confidence_radius_m, state } = useVehicleStore();

  useEffect(() => {
    // Connect to WebSocket
    // For local dev, we assume the user already got a token and we might send it.
    // For simulation, we just connect without token auth for simplicity, or dummy token.
    const ws = new WebSocket(`ws://localhost:3000/ws/bus/bus_01?token=dummy`);
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        updateVehicle({
          lat: data.lat,
          lng: data.lng,
          heading: data.heading,
          speed: data.speed,
          tier: data.tier,
          state: data.state,
          confidence_radius_m: data.confidence_radius_m,
          ts: data.ts
        });

        // Snap marker to real position on ping
        if (markerRef.current) {
          markerRef.current.setLatLng([data.lat, data.lng]);
        }
      } catch (err) {
        console.error("WS Parse Error", err);
      }
    };

    return () => {
      ws.close();
    };
  }, [updateVehicle]);

  useEffect(() => {
    // Dead Reckoning Loop
    let lastTime = performance.now();
    let animationFrameId: number;

    const deadReckon = (time: number) => {
      const elapsed = (time - lastTime) / 1000; // seconds
      lastTime = time;

      const currentStore = useVehicleStore.getState();
      const speedMs = currentStore.speed * (1000 / 3600); // km/h to m/s
      const dist = speedMs * elapsed;

      // Only update if moving
      if (dist > 0 && currentStore.state !== 'BUFFERING') {
        const newLat = currentStore.lat + (dist / 111320) * Math.cos(currentStore.heading * (Math.PI / 180));
        const newLng = currentStore.lng + (dist / 111320) * Math.sin(currentStore.heading * (Math.PI / 180));
        
        useVehicleStore.setState({ lat: newLat, lng: newLng });
        
        if (markerRef.current) {
          markerRef.current.setLatLng([newLat, newLng]);
        }
      }

      animationFrameId = requestAnimationFrame(deadReckon);
    };

    animationFrameId = requestAnimationFrame(deadReckon);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <TopAppBar title="Live Map" showBack={true} />
      <div className="flex-grow pt-16">
        <MapContainer center={[34.0522, -118.2437]} zoom={15} className="h-full w-full">
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          <Marker position={[lat, lng]} icon={busIcon} ref={markerRef} />
          {state !== 'ACTIVE' && (
            <Circle 
              center={[lat, lng]} 
              radius={confidence_radius_m} 
              pathOptions={{ 
                color: state === 'SPARSE' ? '#FFC107' : state === 'LOST' ? '#FF9800' : '#F44336', 
                fillOpacity: 0.2 
              }} 
            />
          )}
        </MapContainer>
      </div>
      <HonestStatusBar />
    </div>
  );
};


export default LiveMap;
