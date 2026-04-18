import React from 'react';
import { motion } from 'framer-motion';
import { Map, List, Shield, Activity, ChevronRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';


const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const quickActions = [
    { label: 'Live Map', icon: <Map className="w-6 h-6" />, path: '/map', desc: 'Track buses in real-time', color: 'text-primary' },
    { label: 'Campus Stops', icon: <List className="w-6 h-6" />, path: '/stops', desc: 'Find nearest stop', color: 'text-secondary' },
    { label: 'Safety Center', icon: <Shield className="w-6 h-6" />, path: '/safety', desc: 'SOS & Virtual Escort', color: 'text-red-400' },
    { label: 'System Status', icon: <Activity className="w-6 h-6" />, path: '/status', desc: 'Network health', color: 'text-blue-400' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-primary/30">
      
      <main className="pt-24 pb-32 px-6 max-w-lg mx-auto w-full space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full"
          >
            <Zap className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">System Online</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black tracking-tight"
          >
            Welcome, <span className="text-primary italic">{user?.name?.split(' ')[0] ?? 'Student'}</span>
          </motion.h1>
          <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Campus Mobility Hub</p>
        </div>

        {/* Live Preview Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate('/map')}
          className="glass-panel rounded-[2.5rem] overflow-hidden border border-white/5 cursor-pointer group"
        >
          <div className="h-48 relative bg-white/5">
            <div className="absolute inset-0 obsidian-grid opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            {/* Mock Bus Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-4 h-4 bg-primary rounded-full animate-ping opacity-50" />
                <div className="w-4 h-4 bg-primary rounded-full relative z-10 border-2 border-black" />
              </div>
            </div>

            <div className="absolute bottom-4 left-6">
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Live Stream</p>
              <h3 className="text-xl font-black italic uppercase">Campus Loop A</h3>
            </div>
          </div>
          <div className="p-6 flex justify-between items-center bg-white/[0.02]">
            <span className="text-xs font-bold text-white/60">View Live Telemetry</span>
            <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              onClick={() => navigate(action.path)}
              className="glass-panel p-6 rounded-3xl border border-white/5 cursor-pointer hover:bg-white/[0.03] transition-colors group"
            >
              <div className={`mb-4 p-3 bg-white/5 rounded-2xl w-fit ${action.color}`}>
                {action.icon}
              </div>
              <h4 className="font-bold text-sm mb-1">{action.label}</h4>
              <p className="text-[10px] text-white/20 font-medium uppercase tracking-wider">{action.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Performance Footer */}
        <div className="pt-8 text-center opacity-20">
          <p className="text-[8px] font-bold uppercase tracking-[0.4em]">IZUM KINETIC PROTOCOL v4.2</p>
        </div>
      </main>

    </div>

  );
};

export default Dashboard;
