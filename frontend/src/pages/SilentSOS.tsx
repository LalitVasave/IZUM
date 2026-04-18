import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Shield, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TopAppBar from '../components/TopAppBar';
import BottomNavBar from '../components/BottomNavBar';
import { toast } from 'react-hot-toast';

const SilentSOS: React.FC = () => {
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sosActive && countdown > 0 && !isCancelled) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (sosActive && countdown === 0 && !isCancelled) {
      // Trigger actual SOS API call
      sendSOS();
    }
    return () => clearInterval(timer);
  }, [sosActive, countdown, isCancelled]);

  const triggerSOS = () => {
    setSosActive(true);
    setCountdown(10);
    setIsCancelled(false);
  };

  const cancelSOS = () => {
    setIsCancelled(true);
    setSosActive(false);
    toast.success("SOS Cancelled");
  };

  const sendSOS = async () => {
    try {
      await axios.post('/api/sos', {
        lat: 34.0522, // Should get from geolocation
        lng: -118.2437,
        bus_id: 'bus_01'
      });
      toast.success("Help is on the way");
    } catch (err) {
      toast.error("Failed to send SOS. Please call emergency services.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <TopAppBar title="Safety" showBack={true} />
      
      <main className="flex-grow flex flex-col items-center justify-center p-6 pb-32">
        <AnimatePresence>
          {!sosActive ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              <div className="w-64 h-64 rounded-full bg-red-500/10 border-2 border-red-500/20 flex items-center justify-center relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={triggerSOS}
                  className="w-48 h-48 rounded-full bg-red-600 shadow-[0_0_50px_rgba(220,38,38,0.5)] flex items-center justify-center group"
                >
                  <Shield className="w-20 h-20 text-white group-hover:animate-pulse" />
                </motion.button>
                <div className="absolute -inset-4 border border-red-500/10 rounded-full animate-ping pointer-events-none" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-3xl font-black tracking-tighter uppercase">Silent SOS</h2>
                <p className="text-white/40 text-sm max-w-xs mx-auto uppercase tracking-widest font-medium">
                  Tap the button to trigger a silent alert to campus security.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6"
            >
              {/* Progress Drain */}
              <div className="absolute top-0 left-0 w-full h-2 bg-white/5">
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 10, ease: 'linear' }}
                  className="h-full bg-red-500"
                />
              </div>

              <div className="text-center space-y-12">
                <div className="relative">
                  <h1 className="text-[12rem] font-black leading-none text-white/5 tabular-nums">
                    {countdown}
                  </h1>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AlertTriangle className="w-24 h-24 text-red-500 animate-bounce" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">SENDING EMERGENCY ALERT</h3>
                  <p className="text-white/40 uppercase tracking-widest text-xs">
                    Security will receive your live location in {countdown}s
                  </p>
                </div>

                <button
                  onClick={cancelSOS}
                  className="px-12 py-4 rounded-full border border-white/10 hover:bg-white/5 text-white/60 font-bold uppercase tracking-widest transition-all"
                >
                  Tap to Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Cards */}
        {!sosActive && (
          <div className="grid grid-cols-1 gap-4 w-full max-w-md mt-12">
            <div className="glass-panel p-4 rounded-2xl border border-white/5 flex gap-4 items-center">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <CheckCircle className="w-5 h-5" />
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Your coordinates are being tracked with 98% signal strength.
              </p>
            </div>
          </div>
        )}
      </main>

      <BottomNavBar />
    </div>
  );
};

export default SilentSOS;
