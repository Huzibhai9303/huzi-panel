// Audio effects for the application

/**
 * Play activation sound effect
 * @param type - Type of sound to play ('aimbot', 'headshot', etc)
 */
export function playSound(type: 'aimbot' | 'headshot' | 'activate' | 'error') {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create oscillator
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    // Configure based on sound type
    switch(type) {
      case 'aimbot':
        // Higher pitched activation sound
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
        oscillator.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.1); // A6
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        
        // Connect and start
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.3);
        break;
        
      case 'headshot':
        // Pulsing confirmation sound
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime + 0.05); // A5
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime + 0.1); // A4
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        
        // Connect and start
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.3);
        break;
        
      case 'activate':
        // Startup activation sound
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        
        // Connect and start
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.5);
        
        // Add a second oscillator for richer sound
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
        gain2.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start();
        osc2.stop(audioCtx.currentTime + 0.3);
        break;
        
      case 'error':
        // Error sound
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
        oscillator.frequency.setValueAtTime(220, audioCtx.currentTime + 0.2); // A3
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        
        // Connect and start
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.4);
        break;
    }
    
  } catch (error) {
    console.error('Audio playback failed:', error);
  }
}

/**
 * Play a voice message
 */
export function playVoiceMessage(message: 'aimbot_activated' | 'aimbot_deactivated' | 'headshot_activated' | 'headshot_deactivated' | 'script_injected') {
  // For demonstration only - would typically use pre-recorded audio files
  // This creates a simple beep pattern instead of actual voice
  
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    switch(message) {
      case 'aimbot_activated':
        // Pattern for "aimbot activated"
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        oscillator.frequency.setValueAtTime(550, audioCtx.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(660, audioCtx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.3);
        break;
        
      case 'aimbot_deactivated':
        // Pattern for "aimbot deactivated"
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(660, audioCtx.currentTime);
        oscillator.frequency.setValueAtTime(550, audioCtx.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.3);
        break;
        
      case 'script_injected':
        // Advanced pattern for "script injected"
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
        oscillator.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.2);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.4);
        
        // Add second tone for more complex sound
        setTimeout(() => {
          const osc2 = audioCtx.createOscillator();
          const gain2 = audioCtx.createGain();
          
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(1000, audioCtx.currentTime);
          osc2.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.3);
          gain2.gain.setValueAtTime(0.1, audioCtx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
          
          osc2.connect(gain2);
          gain2.connect(audioCtx.destination);
          osc2.start();
          osc2.stop(audioCtx.currentTime + 0.3);
        }, 200);
        break;
        
      default:
        // Simple beep for other messages
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.2);
    }
    
  } catch (error) {
    console.error('Voice playback failed:', error);
  }
}