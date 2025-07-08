import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivityItem = ({ activity, onRate, onRebook }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'booking_completed':
        return 'CheckCircle';
      case 'payment_received':
        return 'CreditCard';
      case 'booking_cancelled':
        return 'XCircle';
      case 'cleaner_assigned':
        return 'UserCheck';
      case 'rating_submitted':
        return 'Star';
      default:
        return 'Bell';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'booking_completed':
        return 'text-success-600';
      case 'payment_received':
        return 'text-primary-600';
      case 'booking_cancelled':
        return 'text-error-600';
      case 'cleaner_assigned':
        return 'text-warning-600';
      case 'rating_submitted':
        return 'text-warning-500';
      default:
        return 'text-text-secondary';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-secondary-50 rounded-lg transition-smooth">
      <div className={`w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
        <Icon name={getActivityIcon(activity.type)} size={16} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-text-primary">{activity.title}</p>
            <p className="text-sm text-text-secondary mt-1">{activity.description}</p>
            
            {activity.serviceName && (
              <p className="text-xs text-text-muted mt-1">
                Service: {activity.serviceName}
              </p>
            )}
          </div>
          
          <span className="text-xs text-text-secondary flex-shrink-0 ml-2">
            {formatTimeAgo(activity.timestamp)}
          </span>
        </div>
        
        {/* Action Buttons */}
        {activity.type === 'booking_completed' && !activity.rated && (
          <div className="flex items-center space-x-2 mt-2">
            <Button
              variant="ghost"
              size="xs"
              iconName="Star"
              onClick={() => onRate(activity.bookingId)}
              className="text-warning-600 hover:text-warning-700"
            >
              Rate Service
            </Button>
            <Button
              variant="ghost"
              size="xs"
              iconName="RotateCcw"
              onClick={() => onRebook(activity)}
              className="text-primary-600 hover:text-primary-700"
            >
              Rebook
            </Button>
          </div>
        )}
        
        {activity.amount && (
          <div className="mt-2">
            <span className="text-sm font-semibold text-text-primary">
              ${activity.amount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivityItem;