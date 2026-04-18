import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Share2, AlertCircle, Lock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import TopAppBar from '../components/TopAppBar';
import BottomNavBar from '../components/BottomNavBar';

const SafetyHub: React.FC = () => {
  const navigate = useNavigate();

  const safetyFeatures = [
    {
      id: 'sos',
      title: 'Silent SOS',
      desc: 'Discreetly notify campus security of your emergency and location.',
      icon: <AlertCircle className="w-8 h-8" />,
      path: '/safety/sos',
      color: 'bg-red-500/20 text-red-500 border-red-500/30',
      tag: 'EMERGENCY'
    },
    {
      id: 'escort',
      title: 'Virtual Escort',
      desc: 'Share a live tracking link with a friend until you reach your stop.',
      icon: <Share2 className="w-8 h-8" />,
      path: '/safety/escort',
      color: 'bg-primary/20 text-primary border-primary/30',
      tag: 'PROTECTION'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <TopAppBar title="Safety Center" showBack={true} />
      
      <main className="pt-24 pb-32 px-6 max-w-lg mx-auto w-full space-y-8">
        {/* Security Status Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-5 rounded-2xl border-l-4 border-primary bg-primary/5 flex items-center gap-4"
        >
          <div className="p-2 bg-primary/20 rounded-xl">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Encrypted Connection</h3>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium">Your location is shared only with authorized nodes</p>
          </div>
        </motion.div>

        <div className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight uppercase italic">Active Protocols</h2>
          <p className="text-white/40 text-xs uppercase tracking-[0.2em] font-medium">Select a safety service to initiate</p>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4">
          {safetyFeatures.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(feature.path)}
              className={`glass-panel p-6 rounded-[2rem] border cursor-pointer group hover:bg-white/[0.02] transition-all ${feature.color}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-black/40 rounded-2xl shadow-inner">
                  {feature.icon}
                </div>
                <span className="px-3 py-1 rounded-full text-[9px] font-black tracking-widest border border-current">
                  {feature.tag}
                </span>
              </div>
              
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black tracking-tighter">{feature.title}</h3>
                  <p className="text-white/60 text-xs max-w-[200px] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover:bg-current group-hover:text-black transition-all">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <div className="pt-4 px-2">
          <div className="flex items-start gap-3 opacity-30">
            <Shield className="w-4 h-4 mt-0.5" />
            <p className="text-[10px] leading-normal font-medium uppercase tracking-wider">
              IZUM uses real-time GPS telemetry and end-to-end encryption to ensure campus security has the fastest possible response time.
            </p>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default SafetyHub;
