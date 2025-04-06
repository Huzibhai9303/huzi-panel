import React, { useEffect, useRef } from 'react';

interface GameplaySimulationProps {
  isActive: boolean;
  aimbot: boolean;
  headshot: boolean;
  sensitivity: number;
  botPositionRef: React.RefObject<{
    x: number;
    y: number;
    headRadius: number;
  }>;
}

const GameplaySimulation: React.FC<GameplaySimulationProps> = ({
  isActive,
  aimbot,
  headshot,
  sensitivity,
  botPositionRef
}) => {
  const botRef = useRef<HTMLDivElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  // Initialize bot position
  useEffect(() => {
    if (!botRef.current) return;
    
    const updateBotPosition = () => {
      if (!botRef.current || !botPositionRef.current) return;
      
      botPositionRef.current.x = window.innerWidth * 0.75;
      botPositionRef.current.y = window.innerHeight * 0.5;
      
      botRef.current.style.left = `${botPositionRef.current.x - 30}px`;
      botRef.current.style.top = `${botPositionRef.current.y - 30}px`;
    };

    updateBotPosition();
    window.addEventListener('resize', updateBotPosition);
    
    // Bot movement
    const botMovementInterval = setInterval(() => {
      if (!isActive || !botRef.current || !botPositionRef.current) return;
      
      // Random movement
      const maxOffset = 100;
      const newX = botPositionRef.current.x + (Math.random() * maxOffset - maxOffset/2);
      const newY = botPositionRef.current.y + (Math.random() * maxOffset - maxOffset/2);
      
      // Keep within bounds
      const boundedX = Math.max(100, Math.min(newX, window.innerWidth - 100));
      const boundedY = Math.max(100, Math.min(newY, window.innerHeight - 100));
      
      // Update position
      botPositionRef.current.x = boundedX;
      botPositionRef.current.y = boundedY;
      
      botRef.current.style.transition = 'left 2s ease, top 2s ease';
      botRef.current.style.left = `${boundedX - 30}px`;
      botRef.current.style.top = `${boundedY - 30}px`;
    }, 3000);
    
    return () => {
      window.removeEventListener('resize', updateBotPosition);
      clearInterval(botMovementInterval);
    };
  }, [botPositionRef, isActive]);

  // Track mouse movement and handle aimbot effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      
      if (!crosshairRef.current) return;
      
      // Update crosshair position
      crosshairRef.current.style.left = `${mousePositionRef.current.x - 10}px`;
      crosshairRef.current.style.top = `${mousePositionRef.current.y - 10}px`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Apply aimbot effect
  useEffect(() => {
    if (!isActive || !aimbot || !crosshairRef.current) {
      if (crosshairRef.current) {
        crosshairRef.current.classList.remove('active');
      }
      return;
    }
    
    const applyAimbotEffect = () => {
      if (!crosshairRef.current || !botPositionRef.current) return;
      
      // Calculate target position
      let targetX = botPositionRef.current.x;
      let targetY = botPositionRef.current.y;
      
      if (headshot) {
        // Adjust for headshot - aim at the head
        targetY = botPositionRef.current.y - botPositionRef.current.headRadius - 15;
      }
      
      // Apply sensitivity to create a more realistic "pull" effect
      const normalizedSensitivity = sensitivity / 100;
      const diffX = targetX - mousePositionRef.current.x;
      const diffY = targetY - mousePositionRef.current.y;
      
      const newX = mousePositionRef.current.x + (diffX * normalizedSensitivity);
      const newY = mousePositionRef.current.y + (diffY * normalizedSensitivity);
      
      // Update crosshair position
      crosshairRef.current.style.left = `${newX - 10}px`;
      crosshairRef.current.style.top = `${newY - 10}px`;
      
      // Add active class for visual feedback
      crosshairRef.current.classList.add('active');
      
      animationFrameRef.current = requestAnimationFrame(applyAimbotEffect);
    };
    
    applyAimbotEffect();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (crosshairRef.current) {
        crosshairRef.current.classList.remove('active');
      }
    };
  }, [isActive, aimbot, headshot, sensitivity, botPositionRef]);

  return (
    <>
      <div id="bot" className="bot" ref={botRef}></div>
      <div id="crosshair" ref={crosshairRef}></div>
    </>
  );
};

export default GameplaySimulation;
