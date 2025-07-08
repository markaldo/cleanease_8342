import React from 'react';
import Icon from '../../../components/AppIcon';

const AddOnServices = ({ 
  selectedAddOns = [], 
  onAddOnToggle,
  className = '' 
}) => {
  const addOnServices = [
    {
      id: 'window-cleaning',
      name: 'Window Cleaning',
      description: 'Interior and exterior window cleaning',
      icon: 'Square',
      price: 25,
      duration: '30 min',
      popular: true
    },
    {
      id: 'carpet-cleaning',
      name: 'Carpet Deep Clean',
      description: 'Professional carpet shampooing and stain removal',
      icon: 'Layers',
      price: 45,
      duration: '45 min'
    },
    {
      id: 'appliance-cleaning',
      name: 'Appliance Cleaning',
      description: 'Oven, refrigerator, and microwave deep clean',
      icon: 'Microwave',
      price: 35,
      duration: '40 min'
    },
    {
      id: 'cabinet-cleaning',
      name: 'Cabinet Interior',
      description: 'Inside cabinet and drawer cleaning',
      icon: 'Archive',
      price: 20,
      duration: '25 min'
    },
    {
      id: 'garage-organization',
      name: 'Garage Organization',
      description: 'Organize and clean garage space',
      icon: 'Package',
      price: 50,
      duration: '60 min'
    },
    {
      id: 'basement-cleaning',
      name: 'Basement Deep Clean',
      description: 'Complete basement cleaning and organization',
      icon: 'Home',
      price: 40,
      duration: '50 min'
    }
  ];

  const isAddOnSelected = (addOnId) => {
    return selectedAddOns.includes(addOnId);
  };

  const handleAddOnToggle = (addOnId) => {
    onAddOnToggle(addOnId);
  };

  const getTotalAddOnPrice = () => {
    return selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOnServices.find(service => service.id === addOnId);
      return total + (addOn ? addOn.price : 0);
    }, 0);
  };

  const getTotalAddOnDuration = () => {
    return selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOnServices.find(service => service.id === addOnId);
      if (addOn) {
        const minutes = parseInt(addOn.duration.split(' ')[0]);
        return total + minutes;
      }
      return total;
    }, 0);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Add-On Services
        </h3>
        <div className="text-sm text-text-secondary">
          {selectedAddOns.length} add-on{selectedAddOns.length !== 1 ? 's' : ''} selected
        </div>
      </div>

      {/* Add-On Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addOnServices.map((addOn) => {
          const isSelected = isAddOnSelected(addOn.id);

          return (
            <div
              key={addOn.id}
              className={`
                relative border-2 rounded-lg p-4 cursor-pointer transition-smooth
                ${isSelected 
                  ? 'border-primary bg-primary-50' :'border-border bg-surface hover:border-primary-200 hover:shadow-elevation-2'
                }
              `}
              onClick={() => handleAddOnToggle(addOn.id)}
            >
              {/* Popular Badge */}
              {addOn.popular && (
                <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                  Popular
                </div>
              )}

              {/* Add-On Header */}
              <div className="flex items-start space-x-3 mb-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                  ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary-100 text-secondary-600'}
                `}>
                  <Icon name={addOn.icon} size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className={`
                    font-medium text-sm mb-1
                    ${isSelected ? 'text-primary-700' : 'text-text-primary'}
                  `}>
                    {addOn.name}
                  </h4>
                  <p className="text-xs text-text-secondary mb-2">
                    {addOn.description}
                  </p>
                </div>

                {/* Selection Indicator */}
                <div className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0
                  ${isSelected 
                    ? 'border-primary bg-primary' :'border-secondary-300 bg-transparent'
                  }
                `}>
                  {isSelected && (
                    <Icon name="Check" size={12} className="text-primary-foreground" />
                  )}
                </div>
              </div>

              {/* Price and Duration */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`
                    text-lg font-bold
                    ${isSelected ? 'text-primary-700' : 'text-text-primary'}
                  `}>
                    +${addOn.price}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-text-secondary text-xs">
                  <Icon name="Clock" size={12} />
                  <span>{addOn.duration}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add-On Summary */}
      {selectedAddOns.length > 0 && (
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-text-primary">Add-On Summary:</h4>
            <div className="text-right">
              <div className="text-lg font-bold text-text-primary">
                +${getTotalAddOnPrice()}
              </div>
              <div className="text-xs text-text-secondary">
                +{getTotalAddOnDuration()} min
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            {selectedAddOns.map((addOnId) => {
              const addOn = addOnServices.find(service => service.id === addOnId);
              return addOn ? (
                <div key={addOnId} className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">{addOn.name}</span>
                  <span className="text-text-primary font-medium">+${addOn.price}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOnServices;