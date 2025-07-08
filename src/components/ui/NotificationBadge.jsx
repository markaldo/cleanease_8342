import React from 'react';

const NotificationBadge = ({ 
  count = 0, 
  maxCount = 99, 
  size = 'md',
  variant = 'error',
  className = '',
  showZero = false 
}) => {
  if (!showZero && count === 0) {
    return null;
  }

  const sizeClasses = {
    sm: 'w-4 h-4 text-xs',
    md: 'w-5 h-5 text-xs',
    lg: 'w-6 h-6 text-sm'
  };

  const variantClasses = {
    error: 'bg-error text-error-foreground',
    warning: 'bg-warning text-warning-foreground',
    success: 'bg-success text-success-foreground',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground'
  };

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  return (
    <span
      className={`
        inline-flex items-center justify-center
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        font-medium rounded-full
        ${className}
      `}
      aria-label={`${count} notifications`}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;