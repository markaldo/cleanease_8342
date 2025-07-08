import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const PaymentMethodSelector = ({ 
  selectedMethod, 
  onMethodSelect, 
  savedCards = [],
  className = '' 
}) => {
  const [showNewCardForm, setShowNewCardForm] = useState(false);

  const paymentMethods = [
    {
      id: 'apple_pay',
      name: 'Apple Pay',
      icon: 'Smartphone',
      description: 'Pay with Touch ID or Face ID',
      available: true
    },
    {
      id: 'google_pay',
      name: 'Google Pay',
      icon: 'Smartphone',
      description: 'Quick and secure payment',
      available: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'CreditCard',
      description: 'Pay with your PayPal account',
      available: true
    },
    {
      id: 'cash',
      name: 'Cash Payment',
      icon: 'Banknote',
      description: 'Pay cash to cleaner on arrival',
      available: true
    }
  ];

  const getCardIcon = (cardType) => {
    const icons = {
      visa: 'CreditCard',
      mastercard: 'CreditCard',
      amex: 'CreditCard',
      discover: 'CreditCard'
    };
    return icons[cardType?.toLowerCase()] || 'CreditCard';
  };

  const handleMethodSelect = (methodId) => {
    onMethodSelect(methodId);
    if (methodId === 'new_card') {
      setShowNewCardForm(true);
    } else {
      setShowNewCardForm(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-heading font-semibold text-text-primary">
        Payment Method
      </h3>

      {/* Saved Cards */}
      {savedCards.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-secondary">Saved Cards</h4>
          {savedCards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleMethodSelect(card.id)}
              className={`w-full p-4 border rounded-lg text-left transition-smooth ${
                selectedMethod === card.id
                  ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name={getCardIcon(card.type)} size={24} />
                  <div>
                    <div className="font-medium text-text-primary">
                      •••• •••• •••• {card.lastFour}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {card.type.toUpperCase()} • Expires {card.expiryMonth}/{card.expiryYear}
                    </div>
                  </div>
                </div>
                {card.isDefault && (
                  <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded">
                    Default
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Add New Card */}
      <button
        onClick={() => handleMethodSelect('new_card')}
        className={`w-full p-4 border rounded-lg text-left transition-smooth ${
          selectedMethod === 'new_card' ?'border-primary bg-primary-50' :'border-border hover:border-secondary-300'
        }`}
      >
        <div className="flex items-center space-x-3">
          <Icon name="Plus" size={24} />
          <div>
            <div className="font-medium text-text-primary">Add New Card</div>
            <div className="text-sm text-text-secondary">
              Credit or debit card
            </div>
          </div>
        </div>
      </button>

      {/* Other Payment Methods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => handleMethodSelect(method.id)}
            disabled={!method.available}
            className={`p-4 border rounded-lg text-left transition-smooth ${
              selectedMethod === method.id
                ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300'
            } ${!method.available ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center space-x-3">
              <Icon name={method.icon} size={24} />
              <div>
                <div className="font-medium text-text-primary">
                  {method.name}
                </div>
                <div className="text-sm text-text-secondary">
                  {method.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;