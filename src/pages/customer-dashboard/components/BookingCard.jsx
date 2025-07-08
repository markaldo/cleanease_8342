import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingCard = ({ booking, onReschedule, onCancel, onRebook, onRate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-primary-600 bg-primary-50';
      case 'in-progress':
        return 'text-warning-600 bg-warning-50';
      case 'completed':
        return 'text-success-600 bg-success-50';
      case 'cancelled':
        return 'text-error-600 bg-error-50';
      default:
        return 'text-secondary-600 bg-secondary-50';
    }
  };

  const getServiceIcon = (serviceType) => {
    switch (serviceType) {
      case 'home':
        return 'Home';
      case 'office':
        return 'Building';
      case 'deep':
        return 'Sparkles';
      default:
        return 'Cleaning';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
            <Icon 
              name={getServiceIcon(booking.serviceType)} 
              size={20} 
              className="text-primary-600" 
            />
          </div>
          <div>
            <h3 className="font-medium text-text-primary">{booking.serviceName}</h3>
            <p className="text-sm text-text-secondary">{booking.location}</p>
          </div>
        </div>
        
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>

      {/* Date & Time */}
      <div className="flex items-center space-x-4 mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-primary">{formatDate(booking.date)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-primary">{formatTime(booking.time)}</span>
        </div>
      </div>

      {/* Cleaner Info */}
      {booking.cleaner && (
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
            <Icon name="User" size={16} className="text-text-secondary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-text-primary">{booking.cleaner.name}</p>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} className="text-warning-500" />
              <span className="text-xs text-text-secondary">{booking.cleaner.rating}</span>
            </div>
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      {booking.status === 'in-progress' && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
            <span>Progress</span>
            <span>{booking.progress}%</span>
          </div>
          <div className="w-full bg-secondary-100 rounded-full h-2">
            <div
              className="bg-warning-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${booking.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {booking.status === 'confirmed' && (
            <>
              <Button
                variant="ghost"
                size="sm"
                iconName="Calendar"
                onClick={() => onReschedule(booking.id)}
                className="text-text-secondary hover:text-text-primary"
              >
                Reschedule
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => onCancel(booking.id)}
                className="text-error hover:text-error"
              >
                Cancel
              </Button>
            </>
          )}
          
          {booking.status === 'completed' && !booking.rated && (
            <Button
              variant="ghost"
              size="sm"
              iconName="Star"
              onClick={() => onRate(booking.id)}
              className="text-warning-600 hover:text-warning-700"
            >
              Rate Service
            </Button>
          )}
          
          {booking.status === 'completed' && (
            <Button
              variant="ghost"
              size="sm"
              iconName="RotateCcw"
              onClick={() => onRebook(booking)}
              className="text-primary-600 hover:text-primary-700"
            >
              Rebook
            </Button>
          )}
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold text-text-primary">${booking.price}</p>
        </div>
      </div>

      {/* Notification Badge */}
      {booking.hasUpdate && (
        <div className="absolute -top-2 -right-2">
          <div className="w-4 h-4 bg-error rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-error-foreground rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCard;