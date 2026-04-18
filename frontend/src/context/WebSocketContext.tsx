import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import useAuthStore from '../store/useAuthStore';
import useVehicleStore from '../store/useVehicleStore';

interface TelemetryData {
  lat: number;
  lng: number;
  speed: number;
  accuracy: number;
  ping: number;
  ts: number;
}

interface AnomalyData {
  type: string;
  message: string;
}

interface WebSocketContextProps {
  telemetry: TelemetryData | null;
  anomaly: AnomalyData | null;
  isConnected: boolean;
}

const WebSocketContext = createContext<WebSocketContextProps>({
  telemetry: null,
  anomaly: null,
  isConnected: false,
});

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [anomaly, setAnomaly] = useState<AnomalyData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { token } = useAuthStore();
  const wsRef = useRef<WebSocket | null>(null);

  // Hardcoded bus_id from our Prisma seed for demo purposes
  const DEMO_BUS_ID = '00000000-0000-0000-0000-000000000002';

  useEffect(() => {
    if (!token) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/bus/${DEMO_BUS_ID}?token=${token}`;
    
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'TELEMETRY' || data.lat) {
          // If it's a telemetry object, push it to store
          const payload = data.payload || data;
          setTelemetry(payload);
          useVehicleStore.getState().updateVehicle({
            lat: payload.lat,
            lng: payload.lng,
            heading: payload.heading || 0,
            speed: payload.speed || 0,
            tier: payload.tier || 1,
            state: payload.state || 'ACTIVE',
            confidence_radius_m: payload.confidence_radius_m || 5,
            ts: payload.ts || Date.now()
          });
        } else if (data.type === 'ANOMALY') {
          setAnomaly(data.payload);
        }
      } catch (e) {
        console.error('Failed to parse WS message:', e);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [token]);

  return (
    <WebSocketContext.Provider value={{ telemetry, anomaly, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};
