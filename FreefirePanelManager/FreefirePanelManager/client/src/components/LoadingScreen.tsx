import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface LoadingScreenProps {
  onLoginSuccess: () => void;
  onLoginFail: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoginSuccess, onLoginFail }) => {
  const [loadingStage, setLoadingStage] = useState<'loading' | 'login'>('loading');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loadingText, setLoadingText] = useState('Initializing...');
  
  // Simulate loading process
  useEffect(() => {
    const loadingTexts = [
      'Initializing...',
      'Connecting to server...',
      'Verifying files...',
      'Preparing resources...',
      'Loading interface...',
      'Authentication required'
    ];
    
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < loadingTexts.length - 1) {
        setLoadingText(loadingTexts[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setLoadingStage('login');
      }
    }, 800);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleLogin = () => {
    // Validate credentials
    if (username === 'HUZI' && password === 'FREE') {
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid username or password');
      onLoginFail();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="glass-panel w-full max-w-md p-8 rounded-xl border border-cyan-500/30 shadow-lg text-center">
        {loadingStage === 'loading' ? (
          <div className="flex flex-col items-center space-y-6">
            <Loader2 className="h-12 w-12 animate-spin text-cyan-500" />
            <div className="text-cyan-500 text-lg">{loadingText}</div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center mb-4">
              <svg viewBox="0 0 100 100" className="w-20 h-20">
                <polygon 
                  points="50,10 90,30 90,70 50,90 10,70 10,30" 
                  fill="rgba(0, 0, 0, 0.5)" 
                  stroke="#00BFFF" 
                  strokeWidth="2"
                />
                <text x="50" y="55" fontSize="12" fill="#00BFFF" textAnchor="middle" fontWeight="bold">HUZI</text>
              </svg>
            </div>
            
            <h2 className="text-xl font-bold text-cyan-500">Login Required</h2>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="username" className="text-cyan-300">Username</Label>
                <Input 
                  id="username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-black/50 border-cyan-500/50 text-cyan-100"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="password" className="text-cyan-300">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/50 border-cyan-500/50 text-cyan-100"
                />
              </div>
              
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              
              <Button 
                onClick={handleLogin}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                Login
              </Button>
            </div>
            
            <div className="text-xs text-cyan-500/70 mt-4">
              Default credentials: HUZI / FREE
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;