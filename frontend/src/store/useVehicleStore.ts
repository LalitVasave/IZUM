import { create } from 'zustand';

interface VehicleState {
  bus_id: string | null;
  state: 'ACTIVE' | 'SPARSE' | 'LOST' | 'BUFFERING' | 'SYNCING';
  lat: number;
  lng: number;
  heading: number;
  speed: number;
  tier: 'FULL' | 'REDUCED' | 'MINIMAL' | 'DEAD';
  confidence_radius_m: number;
  ts: number;
  updateVehicle: (data: Partial<VehicleState>) => void;
}

const useVehicleStore = create<VehicleState>((set) => ({
  bus_id: null,
  state: 'ACTIVE',
  lat: 34.0522,
  lng: -118.2437,
  heading: 0,
  speed: 0,
  tier: 'FULL',
  confidence_radius_m: 5,
  ts: 0,
  updateVehicle: (data) => set((state) => ({ ...state, ...data })),
}));

export default useVehicleStore;
