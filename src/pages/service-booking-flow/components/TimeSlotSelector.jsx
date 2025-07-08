import React from 'react';
import Icon from '../../../components/AppIcon';

const TimeSlotSelector = ({ 
  timeSlots = [], 
  selectedSlot, 
  onSlotSelect,
  className = '' 
}) => {
  const getSlotStatus = (slot) => {
    if (slot.available === 0) return 'unavailable';
    if (slot.available <= 2) return 'limited';
    return 'available';
  };

  const getSlotStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'border-success bg-success-50 text-success-700 hover:bg-success-100';
      case 'limited':
        return 'border-warning bg-warning-50 text-warning-700 hover:bg-warning-100';
      case 'unavailable':
        return 'border-secondary-200 bg-secondary-50 text-text-muted cursor-not-allowed';
      default:
        return 'border-border bg-surface text-text-primary hover:bg-secondary-50';
    }
  };

  const getSelectedSlotColor = () => {
    return 'border-primary bg-primary text-primary-foreground';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Available Time Slots
        </h3>
        <div className="flex items-center space-x-1 text-text-secondary">
          <Icon name="Clock" size={16} />
          <span className="text-sm">Select your preferred time</span>
        </div>
      </div>

      {/* Time Slots Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {timeSlots.map((slot) => {
          const status = getSlotStatus(slot);
          const isSelected = selectedSlot?.time === slot.time;
          const isDisabled = status === 'unavailable';

          return (
            <button
              key={slot.time}
              onClick={() => !isDisabled && onSlotSelect(slot)}
              disabled={isDisabled}
              className={`
                relative p-4 rounded-lg border-2 transition-smooth text-left
                ${isSelected 
                  ? getSelectedSlotColor() 
                  : getSlotStatusColor(status)
                }
              `}
            >
              {/* Time */}
              <div className="font-medium text-sm mb-1">
                {slot.time}
              </div>

              {/* Price */}
              <div className="text-xs mb-2">
                {slot.priceModifier !== 0 && (
                  <span className={isSelected ? 'text-primary-100' : 'text-text-secondary'}>
                    {slot.priceModifier > 0 ? '+' : ''}${slot.priceModifier}
                  </span>
                )}
              </div>

              {/* Availability Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Icon 
                    name="Users" 
                    size={12} 
                    className={isSelected ? 'text-primary-100' : 'text-current'} 
                  />
                  <span className="text-xs">
                    {slot.available} available
                  </span>
                </div>

                {/* Status Indicator */}
                {status === 'limited' && !isSelected && (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-xs">Limited</span>
                  </div>
                )}

                {isSelected && (
                  <Icon name="Check" size={14} className="text-primary-100" />
                )}
              </div>

              {/* Popular Time Badge */}
              {slot.popular && !isSelected && (
                <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                  Popular
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-xs text-text-secondary">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-text-secondary">
          <div className="w-3 h-3 bg-warning rounded-full"></div>
          <span>Limited spots</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-text-secondary">
          <div className="w-3 h-3 bg-secondary-200 rounded-full"></div>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotSelector;