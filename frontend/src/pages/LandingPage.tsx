import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Compass, Clock, Zap } from 'lucide-react';
import BottomNavBar from '../components/BottomNavBar';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-x-hidden">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-zinc-950/60 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <Zap className="text-primary w-6 h-6" />
          <span className="font-black tracking-tighter text-primary text-xl">IZUM</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="font-bold text-primary text-sm" href="#">Docs</a>
          <a className="font-bold text-white/40 hover:text-primary transition-colors text-sm" href="#">API</a>
          <a className="font-bold text-white/40 hover:text-primary transition-colors text-sm" href="#">Community</a>
        </nav>
        <button
          onClick={() => navigate('/login')}
          className="text-xs font-bold text-white/60 uppercase tracking-widest hover:text-primary transition-colors"
        >
          Sign In
        </button>
      </header>

      <main className="relative pt-16 pb-32">
        {/* Hero Section */}
        <section className="relative min-h-[820px] flex flex-col items-center justify-center px-6 overflow-hidden">
          {/* Background blobs */}
          <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
          </div>
          {/* Background Grid */}
          <div className="absolute inset-0 obsidian-grid opacity-30" />

          <div className="text-center z-10 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-primary uppercase leading-none" style={{ textShadow: '0 0 40px rgba(142,255,113,0.4)' }}>
                IZUM
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-secondary tracking-[0.2em] text-sm md:text-lg uppercase max-w-xl mx-auto leading-relaxed font-medium"
            >
              The next-generation protocol for kinetic observability and campus mobility.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="pt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => navigate('/register')}
                className="px-10 py-4 rounded-full bg-primary text-black font-bold text-lg hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_rgba(142,255,113,0.3)]"
              >
                Join the Observatory
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-10 py-4 rounded-full border border-white/20 text-white/70 font-bold text-lg hover:border-primary hover:text-primary transition-all"
              >
                Sign In
              </button>
            </motion.div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="max-w-4xl mx-auto px-6 py-24 text-center">
          <p className="font-bold text-white/20 text-xs uppercase tracking-widest mb-8">Philosophy</p>
          <p className="text-2xl md:text-4xl font-light text-white leading-snug">
            Mobility isn't just about moving atoms. It's about{' '}
            <span className="text-primary font-bold">preserving momentum</span>. We built IZUM to bridge the gap between physical intent and digital visibility, ensuring every step, turn, and stop is captured with surgical precision.
          </p>
        </section>

        {/* Feature Cards Bento Grid */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[600px]">
            {/* Card 1: Payload Reduction */}
            <div className="md:col-span-7 glass-panel rounded-3xl p-10 flex flex-col justify-between group overflow-hidden relative border border-primary/10">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                <Zap className="w-40 h-40 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold">Telemetry</span>
                </div>
                <h3 className="text-5xl font-black tracking-tight mb-4">94% Payload Reduction</h3>
                <p className="text-white/50 text-lg max-w-md">Our proprietary compression algorithms ensure that tracking data remains lightweight without sacrificing resolution.</p>
              </div>
              <div className="text-6xl text-primary font-bold">0.12<span className="text-xl">kb/s</span></div>
            </div>

            {/* Card 2: Dead Reckoning */}
            <div className="md:col-span-5 bg-white/5 rounded-3xl p-10 flex flex-col justify-between border border-white/5 hover:border-primary/20 transition-all">
              <div>
                <Compass className="text-primary w-10 h-10 mb-6" />
                <h3 className="text-3xl font-bold mb-2">Dead Reckoning</h3>
                <p className="text-white/50">Continuous positioning even in GNSS-denied environments. Resilience is not optional.</p>
              </div>
              <div className="mt-8 space-y-2">
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-primary rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] text-white/40 uppercase tracking-widest font-bold">
                  <span>Inertial Sync</span>
                  <span>85% Accuracy</span>
                </div>
              </div>
            </div>

            {/* Card 3: Honest ETA */}
            <div className="md:col-span-5 bg-white/5 rounded-3xl p-10 flex flex-col justify-center border border-white/5 hover:bg-white/[0.08] transition-colors">
              <h3 className="text-3xl font-bold mb-2">Honest ETA</h3>
              <p className="text-white/50 mb-6">No more buffer manipulation. Predictive arrival times based on real-time kinetic flux.</p>
              <div className="p-6 rounded-2xl bg-black flex items-center justify-between border-l-4 border-secondary">
                <div>
                  <div className="text-secondary text-[10px] uppercase mb-1 font-bold tracking-widest">Arriving in</div>
                  <div className="text-3xl font-black">2m 45s</div>
                </div>
                <Clock className="text-secondary w-10 h-10" />
              </div>
            </div>

            {/* Card 4: Edge Computation */}
            <div className="md:col-span-7 glass-panel rounded-3xl p-10 overflow-hidden relative border border-white/5">
              <div className="flex h-full items-center justify-between gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Edge Computation</h3>
                  <p className="text-white/50">Processing occurs at the point of kinetic origin. Instant feedback loops.</p>
                </div>
                <div className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-dashed border-primary/20 flex-shrink-0">
                  <Cpu className="text-primary w-12 h-12" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Specs */}
        <section className="max-w-4xl mx-auto px-6 py-24 space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 border-b border-white/10 pb-4">
            <h2 className="text-4xl font-bold tracking-tight">Technical Specs</h2>
            <span className="text-primary text-xs uppercase tracking-widest font-bold">v4.0.2 Stable</span>
          </div>
          <div className="space-y-12">
            {[
              { num: '01', title: 'Zero-Latency Sync', desc: 'State updates are broadcasted via a custom UDP tunnel, bypassing standard HTTP overhead for sub-50ms reaction times.' },
              { num: '02', title: 'Dynamic Re-routing', desc: 'The graph engine recalculates navigation paths every 500ms based on obstacle density sensors.' },
              { num: '03', title: 'Security at Rest', desc: 'Hardware-level encryption ensures that kinetic data is anonymized before it ever leaves the local edge node.' },
            ].map(spec => (
              <div key={spec.num} className="flex items-start gap-8">
                <span className="text-white/20 text-lg font-bold font-mono">{spec.num}</span>
                <div>
                  <h4 className="text-xl font-bold mb-2">{spec.title}</h4>
                  <p className="text-white/50 leading-relaxed">{spec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default LandingPage;
