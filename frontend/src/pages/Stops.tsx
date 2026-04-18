import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopAppBar from '../components/TopAppBar';
import ETACard from '../components/ETACard';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
}


const Stops: React.FC = () => {
  const [stops, setStops] = useState<Stop[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStops = async () => {
      try {
        const res = await axios.get('/api/stops');
        setStops(res.data);
      } catch (err) {
        console.error("Failed to fetch stops", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStops();
  }, []);

  const filteredStops = stops.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-x-hidden">
      <TopAppBar title="Select Stop" showBack={true} />
      
      <div className="pt-20 px-6 flex-grow max-w-lg mx-auto w-full pb-24">
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
          <input
            type="text"
            placeholder="Search stops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <AnimatePresence>
              {filteredStops.map((stop, i) => (
                <motion.div
                  key={stop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ETACard
                    id={stop.id}
                    name={stop.name}
                    eta="..." // Will fetch per stop in real app or batch
                    distance="Calculating..."
                    status="WAIT"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {!loading && filteredStops.length === 0 && (
            <div className="text-center py-10 text-white/40">
              No stops found matching "{search}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default Stops;
