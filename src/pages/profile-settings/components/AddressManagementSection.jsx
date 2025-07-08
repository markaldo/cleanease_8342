import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AddressManagementSection = ({ isExpanded, onToggle, addresses, onUpdateAddresses }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    label: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    isDefault: false
  });
  const [errors, setErrors] = useState({});

  const addressTypes = [
    { value: 'home', label: 'Home', icon: 'Home' },
    { value: 'office', label: 'Office', icon: 'Building' },
    { value: 'other', label: 'Other', icon: 'MapPin' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.label.trim()) {
      newErrors.label = 'Address label is required';
    }
    if (!formData.street.trim()) {
      newErrors.street = 'Street address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    const newAddress = {
      id: editingId || Date.now().toString(),
      ...formData,
      coordinates: { lat: 40.7128, lng: -74.0060 } // Mock coordinates
    };
    
    if (editingId) {
      onUpdateAddresses(addresses.map(addr => 
        addr.id === editingId ? newAddress : addr
      ));
    } else {
      onUpdateAddresses([...addresses, newAddress]);
    }
    
    resetForm();
  };

  const handleEdit = (address) => {
    setFormData({
      label: address.label,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault
    });
    setEditingId(address.id);
    setIsAddingNew(true);
  };

  const handleDelete = (addressId) => {
    onUpdateAddresses(addresses.filter(addr => addr.id !== addressId));
  };

  const resetForm = () => {
    setFormData({
      label: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      isDefault: false
    });
    setErrors({});
    setIsAddingNew(false);
    setEditingId(null);
  };

  const getAddressIcon = (label) => {
    const type = addressTypes.find(t => t.value === label.toLowerCase());
    return type ? type.icon : 'MapPin';
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation-2">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary-50 transition-smooth"
      >
        <div className="flex items-center space-x-3">
          <Icon name="MapPin" size={20} className="text-primary" />
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Address Management
          </h2>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-text-secondary" 
        />
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border">
          <div className="space-y-6">
            {/* Existing Addresses */}
            <div className="space-y-4">
              {addresses.map((address) => (
                <div key={address.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Icon 
                        name={getAddressIcon(address.label)} 
                        size={20} 
                        className="text-primary mt-1" 
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-text-primary capitalize">
                            {address.label}
                          </h3>
                          {address.isDefault && (
                            <span className="px-2 py-1 bg-success-100 text-success text-xs rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-text-secondary mt-1">
                          {address.street}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        
                        {/* Map Preview */}
                        <div className="mt-3 h-32 bg-secondary-100 rounded-lg overflow-hidden">
                          <iframe
                            width="100%"
                            height="100%"
                            loading="lazy"
                            title={`${address.label} location`}
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps?q=${address.coordinates.lat},${address.coordinates.lng}&z=14&output=embed`}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Edit"
                        onClick={() => handleEdit(address)}
                        title="Edit address"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Trash2"
                        onClick={() => handleDelete(address.id)}
                        className="text-error hover:text-error"
                        title="Delete address"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Address Form */}
            {isAddingNew && (
              <div className="border border-border rounded-lg p-4 bg-secondary-50">
                <h3 className="font-medium text-text-primary mb-4">
                  {editingId ? 'Edit Address' : 'Add New Address'}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Address Label *
                    </label>
                    <select
                      value={formData.label}
                      onChange={(e) => handleInputChange('label', e.target.value)}
                      className="w-full border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select address type</option>
                      {addressTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.label && (
                      <p className="mt-1 text-sm text-error">{errors.label}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Street Address *
                    </label>
                    <Input
                      type="text"
                      value={formData.street}
                      onChange={(e) => handleInputChange('street', e.target.value)}
                      placeholder="Enter street address"
                      className={errors.street ? 'border-error' : ''}
                    />
                    {errors.street && (
                      <p className="mt-1 text-sm text-error">{errors.street}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        City *
                      </label>
                      <Input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="City"
                        className={errors.city ? 'border-error' : ''}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-error">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        State *
                      </label>
                      <Input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="State"
                        className={errors.state ? 'border-error' : ''}
                      />
                      {errors.state && (
                        <p className="mt-1 text-sm text-error">{errors.state}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        ZIP Code *
                      </label>
                      <Input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        placeholder="ZIP"
                        className={errors.zipCode ? 'border-error' : ''}
                      />
                      {errors.zipCode && (
                        <p className="mt-1 text-sm text-error">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Input
                      type="checkbox"
                      checked={formData.isDefault}
                      onChange={(e) => handleInputChange('isDefault', e.target.checked)}
                    />
                    <label className="text-sm text-text-primary">
                      Set as default address
                    </label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Button
                    variant="primary"
                    iconName="Save"
                    onClick={handleSave}
                  >
                    {editingId ? 'Update Address' : 'Save Address'}
                  </Button>
                  <Button
                    variant="ghost"
                    iconName="X"
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Add New Button */}
            {!isAddingNew && (
              <Button
                variant="outline"
                iconName="Plus"
                onClick={() => setIsAddingNew(true)}
                className="w-full"
              >
                Add New Address
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressManagementSection;