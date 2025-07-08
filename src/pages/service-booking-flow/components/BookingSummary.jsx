import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingSummary = ({ 
  selectedService,
  selectedDate,
  selectedTimeSlot,
  selectedRooms,
  selectedAddOns,
  instructions,
  onContinue,
  onBack,
  isSticky = false,
  className = '' 
}) => {
  const calculateSubtotal = () => {
    let total = selectedService?.price || 0;
    
    // Add time slot modifier
    if (selectedTimeSlot?.priceModifier) {
      total += selectedTimeSlot.priceModifier;
    }
    
    // Add room costs
    selectedRooms.forEach(room => {
      const roomType = getRoomTypeById(room.id);
      if (roomType) {
        total += roomType.basePrice * room.count;
      }
    });
    
    // Add add-on costs
    selectedAddOns.forEach(addOnId => {
      const addOn = getAddOnById(addOnId);
      if (addOn) {
        total += addOn.price;
      }
    });
    
    return total;
  };

  const getRoomTypeById = (roomId) => {
    const roomTypes = [
      { id: 'living-room', name: 'Living Room', basePrice: 25 },
      { id: 'kitchen', name: 'Kitchen', basePrice: 30 },
      { id: 'bedroom', name: 'Bedroom', basePrice: 20 },
      { id: 'bathroom', name: 'Bathroom', basePrice: 25 },
      { id: 'dining-room', name: 'Dining Room', basePrice: 20 },
      { id: 'office', name: 'Home Office', basePrice: 25 },
      { id: 'laundry', name: 'Laundry Room', basePrice: 15 },
      { id: 'garage', name: 'Garage', basePrice: 35 },
      { id: 'basement', name: 'Basement', basePrice: 30 },
      { id: 'balcony', name: 'Balcony/Patio', basePrice: 20 }
    ];
    return roomTypes.find(room => room.id === roomId);
  };

  const getAddOnById = (addOnId) => {
    const addOnServices = [
      { id: 'window-cleaning', name: 'Window Cleaning', price: 25 },
      { id: 'carpet-cleaning', name: 'Carpet Deep Clean', price: 45 },
      { id: 'appliance-cleaning', name: 'Appliance Cleaning', price: 35 },
      { id: 'cabinet-cleaning', name: 'Cabinet Interior', price: 20 },
      { id: 'garage-organization', name: 'Garage Organization', price: 50 },
      { id: 'basement-cleaning', name: 'Basement Deep Clean', price: 40 }
    ];
    return addOnServices.find(addOn => addOn.id === addOnId);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.08; // 8% tax
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = subtotal + tax;

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTotalDuration = () => {
    let duration = selectedService?.duration ? parseInt(selectedService.duration.split(' ')[0]) : 0;
    
    selectedAddOns.forEach(addOnId => {
      const addOn = getAddOnById(addOnId);
      if (addOn) {
        const addOnDuration = parseInt(addOn.duration?.split(' ')[0] || 0);
        duration += addOnDuration;
      }
    });
    
    return duration;
  };

  if (isSticky) {
    return (
      <div className={`sticky bottom-0 bg-surface border-t border-border shadow-elevation-3 p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-text-primary">
              Total: ${total.toFixed(2)}
            </div>
            <div className="text-sm text-text-secondary">
              {getTotalDuration()} minutes • {selectedRooms.length} rooms
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {onBack && (
              <Button
                variant="outline"
                size="sm"
                iconName="ChevronLeft"
                onClick={onBack}
              >
                Back
              </Button>
            )}
            <Button
              variant="primary"
              size="md"
              iconName="ArrowRight"
              iconPosition="right"
              onClick={onContinue}
              disabled={!selectedService}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Receipt" size={20} className="text-text-secondary" />
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Booking Summary
        </h3>
      </div>

      {/* Service Details */}
      {selectedService && (
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-text-primary">{selectedService.name}</h4>
              <p className="text-sm text-text-secondary">{selectedService.duration}</p>
            </div>
            <span className="font-medium text-text-primary">${selectedService.price}</span>
          </div>

          {/* Date and Time */}
          {selectedDate && (
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-text-primary">Date & Time</div>
                <div className="text-sm text-text-secondary">
                  {formatDate(selectedDate)}
                  {selectedTimeSlot && ` at ${selectedTimeSlot.time}`}
                </div>
              </div>
              {selectedTimeSlot?.priceModifier !== 0 && (
                <span className="font-medium text-text-primary">
                  {selectedTimeSlot.priceModifier > 0 ? '+' : ''}${selectedTimeSlot.priceModifier}
                </span>
              )}
            </div>
          )}

          {/* Rooms */}
          {selectedRooms.length > 0 && (
            <div className="space-y-2">
              <div className="font-medium text-text-primary">Selected Rooms</div>
              {selectedRooms.map(room => {
                const roomType = getRoomTypeById(room.id);
                return roomType ? (
                  <div key={room.id} className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">
                      {roomType.name} × {room.count}
                    </span>
                    <span className="text-text-primary">
                      ${roomType.basePrice * room.count}
                    </span>
                  </div>
                ) : null;
              })}
            </div>
          )}

          {/* Add-Ons */}
          {selectedAddOns.length > 0 && (
            <div className="space-y-2">
              <div className="font-medium text-text-primary">Add-On Services</div>
              {selectedAddOns.map(addOnId => {
                const addOn = getAddOnById(addOnId);
                return addOn ? (
                  <div key={addOnId} className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">{addOn.name}</span>
                    <span className="text-text-primary">+${addOn.price}</span>
                  </div>
                ) : null;
              })}
            </div>
          )}

          {/* Special Instructions */}
          {instructions && (
            <div>
              <div className="font-medium text-text-primary mb-1">Special Instructions</div>
              <div className="text-sm text-text-secondary bg-secondary-50 rounded p-2 max-h-20 overflow-y-auto">
                {instructions}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Price Breakdown */}
      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Subtotal</span>
          <span className="text-text-primary">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Tax (8%)</span>
          <span className="text-text-primary">${tax.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-lg font-bold border-t border-border pt-2">
          <span className="text-text-primary">Total</span>
          <span className="text-text-primary">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Duration Info */}
      <div className="mt-4 p-3 bg-primary-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-primary-600" />
          <span className="text-sm text-primary-700">
            Estimated duration: {getTotalDuration()} minutes
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3 mt-6">
        {onBack && (
          <Button
            variant="outline"
            fullWidth
            iconName="ChevronLeft"
            onClick={onBack}
          >
            Back
          </Button>
        )}
        <Button
          variant="primary"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
          onClick={onContinue}
          disabled={!selectedService}
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default BookingSummary;