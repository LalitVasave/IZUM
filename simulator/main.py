import asyncio
import math
import time
import requests
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="IZUM GPS Simulator")

# Dummy route around LA coordinates from UI
ROUTE_CORNERS = [
    (34.0522, -118.2437),
    (34.0550, -118.2437),
    (34.0550, -118.2400),
    (34.0522, -118.2400)
]

def generate_route(corners, steps_per_segment=10):
    route = []
    for i in range(len(corners)):
        start = corners[i]
        end = corners[(i + 1) % len(corners)]
        for j in range(steps_per_segment):
            lat = start[0] + (end[0] - start[0]) * (j / steps_per_segment)
            lng = start[1] + (end[1] - start[1]) * (j / steps_per_segment)
            route.append((lat, lng))
    return route

SMOOTH_ROUTE = generate_route(ROUTE_CORNERS, 50)
BACKEND_URL = "http://127.0.0.1:3000/api/internal/telemetry"

class NetworkModeRequest(BaseModel):
    mode: str  # FULL, REDUCED, MINIMAL, DEAD

class SimulatorState:
    def __init__(self):
        self.mode = "FULL"
        self.bus_id = "bus_01"
        self.is_running = False
        self.current_idx = 0
        self.interval = 5.0 # seconds

state = SimulatorState()

def calculate_heading(lat1, lng1, lat2, lng2):
    dlng = lng2 - lng1
    y = math.sin(dlng) * math.cos(lat2)
    x = math.cos(lat1) * math.sin(lat2) - math.sin(lat1) * math.cos(lat2) * math.cos(dlng)
    brng = math.atan2(y, x)
    return (math.degrees(brng) + 360) % 360

async def simulation_loop():
    while True:
        if not state.is_running:
            await asyncio.sleep(1)
            continue

        lat, lng = SMOOTH_ROUTE[state.current_idx]
        next_idx = (state.current_idx + 1) % len(SMOOTH_ROUTE)
        next_lat, next_lng = SMOOTH_ROUTE[next_idx]
        
        heading = calculate_heading(math.radians(lat), math.radians(lng), math.radians(next_lat), math.radians(next_lng))
        
        payload = {
            "bus_id": state.bus_id,
            "lat": lat,
            "lng": lng,
            "heading": heading,
            "speed": 28.4,
            "tier": state.mode,
            "ts": int(time.time())
        }

        try:
            requests.post(BACKEND_URL, json=payload, timeout=2)
            print(f"Sent: {payload}")
        except Exception as e:
            print(f"Failed to send telemetry: {e}")

        state.current_idx = next_idx

        # Adjust interval based on mode to simulate network constraints
        if state.mode == "FULL":
            await asyncio.sleep(5)
        elif state.mode == "REDUCED":
            await asyncio.sleep(15)
        elif state.mode == "MINIMAL":
            await asyncio.sleep(30)
        elif state.mode == "DEAD":
            await asyncio.sleep(95) # Exceeds 90s buffering threshold

@app.on_event("startup")
async def startup_event():
    state.is_running = True
    asyncio.create_task(simulation_loop())

@app.post("/simulator/network-mode")
def set_network_mode(req: NetworkModeRequest):
    valid_modes = ["FULL", "REDUCED", "MINIMAL", "DEAD"]
    if req.mode.upper() in valid_modes:
        state.mode = req.mode.upper()
        return {"status": "success", "mode": state.mode}
    return {"status": "error", "message": "Invalid mode"}

@app.get("/simulator/status")
def get_status():
    return {"is_running": state.is_running, "mode": state.mode, "bus_id": state.bus_id}
