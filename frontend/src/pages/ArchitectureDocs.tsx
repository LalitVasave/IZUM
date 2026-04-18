import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Brain, Map, ChevronRight } from 'lucide-react';
import TopAppBar from '../components/TopAppBar';
import BottomNavBar from '../components/BottomNavBar';

const STATES = [
  { id: '01', label: 'ACTIVE', desc: 'Full telemetry lock, high-frequency updates.', color: 'border-primary text-primary' },
  { id: '02', label: 'SPARSE', desc: 'Reduced polling rate to conserve energy.', color: 'border-secondary text-secondary' },
  { id: '03', label: 'LOST', desc: 'No connection. Initiating dead reckoning.', color: 'border-red-500 text-red-400' },
  { id: '04', label: 'BUFFERING', desc: 'Storing data locally until handshake.', color: 'border-zinc-500 text-zinc-400' },
  { id: '05', label: 'SYNCING', desc: 'Uploading backlog. Prioritizing realtime.', color: 'border-tertiary text-tertiary' },
];

const TRANSITIONS = [
  { from: 'IDLE', to: 'TIMEOUT', color: 'from-primary to-secondary' },
  { from: 'TIMEOUT', to: 'LOST', color: 'from-secondary to-red-500' },
  { from: 'LOST', to: 'RECOVERY', color: 'from-red-500 to-tertiary' },
  { from: 'RECOVERY', to: 'FLUSH', color: 'from-tertiary to-primary' },
];

const ArchitectureDocs: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <TopAppBar title="Architecture" showBack={true} />

      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto w-full space-y-20">
        {/* Hero */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4 block">System Infrastructure</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              KINETIC<br />
              <span className="text-white/20">OBSERVATORY</span>
            </h1>
          </div>
          <div className="text-sm text-white/40 flex gap-6 items-center font-bold">
            <div className="flex flex-col">
              <span className="text-primary text-[10px] uppercase tracking-widest">LATENCY</span>
              <span>14.2ms avg</span>
            </div>
            <div className="flex flex-col">
              <span className="text-primary text-[10px] uppercase tracking-widest">NODES</span>
              <span>Active [08]</span>
            </div>
          </div>
        </div>

        {/* System Flow Bento */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Architecture Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-8 glass-panel rounded-3xl p-8 min-h-[500px] relative overflow-hidden border border-white/5 group"
          >
            <div className="absolute top-6 left-6 text-xs text-white/40 flex items-center gap-2 font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              LIVE_DATA_STREAM
            </div>

            {/* SVG Flow Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <defs>
                <linearGradient id="lineGrad" x1="0%" x2="100%">
                  <stop offset="0%" stopColor="#8eff71" stopOpacity="0" />
                  <stop offset="50%" stopColor="#8eff71" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#8eff71" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g fill="none" stroke="url(#lineGrad)" strokeWidth="1.5">
                <path d="M150 250 Q 250 250, 400 150" strokeDasharray="8" className="animate-[flow_3s_linear_infinite]" />
                <path d="M150 250 Q 250 250, 400 350" strokeDasharray="8" className="animate-[flow_4s_linear_infinite]" />
                <path d="M400 150 L 650 250" strokeDasharray="8" className="animate-[flow_3.5s_linear_infinite]" />
                <path d="M400 350 L 650 250" strokeDasharray="8" className="animate-[flow_2.5s_linear_infinite]" />
              </g>
            </svg>

            {/* Nodes */}
            <div className="relative h-full flex items-center justify-between px-8 mt-8">
              {[
                { icon: <MapPin className="w-8 h-8" />, label: 'GPS', color: 'text-primary', tooltip: 'RAW COORDINATE INGEST' },
                { icon: <Brain className="w-8 h-8" />, label: 'ML CORE', color: 'text-tertiary', tooltip: 'TRAJECTORY PREDICTION' },
                { icon: <Map className="w-8 h-8" />, label: 'RENDER', color: 'text-primary', tooltip: 'LEAFLET OSM V5' },
              ].map((node, i) => (
                <div key={i} className="relative group/node flex flex-col items-center gap-3">
                  <div className={`w-20 h-20 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center justify-center cursor-help hover:border-primary/50 transition-all ${node.color}`}>
                    {node.icon}
                    <span className="text-[9px] font-bold uppercase mt-1 text-white/40">{node.label}</span>
                  </div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/node:opacity-100 transition-all bg-white/10 backdrop-blur px-3 py-1 rounded text-[9px] whitespace-nowrap border border-primary/20 font-bold pointer-events-none">
                    {node.tooltip}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Docker Stack */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="glass-panel rounded-3xl p-6 flex-1 flex flex-col gap-4 border border-white/5">
              <h3 className="text-xs text-primary uppercase tracking-widest font-bold">System Build</h3>
              <div className="space-y-4">
                {[
                  { name: 'IZUM-GATEWAY', status: 'COMPILED', width: 'w-full', color: 'border-primary text-primary' },
                  { name: 'REDIS-CACHE', status: 'SYNCING', width: 'w-2/3', color: 'border-secondary text-secondary' },
                  { name: 'ML-TENSOR', status: 'QUEUED', width: 'w-1/4', color: 'border-tertiary text-tertiary' },
                ].map(item => (
                  <div key={item.name} className={`bg-white/5 p-3 rounded-xl border-l-2 ${item.color}`}>
                    <div className={`flex justify-between text-[10px] font-bold mb-2 ${item.color}`}>
                      <span className="text-white/60">IMAGE: {item.name}</span>
                      <span>{item.status}</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${item.width} bg-current rounded-full`} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-6 border-t border-white/5">
                <div className="text-[10px] text-white/20 font-bold uppercase mb-2">BUILD_VERSION</div>
                <div className="text-xl font-bold">v11.4.0-stable</div>
              </div>
            </div>

            {/* Log Stream */}
            <div className="bg-black p-4 rounded-2xl font-mono text-[10px] text-primary/60 border border-primary/10 h-32 overflow-hidden flex flex-col gap-1">
              {[
                '[09:42:11] INITIALIZING WEBSOCKET CLUSTER...',
                '[09:42:12] GPS_STREAM_01: HANDSHAKE SUCCESS',
                '[09:42:12] REDIS_MASTER: PONG',
                '[09:42:13] ML_INSTANCE: RECOVERY_SUCCESS',
              ].map((log, i) => (
                <div key={i} className={i === 3 ? 'animate-pulse' : ''}>{log}</div>
              ))}
              <div className="animate-pulse">[09:42:14] SYSTEM_READY: LISTENING ON PORT 3000</div>
            </div>
          </div>
        </div>

        {/* Vehicle State Engine */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-bold text-2xl tracking-tight uppercase">Vehicle State Engine</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {STATES.map((state, i) => (
              <motion.div
                key={state.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`glass-panel p-6 rounded-2xl border-b-4 border border-white/5 ${state.color} group hover:bg-white/5 transition-all`}
              >
                <div className="flex justify-between items-start mb-6">
                  <ChevronRight className="w-5 h-5" />
                  <span className="text-[10px] font-bold">{state.id}</span>
                </div>
                <h4 className="font-bold text-sm mb-2">{state.label}</h4>
                <p className="text-xs text-white/40 leading-relaxed">{state.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Transition Flow */}
          <div className="mt-12 p-8 glass-panel rounded-2xl flex items-center justify-between overflow-x-auto gap-8 border border-white/5">
            <div className="flex-shrink-0 flex items-center gap-4">
              <span className="text-[10px] font-bold text-primary uppercase">TRANSITION_LOGIC</span>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </div>
            <div className="flex-1 flex justify-center gap-8 items-center min-w-[500px]">
              {TRANSITIONS.map(t => (
                <div key={t.from} className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-white/40">{t.from}</span>
                  <div className={`w-16 h-0.5 bg-gradient-to-r ${t.color} relative`}>
                    <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-current" />
                  </div>
                </div>
              ))}
              <span className="text-[10px] font-bold text-white/40">FLUSH</span>
            </div>
          </div>
        </section>

        {/* Engineering Blog */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h3 className="font-black text-3xl mb-6 tracking-tight uppercase">ENGINEERING THE<br />REAL-TIME FABRIC</h3>
            <div className="space-y-4 text-white/50 leading-relaxed text-sm">
              <p>At the core of the IZUM Kinetic Observatory lies a resilient event-driven architecture. We've moved beyond standard REST polling to a robust WebSocket-first implementation that handles over 2.4 million coordinate points per hour with sub-20ms latency.</p>
              <p>By leveraging Redis as an ephemeral cache layer, the Fastify gateways can broadcast telemetry updates to connected clients without impacting the primary ML training pipeline, which runs asynchronously.</p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-white/5 border border-white/5">
            <div className="absolute inset-0 obsidian-grid opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-[10px] font-bold bg-primary/20 backdrop-blur-md px-2 py-1 rounded border border-primary/20 text-primary">
              IZUM_CORE_V2_RACK_01
            </div>
          </div>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default ArchitectureDocs;
