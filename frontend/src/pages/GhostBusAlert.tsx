import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ghost, AlertTriangle, MessageSquare, X, Info } from 'lucide-react';
import TopAppBar from '../components/TopAppBar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const GhostBusAlert: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleReport = () => {
    toast.success("Anomaly reported to campus security.");
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative overflow-hidden">
      <TopAppBar title="Anomaly Alert" showBack={true} />
      
      {/* Background Map Backdrop */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center grayscale brightness-[0.2] contrast-150 obsidian-grid"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQO82hCSY36gV45PY4hzkNFoWTW136Q8HV7CwjXkI4ogSD5BZ0I1E3gPNpZHvFuezZISbRCEb5nrFCTD_6Oz8oUZ7QGaLPHdG96bbp375EhZL3rGRXOYUkhfo_bFL-wtV_DFjd_j946saiwtzmVQCokO4d-7rndd_DVSujoHmrWhUz1bJk9A7FeOA5TgQT1dp-PsPhNBVh-mAk-HemIeww8oxuRhFi4z7SMYjWvnXzR1ZcGXQ32v9D7YuWNV4QhGhxsajtEx7qL7kX')" }}
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      </div>

      <main className="relative z-10 flex-grow flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full max-w-md bg-surface-container/80 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/5 shadow-2xl glass-panel overflow-hidden"
        >
          {/* Progress Circle Visual */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none -rotate-90">
            <motion.circle
              cx="50%" cy="50%" r="48%"
              fill="transparent"
              stroke="#8eff71"
              strokeWidth="0.5"
              strokeOpacity="0.1"
            />
            <motion.circle
              cx="50%" cy="50%" r="48%"
              fill="transparent"
              stroke="#8eff71"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ strokeDasharray: "300", strokeDashoffset: "0" }}
              animate={{ strokeDashoffset: 300 - (countdown / 60) * 300 }}
              transition={{ duration: 1, ease: 'linear' }}
            />
          </svg>

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Ghost Icon */}
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center border border-primary/30 shadow-2xl relative">
                <Ghost className="text-primary w-10 h-10" />
              </div>
            </div>

            <div className="mb-2">
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-2 block">System Anomaly</span>
              <h1 className="text-3xl font-black tracking-tight text-white leading-tight uppercase italic">Ghost Bus Alert</h1>
            </div>

            <div className="w-full bg-white/5 rounded-2xl p-5 my-6 space-y-4 text-left border border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Vehicle ID</span>
                <span className="text-sm text-primary font-black">LX-4092</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Route</span>
                <span className="text-xs font-bold uppercase">North Campus Loop</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Status: Non-Responsive</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-medium">
                  Bus has been stationary for <span className="text-white font-bold">18 minutes</span> near West Gate.
                </p>
              </div>
            </div>

            <div className="w-full flex flex-col gap-3">
              <button 
                onClick={handleReport}
                className="w-full bg-red-600 text-white py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-4 h-4" />
                Report to Security
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full bg-white/5 border border-white/10 text-white/60 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:text-white transition-all"
              >
                Dismiss Alert
              </button>
            </div>

            <div className="mt-6 text-[9px] font-bold text-white/20 uppercase tracking-widest">
              Auto-closing in {countdown}s
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default GhostBusAlert;
