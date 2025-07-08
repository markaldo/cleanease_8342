import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsCard = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary' }) => {
  const getColorClasses = (colorName) => {
    const colors = {
      primary: {
        bg: 'bg-primary-50',
        icon: 'text-primary-600',
        text: 'text-primary-600'
      },
      success: {
        bg: 'bg-success-50',
        icon: 'text-success-600',
        text: 'text-success-600'
      },
      warning: {
        bg: 'bg-warning-50',
        icon: 'text-warning-600',
        text: 'text-warning-600'
      },
      secondary: {
        bg: 'bg-secondary-50',
        icon: 'text-secondary-600',
        text: 'text-secondary-600'
      }
    };
    return colors[colorName] || colors.primary;
  };

  const colorClasses = getColorClasses(color);

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success-600';
    if (trend === 'down') return 'text-error-600';
    return 'text-text-secondary';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`w-10 h-10 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
              <Icon name={icon} size={20} className={colorClasses.icon} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl font-bold text-text-primary">{value}</p>
            {subtitle && (
              <p className="text-sm text-text-secondary">{subtitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* Trend Indicator */}
      {trend && trendValue && (
        <div className="flex items-center space-x-1 mt-3 pt-3 border-t border-border">
          <Icon name={getTrendIcon()} size={14} className={getTrendColor()} />
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {trendValue}
          </span>
          <span className="text-sm text-text-secondary">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default QuickStatsCard;