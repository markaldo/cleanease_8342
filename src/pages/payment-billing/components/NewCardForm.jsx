import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const NewCardForm = ({ 
  onSubmit, 
  onCancel, 
  isVisible = false,
  className = '' 
}) => {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    saveCard: false
  });
  const [errors, setErrors] = useState({});

  const validateCard = () => {
    const newErrors = {};
    
    if (!cardData.cardNumber || cardData.cardNumber.length < 16) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    
    if (!cardData.expiryDate || !/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = 'Please enter expiry date (MM/YY)';
    }
    
    if (!cardData.cvv || cardData.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    
    if (!cardData.cardholderName.trim()) {
      newErrors.cardholderName = 'Please enter cardholder name';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCard()) {
      onSubmit(cardData);
    }
  };

  const handleInputChange = (field, value) => {
    setCardData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (!isVisible) return null;

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Add New Card
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onCancel}
          className="text-text-secondary hover:text-text-primary"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Card Number
          </label>
          <Input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardData.cardNumber}
            onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
            maxLength={19}
            className={errors.cardNumber ? 'border-error' : ''}
          />
          {errors.cardNumber && (
            <p className="text-sm text-error mt-1">{errors.cardNumber}</p>
          )}
        </div>

        {/* Expiry and CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Expiry Date
            </label>
            <Input
              type="text"
              placeholder="MM/YY"
              value={cardData.expiryDate}
              onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
              maxLength={5}
              className={errors.expiryDate ? 'border-error' : ''}
            />
            {errors.expiryDate && (
              <p className="text-sm text-error mt-1">{errors.expiryDate}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              CVV
            </label>
            <Input
              type="text"
              placeholder="123"
              value={cardData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
              maxLength={4}
              className={errors.cvv ? 'border-error' : ''}
            />
            {errors.cvv && (
              <p className="text-sm text-error mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Cardholder Name
          </label>
          <Input
            type="text"
            placeholder="John Doe"
            value={cardData.cardholderName}
            onChange={(e) => handleInputChange('cardholderName', e.target.value)}
            className={errors.cardholderName ? 'border-error' : ''}
          />
          {errors.cardholderName && (
            <p className="text-sm text-error mt-1">{errors.cardholderName}</p>
          )}
        </div>

        {/* Save Card Option */}
        <div className="flex items-center space-x-2">
          <Input
            type="checkbox"
            checked={cardData.saveCard}
            onChange={(e) => handleInputChange('saveCard', e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-sm text-text-primary">
            Save this card for future payments
          </label>
        </div>

        {/* Security Badges */}
        <div className="flex items-center space-x-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-xs text-text-secondary">SSL Encrypted</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Lock" size={16} className="text-success" />
            <span className="text-xs text-text-secondary">PCI Compliant</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
          >
            Add Card
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewCardForm;