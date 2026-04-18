import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { useEffect } from 'react';

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

// Guards & Contexts
import ProtectedRoute from './components/ProtectedRoute';
import { WebSocketProvider, useWebSocket } from './context/WebSocketContext';

const GlobalAlertListener = () => {
  const { anomaly } = useWebSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (anomaly) {
      toast.error(`⚠️ ANOMALY DETECTED: ${anomaly.message}`, {
        duration: 8000,
        style: { background: '#ef4444', color: '#fff' }
      });
      // Optionally redirect to anomaly page
      // navigate('/anomaly');
    }
  }, [anomaly, navigate]);

  return null;
};

function App() {
  return (
    <WebSocketProvider>
      <Router>
        <GlobalAlertListener />
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

            {/* Auth — public */}
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />

            {/* Core — protected */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/map" element={<ProtectedRoute><LiveMap /></ProtectedRoute>} />
            <Route path="/stops" element={<ProtectedRoute><Stops /></ProtectedRoute>} />
            <Route path="/eta/:stop_id" element={<ProtectedRoute><ETADetail /></ProtectedRoute>} />

            {/* Safety — protected */}
            <Route path="/safety" element={<ProtectedRoute><SafetyHub /></ProtectedRoute>} />
            <Route path="/safety/sos" element={<ProtectedRoute><SilentSOS /></ProtectedRoute>} />
            <Route path="/safety/escort" element={<ProtectedRoute><VirtualEscort /></ProtectedRoute>} />
            <Route path="/escort/:token" element={<ProtectedRoute><VirtualEscort /></ProtectedRoute>} />

            {/* Features — protected */}
            <Route path="/status" element={<ProtectedRoute><LateNightMode /></ProtectedRoute>} />
            <Route path="/anomaly" element={<ProtectedRoute><GhostBusAlert /></ProtectedRoute>} />
            <Route path="/network" element={<ProtectedRoute><NetworkSimulation /></ProtectedRoute>} />

            {/* Docs — protected */}
            <Route path="/docs/architecture" element={<ProtectedRoute><ArchitectureDocs /></ProtectedRoute>} />
            <Route path="/docs/api" element={<ProtectedRoute><ApiPayloadDocs /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </WebSocketProvider>
  );
}

export default App;

