import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceTypeCard = ({ 
  service, 
  isSelected, 
  onSelect,
  className = '' 
}) => {
  const {
    id,
    name,
    description,
    price,
    duration,
    features,
    icon,
    popular,
    discount
  } = service;

  return (
    <div
      className={`
        relative bg-surface border-2 rounded-lg p-6 cursor-pointer transition-smooth
        ${isSelected 
          ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200 hover:shadow-elevation-2'
        }
        ${className}
      `}
      onClick={() => onSelect(service)}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-3 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
          Most Popular
        </div>
      )}

      {/* Discount Badge */}
      {discount && (
        <div className="absolute -top-3 right-4 bg-warning text-warning-foreground px-3 py-1 rounded-full text-xs font-medium">
          {discount}% OFF
        </div>
      )}

      {/* Service Icon */}
      <div className={`
        w-12 h-12 rounded-lg flex items-center justify-center mb-4
        ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary-100 text-secondary-600'}
      `}>
        <Icon name={icon} size={24} />
      </div>

      {/* Service Info */}
      <div className="mb-4">
        <h3 className={`
          text-lg font-heading font-semibold mb-2
          ${isSelected ? 'text-primary-700' : 'text-text-primary'}
        `}>
          {name}
        </h3>
        <p className="text-text-secondary text-sm mb-3">
          {description}
        </p>

        {/* Price and Duration */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className={`
              text-xl font-bold
              ${isSelected ? 'text-primary-700' : 'text-text-primary'}
            `}>
              ${price}
            </span>
            {discount && (
              <span className="text-sm text-text-muted line-through">
                ${Math.round(price / (1 - discount / 100))}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1 text-text-secondary text-sm">
            <Icon name="Clock" size={16} />
            <span>{duration}</span>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon 
                name="Check" 
                size={16} 
                className={isSelected ? 'text-primary-600' : 'text-success'} 
              />
              <span className="text-sm text-text-secondary">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selection Button */}
      <Button
        variant={isSelected ? "primary" : "outline"}
        fullWidth
        iconName={isSelected ? "Check" : "ArrowRight"}
        iconPosition="right"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(service);
        }}
      >
        {isSelected ? 'Selected' : 'Select Service'}
      </Button>
    </div>
  );
};

export default ServiceTypeCard;