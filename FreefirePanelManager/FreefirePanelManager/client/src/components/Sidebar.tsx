import React from 'react';
import { FiMenu, FiEye, FiZap, FiAlertTriangle, FiSettings, FiUser } from 'react-icons/fi';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="glass-panel h-full w-[70px] flex flex-col items-center py-6 border-r border-cyan-500/30">
      {/* Logo */}
      <div className="w-16 h-16 mb-10 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon 
              points="50,10 90,30 90,70 50,90 10,70 10,30" 
              fill="rgba(0, 0, 0, 0.5)" 
              stroke="#00BFFF" 
              strokeWidth="2"
            />
            <text x="50" y="55" fontSize="12" fill="#00BFFF" textAnchor="middle" fontWeight="bold">HUZI</text>
          </svg>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <div className="flex-1 flex flex-col space-y-6">
        <button 
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${activeTab === 'menu' ? 'bg-cyan-500 text-black' : 'bg-black/30 text-cyan-400 hover:bg-cyan-500/20'}`}
          onClick={() => onTabChange('menu')}
        >
          <FiMenu size={20} />
        </button>
        
        <button 
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${activeTab === 'combat' ? 'bg-cyan-500 text-black' : 'bg-black/30 text-cyan-400 hover:bg-cyan-500/20'}`}
          onClick={() => onTabChange('combat')}
        >
          <FiEye size={20} />
        </button>
        
        <button 
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${activeTab === 'character' ? 'bg-cyan-500 text-black' : 'bg-black/30 text-cyan-400 hover:bg-cyan-500/20'}`}
          onClick={() => onTabChange('character')}
        >
          <FiZap size={20} />
        </button>
        
        <button 
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${activeTab === 'visual' ? 'bg-cyan-500 text-black' : 'bg-black/30 text-cyan-400 hover:bg-cyan-500/20'}`}
          onClick={() => onTabChange('visual')}
        >
          <FiAlertTriangle size={20} />
        </button>
        
        <button 
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${activeTab === 'settings' ? 'bg-cyan-500 text-black' : 'bg-black/30 text-cyan-400 hover:bg-cyan-500/20'}`}
          onClick={() => onTabChange('settings')}
        >
          <FiSettings size={20} />
        </button>
      </div>
      
      {/* User Button */}
      <button 
        className="w-12 h-12 rounded-lg bg-black/30 text-cyan-400 hover:bg-cyan-500/20 flex items-center justify-center mt-6"
        onClick={() => onTabChange('user')}
      >
        <FiUser size={20} />
      </button>
    </div>
  );
};

export default Sidebar;