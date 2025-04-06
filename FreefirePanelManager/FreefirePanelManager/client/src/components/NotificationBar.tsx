import React from 'react';

interface NotificationBarProps {
  status: 'Available' | 'Injecting' | 'Running' | 'Undetected';
  price?: string;
  isInjecting?: boolean;
  onInjectClick?: () => void;
}

const NotificationBar: React.FC<NotificationBarProps> = ({ 
  status = 'Available',
  price = 'Free',
  isInjecting = false,
  onInjectClick
}) => {
  // Get status color based on current status
  const getStatusColor = () => {
    switch(status) {
      case 'Available':
        return 'text-green-500';
      case 'Injecting':
        return 'text-cyan-400';
      case 'Running':
        return 'text-green-500';
      case 'Undetected':
        return 'text-yellow-400';
      default:
        return 'text-green-500';
    }
  };
  
  return (
    <div className="w-full flex flex-col">
      {/* Status Bar */}
      <div className="bg-black/80 border border-cyan-500/20 p-2 rounded-md flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-gray-300 mr-2">Status :</span>
          <span className={`font-bold ${getStatusColor()}`}>{status}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-300 mr-2">Price :</span>
          <span className="text-green-500 font-bold">{price}</span>
        </div>
      </div>
      
      {/* Inject Button */}
      <div className="mt-2 grid grid-cols-2 gap-2">
        {isInjecting ? (
          <div className="bg-cyan-500 text-black py-2 px-4 rounded-md font-bold text-center col-span-2">
            Injecting...
          </div>
        ) : (
          <>
            {/* Dark/Red emulator button */}
            <div className="bg-black border border-red-500 py-2 px-4 rounded-md text-red-500 font-bold text-center">
              HUZI PANEL
            </div>
            
            {/* Inject script button */}
            <button 
              onClick={onInjectClick}
              className="bg-black border border-cyan-500 hover:bg-gray-900 text-cyan-500 py-2 px-4 rounded-md font-bold text-center transition-colors"
            >
              Inject Script
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationBar;