import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Auth
import LandingPage from './pages/LandingPage';
import Registration from './pages/Registration';
import Login from './pages/Login';

// Core App
import Dashboard from './pages/Dashboard';
import LiveMap from './pages/LiveMap';
import Stops from './pages/Stops';
import ETADetail from './pages/ETADetail';

// Safety
import SafetyHub from './pages/SafetyHub';
import SilentSOS from './pages/SilentSOS';
import VirtualEscort from './pages/VirtualEscort';

// Features
import LateNightMode from './pages/LateNightMode';
import GhostBusAlert from './pages/GhostBusAlert';
import NetworkSimulation from './pages/NetworkSimulation';

// Docs
import ArchitectureDocs from './pages/ArchitectureDocs';
import ApiPayloadDocs from './pages/ApiPayloadDocs';

function App() {
  return (
    <Router>
      <div className="bg-background text-on-surface font-body selection:bg-primary selection:text-on-primary min-h-screen">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1f1f26',
              color: '#f9f5fd',
              border: '1px solid rgba(142, 255, 113, 0.2)',
            },
          }}
        />
        <Routes>
          {/* Entry Point */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/home" element={<LandingPage />} />

          {/* Auth */}
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />

          {/* Core */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/map" element={<LiveMap />} />
          <Route path="/stops" element={<Stops />} />
          <Route path="/eta/:stop_id" element={<ETADetail />} />

          {/* Safety */}
          <Route path="/safety" element={<SafetyHub />} />
          <Route path="/safety/sos" element={<SilentSOS />} />
          <Route path="/safety/escort" element={<VirtualEscort />} />
          <Route path="/escort/:token" element={<VirtualEscort />} />

          {/* Features */}
          <Route path="/status" element={<LateNightMode />} />
          <Route path="/anomaly" element={<GhostBusAlert />} />
          <Route path="/network" element={<NetworkSimulation />} />

          {/* Docs */}
          <Route path="/docs/architecture" element={<ArchitectureDocs />} />
          <Route path="/docs/api" element={<ApiPayloadDocs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
