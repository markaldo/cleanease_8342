import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useTranslation } from '../../constants/translations';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, currentLanguage, changeLanguage } = useTranslation();
  const [notifications, setNotifications] = useState(3);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (language) => {
    changeLanguage(language);
    setIsMenuOpen(false);
  };

  const getPageTitle = () => {
    const titles = {
      '/customer-dashboard': t('dashboard'),
      '/service-booking-flow': t('bookService'),
      '/order-management': t('myOrders'),
      '/payment-billing': t('paymentBilling'),
      '/profile-settings': t('profileSettings'),
      '/custom-package-builder': t('customPackageBuilder'),
      '/login-registration': 'Welcome'
    };
    return titles[location.pathname] || t('appName');
  };

  const getContextualActions = () => {
    switch (location.pathname) {
      case '/customer-dashboard':
        return [
          { icon: 'Search', label: 'Search', onClick: () => console.log('Search') },
          { icon: 'Calendar', label: 'Schedule', onClick: () => navigate('/service-booking-flow') }
        ];
      case '/order-management':
        return [
          { icon: 'Search', label: 'Search Orders', onClick: () => console.log('Search orders') },
          { icon: 'Filter', label: 'Filter', onClick: () => console.log('Filter') }
        ];
      case '/profile-settings':
        return [
          { icon: 'Edit', label: 'Edit Profile', onClick: () => console.log('Edit profile') }
        ];
      case '/payment-billing':
        return [
          { icon: 'CreditCard', label: 'Add Payment', onClick: () => console.log('Add payment') }
        ];
      default:
        return [];
    }
  };

  const contextualActions = getContextualActions();

  return (
    <header className="sticky top-0 z-100 bg-surface border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary-foreground"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-heading font-semibold text-text-primary">
                {t('appName')}
              </h1>
            </div>
          </div>
          
          {/* Page Title - Mobile */}
          <div className="sm:hidden">
            <h2 className="text-base font-heading font-medium text-text-primary">
              {getPageTitle()}
            </h2>
          </div>
        </div>

        {/* Desktop Page Title */}
        <div className="hidden sm:block flex-1 text-center">
          <h2 className="text-xl font-heading font-medium text-text-primary">
            {getPageTitle()}
          </h2>
        </div>

        {/* Actions and Menu */}
        <div className="flex items-center space-x-2">
          {/* Contextual Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {contextualActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={action.onClick}
                iconName={action.icon}
                className="text-text-secondary hover:text-text-primary"
                title={action.label}
              />
            ))}
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="Bell"
              className="text-text-secondary hover:text-text-primary"
              onClick={() => console.log('Notifications')}
            />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center">
                {notifications > 9 ? '9+' : notifications}
              </span>
            )}
          </div>

          {/* Help */}
          <Button
            variant="ghost"
            size="sm"
            iconName="HelpCircle"
            className="text-text-secondary hover:text-text-primary"
            onClick={() => console.log('Help')}
            title="Help & Support"
          />

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              iconName="Menu"
              className="text-text-secondary hover:text-text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>

          {/* Language Selector - Desktop */}
          <div className="hidden md:block relative">
            <select
              value={currentLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="appearance-none bg-transparent border border-border rounded-md px-3 py-1 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="en">EN</option>
              <option value="pl">PL</option>
            </select>
          </div>

          {/* User Menu */}
          <Button
            variant="ghost"
            size="sm"
            iconName="User"
            className="text-text-secondary hover:text-text-primary"
            onClick={() => navigate('/profile-settings')}
            title="Profile"
          />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border shadow-elevation-2 animate-slide-down">
          <div className="px-4 py-3 space-y-3">
            {/* Contextual Actions - Mobile */}
            {contextualActions.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-text-secondary">Actions</h3>
                {contextualActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      action.onClick();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full px-3 py-2 text-left text-text-primary hover:bg-secondary-50 rounded-md transition-smooth"
                  >
                    <Icon name={action.icon} size={18} />
                    <span className="text-sm">{action.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Language Selector - Mobile */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-text-secondary">Language</h3>
              <div className="space-y-1">
                {[
                  { code: 'en', name: 'English' },
                  { code: 'pl', name: 'Polski' }
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`flex items-center justify-between w-full px-3 py-2 text-left rounded-md transition-smooth ${
                      currentLanguage === lang.code
                        ? 'bg-primary-50 text-primary-600' :'text-text-primary hover:bg-secondary-50'
                    }`}
                  >
                    <span className="text-sm">{lang.name}</span>
                    {currentLanguage === lang.code && (
                      <Icon name="Check" size={16} className="text-primary-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;