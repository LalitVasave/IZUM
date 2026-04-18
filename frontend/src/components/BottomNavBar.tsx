import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Map, List, Home, Shield } from 'lucide-react';

const BottomNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: <Home className="w-5 h-5" />, path: '/dashboard' },
    { label: 'Map', icon: <Map className="w-5 h-5" />, path: '/map' },
    { label: 'Stops', icon: <List className="w-5 h-5" />, path: '/stops' },
    { label: 'Safety', icon: <Shield className="w-5 h-5" />, path: '/safety' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-zinc-950/60 backdrop-blur-2xl rounded-t-[32px] border-t border-white/15 shadow-[0px_-24px_48px_rgba(0,0,0,0.4)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
              isActive 
                ? 'text-primary bg-primary/10 rounded-3xl px-6 py-2 scale-110' 
                : 'text-zinc-500 hover:text-zinc-200'
            }`}
          >
            {item.icon}
            <span className="font-label text-[10px] uppercase tracking-widest">
              {item.label}
            </span>
          </button>
        );
      })}
    </footer>
  );
};

export default BottomNavBar;
