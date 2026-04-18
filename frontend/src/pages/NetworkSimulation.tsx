import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, Timer, Layers, RefreshCw } from 'lucide-react';
import TopAppBar from '../components/TopAppBar';
import BottomNavBar from '../components/BottomNavBar';

const NETWORK_MODES = [
  {
    id: 'full',
    label: 'Full Mode',
    sub: 'Optimized Throughput',
    icon: <Wifi className="w-10 h-10" />,
    color: 'text-primary',
    active: true,
  },
  {
    id: 'reduced',
    label: 'Reduced',
    sub: 'Latency Priority',
    icon: <Wifi className="w-10 h-10" />,
    color: 'text-secondary',
    active: false,
  },
  {
    id: 'minimal',
    label: 'Minimal',
    sub: 'Essential Data',
    icon: <Wifi className="w-10 h-10" />,
    color: 'text-orange-400',
    active: false,
  },
  {
    id: 'dead',
    label: 'Dead Signal',
    sub: 'Offline Cache',
    icon: <WifiOff className="w-10 h-10" />,
    color: 'text-red-500',
    active: false,
  },
];

const NetworkSimulation: React.FC = () => {
  const [activeMode, setActiveMode] = React.useState('full');

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <TopAppBar title="Network Control" showBack={true} />

      <main className="pt-24 pb-32 px-6 max-w-2xl mx-auto w-full space-y-10">
        {/* Signal Header Decoration */}
        <div className="overflow-hidden">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Telemetry Active</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Encryption: Sigma-9</span>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        </div>

        {/* Hero Editorial */}
        <section>
          <h2 className="text-5xl font-black italic tracking-tighter leading-tight mb-2">
            NETWORK<br />
            <span className="text-primary">OSCILLATION</span>
          </h2>
          <p className="text-white/40 text-sm max-w-md uppercase tracking-wider font-medium">
            Configure real-time packet distribution and node visibility across the observatory grid.
          </p>
        </section>

        {/* Network Mode Grid */}
        <div className="grid grid-cols-2 gap-4">
          {NETWORK_MODES.map((mode, i) => (
            <motion.button
              key={mode.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveMode(mode.id)}
              className={`relative aspect-square flex flex-col items-center justify-center rounded-2xl p-6 transition-all duration-300 ${
                activeMode === mode.id
                  ? 'bg-white/10 shadow-[0px_0px_32px_rgba(142,255,113,0.15)] ring-1 ring-primary/30 scale-105'
                  : 'bg-white/[0.03] hover:bg-white/[0.07] hover:scale-105'
              }`}
            >
              <div className={mode.color}>{mode.icon}</div>
              <span className={`font-bold text-xs uppercase tracking-widest mt-4 mb-1 ${mode.color}`}>{mode.label}</span>
              <span className="text-[10px] text-white/40 font-medium">{mode.sub}</span>
              {activeMode === mode.id && (
                <div className="absolute bottom-4 w-12 h-1 bg-primary rounded-full blur-[2px]" />
              )}
            </motion.button>
          ))}
        </div>

        {/* Stats Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-panel rounded-2xl p-5 flex items-center justify-between border border-white/5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1">Payload Size</span>
              <span className="text-2xl font-bold">1.2<span className="text-xs text-primary ml-1">MB/s</span></span>
            </div>
            <div className="h-10 w-24 bg-white/5 rounded flex items-end gap-1 px-2 pb-1">
              {[4, 6, 3, 8, 5].map((h, i) => (
                <div key={i} className="w-2 bg-primary rounded-t" style={{ height: `${h * 4}px`, opacity: 0.2 + i * 0.2 }} />
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 flex items-center justify-between border border-white/5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1">Ping Interval</span>
              <span className="text-2xl font-bold">24<span className="text-xs text-primary ml-1">ms</span></span>
            </div>
            <Timer className="text-primary/30 w-8 h-8" />
          </div>

          <div className="glass-panel rounded-2xl p-5 flex items-center justify-between border border-white/5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1">Buffer Queue</span>
              <span className="text-2xl font-bold">0.0<span className="text-xs text-primary ml-1">%</span></span>
            </div>
            <Layers className="text-primary/30 w-8 h-8" />
          </div>

          <div className="glass-panel rounded-2xl p-5 flex items-center justify-between border border-white/5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1">WebSocket</span>
              <span className="text-xs font-bold text-primary uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#8eff71]" />
                Established
              </span>
            </div>
            <RefreshCw className="text-primary/30 w-8 h-8" />
          </div>
        </div>

        {/* Decorative Card */}
        <div className="relative h-48 rounded-3xl overflow-hidden group">
          <div className="absolute inset-0 obsidian-grid" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
          <div className="absolute bottom-6 left-6">
            <h4 className="font-black text-xl text-primary">GRID_NODE_ALPHA</h4>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Location: Sub-Sector 04</p>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default NetworkSimulation;
