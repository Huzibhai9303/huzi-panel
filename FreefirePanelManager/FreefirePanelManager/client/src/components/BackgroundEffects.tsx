import React, { useEffect, useRef } from 'react';

interface Triangle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  opacity: number;
}

const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const trianglesRef = useRef<Triangle[]>([]);
  
  // Set up falling triangles
  useEffect(() => {
    // Initialize triangles
    trianglesRef.current = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight - window.innerHeight, // Start above viewport
      size: 3 + Math.random() * 7,
      speed: 0.5 + Math.random() * 1.5,
      rotation: Math.random() * 360,
      opacity: 0.3 + Math.random() * 0.7
    }));
    
    // Animation frame for falling triangles
    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw triangles
      trianglesRef.current = trianglesRef.current.map(triangle => {
        // Update position
        const newY = triangle.y + triangle.speed;
        const newRotation = triangle.rotation + 0.2;
        
        // Draw triangle
        ctx.save();
        ctx.translate(triangle.x, newY);
        ctx.rotate((newRotation * Math.PI) / 180);
        ctx.beginPath();
        
        // Draw equilateral triangle
        const size = triangle.size;
        ctx.moveTo(0, -size);
        ctx.lineTo(size * Math.cos(Math.PI / 6), size * Math.sin(Math.PI / 6));
        ctx.lineTo(-size * Math.cos(Math.PI / 6), size * Math.sin(Math.PI / 6));
        ctx.closePath();
        
        // Set color and opacity
        ctx.fillStyle = `rgba(0, 191, 255, ${triangle.opacity})`;
        ctx.fill();
        ctx.restore();
        
        // Reset triangle when it falls out of view
        if (newY > canvas.height + size) {
          return {
            ...triangle,
            y: -size,
            x: Math.random() * canvas.width,
            size: 3 + Math.random() * 7,
            speed: 0.5 + Math.random() * 1.5,
            opacity: 0.3 + Math.random() * 0.7
          };
        }
        
        // Return updated triangle
        return {
          ...triangle,
          y: newY,
          rotation: newRotation
        };
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    // Set canvas size
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    
    // Initial size and event listener
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Start animation
    requestRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <>
      {/* Canvas for falling triangles */}
      <canvas 
        ref={canvasRef} 
        style={{
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          pointerEvents: 'none', 
          zIndex: -1
        }}
      />
      
      {/* Background grid effect with cyan color */}
      <div className="game-grid"></div>
      
      {/* Shooting stars */}
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
    </>
  );
};

export default BackgroundEffects;
