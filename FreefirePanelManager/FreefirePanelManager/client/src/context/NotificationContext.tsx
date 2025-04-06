import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Define notification type
export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration: number;
}

// Context interface
interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning', duration?: number) => void;
  removeNotification: (id: number) => void;
}

// Create context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provider component
interface NotificationProviderProps {
  children: ReactNode;
}

let notificationId = 0;

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((
    message: string, 
    type: 'success' | 'error' | 'info' | 'warning' = 'info', 
    duration = 3000
  ) => {
    const id = notificationId++;
    
    const newNotification: Notification = {
      id,
      message,
      type,
      duration
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-remove after duration
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook for using the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  
  return context;
};