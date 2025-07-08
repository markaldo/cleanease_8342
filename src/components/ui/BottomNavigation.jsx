import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderBadgeCount, setOrderBadgeCount] = useState(2);

  const navigationItems = [
    {
      label: 'Home',
      path: '/customer-dashboard',
      icon: 'Home',
      activeIcon: 'Home'
    },
    {
      label: 'Book',
      path: '/service-booking-flow',
      icon: 'Calendar',
      activeIcon: 'Calendar'
    },
    {
      label: 'Orders',
      path: '/order-management',
      icon: 'ClipboardList',
      activeIcon: 'ClipboardList',
      badge: orderBadgeCount
    },
    {
      label: 'Profile',
      path: '/profile-settings',
      icon: 'User',
      activeIcon: 'User'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === '/profile-settings') {
      return location.pathname === '/profile-settings' || location.pathname === '/payment-billing';
    }
    return location.pathname === path;
  };

  // Hide bottom navigation on login/registration page
  if (location.pathname === '/login-registration') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-100 bg-surface border-t border-border shadow-elevation-3 lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navigationItems.map((item) => {
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-smooth ${
                active
                  ? 'text-primary-600' :'text-text-secondary hover:text-text-primary'
              }`}
              aria-label={item.label}
            >
              <div className="relative">
                <Icon
                  name={active ? item.activeIcon : item.icon}
                  size={24}
                  className={active ? 'text-primary-600' : 'text-current'}
                />
                
                {/* Badge */}
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              
              <span
                className={`text-xs font-medium ${
                  active ? 'text-primary-600' : 'text-current'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;