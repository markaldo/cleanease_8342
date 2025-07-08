import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const NotificationSettingsSection = ({ isExpanded, onToggle, settings, onUpdateSettings }) => {
  const [formData, setFormData] = useState({
    email: {
      bookingConfirmations: settings.email?.bookingConfirmations ?? true,
      reminders: settings.email?.reminders ?? true,
      promotionalOffers: settings.email?.promotionalOffers ?? false,
      serviceUpdates: settings.email?.serviceUpdates ?? true,
      newsletters: settings.email?.newsletters ?? false
    },
    sms: {
      bookingConfirmations: settings.sms?.bookingConfirmations ?? true,
      reminders: settings.sms?.reminders ?? true,
      cleanerArrival: settings.sms?.cleanerArrival ?? true,
      emergencyAlerts: settings.sms?.emergencyAlerts ?? true
    },
    push: {
      bookingConfirmations: settings.push?.bookingConfirmations ?? true,
      reminders: settings.push?.reminders ?? true,
      cleanerArrival: settings.push?.cleanerArrival ?? true,
      promotionalOffers: settings.push?.promotionalOffers ?? false,
      serviceUpdates: settings.push?.serviceUpdates ?? true
    }
  });
  const [isSaving, setSaving] = useState(false);

  const notificationTypes = [
    {
      key: 'email',
      title: 'Email Notifications',
      icon: 'Mail',
      description: 'Receive notifications via email',
      options: [
        { key: 'bookingConfirmations', label: 'Booking Confirmations', description: 'Get confirmation when booking is successful' },
        { key: 'reminders', label: 'Service Reminders', description: 'Reminders before scheduled cleaning' },
        { key: 'promotionalOffers', label: 'Promotional Offers', description: 'Special deals and discounts' },
        { key: 'serviceUpdates', label: 'Service Updates', description: 'Updates about your ongoing services' },
        { key: 'newsletters', label: 'Newsletters', description: 'Monthly newsletters and tips' }
      ]
    },
    {
      key: 'sms',
      title: 'SMS Notifications',
      icon: 'MessageSquare',
      description: 'Receive notifications via text message',
      options: [
        { key: 'bookingConfirmations', label: 'Booking Confirmations', description: 'SMS confirmation for bookings' },
        { key: 'reminders', label: 'Service Reminders', description: 'Text reminders before cleaning' },
        { key: 'cleanerArrival', label: 'Cleaner Arrival', description: 'Notification when cleaner arrives' },
        { key: 'emergencyAlerts', label: 'Emergency Alerts', description: 'Important urgent notifications' }
      ]
    },
    {
      key: 'push',
      title: 'Push Notifications',
      icon: 'Bell',
      description: 'Receive notifications in the app',
      options: [
        { key: 'bookingConfirmations', label: 'Booking Confirmations', description: 'In-app booking confirmations' },
        { key: 'reminders', label: 'Service Reminders', description: 'Push reminders for upcoming services' },
        { key: 'cleanerArrival', label: 'Cleaner Arrival', description: 'Real-time arrival notifications' },
        { key: 'promotionalOffers', label: 'Promotional Offers', description: 'Special offers and deals' },
        { key: 'serviceUpdates', label: 'Service Updates', description: 'Live updates during cleaning' }
      ]
    }
  ];

  const handleToggle = (type, option) => {
    setFormData(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [option]: !prev[type][option]
      }
    }));
  };

  const handleSelectAll = (type, value) => {
    const typeOptions = notificationTypes.find(nt => nt.key === type)?.options || [];
    const updates = {};
    typeOptions.forEach(option => {
      updates[option.key] = value;
    });
    
    setFormData(prev => ({
      ...prev,
      [type]: { ...prev[type], ...updates }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdateSettings(formData);
    } catch (error) {
      console.error('Failed to update notification settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const getEnabledCount = (type) => {
    return Object.values(formData[type]).filter(Boolean).length;
  };

  const getTotalCount = (type) => {
    return Object.keys(formData[type]).length;
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation-2">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary-50 transition-smooth"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Bell" size={20} className="text-primary" />
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Notification Settings
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
          <div className="space-y-8">
            {notificationTypes.map((type) => (
              <div key={type.key} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name={type.icon} size={20} className="text-primary" />
                    <div>
                      <h3 className="font-medium text-text-primary">{type.title}</h3>
                      <p className="text-sm text-text-secondary">{type.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-text-secondary">
                      {getEnabledCount(type.key)}/{getTotalCount(type.key)} enabled
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSelectAll(type.key, true)}
                        className="text-xs"
                      >
                        All
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSelectAll(type.key, false)}
                        className="text-xs"
                      >
                        None
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 ml-8">
                  {type.options.map((option) => (
                    <div key={option.key} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                      <div className="flex items-center h-5">
                        <Input
                          type="checkbox"
                          checked={formData[type.key][option.key]}
                          onChange={() => handleToggle(type.key, option.key)}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-sm font-medium text-text-primary cursor-pointer">
                          {option.label}
                        </label>
                        <p className="text-xs text-text-secondary mt-1">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Quick Settings */}
            <div className="border-t border-border pt-6">
              <h3 className="font-medium text-text-primary mb-4">Quick Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    notificationTypes.forEach(type => {
                      handleSelectAll(type.key, true);
                    });
                  }}
                  className="justify-center"
                >
                  Enable All
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    notificationTypes.forEach(type => {
                      handleSelectAll(type.key, false);
                    });
                  }}
                  className="justify-center"
                >
                  Disable All
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    // Essential only: confirmations, reminders, emergency alerts
                    setFormData(prev => ({
                      email: { ...prev.email, bookingConfirmations: true, reminders: true, promotionalOffers: false, serviceUpdates: true, newsletters: false },
                      sms: { ...prev.sms, bookingConfirmations: true, reminders: true, cleanerArrival: true, emergencyAlerts: true },
                      push: { ...prev.push, bookingConfirmations: true, reminders: true, cleanerArrival: true, promotionalOffers: false, serviceUpdates: true }
                    }));
                  }}
                  className="justify-center"
                >
                  Essential Only
                </Button>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <Button
                variant="primary"
                iconName="Save"
                onClick={handleSave}
                loading={isSaving}
                disabled={isSaving}
                className="w-full sm:w-auto"
              >
                Save Notification Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSettingsSection;