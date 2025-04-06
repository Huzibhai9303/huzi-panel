import React, { useEffect, useState } from 'react';

interface CommandNotification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration: number;
}

interface CommandNotificationProps {
  notifications: CommandNotification[];
}

const CommandNotification: React.FC<CommandNotificationProps> = ({ notifications }) => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col-reverse gap-2 z-50">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

interface NotificationItemProps {
  notification: CommandNotification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, notification.duration);
    
    return () => clearTimeout(timer);
  }, [notification.duration]);
  
  if (!visible) return null;
  
  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-500/90 border-green-400';
      case 'error':
        return 'bg-red-500/90 border-red-400';
      case 'warning':
        return 'bg-yellow-500/90 border-yellow-400';
      case 'info':
      default:
        return 'bg-cyan-500/90 border-cyan-400';
    }
  };
  
  return (
    <div 
      className={`p-3 rounded-md border text-white shadow-lg transform transition-all duration-500 ${getBackgroundColor()} animate-slide-up`}
      style={{ width: '280px' }}
    >
      <div className="flex items-center">
        <div className="mr-2">
          {notification.type === 'success' && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          {notification.type === 'error' && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          {notification.type === 'warning' && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          {notification.type === 'info' && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 7a1 1 0 100 2h.01a1 1 0 100-2H10z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <p className="text-sm font-medium">{notification.message}</p>
      </div>
    </div>
  );
};

export default CommandNotification;