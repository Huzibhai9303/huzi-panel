import React, { useState } from 'react';
import { CustomRange } from './ui/custom-range';
import { FaTimes } from 'react-icons/fa';

interface MainPanelProps {
  aimbot: boolean;
  headshot: boolean;
  sensitivity: number;
  isActive: boolean;
  onAimbotChange: (checked: boolean) => void;
  onHeadshotChange: (checked: boolean) => void;
  onSensitivityChange: (value: number) => void;
  onToggleActive: () => void;
  
  // Additional switch options
  recoil?: boolean;
  antenna?: boolean;
  speed?: boolean;
  fly?: boolean;
  onRecoilChange?: (checked: boolean) => void;
  onAntennaChange?: (checked: boolean) => void;
  onSpeedChange?: (checked: boolean) => void;
  onFlyChange?: (checked: boolean) => void;
  
  // Tab control from sidebar
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  
  // Script injection status
  isScriptInjected?: boolean;
}

const MainPanel: React.FC<MainPanelProps> = ({
  aimbot,
  headshot,
  sensitivity,
  isActive,
  onAimbotChange,
  onHeadshotChange,
  onSensitivityChange,
  onToggleActive,
  recoil = false,
  antenna = false,
  speed = false,
  fly = false,
  onRecoilChange,
  onAntennaChange,
  onSpeedChange,
  onFlyChange,
  activeTab = 'combat',
  onTabChange,
  isScriptInjected = false
}) => {
  
  return (
    <div className="glass-panel p-5 rounded-lg shadow-xl w-full max-w-md mx-4 relative overflow-hidden border-2 border-cyan-500">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-700/10 pointer-events-none"></div>
      
      {/* Close button in top-right corner */}
      <button className="absolute top-2 right-2 w-6 h-6 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 transition-colors">
        <FaTimes size={10} />
      </button>
      
      {/* Panel Header */}
      <div className="relative">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-cyan-500 tracking-wider uppercase">HUZI PANEL</h1>
          <div className="bg-cyan-500 text-black text-xs px-2 py-1 rounded font-semibold">PREMIUM</div>
        </div>
        <p className="text-cyan-400 text-xs mb-3 font-system">FF Script v4.0 [Premium Version]</p>
        <div className="h-px bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-cyan-500/50 mb-4"></div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4">
        <button 
          className={`flex-1 py-1 text-xs uppercase font-bold transition-colors ${activeTab === 'combat' ? 'bg-cyan-500 text-black' : 'bg-black/40 text-cyan-400 border border-cyan-500/30'}`}
          onClick={() => onTabChange && onTabChange('combat')}
        >
          Combat
        </button>
        <button 
          className={`flex-1 py-1 text-xs uppercase font-bold transition-colors ${activeTab === 'character' ? 'bg-cyan-500 text-black' : 'bg-black/40 text-cyan-400 border border-cyan-500/30'}`}
          onClick={() => onTabChange && onTabChange('character')}
        >
          Character
        </button>
        <button 
          className={`flex-1 py-1 text-xs uppercase font-bold transition-colors ${activeTab === 'visual' ? 'bg-cyan-500 text-black' : 'bg-black/40 text-cyan-400 border border-cyan-500/30'}`}
          onClick={() => onTabChange && onTabChange('visual')}
        >
          Visual
        </button>
      </div>

      {/* Controls Section */}
      <div className="space-y-4">
        {/* Notification Badge - Top of Panel */}
        <div className="relative">
          <div className="absolute -top-1 -right-1 bg-cyan-500 text-black text-xs px-2 py-0.5 rounded-md font-bold transform rotate-2">
            HUZI PANEL
          </div>
        </div>
        
        {/* Combat Features */}
        {activeTab === 'combat' && (
          <div className="bg-gray-900/80 rounded-md p-3 border border-cyan-500/30">
            <h2 className="text-xs uppercase text-cyan-400 mb-2 font-bold">Combat Features</h2>
            
            {/* Aimbot Toggle */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm font-semibold flex items-center">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
                  Aimbot
                </span>
                <p className="text-[10px] text-gray-400 font-system ml-4">Auto-target enemies</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="aimbot" 
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer z-10" 
                  checked={aimbot}
                  disabled={!isScriptInjected}
                  onChange={(e) => onAimbotChange(e.target.checked)}
                />
                <label htmlFor="aimbot" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-600 cursor-pointer"></label>
              </div>
            </div>

            {/* Auto Headshot Toggle */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm font-semibold flex items-center">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
                  Auto Headshot
                </span>
                <p className="text-[10px] text-gray-400 font-system ml-4">One-shot kill</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="headshot" 
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer z-10" 
                  checked={headshot}
                  disabled={!isScriptInjected}
                  onChange={(e) => onHeadshotChange(e.target.checked)}
                />
                <label htmlFor="headshot" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-600 cursor-pointer"></label>
              </div>
            </div>

            {/* No Recoil Toggle */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm font-semibold flex items-center">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
                  No Recoil
                </span>
                <p className="text-[10px] text-gray-400 font-system ml-4">Eliminate weapon recoil</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="recoil" 
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer z-10"
                  checked={recoil}
                  disabled={!isScriptInjected}
                  onChange={(e) => onRecoilChange && onRecoilChange(e.target.checked)}
                />
                <label htmlFor="recoil" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-600 cursor-pointer"></label>
              </div>
            </div>

            {/* Antenna Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold flex items-center">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
                  Antenna
                </span>
                <p className="text-[10px] text-gray-400 font-system ml-4">See enemies from distance</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="antenna" 
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer z-10"
                  checked={antenna}
                  disabled={!isScriptInjected}
                  onChange={(e) => onAntennaChange && onAntennaChange(e.target.checked)}
                />
                <label htmlFor="antenna" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-600 cursor-pointer"></label>
              </div>
            </div>
          </div>
        )}

        {/* Character Settings */}
        {activeTab === 'character' && (
          <div className="bg-gray-900/80 rounded-md p-3 border border-cyan-500/30">
            <h2 className="text-xs uppercase text-cyan-400 mb-2 font-bold">Character Settings</h2>
            
            {/* Speed Hack Toggle */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm font-semibold flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Speed Hack
                </span>
                <p className="text-[10px] text-gray-400 font-system ml-4">Faster movement</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="speed" 
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer z-10"
                  checked={speed}
                  disabled={!isScriptInjected}
                  onChange={(e) => onSpeedChange && onSpeedChange(e.target.checked)}
                />
                <label htmlFor="speed" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-600 cursor-pointer"></label>
              </div>
            </div>

            {/* Fly Hack Toggle */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm font-semibold flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Fly Hack
                </span>
                <p className="text-[10px] text-gray-400 font-system ml-4">Levitate in air</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="fly" 
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer z-10"
                  checked={fly}
                  disabled={!isScriptInjected}
                  onChange={(e) => onFlyChange && onFlyChange(e.target.checked)}
                />
                <label htmlFor="fly" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-600 cursor-pointer"></label>
              </div>
            </div>

            {/* Jump Height Option */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  High Jump
                </span>
                <p className="text-[10px] text-gray-400 font-system ml-4">Jump higher than normal</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="jump" 
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer z-10"
                  disabled={!isScriptInjected}
                />
                <label htmlFor="jump" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-600 cursor-pointer"></label>
              </div>
            </div>
          </div>
        )}

        {/* Visual Settings */}
        {activeTab === 'visual' && (
          <div className="bg-gray-900/80 rounded-md p-3 border border-cyan-500/30 space-y-3">
            <h2 className="text-xs uppercase text-cyan-400 mb-2 font-bold">Visual Enhancements</h2>
            
            {/* ESP Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  ESP
                </span>
                <p className="text-[10px] text-gray-400 font-system ml-4">See enemies through walls</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="esp" 
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer z-10"
                  disabled={!isScriptInjected}
                />
                <label htmlFor="esp" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-600 cursor-pointer"></label>
              </div>
            </div>
            
            {/* Night Mode Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Night Mode
                </span>
                <p className="text-[10px] text-gray-400 font-system ml-4">Enhanced visibility at night</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="night" 
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer z-10"
                  disabled={!isScriptInjected}
                />
                <label htmlFor="night" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-600 cursor-pointer"></label>
              </div>
            </div>
            
            {/* Black Sky Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Black Sky
                </span>
                <p className="text-[10px] text-gray-400 font-system ml-4">Remove distractions in sky</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="blacksky" 
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer z-10"
                  disabled={!isScriptInjected}
                />
                <label htmlFor="blacksky" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-600 cursor-pointer"></label>
              </div>
            </div>
          </div>
        )}

        {/* Aim Sensitivity Slider - Always Visible */}
        <div className="bg-gray-900/80 rounded-md p-3 border border-cyan-500/30">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="sensitivity" className="text-sm font-semibold text-cyan-400">Aim Sensitivity</label>
            <span id="sensitivity-value" className="text-xs bg-cyan-500/20 px-2 py-0.5 rounded text-cyan-400 font-mono">{sensitivity}%</span>
          </div>
          <CustomRange 
            id="sensitivity" 
            min={0} 
            max={100} 
            value={sensitivity} 
            onValueChange={onSensitivityChange}
            className="accent-cyan-500"
            disabled={!isScriptInjected}
          />
        </div>

        {/* Start Script Button */}
        <button 
          id="startBtn" 
          className={`w-full text-white py-2 rounded-md text-base font-bold uppercase tracking-wider transition-all duration-300 button-ninja relative overflow-hidden
            ${isActive 
              ? 'bg-gradient-to-r from-green-500 to-green-600 border border-green-500/30' 
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 border border-cyan-500/30'
            }`}
          onClick={onToggleActive}
        >
          <span>{isActive ? 'Script Running' : 'Inject Script'}</span>
        </button>

        {/* Output Console */}
        <div 
          id="output" 
          className={`mt-2 p-2 rounded bg-black/50 text-green-500 text-xs font-mono border border-green-500/30 ${isActive ? '' : 'hidden'}`}
        >
          {isActive && (
            <>
              $ Script injected successfully<br />
              $ Activating modules...<br />
              $ Aimbot: {aimbot ? '<ENABLED>' : '<DISABLED>'}<br />
              $ Headshot: {headshot ? '<ENABLED>' : '<DISABLED>'}<br />
              $ No Recoil: {recoil ? '<ENABLED>' : '<DISABLED>'}<br />
              $ Antenna: {antenna ? '<ENABLED>' : '<DISABLED>'}<br />
              $ Speed Hack: {speed ? '<ENABLED>' : '<DISABLED>'}<br />
              $ Fly Hack: {fly ? '<ENABLED>' : '<DISABLED>'}<br />
              $ Sensitivity: {sensitivity}%<br />
              $ Script running [UNDETECTED]
            </>
          )}
        </div>
      </div>
      
      {/* Version & Status */}
      <div className="mt-4 flex justify-between text-[10px] text-gray-500 font-mono">
        <span>HUZI PANEL PREMIUM v4.0</span>
        <span>Status: <span className={isActive ? "text-green-500" : "text-cyan-500"}>
          {isActive ? 'INJECTED' : 'READY'}
        </span></span>
      </div>
    </div>
  );
};

export default MainPanel;
