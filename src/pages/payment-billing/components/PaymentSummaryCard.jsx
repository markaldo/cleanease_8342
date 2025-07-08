import React from 'react';
import Icon from '../../../components/AppIcon';

const PaymentSummaryCard = ({ 
  serviceDetails, 
  totalAmount, 
  currency = 'USD',
  className = '' 
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className={`bg-surface border border-border rounded-lg p-4 shadow-elevation-2 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">
            {serviceDetails.serviceName}
          </h3>
          <p className="text-sm text-text-secondary">
            {serviceDetails.date} at {serviceDetails.time}
          </p>
          <p className="text-sm text-text-secondary">
            {serviceDetails.address}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-heading font-bold text-primary">
            {formatCurrency(totalAmount)}
          </div>
          <div className="text-xs text-text-muted">Total Amount</div>
        </div>
      </div>

      <div className="space-y-2 pt-3 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="MapPin" size={16} />
          <span>{serviceDetails.rooms} rooms • {serviceDetails.duration}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="User" size={16} />
          <span>Cleaner: {serviceDetails.cleanerName}</span>
        </div>
        {serviceDetails.addOns && serviceDetails.addOns.length > 0 && (
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Plus" size={16} />
            <span>Add-ons: {serviceDetails.addOns.join(', ')}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSummaryCard;