import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const HeaderActions = ({ 
  actions = [], 
  maxVisible = 3,
  className = '' 
}) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getDefaultActions = () => {
    switch (location.pathname) {
      case '/customer-dashboard':
        return [
          { 
            icon: 'Search', 
            label: 'Search', 
            onClick: () => console.log('Search'),
            variant: 'ghost'
          },
          { 
            icon: 'Calendar', 
            label: 'Quick Book', 
            onClick: () => console.log('Quick book'),
            variant: 'primary'
          }
        ];
      case '/service-booking-flow':
        return [
          { 
            icon: 'Save', 
            label: 'Save Draft', 
            onClick: () => console.log('Save draft'),
            variant: 'ghost'
          },
          { 
            icon: 'HelpCircle', 
            label: 'Help', 
            onClick: () => console.log('Help'),
            variant: 'ghost'
          }
        ];
      case '/order-management':
        return [
          { 
            icon: 'Search', 
            label: 'Search Orders', 
            onClick: () => console.log('Search orders'),
            variant: 'ghost'
          },
          { 
            icon: 'Filter', 
            label: 'Filter', 
            onClick: () => console.log('Filter'),
            variant: 'ghost'
          },
          { 
            icon: 'Download', 
            label: 'Export', 
            onClick: () => console.log('Export'),
            variant: 'ghost'
          }
        ];
      case '/payment-billing':
        return [
          { 
            icon: 'CreditCard', 
            label: 'Add Payment Method', 
            onClick: () => console.log('Add payment'),
            variant: 'primary'
          },
          { 
            icon: 'Download', 
            label: 'Download Invoice', 
            onClick: () => console.log('Download invoice'),
            variant: 'ghost'
          }
        ];
      case '/profile-settings':
        return [
          { 
            icon: 'Edit', 
            label: 'Edit Profile', 
            onClick: () => console.log('Edit profile'),
            variant: 'ghost'
          },
          { 
            icon: 'Shield', 
            label: 'Security', 
            onClick: () => console.log('Security'),
            variant: 'ghost'
          }
        ];
      default:
        return [];
    }
  };

  const allActions = actions.length > 0 ? actions : getDefaultActions();
  const visibleActions = allActions.slice(0, maxVisible);
  const hiddenActions = allActions.slice(maxVisible);

  if (allActions.length === 0) {
    return null;
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Visible Actions */}
      {visibleActions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || 'ghost'}
          size="sm"
          iconName={action.icon}
          onClick={action.onClick}
          className={action.className}
          title={action.label}
        >
          <span className="hidden lg:inline">{action.label}</span>
        </Button>
      ))}

      {/* More Actions Menu */}
      {hiddenActions.length > 0 && (
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreVertical"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title="More actions"
          />

          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-elevation-3 z-20 animate-slide-down">
                <div className="py-2">
                  {hiddenActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        action.onClick();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-left text-text-primary hover:bg-secondary-50 transition-smooth"
                    >
                      <Icon name={action.icon} size={16} />
                      <span className="text-sm">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderActions;