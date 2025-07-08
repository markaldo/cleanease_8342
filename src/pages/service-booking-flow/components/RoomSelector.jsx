import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const RoomSelector = ({ 
  selectedRooms = [], 
  onRoomToggle,
  className = '' 
}) => {
  const roomTypes = [
    { id: 'living-room', name: 'Living Room', icon: 'Sofa', basePrice: 25 },
    { id: 'kitchen', name: 'Kitchen', icon: 'ChefHat', basePrice: 30 },
    { id: 'bedroom', name: 'Bedroom', icon: 'Bed', basePrice: 20 },
    { id: 'bathroom', name: 'Bathroom', icon: 'Bath', basePrice: 25 },
    { id: 'dining-room', name: 'Dining Room', icon: 'UtensilsCrossed', basePrice: 20 },
    { id: 'office', name: 'Home Office', icon: 'Monitor', basePrice: 25 },
    { id: 'laundry', name: 'Laundry Room', icon: 'Shirt', basePrice: 15 },
    { id: 'garage', name: 'Garage', icon: 'Car', basePrice: 35 },
    { id: 'basement', name: 'Basement', icon: 'Home', basePrice: 30 },
    { id: 'balcony', name: 'Balcony/Patio', icon: 'TreePine', basePrice: 20 }
  ];

  const isRoomSelected = (roomId) => {
    return selectedRooms.some(room => room.id === roomId);
  };

  const getRoomCount = (roomId) => {
    const room = selectedRooms.find(room => room.id === roomId);
    return room ? room.count : 0;
  };

  const handleRoomToggle = (room) => {
    const isSelected = isRoomSelected(room.id);
    if (isSelected) {
      onRoomToggle(room, 0);
    } else {
      onRoomToggle(room, 1);
    }
  };

  const handleCountChange = (room, count) => {
    const numCount = Math.max(0, Math.min(10, parseInt(count) || 0));
    onRoomToggle(room, numCount);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Select Rooms to Clean
        </h3>
        <div className="text-sm text-text-secondary">
          {selectedRooms.length} room{selectedRooms.length !== 1 ? 's' : ''} selected
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roomTypes.map((room) => {
          const isSelected = isRoomSelected(room.id);
          const count = getRoomCount(room.id);

          return (
            <div
              key={room.id}
              className={`
                relative border-2 rounded-lg p-4 transition-smooth cursor-pointer
                ${isSelected 
                  ? 'border-primary bg-primary-50' :'border-border bg-surface hover:border-primary-200 hover:shadow-elevation-2'
                }
              `}
              onClick={() => handleRoomToggle(room)}
            >
              {/* Room Icon and Info */}
              <div className="flex items-start space-x-3 mb-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                  ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary-100 text-secondary-600'}
                `}>
                  <Icon name={room.icon} size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className={`
                    font-medium text-sm
                    ${isSelected ? 'text-primary-700' : 'text-text-primary'}
                  `}>
                    {room.name}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    Base price: ${room.basePrice}
                  </p>
                </div>

                {/* Selection Indicator */}
                <div className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center
                  ${isSelected 
                    ? 'border-primary bg-primary' :'border-secondary-300 bg-transparent'
                  }
                `}>
                  {isSelected && (
                    <Icon name="Check" size={12} className="text-primary-foreground" />
                  )}
                </div>
              </div>

              {/* Room Count Selector */}
              {isSelected && (
                <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                  <label className="text-xs text-text-secondary flex-shrink-0">
                    Quantity:
                  </label>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleCountChange(room, count - 1)}
                      disabled={count <= 1}
                      className="w-6 h-6 rounded border border-border bg-surface flex items-center justify-center text-text-primary hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Icon name="Minus" size={12} />
                    </button>
                    
                    <Input
                      type="number"
                      value={count}
                      onChange={(e) => handleCountChange(room, e.target.value)}
                      min="1"
                      max="10"
                      className="w-12 h-6 text-center text-xs p-1"
                    />
                    
                    <button
                      onClick={() => handleCountChange(room, count + 1)}
                      disabled={count >= 10}
                      className="w-6 h-6 rounded border border-border bg-surface flex items-center justify-center text-text-primary hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Icon name="Plus" size={12} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {selectedRooms.length > 0 && (
        <div className="bg-secondary-50 rounded-lg p-4">
          <h4 className="font-medium text-text-primary mb-2">Selected Rooms:</h4>
          <div className="space-y-1">
            {selectedRooms.map((room) => {
              const roomType = roomTypes.find(r => r.id === room.id);
              return (
                <div key={room.id} className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">
                    {roomType?.name} × {room.count}
                  </span>
                  <span className="text-text-primary font-medium">
                    ${(roomType?.basePrice || 0) * room.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomSelector;