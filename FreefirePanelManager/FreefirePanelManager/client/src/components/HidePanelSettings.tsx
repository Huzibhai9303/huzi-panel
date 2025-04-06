import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HidePanelSettingsProps {
  onKeyChange: (key: string) => void;
  activateHideKey: boolean;
  onActivateChange: (checked: boolean) => void;
}

const HidePanelSettings: React.FC<HidePanelSettingsProps> = ({
  onKeyChange,
  activateHideKey,
  onActivateChange
}) => {
  const [inputKey, setInputKey] = useState('Escape');

  const handleSaveKey = () => {
    if (inputKey.trim()) {
      onKeyChange(inputKey.trim());
    }
  };

  return (
    <div className="glass-panel p-6 rounded-lg border border-cyan-500/30">
      <h2 className="text-xl font-bold text-cyan-400 mb-4">Panel Settings</h2>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-cyan-300">Hide Panel</h3>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-hide-key" className="text-cyan-200">
              Enable Key Binding
            </Label>
            <Switch
              id="enable-hide-key"
              checked={activateHideKey}
              onCheckedChange={onActivateChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hide-key" className="text-cyan-200">
              Hide/Show Key
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="hide-key"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="flex-1 bg-black/40 border-cyan-500/30 text-cyan-100"
                placeholder="Press key..."
              />
              <Button 
                onClick={handleSaveKey}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                Save
              </Button>
            </div>
            <p className="text-xs text-cyan-400/70">
              Enter the key you want to use to hide/show the panel. Example: Escape, F1, etc.
            </p>
          </div>
        </div>
        
        <div className="pt-2 border-t border-cyan-500/20">
          <p className="text-sm text-cyan-400/90">
            When enabled, pressing the configured key will hide or show the panel. This can be 
            useful during gameplay to quickly access or hide the interface.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HidePanelSettings;