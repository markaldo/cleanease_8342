import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import BottomNavigation from '../../components/ui/BottomNavigation';
import PersonalInfoSection from './components/PersonalInfoSection';
import AddressManagementSection from './components/AddressManagementSection';
import ServicePreferencesSection from './components/ServicePreferencesSection';
import NotificationSettingsSection from './components/NotificationSettingsSection';
import SecuritySection from './components/SecuritySection';
import Icon from '../../components/AppIcon';

const ProfileSettings = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [expandedSections, setExpandedSections] = useState({
    personalInfo: true,
    addresses: false,
    preferences: false,
    notifications: false,
    security: false
  });

  // Mock user data
  const [userProfile, setUserProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  });

  const [addresses, setAddresses] = useState([
    {
      id: "1",
      label: "home",
      street: "123 Maple Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      isDefault: true,
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: "2",
      label: "office",
      street: "456 Business Ave, Suite 200",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      isDefault: false,
      coordinates: { lat: 40.7589, lng: -73.9851 }
    }
  ]);

  const [servicePreferences, setServicePreferences] = useState({
    defaultFrequency: "weekly",
    preferredTimeSlots: ["morning", "afternoon"],
    specialInstructions: "Please use eco-friendly products and be gentle with antique furniture in the living room.",
    cleanerGenderPreference: "no-preference",
    petFriendlyProducts: true,
    ecoFriendlyProducts: true,
    keyLocation: "Under the blue flower pot by the front door",
    emergencyContact: "+1 (555) 987-6543"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      bookingConfirmations: true,
      reminders: true,
      promotionalOffers: false,
      serviceUpdates: true,
      newsletters: false
    },
    sms: {
      bookingConfirmations: true,
      reminders: true,
      cleanerArrival: true,
      emergencyAlerts: true
    },
    push: {
      bookingConfirmations: true,
      reminders: true,
      cleanerArrival: true,
      promotionalOffers: false,
      serviceUpdates: true
    }
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    lastPasswordChange: "2024-01-15T10:30:00Z"
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleSectionToggle = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleUpdateProfile = (updatedProfile) => {
    setUserProfile(prev => ({ ...prev, ...updatedProfile }));
    // Show success message
    console.log('Profile updated successfully');
  };

  const handleUpdateAddresses = (updatedAddresses) => {
    setAddresses(updatedAddresses);
    console.log('Addresses updated successfully');
  };

  const handleUpdatePreferences = (updatedPreferences) => {
    setServicePreferences(updatedPreferences);
    console.log('Preferences updated successfully');
  };

  const handleUpdateNotifications = (updatedSettings) => {
    setNotificationSettings(updatedSettings);
    console.log('Notification settings updated successfully');
  };

  const handleUpdateSecurity = (updatedSecurity) => {
    setSecuritySettings(updatedSecurity);
    console.log('Security settings updated successfully');
  };

  const sections = [
    {
      key: 'personalInfo',
      component: PersonalInfoSection,
      props: {
        userProfile,
        onUpdateProfile: handleUpdateProfile
      }
    },
    {
      key: 'addresses',
      component: AddressManagementSection,
      props: {
        addresses,
        onUpdateAddresses: handleUpdateAddresses
      }
    },
    {
      key: 'preferences',
      component: ServicePreferencesSection,
      props: {
        preferences: servicePreferences,
        onUpdatePreferences: handleUpdatePreferences
      }
    },
    {
      key: 'notifications',
      component: NotificationSettingsSection,
      props: {
        settings: notificationSettings,
        onUpdateSettings: handleUpdateNotifications
      }
    },
    {
      key: 'security',
      component: SecuritySection,
      props: {
        securitySettings,
        onUpdateSecurity: handleUpdateSecurity
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-80 pb-20 lg:pb-8">
        <div className="max-w-4xl mx-auto px-4 py-6 lg:px-6 lg:py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="User" size={24} className="text-primary" />
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                Profile & Settings
              </h1>
            </div>
            <p className="text-text-secondary">
              Manage your personal information, preferences, and account security
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <Icon name="MapPin" size={20} className="text-primary mx-auto mb-2" />
              <div className="text-lg font-semibold text-text-primary">{addresses.length}</div>
              <div className="text-sm text-text-secondary">Saved Addresses</div>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <Icon name="Bell" size={20} className="text-primary mx-auto mb-2" />
              <div className="text-lg font-semibold text-text-primary">
                {Object.values(notificationSettings.email).filter(Boolean).length}
              </div>
              <div className="text-sm text-text-secondary">Email Alerts</div>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <Icon name="Shield" size={20} className="text-primary mx-auto mb-2" />
              <div className="text-lg font-semibold text-text-primary">
                {securitySettings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </div>
              <div className="text-sm text-text-secondary">2FA Status</div>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <Icon name="Calendar" size={20} className="text-primary mx-auto mb-2" />
              <div className="text-lg font-semibold text-text-primary capitalize">
                {servicePreferences.defaultFrequency}
              </div>
              <div className="text-sm text-text-secondary">Default Frequency</div>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {sections.map((section) => {
              const Component = section.component;
              return (
                <Component
                  key={section.key}
                  isExpanded={expandedSections[section.key]}
                  onToggle={() => handleSectionToggle(section.key)}
                  {...section.props}
                />
              );
            })}
          </div>

          {/* Help Section */}
          <div className="mt-12 bg-primary-50 border border-primary-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <Icon name="HelpCircle" size={24} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-text-primary mb-2">Need Help?</h3>
                <p className="text-sm text-text-secondary mb-4">
                  If you have any questions about your account settings or need assistance, 
                  our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-700 transition-smooth">
                    <Icon name="MessageCircle" size={16} />
                    <span className="text-sm">Live Chat</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary-50 transition-smooth">
                    <Icon name="Mail" size={16} />
                    <span className="text-sm">Email Support</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary-50 transition-smooth">
                    <Icon name="Phone" size={16} />
                    <span className="text-sm">Call Us</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default ProfileSettings;