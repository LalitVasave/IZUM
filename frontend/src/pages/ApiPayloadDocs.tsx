import React from 'react';
import { motion } from 'framer-motion';
import { Copy, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import TopAppBar from '../components/TopAppBar';
import BottomNavBar from '../components/BottomNavBar';
import { toast } from 'react-hot-toast';

const TIERS = [
  { num: '01', title: 'Sub-Orbital Burst', desc: 'Proprietary low-frequency binary relay', size: '8 Bytes', latency: '0.02ms' },
  { num: '02', title: 'LTE-M Tunnelling', desc: 'Carrier-grade persistence for urban density', size: '12 Bytes', latency: '0.08ms' },
  { num: '03', title: 'Mesh-Over-Radio', desc: 'Fallback local communication grid', size: '16 Bytes', latency: '0.14ms' },
];

const ML_FEATURES = [
  { name: 'Trajectory Smoothing', model: 'Kalman-Lite v2', accuracy: '99.98%', status: 'Active', statusColor: 'text-primary bg-primary/10' },
  { name: 'Battery Optimization', model: 'VoltPredict L4', accuracy: '98.40%', status: 'Active', statusColor: 'text-primary bg-primary/10' },
  { name: 'Anomalous Stop Detection', model: 'Echobox-Net', accuracy: '97.21%', status: 'Syncing', statusColor: 'text-white/40 bg-white/10' },
];

const WS_PAYLOAD = `{
  "event": "telemetry.update",
  "device_id": "iz-992-0x",
  "data": {
    "lat": 48.8584,
    "lng": 2.2945,
    "v": 42.8,  // Velocity in km/h
    "b": 88     // Battery %
  },
  "ts": 1715830922
}`;

const ApiPayloadDocs: React.FC = () => {
  const [openEndpoint, setOpenEndpoint] = React.useState<number | null>(1);

  const handleCopy = () => {
    navigator.clipboard.writeText(`ws://localhost:3000/ws/bus/bus_01?token=YOUR_TOKEN`);
    toast.success('Auth URL copied!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <TopAppBar title="API & Efficiency" showBack={true} />

      <main className="pt-24 pb-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full space-y-20">
        {/* Hero Payload Comparison */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <p className="text-primary uppercase tracking-[0.3em] text-xs font-bold">Observatory Metrics // Efficiency</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
              Massive<br />Efficiency.<br />
              <span className="text-primary">Micro Payload.</span>
            </h2>
            <p className="text-white/50 max-w-md text-lg leading-relaxed">
              By rethinking the telemetry stack, we've reduced standard GPS data packets to the absolute physical minimum.
            </p>
          </div>
          <div className="space-y-6">
            {/* Naive Tracker Card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] text-white/40 uppercase font-bold">Legacy Protocol</span>
                  <h3 className="text-xl font-bold">Naive Tracker</h3>
                </div>
                <span className="text-red-400 font-black text-2xl tracking-tighter">340B</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="bg-red-500/60 h-full w-full rounded-full" />
              </div>
              <div className="mt-4 flex justify-between text-[10px] text-white/30 uppercase tracking-widest font-bold">
                <span>Standard JSON Payload</span>
                <span>Full Latency</span>
              </div>
            </div>

            {/* IZUM Card */}
            <div className="glass-panel p-6 rounded-2xl border border-primary/20 ring-1 ring-primary/10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] text-primary uppercase font-bold">IZUM Binary Protocol</span>
                  <h3 className="text-xl font-bold">IZUM Core</h3>
                </div>
                <div className="text-right">
                  <span className="text-primary font-black text-2xl tracking-tighter">8B</span>
                  <div className="text-primary text-[9px] uppercase font-bold">-94% Shrinkage</div>
                </div>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
                <div className="bg-primary h-full w-[6%] shadow-[0_0_15px_#8eff71] rounded-full" />
                <div className="h-full w-[94%]" />
              </div>
              <div className="mt-4 flex justify-between text-[10px] text-primary uppercase tracking-widest font-bold">
                <span>Binary Bit-Stream</span>
                <span>Instantaneous</span>
              </div>
            </div>
          </div>
        </section>

        {/* Network Resilience Tiering */}
        <section className="space-y-8">
          <h3 className="text-sm font-bold uppercase tracking-widest border-l-2 border-primary pl-4">Network Resilience Tiering</h3>
          <div className="space-y-2">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.num}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center justify-between p-6 bg-white/[0.03] hover:bg-white/[0.07] transition-all rounded-2xl cursor-default border-l-2 border-transparent hover:border-primary"
              >
                <div className="flex gap-8 items-center">
                  <span className="text-white/20 font-bold group-hover:text-primary transition-colors">{tier.num}</span>
                  <div>
                    <h4 className="font-bold text-lg">{tier.title}</h4>
                    <p className="text-white/40 text-xs">{tier.desc}</p>
                  </div>
                </div>
                <div className="text-right font-bold text-sm">
                  <span className="text-primary">{tier.size}</span>
                  <span className="mx-2 text-white/20">/</span>
                  <span className="text-white/40 uppercase">{tier.latency}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ML Features Table */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          <div className="xl:col-span-1 space-y-4">
            <h3 className="text-2xl font-bold">ML Telemetry Features</h3>
            <p className="text-white/50">Our edge models pre-process movement data to eliminate noise before transmission.</p>
            <div className="p-4 glass-panel rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-tighter">Neural Edge Core 4.2</span>
              </div>
              <div className="h-48 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 obsidian-grid">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">ML Core Visual</span>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:col-span-2 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  {['Feature', 'Model', 'Accuracy', 'Status'].map(h => (
                    <th key={h} className="py-4 text-xs font-bold uppercase tracking-widest text-white/40">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ML_FEATURES.map(f => (
                  <tr key={f.name} className="group hover:bg-white/5 transition-colors">
                    <td className="py-6 pr-4 font-medium">{f.name}</td>
                    <td className="py-6 text-sm text-secondary font-bold">{f.model}</td>
                    <td className="py-6 text-sm text-primary font-bold">{f.accuracy}</td>
                    <td className="py-6">
                      <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded-lg ${f.statusColor}`}>{f.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* API Docs Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* WebSocket Code Block */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-widest">WebSocket Real-time Stream</h3>
              <button onClick={handleCopy} className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase hover:opacity-70 transition-opacity">
                <Copy className="w-4 h-4" />
                Copy Auth URL
              </button>
            </div>
            <div className="bg-black rounded-2xl p-6 font-mono text-sm border border-white/10 shadow-2xl overflow-x-auto">
              <pre className="text-white/50 whitespace-pre">
                <code>
                  <span className="text-primary">{`{`}</span>{'\n'}
                  {'  '}<span className="text-secondary">"event"</span>{': '}<span className="text-orange-400">"telemetry.update"</span>{',\n'}
                  {'  '}<span className="text-secondary">"device_id"</span>{': '}<span className="text-orange-400">"iz-992-0x"</span>{',\n'}
                  {'  '}<span className="text-secondary">"data"</span>{': '}<span className="text-primary">{`{`}</span>{'\n'}
                  {'    '}<span className="text-secondary">"lat"</span>{': '}<span className="text-primary">48.8584</span>{',\n'}
                  {'    '}<span className="text-secondary">"lng"</span>{': '}<span className="text-primary">2.2945</span>{',\n'}
                  {'    '}<span className="text-secondary">"v"</span>{': '}<span className="text-primary">42.8</span>{', '}<span className="text-white/20">// km/h</span>{'\n'}
                  {'    '}<span className="text-secondary">"b"</span>{': '}<span className="text-primary">88</span>{'    '}<span className="text-white/20">// Battery %</span>{'\n'}
                  {'  '}<span className="text-primary">{`}`}</span>{',\n'}
                  {'  '}<span className="text-secondary">"ts"</span>{': '}<span className="text-primary">1715830922</span>{'\n'}
                  <span className="text-primary">{`}`}</span>
                </code>
              </pre>
            </div>
          </div>

          {/* Endpoints Accordion */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest">REST Endpoints</h3>
            <div className="space-y-px rounded-2xl overflow-hidden border border-white/5">
              {[
                { method: 'GET', path: '/v1/devices/status', desc: 'Returns real-time health and position for all fleet nodes.', color: 'bg-primary text-black' },
                { method: 'POST', path: '/v1/deploy/wake', desc: null, response: '{ "status": "waking", "eta_ms": 40 }', color: 'bg-secondary text-black' },
                { method: 'DELETE', path: '/v1/logs/purge', desc: 'Clears local cache logs on device flash memory.', color: 'bg-red-500 text-white' },
              ].map((ep, i) => (
                <div
                  key={i}
                  className="bg-white/[0.03] hover:bg-white/[0.06] p-4 cursor-pointer transition-colors"
                  onClick={() => setOpenEndpoint(openEndpoint === i ? null : i)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${ep.color}`}>{ep.method}</span>
                      <span className="font-mono text-sm text-white/80">{ep.path}</span>
                    </div>
                    {openEndpoint === i ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
                  </div>
                  {openEndpoint === i && (
                    <div className="mt-2">
                      {ep.desc && <p className="text-white/40 text-xs">{ep.desc}</p>}
                      {ep.response && (
                        <div className="mt-3 p-3 bg-black rounded-xl font-mono text-[11px] text-primary/80 border border-primary/10">
                          <span className="text-white/30">Response: </span>{ep.response}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default ApiPayloadDocs;
