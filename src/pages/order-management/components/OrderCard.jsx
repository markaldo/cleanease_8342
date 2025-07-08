import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderCard = ({ 
  order, 
  onReschedule, 
  onCancel, 
  onModify, 
  onTrack, 
  onRate, 
  onRebook, 
  onMessage, 
  onCall,
  isExpanded,
  onToggleExpand,
  viewMode = 'mobile'
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'text-primary bg-primary-50 border-primary-100';
      case 'in-progress': return 'text-warning bg-warning-50 border-warning-100';
      case 'completed': return 'text-success bg-success-50 border-success-100';
      case 'cancelled': return 'text-error bg-error-50 border-error-100';
      default: return 'text-secondary bg-secondary-50 border-secondary-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming': return 'Clock';
      case 'in-progress': return 'Play';
      case 'completed': return 'CheckCircle';
      case 'cancelled': return 'XCircle';
      default: return 'Circle';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const renderQuickActions = () => {
    switch (order.status) {
      case 'upcoming':
        return (
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Calendar"
              onClick={() => onReschedule(order.id)}
            >
              Reschedule
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Edit"
              onClick={() => onModify(order.id)}
            >
              Modify
            </Button>
            <Button
              variant="danger"
              size="sm"
              iconName="X"
              onClick={() => onCancel(order.id)}
            >
              Cancel
            </Button>
          </div>
        );
      case 'in-progress':
        return (
          <div className="flex flex-wrap gap-2">
            <Button
              variant="primary"
              size="sm"
              iconName="MapPin"
              onClick={() => onTrack(order.id)}
            >
              Track Live
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              onClick={() => onMessage(order.id)}
            >
              Message
            </Button>
          </div>
        );
      case 'completed':
        return (
          <div className="flex flex-wrap gap-2">
            {!order.rated && (
              <Button
                variant="warning"
                size="sm"
                iconName="Star"
                onClick={() => onRate(order.id)}
              >
                Rate Service
              </Button>
            )}
            <Button
              variant="primary"
              size="sm"
              iconName="RotateCcw"
              onClick={() => onRebook(order.id)}
            >
              Book Again
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderExpandedContent = () => (
    <div className="mt-4 pt-4 border-t border-border space-y-4">
      {/* Cleaner Profile */}
      <div className="flex items-center space-x-3">
        <Image
          src={order.cleaner.avatar}
          alt={order.cleaner.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <h4 className="font-medium text-text-primary">{order.cleaner.name}</h4>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="text-sm text-text-secondary">{order.cleaner.rating}</span>
            </div>
            <span className="text-sm text-text-muted">•</span>
            <span className="text-sm text-text-secondary">{order.cleaner.completedJobs} jobs</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="MessageCircle"
            onClick={() => onMessage(order.id)}
            title="Message cleaner"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Phone"
            onClick={() => onCall(order.id)}
            title="Call support"
          />
        </div>
      </div>

      {/* Service Details */}
      <div className="space-y-3">
        <h4 className="font-medium text-text-primary">Service Details</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <span className="text-sm text-text-secondary">Service Type</span>
            <p className="font-medium text-text-primary">{order.serviceType}</p>
          </div>
          <div>
            <span className="text-sm text-text-secondary">Duration</span>
            <p className="font-medium text-text-primary">{order.duration}</p>
          </div>
          <div>
            <span className="text-sm text-text-secondary">Rooms</span>
            <p className="font-medium text-text-primary">{order.rooms.join(', ')}</p>
          </div>
          <div>
            <span className="text-sm text-text-secondary">Add-ons</span>
            <p className="font-medium text-text-primary">
              {order.addOns.length > 0 ? order.addOns.join(', ') : 'None'}
            </p>
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <span className="text-sm text-text-secondary">Address</span>
        <p className="font-medium text-text-primary">{order.address}</p>
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-2">
        <h4 className="font-medium text-text-primary">Pricing</h4>
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Base Service</span>
            <span className="text-text-primary">${order.pricing.base}</span>
          </div>
          {order.pricing.addOns > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Add-ons</span>
              <span className="text-text-primary">${order.pricing.addOns}</span>
            </div>
          )}
          {order.pricing.discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-success">Discount</span>
              <span className="text-success">-${order.pricing.discount}</span>
            </div>
          )}
          <div className="flex justify-between font-medium pt-1 border-t border-border">
            <span className="text-text-primary">Total</span>
            <span className="text-text-primary">${order.pricing.total}</span>
          </div>
        </div>
      </div>

      {/* Special Instructions */}
      {order.instructions && (
        <div>
          <span className="text-sm text-text-secondary">Special Instructions</span>
          <p className="text-sm text-text-primary mt-1">{order.instructions}</p>
        </div>
      )}

      {/* Progress for In-Progress Orders */}
      {order.status === 'in-progress' && order.progress && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-text-primary">Progress</span>
            <span className="text-sm text-text-secondary">{order.progress.percentage}%</span>
          </div>
          <div className="w-full bg-secondary-100 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${order.progress.percentage}%` }}
            />
          </div>
          <p className="text-sm text-text-secondary">{order.progress.currentTask}</p>
          {order.progress.estimatedCompletion && (
            <p className="text-sm text-text-secondary">
              Estimated completion: {formatTime(order.progress.estimatedCompletion)}
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (viewMode === 'desktop') {
    return (
      <div className="bg-surface border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-smooth cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-3">
              <h3 className="font-medium text-text-primary">{order.serviceType}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                <Icon name={getStatusIcon(order.status)} size={12} className="inline mr-1" />
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>{formatDate(order.date)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{formatTime(order.time)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span className="truncate max-w-32">{order.address}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Image
                src={order.cleaner.avatar}
                alt={order.cleaner.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm text-text-secondary">{order.cleaner.name}</span>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} className="text-warning fill-current" />
                <span className="text-xs text-text-secondary">{order.cleaner.rating}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-medium text-text-primary">${order.pricing.total}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div 
        className="p-4 cursor-pointer"
        onClick={() => onToggleExpand(order.id)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-medium text-text-primary">{order.serviceType}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                <Icon name={getStatusIcon(order.status)} size={12} className="inline mr-1" />
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>{formatDate(order.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{formatTime(order.time)}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 text-sm text-text-secondary">
                <Icon name="MapPin" size={14} />
                <span className="truncate">{order.address}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-1">
            <span className="font-medium text-text-primary">${order.pricing.total}</span>
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-text-secondary" 
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src={order.cleaner.avatar}
              alt={order.cleaner.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <span className="text-sm font-medium text-text-primary">{order.cleaner.name}</span>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} className="text-warning fill-current" />
                <span className="text-xs text-text-secondary">{order.cleaner.rating}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-1">
            {renderQuickActions()}
          </div>
        </div>
      </div>

      {isExpanded && renderExpandedContent()}
    </div>
  );
};

export default OrderCard;