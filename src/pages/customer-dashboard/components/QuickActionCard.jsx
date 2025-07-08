import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, buttonText, onClick, color = 'primary' }) => {
  const getColorClasses = (colorName) => {
    const colors = {
      primary: {
        bg: 'bg-primary-50',
        icon: 'text-primary-600',
        button: 'primary'
      },
      success: {
        bg: 'bg-success-50',
        icon: 'text-success-600',
        button: 'success'
      },
      warning: {
        bg: 'bg-warning-50',
        icon: 'text-warning-600',
        button: 'warning'
      },
      secondary: {
        bg: 'bg-secondary-50',
        icon: 'text-secondary-600',
        button: 'secondary'
      }
    };
    return colors[colorName] || colors.primary;
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`w-16 h-16 ${colorClasses.bg} rounded-full flex items-center justify-center`}>
          <Icon name={icon} size={32} className={colorClasses.icon} />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          <p className="text-sm text-text-secondary">{description}</p>
        </div>
        
        <Button
          variant={colorClasses.button}
          size="md"
          onClick={onClick}
          className="w-full"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default QuickActionCard;