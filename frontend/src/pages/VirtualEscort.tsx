import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/axios';
import { Shield, Clock, Gauge, MapPin, Bus, Timer } from 'lucide-react';
import { motion } from 'framer-motion';
import TopAppBar from '../components/TopAppBar';
import BottomNavBar from '../components/BottomNavBar';

const VirtualEscort: React.FC = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [escortData, setEscortData] = useState<any>(null);

  useEffect(() => {
    // In a real app, fetch tracking data using the token
    const fetchEscort = async () => {
      try {
        // Mock data for demo
        setEscortData({
          student_name: 'Leo',
          bus_id: 'IZUM-001',
          route_name: 'Campus Loop Express',
          next_stop: 'North Commons',
          dist_miles: 0.8,
          eta_mins: 4,
          elapsed_mins: 12,
          elapsed_secs: 44,
          speed_mph: 18,
          expiry_mins: 42,
          expiry_secs: 15
        });
      } finally {
        setLoading(false);
      }
    };
    fetchEscort();
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
      <TopAppBar title="Live Tracking" showBack={true} />
      
      <main className="relative flex-grow w-full bg-surface">
        {/* Map Placeholder */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center grayscale brightness-[0.2] contrast-125 obsidian-grid"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7PWhqT8-7jF6M2KPBnG0d9BaKTo3reStMgHcj6SUjr21A-WGq9kxNqWDHC8qYUjTg1dM6aMFwFYIInGA30TS8G9sPL0NZOeLj1htsUE4GOHKwtE2N62HYL6ZgZ48hUoAffO03GCxNRlvjsH_FU7Zbc-uZjo3dCFMF2RaIAz0IV5pgQfH4HhFRPLGgfSitLfpyjqtZXLF2n0Za9ynasCjWgngPgxrfEXKNmNu_3j3vwYRirnszeVlxpep4uSdz5WlvSK_yRf2z6E3W')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/80 pointer-events-none" />
        </div>

        {/* Tracking Banner */}
        <div className="absolute top-20 left-4 right-4 z-10 flex flex-col gap-2">
          <div className="glass-panel rounded-2xl px-4 py-3 flex items-center justify-between border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-secondary rounded-full animate-pulse" />
                <div className="absolute inset-0 w-2.5 h-2.5 bg-secondary rounded-full animate-ping opacity-75" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Tracking {escortData?.student_name} — Live</p>
                <p className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">Route: {escortData?.route_name}</p>
              </div>
            </div>
            <div className="bg-white/5 px-2 py-1 rounded text-[9px] font-bold text-secondary tracking-tighter">
              GPS: ACTIVE
            </div>
          </div>
          
          <div className="self-center bg-red-500/10 border border-red-500/20 px-4 py-1.5 rounded-full backdrop-blur-md">
            <p className="text-[8px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-2">
              <Timer className="w-3 h-3" />
              Link expires in {escortData?.expiry_mins}:{escortData?.expiry_secs}
            </p>
          </div>
        </div>

        {/* Bus Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative group">
            <div className="absolute -inset-6 bg-secondary/20 rounded-full blur-2xl group-hover:bg-secondary/40 transition-all" />
            <div className="relative bg-secondary p-4 rounded-full shadow-[0px_0px_30px_rgba(0,227,253,0.6)] border-2 border-black flex items-center justify-center transform hover:scale-110 transition-transform">
              <Bus className="text-black w-6 h-6 fill-current" />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Tracking Card */}
      <section className="relative z-30 px-4 pb-10">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="glass-panel rounded-t-[2.5rem] p-6 border-t border-white/15 shadow-[0px_-24px_48px_rgba(0,0,0,0.6)]"
        >
          <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-6" />
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white mb-1">{escortData?.next_stop}</h2>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Next Stop • {escortData?.dist_miles} mi away</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black text-secondary tracking-tighter leading-none mb-1">
                {escortData?.eta_mins}<span className="text-lg ml-0.5">min</span>
              </div>
              <p className="text-[9px] font-bold text-secondary uppercase tracking-[0.2em]">Estimated Arrival</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4">
              <div className="bg-secondary/10 p-2 rounded-lg text-secondary">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Live Timer</p>
                <p className="text-sm font-bold text-white">{escortData?.elapsed_mins}m {escortData?.elapsed_secs}s</p>
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4">
              <div className="bg-secondary/10 p-2 rounded-lg text-secondary">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Current Speed</p>
                <p className="text-sm font-bold text-white">{escortData?.speed_mph} <span className="text-[10px] font-normal text-secondary ml-1">mph</span></p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 opacity-50">
            <Shield className="w-4 h-4" />
            <p className="text-[8px] font-bold uppercase tracking-widest">End-to-End Encrypted Live Location</p>
          </div>
        </motion.div>
      </section>

      <BottomNavBar />
    </div>
  );
};

export default VirtualEscort;
