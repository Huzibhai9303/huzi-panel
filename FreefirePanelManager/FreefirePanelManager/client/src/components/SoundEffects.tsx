import React, { useEffect, useRef } from 'react';

interface SoundEffectsProps {
  isActive: boolean;
  aimbot: boolean;
  headshot: boolean;
  previousAimbot: boolean;
  previousHeadshot: boolean;
  
  // Add references to all other toggle switches
  recoil?: boolean;
  antenna?: boolean;
  speed?: boolean;
  fly?: boolean;
  previousRecoil?: boolean;
  previousAntenna?: boolean;
  previousSpeed?: boolean;
  previousFly?: boolean;
}

const SoundEffects: React.FC<SoundEffectsProps> = ({ 
  isActive, 
  aimbot, 
  headshot, 
  previousAimbot, 
  previousHeadshot,
  recoil,
  antenna,
  speed,
  fly,
  previousRecoil,
  previousAntenna,
  previousSpeed,
  previousFly
}) => {
  // Create Audio elements for different sounds
  const aimbotSound = useRef<HTMLAudioElement | null>(null);
  const headshotSound = useRef<HTMLAudioElement | null>(null);
  const activateSound = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements
  useEffect(() => {
    // Create audio elements
    aimbotSound.current = new Audio();
    headshotSound.current = new Audio();
    activateSound.current = new Audio();
    
    // Set audio data using Oscillator API
    const setupAudioData = (audio: HTMLAudioElement, type: 'aimbot' | 'headshot' | 'activate') => {
      try {
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        
        const dest = context.createMediaStreamDestination();
        oscillator.connect(gain);
        gain.connect(dest);
        
        // Configure oscillator based on sound type
        if (type === 'aimbot') {
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(880, context.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1760, context.currentTime + 0.1);
          gain.gain.setValueAtTime(0.3, context.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);
          oscillator.start();
          oscillator.stop(context.currentTime + 0.3);
        } else if (type === 'headshot') {
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(440, context.currentTime);
          oscillator.frequency.setValueAtTime(880, context.currentTime + 0.05);
          oscillator.frequency.setValueAtTime(440, context.currentTime + 0.1);
          gain.gain.setValueAtTime(0.3, context.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);
          oscillator.start();
          oscillator.stop(context.currentTime + 0.3);
        } else {
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(300, context.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(900, context.currentTime + 0.2);
          gain.gain.setValueAtTime(0.2, context.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5);
          oscillator.start();
          oscillator.stop(context.currentTime + 0.5);
          
          // Add a second oscillator for richer sound
          const osc2 = context.createOscillator();
          const gain2 = context.createGain();
          
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(600, context.currentTime);
          osc2.frequency.exponentialRampToValueAtTime(1200, context.currentTime + 0.1);
          gain2.gain.setValueAtTime(0.1, context.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);
          
          osc2.connect(gain2);
          gain2.connect(dest);
          osc2.start();
          osc2.stop(context.currentTime + 0.3);
        }
        
        // Create MediaRecorder to capture the audio stream
        const recorder = new MediaRecorder(dest.stream);
        const chunks: BlobPart[] = [];
        
        recorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };
        
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
          const url = URL.createObjectURL(blob);
          
          if (type === 'aimbot' && aimbotSound.current) {
            aimbotSound.current.src = url;
          } else if (type === 'headshot' && headshotSound.current) {
            headshotSound.current.src = url;
          } else if (type === 'activate' && activateSound.current) {
            activateSound.current.src = url;
          }
        };
        
        recorder.start();
        
        // Stop recording after the oscillator finishes
        setTimeout(() => {
          recorder.stop();
        }, type === 'activate' ? 600 : 400);
        
      } catch (error) {
        console.error(`Failed to setup ${type} sound:`, error);
      }
    };
    
    // Setup all audio elements
    setupAudioData(aimbotSound.current, 'aimbot');
    setupAudioData(headshotSound.current, 'headshot');
    setupAudioData(activateSound.current, 'activate');
    
    // Cleanup function
    return () => {
      if (aimbotSound.current) {
        aimbotSound.current.pause();
        aimbotSound.current = null;
      }
      if (headshotSound.current) {
        headshotSound.current.pause();
        headshotSound.current = null;
      }
      if (activateSound.current) {
        activateSound.current.pause();
        activateSound.current = null;
      }
    };
  }, []);
  
  // Effect to play activation sound when isActive changes
  useEffect(() => {
    if (isActive && activateSound.current) {
      activateSound.current.play().catch(e => console.error('Failed to play activation sound:', e));
      
      // Play a male voice saying "Script activated"
      const utterance = new SpeechSynthesisUtterance("Script injected");
      utterance.rate = 1.0;
      utterance.pitch = 0.8; // Lower pitch for male voice
      utterance.volume = 0.8;
      
      // Try to set voice to male if available
      const voices = window.speechSynthesis.getVoices();
      const maleVoice = voices.find(voice => voice.name.includes('Male'));
      if (maleVoice) {
        utterance.voice = maleVoice;
      }
      
      // Delay the voice message for a better effect
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 500);
    }
  }, [isActive]);
  
  // Effect to play aimbot sound when aimbot state changes
  useEffect(() => {
    if (isActive && aimbot !== previousAimbot) {
      if (aimbot && aimbotSound.current) {
        aimbotSound.current.play().catch(e => console.error('Failed to play aimbot sound:', e));
        
        // Play voice saying "Aimbot activated" or "Aimbot deactivated"
        const message = aimbot ? "Aimbot activated" : "Aimbot deactivated";
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 1.0;
        utterance.pitch = 0.8; // Lower pitch for male voice
        utterance.volume = 0.8;
        
        // Try to set voice to male if available
        const voices = window.speechSynthesis.getVoices();
        const maleVoice = voices.find(voice => voice.name.includes('Male'));
        if (maleVoice) {
          utterance.voice = maleVoice;
        }
        
        // Slight delay for a better effect
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 300);
      }
    }
  }, [aimbot, previousAimbot, isActive]);
  
  // Effect to play headshot sound when headshot state changes
  useEffect(() => {
    if (isActive && headshot !== previousHeadshot) {
      if (headshot && headshotSound.current) {
        headshotSound.current.play().catch(e => console.error('Failed to play headshot sound:', e));
        
        // Play voice saying "Headshot activated" or "Headshot deactivated"
        const message = headshot ? "Headshot activated" : "Headshot deactivated";
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 1.0;
        utterance.pitch = 0.8; // Lower pitch for male voice
        utterance.volume = 0.8;
        
        // Try to set voice to male if available
        const voices = window.speechSynthesis.getVoices();
        const maleVoice = voices.find(voice => voice.name.includes('Male'));
        if (maleVoice) {
          utterance.voice = maleVoice;
        }
        
        // Slight delay for a better effect
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 300);
      }
    }
  }, [headshot, previousHeadshot, isActive]);
  
  // Effect for recoil option
  useEffect(() => {
    if (isActive && recoil !== previousRecoil && recoil !== undefined && previousRecoil !== undefined) {
      // Play sound effect (reusing aimbot sound for now)
      if (recoil && aimbotSound.current) {
        aimbotSound.current.play().catch(e => console.error('Failed to play recoil sound:', e));
        
        // Play voice announcement
        const message = recoil ? "No recoil activated" : "No recoil deactivated";
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 1.0;
        utterance.pitch = 0.8; // Lower pitch for male voice
        utterance.volume = 0.8;
        
        // Try to set voice to male if available
        const voices = window.speechSynthesis.getVoices();
        const maleVoice = voices.find(voice => voice.name.includes('Male'));
        if (maleVoice) {
          utterance.voice = maleVoice;
        }
        
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 300);
      }
    }
  }, [recoil, previousRecoil, isActive, aimbotSound]);
  
  // Effect for antenna option
  useEffect(() => {
    if (isActive && antenna !== previousAntenna && antenna !== undefined && previousAntenna !== undefined) {
      // Play sound effect (reusing headshot sound for now)
      if (antenna && headshotSound.current) {
        headshotSound.current.play().catch(e => console.error('Failed to play antenna sound:', e));
        
        // Play voice announcement
        const message = antenna ? "Antenna mode activated" : "Antenna mode deactivated";
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 1.0;
        utterance.pitch = 0.8; // Lower pitch for male voice
        utterance.volume = 0.8;
        
        // Try to set voice to male if available
        const voices = window.speechSynthesis.getVoices();
        const maleVoice = voices.find(voice => voice.name.includes('Male'));
        if (maleVoice) {
          utterance.voice = maleVoice;
        }
        
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 300);
      }
    }
  }, [antenna, previousAntenna, isActive, headshotSound]);
  
  // Effect for speed option
  useEffect(() => {
    if (isActive && speed !== previousSpeed && speed !== undefined && previousSpeed !== undefined) {
      // Play sound effect (reusing aimbot sound for now)
      if (speed && aimbotSound.current) {
        aimbotSound.current.play().catch(e => console.error('Failed to play speed sound:', e));
        
        // Play voice announcement
        const message = speed ? "Speed hack activated" : "Speed hack deactivated";
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 1.0;
        utterance.pitch = 0.8; // Lower pitch for male voice
        utterance.volume = 0.8;
        
        // Try to set voice to male if available
        const voices = window.speechSynthesis.getVoices();
        const maleVoice = voices.find(voice => voice.name.includes('Male'));
        if (maleVoice) {
          utterance.voice = maleVoice;
        }
        
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 300);
      }
    }
  }, [speed, previousSpeed, isActive, aimbotSound]);
  
  // Effect for fly option
  useEffect(() => {
    if (isActive && fly !== previousFly && fly !== undefined && previousFly !== undefined) {
      // Play sound effect (reusing headshot sound for now)
      if (fly && headshotSound.current) {
        headshotSound.current.play().catch(e => console.error('Failed to play fly sound:', e));
        
        // Play voice announcement
        const message = fly ? "Fly hack activated" : "Fly hack deactivated";
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 1.0;
        utterance.pitch = 0.8; // Lower pitch for male voice
        utterance.volume = 0.8;
        
        // Try to set voice to male if available
        const voices = window.speechSynthesis.getVoices();
        const maleVoice = voices.find(voice => voice.name.includes('Male'));
        if (maleVoice) {
          utterance.voice = maleVoice;
        }
        
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 300);
      }
    }
  }, [fly, previousFly, isActive, headshotSound]);

  // This component doesn't render anything visible
  return null;
};

export default SoundEffects;