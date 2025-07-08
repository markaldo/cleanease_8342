import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BillingAddressSelector = ({ 
  selectedAddress, 
  onAddressSelect, 
  savedAddresses = [],
  className = '' 
}) => {
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [errors, setErrors] = useState({});

  const validateAddress = () => {
    const newErrors = {};
    
    if (!newAddress.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!newAddress.street.trim()) {
      newErrors.street = 'Street address is required';
    }
    if (!newAddress.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!newAddress.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!newAddress.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddNewAddress = () => {
    if (validateAddress()) {
      const addressWithId = {
        ...newAddress,
        id: Date.now().toString(),
        isDefault: savedAddresses.length === 0
      };
      onAddressSelect(addressWithId);
      setNewAddress({
        name: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
      });
      setShowNewAddressForm(false);
    }
  };

  const handleInputChange = (field, value) => {
    setNewAddress(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-heading font-semibold text-text-primary">
        Billing Address
      </h3>

      {/* Saved Addresses */}
      {savedAddresses.length > 0 && (
        <div className="space-y-3">
          {savedAddresses.map((address) => (
            <button
              key={address.id}
              onClick={() => onAddressSelect(address.id)}
              className={`w-full p-4 border rounded-lg text-left transition-smooth ${
                selectedAddress === address.id
                  ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-text-primary mb-1">
                    {address.name}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {address.street}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {address.city}, {address.state} {address.zipCode}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {address.country}
                  </div>
                </div>
                {address.isDefault && (
                  <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded">
                    Default
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Add New Address Button */}
      {!showNewAddressForm && (
        <Button
          variant="outline"
          onClick={() => setShowNewAddressForm(true)}
          iconName="Plus"
          className="w-full"
        >
          Add New Address
        </Button>
      )}

      {/* New Address Form */}
      {showNewAddressForm && (
        <div className="bg-secondary-50 border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-text-primary">Add New Address</h4>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => setShowNewAddressForm(false)}
              className="text-text-secondary hover:text-text-primary"
            />
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="John Doe"
                value={newAddress.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-error' : ''}
              />
              {errors.name && (
                <p className="text-sm text-error mt-1">{errors.name}</p>
              )}
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Street Address
              </label>
              <Input
                type="text"
                placeholder="123 Main Street"
                value={newAddress.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                className={errors.street ? 'border-error' : ''}
              />
              {errors.street && (
                <p className="text-sm text-error mt-1">{errors.street}</p>
              )}
            </div>

            {/* City, State, ZIP */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  City
                </label>
                <Input
                  type="text"
                  placeholder="New York"
                  value={newAddress.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={errors.city ? 'border-error' : ''}
                />
                {errors.city && (
                  <p className="text-sm text-error mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  State
                </label>
                <Input
                  type="text"
                  placeholder="NY"
                  value={newAddress.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className={errors.state ? 'border-error' : ''}
                />
                {errors.state && (
                  <p className="text-sm text-error mt-1">{errors.state}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  ZIP Code
                </label>
                <Input
                  type="text"
                  placeholder="10001"
                  value={newAddress.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className={errors.zipCode ? 'border-error' : ''}
                />
                {errors.zipCode && (
                  <p className="text-sm text-error mt-1">{errors.zipCode}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Country
                </label>
                <select
                  value={newAddress.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowNewAddressForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleAddNewAddress}
                className="flex-1"
              >
                Add Address
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingAddressSelector;