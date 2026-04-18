import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/axios';
import TopAppBar from '../components/TopAppBar';
import { motion } from 'framer-motion';
import { Signal, Clock, AlertTriangle, Info } from 'lucide-react';
import useVehicleStore from '../store/useVehicleStore';

interface ETAData {
  stop_id: string;
  eta_seconds: number;
  eta_min: number;
  eta_max: number;
  uncertainty_bar_pct: number;
}


const ETADetail: React.FC = () => {
  const { stop_id } = useParams();
  const [eta, setEta] = useState<ETAData | null>(null);
  const [loading, setLoading] = useState(true);
  const { state: busState, tier: busTier } = useVehicleStore();

  useEffect(() => {
    const fetchETA = async () => {
      try {
        const res = await api.get(`/eta/${stop_id}`);
        setEta(res.data);
      } catch (err) {
        console.error("Failed to fetch ETA", err);
      } finally {
        setLoading(false);
      }
    };

    fetchETA();
    const interval = setInterval(fetchETA, 15000); // 15s cache interval
    return () => clearInterval(interval);
  }, [stop_id]);

  const etaMinutes = eta ? Math.round(eta.eta_seconds / 60) : 0;
  const minMinutes = eta ? Math.round(eta.eta_min / 60) : 0;
  const maxMinutes = eta ? Math.round(eta.eta_max / 60) : 0;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <TopAppBar title="Arrival Prediction" showBack={true} />
      
      <div className="pt-24 px-6 max-w-lg mx-auto w-full pb-10">
        {/* Main ETA Display */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block relative"
          >
            <span className="text-8xl font-black tracking-tighter text-primary">
              {loading ? '--' : etaMinutes}
            </span>
            <span className="text-2xl font-bold ml-2 text-primary/50 uppercase">min</span>
            
            {/* Glow effect behind text */}
            <div className="absolute inset-0 bg-primary/20 blur-[80px] -z-10 rounded-full" />
          </motion.div>
          <p className="text-white/40 mt-4 font-medium tracking-widest uppercase text-xs">Estimated Time of Arrival</p>
        </div>

        {/* Uncertainty Bar */}
        <div className="glass-panel p-6 rounded-3xl border border-white/5 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-bold tracking-wider text-white/60">PREDICTION CONFIDENCE</h4>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/40">± {maxMinutes - etaMinutes} MIN</span>
          </div>

          {/* The Bar */}
          <div className="relative h-4 bg-white/5 rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${eta ? eta.uncertainty_bar_pct : 10}%` }}
              className={`h-full transition-all duration-500 rounded-full ${
                (eta?.uncertainty_bar_pct || 0) > 60 ? 'bg-orange-500' : 'bg-primary'
              }`}
            />
          </div>
          
          <div className="flex justify-between text-[10px] font-bold text-white/20 mt-2">
            <span>HIGH ACCURACY</span>
            <span>UNCERTAIN</span>
          </div>
        </div>

        {/* Signal Tier Panel */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="glass-panel p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <Signal className={`w-4 h-4 ${busState === 'ACTIVE' ? 'text-green-400' : 'text-yellow-400'}`} />
              <span className="text-[10px] font-bold text-white/40 tracking-wider">NETWORK STATUS</span>
            </div>
            <div className="text-sm font-bold">{busTier} MODE</div>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="text-blue-400 w-4 h-4" />
              <span className="text-[10px] font-bold text-white/40 tracking-wider">TIME WINDOW</span>
            </div>
            <div className="text-sm font-bold">{minMinutes}-{maxMinutes} MIN</div>
          </div>
        </div>

        {/* Resilience / Fallback Banner */}
        {(busTier === 'MINIMAL' || busTier === 'DEAD') && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-2xl flex gap-3 items-start"
          >
            <AlertTriangle className="text-orange-500 w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-bold text-orange-400">Low Signal Resilience Active</h5>
              <p className="text-xs text-orange-400/60 leading-relaxed mt-1">
                The bus is currently in a low-signal area. We are using dead-reckoning and historical data to predict your arrival.
              </p>
            </div>
          </motion.div>
        )}

        {/* Features Modal Placeholder */}
        <div className="mt-10 flex justify-center">
          <button className="text-[10px] font-bold text-white/20 hover:text-primary transition-colors flex items-center gap-2 tracking-widest uppercase">
            <Info className="w-3 h-3" />
            Model Features & Features Weighting
          </button>
        </div>
      </div>
    </div>
  );
};


export default ETADetail;
