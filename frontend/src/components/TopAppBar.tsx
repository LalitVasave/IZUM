import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TopAppBarProps {
  title: string;
  showBack?: boolean;
}

const TopAppBar: React.FC<TopAppBarProps> = ({ title, showBack = false }) => {
  const navigate = useNavigate();

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
        <div className="hidden md:flex gap-8">
          <span className="font-headline uppercase tracking-widest text-sm text-[#39FF14]">
            {title}
          </span>
        </div>
      </div>
    </header>
  );
};

export default TopAppBar;
