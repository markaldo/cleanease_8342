import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ServicePreferencesSection = ({ isExpanded, onToggle, preferences, onUpdatePreferences }) => {
  const [formData, setFormData] = useState({
    defaultFrequency: preferences.defaultFrequency || 'weekly',
    preferredTimeSlots: preferences.preferredTimeSlots || [],
    specialInstructions: preferences.specialInstructions || '',
    cleanerGenderPreference: preferences.cleanerGenderPreference || 'no-preference',
    petFriendlyProducts: preferences.petFriendlyProducts || false,
    ecoFriendlyProducts: preferences.ecoFriendlyProducts || false,
    keyLocation: preferences.keyLocation || '',
    emergencyContact: preferences.emergencyContact || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setSaving] = useState(false);

  const frequencyOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'bi-weekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'one-time', label: 'One-time only' }
  ];

  const timeSlots = [
    { value: 'morning', label: 'Morning (8AM - 12PM)', icon: 'Sunrise' },
    { value: 'afternoon', label: 'Afternoon (12PM - 5PM)', icon: 'Sun' },
    { value: 'evening', label: 'Evening (5PM - 8PM)', icon: 'Sunset' }
  ];

  const genderOptions = [
    { value: 'no-preference', label: 'No Preference' },
    { value: 'female', label: 'Female Cleaner' },
    { value: 'male', label: 'Male Cleaner' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTimeSlotToggle = (timeSlot) => {
    setFormData(prev => ({
      ...prev,
      preferredTimeSlots: prev.preferredTimeSlots.includes(timeSlot)
        ? prev.preferredTimeSlots.filter(slot => slot !== timeSlot)
        : [...prev.preferredTimeSlots, timeSlot]
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdatePreferences(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update preferences:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      defaultFrequency: preferences.defaultFrequency || 'weekly',
      preferredTimeSlots: preferences.preferredTimeSlots || [],
      specialInstructions: preferences.specialInstructions || '',
      cleanerGenderPreference: preferences.cleanerGenderPreference || 'no-preference',
      petFriendlyProducts: preferences.petFriendlyProducts || false,
      ecoFriendlyProducts: preferences.ecoFriendlyProducts || false,
      keyLocation: preferences.keyLocation || '',
      emergencyContact: preferences.emergencyContact || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation-2">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary-50 transition-smooth"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Settings" size={20} className="text-primary" />
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Service Preferences
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
            {/* Default Frequency */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Default Cleaning Frequency
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {frequencyOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => isEditing && handleInputChange('defaultFrequency', option.value)}
                    disabled={!isEditing}
                    className={`p-3 border rounded-lg text-sm font-medium transition-smooth ${
                      formData.defaultFrequency === option.value
                        ? 'border-primary bg-primary-50 text-primary' :'border-border text-text-secondary hover:border-primary hover:text-primary'
                    } ${!isEditing ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Time Slots */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Preferred Time Slots
              </label>
              <div className="space-y-3">
                {timeSlots.map((slot) => (
                  <label
                    key={slot.value}
                    className={`flex items-center space-x-3 p-3 border rounded-lg transition-smooth ${
                      !isEditing ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-secondary-50'
                    }`}
                  >
                    <Input
                      type="checkbox"
                      checked={formData.preferredTimeSlots.includes(slot.value)}
                      onChange={() => isEditing && handleTimeSlotToggle(slot.value)}
                      disabled={!isEditing}
                    />
                    <Icon name={slot.icon} size={20} className="text-primary" />
                    <span className="text-sm text-text-primary">{slot.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cleaner Gender Preference */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Cleaner Gender Preference
              </label>
              <select
                value={formData.cleanerGenderPreference}
                onChange={(e) => handleInputChange('cleanerGenderPreference', e.target.value)}
                disabled={!isEditing}
                className="w-full border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-60"
              >
                {genderOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Preferences */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Product Preferences
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <Input
                    type="checkbox"
                    checked={formData.petFriendlyProducts}
                    onChange={(e) => handleInputChange('petFriendlyProducts', e.target.checked)}
                    disabled={!isEditing}
                  />
                  <Icon name="Heart" size={20} className="text-primary" />
                  <span className="text-sm text-text-primary">Use pet-friendly products</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <Input
                    type="checkbox"
                    checked={formData.ecoFriendlyProducts}
                    onChange={(e) => handleInputChange('ecoFriendlyProducts', e.target.checked)}
                    disabled={!isEditing}
                  />
                  <Icon name="Leaf" size={20} className="text-primary" />
                  <span className="text-sm text-text-primary">Use eco-friendly products</span>
                </label>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Special Instructions
              </label>
              <textarea
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                placeholder="Any special instructions for cleaners..."
                disabled={!isEditing}
                rows={4}
                className="w-full border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-60 resize-none"
              />
            </div>

            {/* Key Location */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Key Location (Optional)
              </label>
              <Input
                type="text"
                value={formData.keyLocation}
                onChange={(e) => handleInputChange('keyLocation', e.target.value)}
                placeholder="e.g., Under the doormat, with neighbor..."
                disabled={!isEditing}
              />
            </div>

            {/* Emergency Contact */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Emergency Contact (Optional)
              </label>
              <Input
                type="tel"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                placeholder="Emergency contact phone number"
                disabled={!isEditing}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              {!isEditing ? (
                <Button
                  variant="primary"
                  iconName="Edit"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Preferences
                </Button>
              ) : (
                <>
                  <Button
                    variant="primary"
                    iconName="Save"
                    onClick={handleSave}
                    loading={isSaving}
                    disabled={isSaving}
                  >
                    Save Preferences
                  </Button>
                  <Button
                    variant="ghost"
                    iconName="X"
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicePreferencesSection;