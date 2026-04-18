import React from 'react';
import { ArrowLeft, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

interface TopAppBarProps {
  title: string;
  showBack?: boolean;
  showLogout?: boolean;
}

const TopAppBar: React.FC<TopAppBarProps> = ({ title, showBack = false, showLogout = false }) => {
  const navigate = useNavigate();
  const { clearAuth, isAuthenticated } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 w-full z-50 flex items-center px-6 h-16 bg-[#0e0e13]/60 backdrop-blur-lg border-b border-[#39FF14]/10 shadow-[0_0_12px_rgba(57,255,20,0.05)]">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          {showBack && (
            <ArrowLeft
              className="text-[#39FF14] cursor-pointer scale-95 active:duration-100"
              onClick={() => navigate(-1)}
            />
          )}
          <h1 className="text-[#39FF14] font-black tracking-tighter text-xl uppercase font-headline">
            IZUM MOBILITY
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:block font-headline uppercase tracking-widest text-sm text-[#39FF14]">
            {title}
          </span>
          {(showLogout || isAuthenticated()) && (
            <button
              onClick={handleLogout}
              title="Sign out"
              className="flex items-center gap-2 text-white/40 hover:text-red-400 transition-colors group"
            >
              <LogOut size={16} className="group-hover:scale-110 transition-transform" />
              <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest">Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopAppBar;
