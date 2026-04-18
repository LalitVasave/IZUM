import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Moon, AlertTriangle, Activity, Battery, Eye, Signal } from 'lucide-react';
import { motion } from 'framer-motion';
import TopAppBar from '../components/TopAppBar';
import BottomNavBar from '../components/BottomNavBar';
import { toast } from 'react-hot-toast';

const LateNightMode: React.FC = () => {
  const [countdown, setCountdown] = useState(240); // 4 minutes
  const [isOverdue, setIsOverdue] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsOverdue(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckin = async () => {
    try {
      await axios.post('/api/driver/checkin', { late_night: true });
      setCountdown(240);
      setIsOverdue(false);
      toast.success("Check-in successful");
    } catch (err) {
      toast.error("Check-in failed");
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <TopAppBar title="Status" showBack={false} />
      
      <main className="pt-24 pb-32 px-6 max-w-lg mx-auto w-full space-y-6">
        {/* Banner */}
        <div className="glass-panel rounded-2xl p-4 flex items-center justify-between border-l-4 border-secondary shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/10 rounded-xl">
              <Moon className="text-secondary w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="font-bold text-sm">Late Night Mode</h2>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Enhanced Surveillance</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-secondary/10 rounded-full border border-secondary/20">
            <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
            <span className="text-[9px] font-black text-secondary uppercase">ACTIVE</span>
          </div>
        </div>

        {/* Overdue Alert */}
        {isOverdue && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel rounded-2xl p-5 border-l-4 border-red-500 shadow-xl bg-red-500/5"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-500/20 rounded-full animate-pulse">
                <AlertTriangle className="text-red-500 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Driver check-in overdue</h3>
                <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">Vehicle ID: <span className="text-red-400">IZM-992-K</span></p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest">Contact Dispatch</button>
              <button 
                onClick={handleCheckin}
                className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-xs uppercase tracking-widest"
              >
                Check In Now
              </button>
            </div>
          </motion.div>
        )}

        {/* Check-in Ring */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel rounded-3xl p-6 flex flex-col items-center justify-center text-center relative border border-white/5">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle className="text-white/5" cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="4" />
                <motion.circle 
                  className={isOverdue ? "text-red-500" : "text-primary"} 
                  cx="64" cy="64" r="58" fill="transparent" 
                  stroke="currentColor" strokeWidth="6" strokeLinecap="round"
                  initial={{ strokeDasharray: "364", strokeDashoffset: "0" }}
                  animate={{ strokeDashoffset: 364 - (countdown / 240) * 364 }}
                />
              </svg>
              <div className="flex flex-col items-center">
                <span className={`text-2xl font-black ${isOverdue ? 'text-red-500' : 'text-white'}`}>{formatTime(countdown)}</span>
                <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Remaining</span>
              </div>
            </div>
            <button 
              onClick={handleCheckin}
              className="mt-6 text-[10px] font-bold text-primary uppercase tracking-[0.2em] hover:opacity-80 transition-opacity"
            >
              Manual Sync
            </button>
          </div>

          {/* Mini Map placeholder */}
          <div className="glass-panel rounded-3xl overflow-hidden flex flex-col border border-white/5">
            <div className="h-32 bg-white/5 relative">
              <div className="absolute inset-0 obsidian-grid opacity-20" />
              <div className="absolute top-2 right-2 px-2 py-1 bg-red-500/90 text-[8px] font-black rounded text-white">850m DEVIATION</div>
              <div className="flex items-center justify-center h-full">
                <Activity className="text-red-500/40 w-10 h-10" />
              </div>
            </div>
            <div className="p-4">
              <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Deviation Status</p>
              <p className="text-[10px] font-bold text-red-400 mt-1 uppercase">OFF-ROUTE DETECTED</p>
            </div>
          </div>
        </div>

        {/* Telemetry */}
        <div className="glass-panel rounded-3xl p-6 space-y-4 border border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">Night Telemetry v4.2</span>
            <Signal className="text-secondary w-4 h-4" />
          </div>
          <div className="space-y-3">
            <TelemetryRow icon={<Battery className="w-4 h-4" />} label="Battery Status" value="82%" color="text-primary" />
            <TelemetryRow icon={<Eye className="w-4 h-4" />} label="Driver Vigilance" value="OPTIMAL" color="text-secondary" />
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
};

const TelemetryRow = ({ icon, label, value, color }: any) => (
  <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl">
    <div className="flex items-center gap-3">
      <div className="text-white/40">{icon}</div>
      <span className="text-xs font-medium text-white/60">{label}</span>
    </div>
    <span className={`text-xs font-black ${color}`}>{value}</span>
  </div>
);

export default LateNightMode;
