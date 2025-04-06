import React, { useEffect, useState, useCallback } from 'react';
import BackgroundEffects from '@/components/BackgroundEffects';
import MainPanel from '@/components/MainPanel';
import GameplaySimulation from '@/components/GameplaySimulation';
import SoundEffects from '@/components/SoundEffects';
import Sidebar from '@/components/Sidebar';
import NotificationBar from '@/components/NotificationBar';
import HidePanelSettings from '@/components/HidePanelSettings';
import LoadingScreen from '@/components/LoadingScreen';
import { useAimbot } from '@/hooks/useAimbot';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

const Home: React.FC = () => {
  const {
    aimbot,
    headshot,
    sensitivity,
    isActive,
    botPositionRef,
    setAimbot,
    setHeadshot,
    setSensitivity,
    toggleActive
  } = useAimbot();

  // Notification status
  const [panelStatus, setPanelStatus] = useState<'Available' | 'Injecting' | 'Running' | 'Undetected'>('Available');
  const [isInjecting, setIsInjecting] = useState(false);
  
  // Loading and login screen
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  
  // Script injection status - controls if feature buttons are enabled
  const [isScriptInjected, setIsScriptInjected] = useState(false);

  // Track previous values for sound effects triggering
  const [prevAimbot, setPrevAimbot] = useState(aimbot);
  const [prevHeadshot, setPrevHeadshot] = useState(headshot);
  
  // Add additional feature states for all switches
  const [recoil, setRecoil] = useState(false);
  const [prevRecoil, setPrevRecoil] = useState(false);
  
  const [antenna, setAntenna] = useState(false);
  const [prevAntenna, setPrevAntenna] = useState(false);
  
  const [speed, setSpeed] = useState(false);
  const [prevSpeed, setPrevSpeed] = useState(false);
  
  const [fly, setFly] = useState(false);
  const [prevFly, setPrevFly] = useState(false);
  
  // Update previous values after effects have been triggered
  useEffect(() => {
    setPrevAimbot(aimbot);
  }, [aimbot]);
  
  useEffect(() => {
    setPrevHeadshot(headshot);
  }, [headshot]);
  
  useEffect(() => {
    setPrevRecoil(recoil);
  }, [recoil]);
  
  useEffect(() => {
    setPrevAntenna(antenna);
  }, [antenna]);
  
  useEffect(() => {
    setPrevSpeed(speed);
  }, [speed]);
  
  useEffect(() => {
    setPrevFly(fly);
  }, [fly]);
  
  // Main Panel handlers for additional options
  const handleRecoilChange = (checked: boolean) => {
    setRecoil(checked);
    toast({
      title: checked ? "No Recoil Enabled" : "No Recoil Disabled",
      description: checked 
        ? "Weapon recoil elimination active" 
        : "Weapon recoil elimination deactivated",
      duration: 3000,
    });
  };
  
  const handleAntennaChange = (checked: boolean) => {
    setAntenna(checked);
    toast({
      title: checked ? "Antenna Enabled" : "Antenna Disabled",
      description: checked 
        ? "Enemy detection at distance activated" 
        : "Enemy detection at distance deactivated",
      duration: 3000,
    });
  };
  
  const handleSpeedChange = (checked: boolean) => {
    setSpeed(checked);
    toast({
      title: checked ? "Speed Hack Enabled" : "Speed Hack Disabled",
      description: checked 
        ? "Movement speed boost activated" 
        : "Movement speed boost deactivated",
      duration: 3000,
    });
  };
  
  const handleFlyChange = (checked: boolean) => {
    setFly(checked);
    toast({
      title: checked ? "Fly Hack Enabled" : "Fly Hack Disabled",
      description: checked 
        ? "Air levitation activated" 
        : "Air levitation deactivated",
      duration: 3000,
    });
  };

  // Active tab for sidebar navigation
  const [activeTab, setActiveTab] = useState('combat');
  
  // Hide panel functionality
  const [hideKey, setHideKey] = useState('Escape');
  const [activateHideKey, setActivateHideKey] = useState(false);
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const { toast } = useToast(); // Used throughout the component for notifications
  
  // Handle inject button
  const handleInject = () => {
    setIsInjecting(true);
    setPanelStatus('Injecting');
    setShowLoadingScreen(true);
  };
  
  // Handle login success
  const handleLoginSuccess = () => {
    setShowLoadingScreen(false);
    setIsInjecting(false);
    setPanelStatus('Running');
    toggleActive(); // Start the script
    setIsScriptInjected(true); // Enable feature buttons
    
    toast({
      title: "Login Successful",
      description: "HUZI Panel has been activated",
      duration: 3000,
    });
  };
  
  // Handle login failure
  const handleLoginFail = () => {
    setLoginAttempts(prev => prev + 1);
    if (loginAttempts >= 2) {
      // After 3 attempts, close the loading screen and reset
      setShowLoadingScreen(false);
      setIsInjecting(false);
      setPanelStatus('Available');
      
      toast({
        title: "Login Failed",
        description: "Too many failed attempts. Try again later.",
        variant: "destructive",
        duration: 3000,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Incorrect username or password",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  // Show notifications when features are toggled
  const handleAimbotChange = (checked: boolean) => {
    setAimbot(checked);
    toast({
      title: checked ? "Aimbot Enabled" : "Aimbot Disabled",
      description: checked 
        ? "Auto-targeting is now active" 
        : "Auto-targeting has been turned off",
      duration: 3000,
    });
  };
  
  const handleHeadshotChange = (checked: boolean) => {
    setHeadshot(checked);
    toast({
      title: checked ? "Headshot Enabled" : "Headshot Disabled",
      description: checked 
        ? "Auto headshot is now active" 
        : "Auto headshot has been turned off",
      duration: 3000,
    });
  };
  
  // Update status when script is active/inactive
  useEffect(() => {
    if (isActive) {
      setPanelStatus('Running');
    } else if (!isInjecting) {
      setPanelStatus('Available');
    }
  }, [isActive, isInjecting]);
  
  // Handle panel visibility with keyboard shortcut
  const togglePanelVisibility = useCallback(() => {
    setIsPanelVisible(prev => !prev);
    toast({
      title: isPanelVisible ? "Panel Hidden" : "Panel Visible",
      description: isPanelVisible 
        ? `Panel hidden. Press ${hideKey} to show it again.` 
        : "Panel is now visible",
      duration: 3000,
    });
  }, [isPanelVisible, hideKey, toast]);
  
  // Set up keyboard event listener for toggling panel visibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activateHideKey && e.key === hideKey) {
        togglePanelVisibility();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activateHideKey, hideKey, togglePanelVisibility]);

  // Handle hide key change
  const handleHideKeyChange = (key: string) => {
    setHideKey(key);
    toast({
      title: "Hide Key Changed",
      description: `Panel will now hide/show with the ${key} key`,
      duration: 3000,
    });
  };
  
  // Handle activate hide key feature
  const handleActivateHideKeyChange = (checked: boolean) => {
    setActivateHideKey(checked);
    toast({
      title: checked ? "Hide Key Activated" : "Hide Key Deactivated",
      description: checked 
        ? `Press ${hideKey} to hide/show the panel` 
        : "Panel will no longer hide with keyboard shortcut",
      duration: 3000,
    });
  };

  // Show a button to bring panel back when hidden
  const ShowPanelButton = () => (
    <button
      className="fixed top-4 left-4 z-50 bg-cyan-600 text-white px-3 py-2 rounded-md shadow-lg hover:bg-cyan-700 transition"
      onClick={togglePanelVisibility}
    >
      Show Panel
    </button>
  );

  return (
    <div className="min-h-screen w-full flex font-game overflow-hidden">
      <BackgroundEffects />
      
      {/* Button to show panel when hidden */}
      {!isPanelVisible && <ShowPanelButton />}
      
      {/* Left Sidebar - only show when panel is visible */}
      {isPanelVisible && <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />}
      
      {/* Main Content - only show when panel is visible */}
      {isPanelVisible && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-md mx-auto mb-3 px-4">
            <NotificationBar 
              status={panelStatus}
              price="Free"
              isInjecting={isInjecting}
              onInjectClick={handleInject}
            />
          </div>
          
          {activeTab === 'settings' ? (
            <div className="w-full max-w-md mx-auto">
              <HidePanelSettings 
                onKeyChange={handleHideKeyChange}
                activateHideKey={activateHideKey}
                onActivateChange={handleActivateHideKeyChange}
              />
            </div>
          ) : (
            <MainPanel
              aimbot={aimbot}
              headshot={headshot}
              sensitivity={sensitivity}
              isActive={isActive}
              onAimbotChange={handleAimbotChange}
              onHeadshotChange={handleHeadshotChange}
              onSensitivityChange={setSensitivity}
              onToggleActive={toggleActive}
              // Pass additional options
              recoil={recoil}
              antenna={antenna}
              speed={speed}
              fly={fly}
              onRecoilChange={handleRecoilChange}
              onAntennaChange={handleAntennaChange}
              onSpeedChange={handleSpeedChange}
              onFlyChange={handleFlyChange}
              // Pass active tab
              activeTab={activeTab}
              // Pass script injection status
              isScriptInjected={isScriptInjected}
            />
          )}
        </div>
      )}
      
      <GameplaySimulation
        isActive={isActive}
        aimbot={aimbot}
        headshot={headshot}
        sensitivity={sensitivity}
        botPositionRef={botPositionRef}
      />
      
      {/* Sound effects component with all features */}
      <SoundEffects 
        isActive={isActive}
        aimbot={aimbot}
        headshot={headshot}
        previousAimbot={prevAimbot}
        previousHeadshot={prevHeadshot}
        recoil={recoil}
        antenna={antenna}
        speed={speed}
        fly={fly}
        previousRecoil={prevRecoil}
        previousAntenna={prevAntenna}
        previousSpeed={prevSpeed}
        previousFly={prevFly}
      />
      
      {/* Toaster for notifications */}
      <Toaster />
      
      {/* Loading and login screen */}
      {showLoadingScreen && (
        <LoadingScreen 
          onLoginSuccess={handleLoginSuccess}
          onLoginFail={handleLoginFail}
        />
      )}
    </div>
  );
};

export default Home;
