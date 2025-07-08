import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [orderBadgeCount, setOrderBadgeCount] = useState(2);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/customer-dashboard',
      icon: 'Home',
      description: 'Overview and quick actions'
    },
    {
      label: 'Book Service',
      path: '/service-booking-flow',
      icon: 'Calendar',
      description: 'Schedule new cleaning'
    },
    {
      label: 'My Orders',
      path: '/order-management',
      icon: 'ClipboardList',
      description: 'Track and manage bookings',
      badge: orderBadgeCount
    },
    {
      label: 'Profile & Settings',
      path: '/profile-settings',
      icon: 'User',
      description: 'Account and preferences'
    },
    {
      label: 'Payment & Billing',
      path: '/payment-billing',
      icon: 'CreditCard',
      description: 'Payment methods and history'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Hide sidebar on login/registration page and mobile
  if (location.pathname === '/login-registration') {
    return null;
  }

  return (
    <aside className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-100 lg:flex-col ${
      isCollapsed ? 'lg:w-20' : 'lg:w-80'
    } bg-surface border-r border-border shadow-elevation-2 transition-all duration-300`}>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
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
            <h1 className="text-lg font-heading font-semibold text-text-primary">
              CleanEase
            </h1>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          iconName={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-text-secondary hover:text-text-primary"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => {
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-smooth group ${
                active
                  ? 'bg-primary-50 text-primary-600 border border-primary-100' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <div className="relative flex-shrink-0">
                <Icon
                  name={item.icon}
                  size={20}
                  className={active ? 'text-primary-600' : 'text-current'}
                />
                
                {/* Badge */}
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className={`font-medium ${
                    active ? 'text-primary-600' : 'text-current'
                  }`}>
                    {item.label}
                  </div>
                  <div className="text-xs text-text-muted mt-0.5 truncate">
                    {item.description}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="px-4 py-4 border-t border-border space-y-2">
        <Button
          variant="ghost"
          size="sm"
          iconName="HelpCircle"
          onClick={() => console.log('Help')}
          className={`w-full justify-start text-text-secondary hover:text-text-primary ${
            isCollapsed ? 'px-3' : ''
          }`}
          title="Help & Support"
        >
          {!isCollapsed && 'Help & Support'}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="Settings"
          onClick={() => navigate('/profile-settings')}
          className={`w-full justify-start text-text-secondary hover:text-text-primary ${
            isCollapsed ? 'px-3' : ''
          }`}
          title="Settings"
        >
          {!isCollapsed && 'Settings'}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="LogOut"
          onClick={() => navigate('/login-registration')}
          className={`w-full justify-start text-error hover:text-error ${
            isCollapsed ? 'px-3' : ''
          }`}
          title="Sign Out"
        >
          {!isCollapsed && 'Sign Out'}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;