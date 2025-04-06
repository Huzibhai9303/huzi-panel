import { useState, useRef } from 'react';

export interface BotPosition {
  x: number;
  y: number;
  headRadius: number;
}

export function useAimbot() {
  const [aimbot, setAimbot] = useState(false);
  const [headshot, setHeadshot] = useState(false);
  const [sensitivity, setSensitivity] = useState(50);
  const [isActive, setIsActive] = useState(false);
  
  const botPositionRef = useRef<BotPosition>({
    x: window.innerWidth * 0.75,
    y: window.innerHeight * 0.5,
    headRadius: 15
  });

  // Simple toggle function without sound effects (now handled by SoundEffects component)
  const toggleActive = () => {
    setIsActive(prev => !prev);
  };

  return {
    aimbot,
    headshot,
    sensitivity,
    isActive,
    botPositionRef,
    setAimbot,
    setHeadshot,
    setSensitivity,
    toggleActive
  };
}
