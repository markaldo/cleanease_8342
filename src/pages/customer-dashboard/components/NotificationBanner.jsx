import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationBanner = ({ notification, onDismiss, onAction }) => {
  const [isVisible, setIsVisible] = useState(true);

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-success-50',
          border: 'border-success-200',
          icon: 'text-success-600',
          text: 'text-success-800'
        };
      case 'warning':
        return {
          bg: 'bg-warning-50',
          border: 'border-warning-200',
          icon: 'text-warning-600',
          text: 'text-warning-800'
        };
      case 'error':
        return {
          bg: 'bg-error-50',
          border: 'border-error-200',
          icon: 'text-error-600',
          text: 'text-error-800'
        };
      case 'info':
      default:
        return {
          bg: 'bg-primary-50',
          border: 'border-primary-200',
          icon: 'text-primary-600',
          text: 'text-primary-800'
        };
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      case 'info':
      default:
        return 'Info';
    }
  };

  if (!isVisible || !notification) {
    return null;
  }

  const styles = getNotificationStyle(notification.type);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss(notification.id);
    }
  };

  const handleAction = () => {
    if (onAction) {
      onAction(notification);
    }
  };

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-lg p-4 mb-4 shadow-elevation-1`}>
      <div className="flex items-start space-x-3">
        <Icon 
          name={getNotificationIcon(notification.type)} 
          size={20} 
          className={`${styles.icon} flex-shrink-0 mt-0.5`} 
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className={`text-sm font-medium ${styles.text}`}>
                {notification.title}
              </h4>
              <p className={`text-sm ${styles.text} mt-1 opacity-90`}>
                {notification.message}
              </p>
              
              {notification.actionText && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAction}
                  className={`mt-2 ${styles.icon} hover:${styles.icon}`}
                >
                  {notification.actionText}
                </Button>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={handleDismiss}
              className={`${styles.icon} hover:${styles.icon} flex-shrink-0 ml-2`}
              title="Dismiss notification"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationBanner;