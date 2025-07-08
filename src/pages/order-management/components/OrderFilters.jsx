import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderFilters = ({ 
  activeTab, 
  onTabChange, 
  searchQuery, 
  onSearchChange, 
  dateRange, 
  onDateRangeChange,
  onRefresh,
  isRefreshing = false
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: 3 },
    { id: 'in-progress', label: 'In Progress', count: 1 },
    { id: 'completed', label: 'Completed', count: 12 },
    { id: 'cancelled', label: 'Cancelled', count: 2 }
  ];

  const quickDateRanges = [
    { label: 'Last 7 days', value: 7 },
    { label: 'Last 30 days', value: 30 },
    { label: 'Last 3 months', value: 90 },
    { label: 'All time', value: null }
  ];

  const handleQuickDateRange = (days) => {
    if (days === null) {
      onDateRangeChange({ start: '', end: '' });
    } else {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - days);
      
      onDateRangeChange({
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0]
      });
    }
    setShowFilters(false);
  };

  return (
    <div className="bg-surface border-b border-border">
      {/* Search and Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
            />
            <Input
              type="search"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>

          {/* Filter Button */}
          <Button
            variant="outline"
            size="sm"
            iconName="Filter"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? 'bg-primary-50 border-primary-200' : ''}
          />

          {/* Refresh Button */}
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            onClick={onRefresh}
            disabled={isRefreshing}
            className={isRefreshing ? 'animate-spin' : ''}
            title="Refresh orders"
          />
        </div>
      </div>

      {/* Status Tabs */}
      <div className="px-4">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-secondary-100 text-text-muted'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="px-4 py-4 border-t border-border bg-secondary-50">
          <div className="space-y-4">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <Input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
                  placeholder="Start date"
                />
                <Input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
                  placeholder="End date"
                />
              </div>
              
              {/* Quick Date Range Buttons */}
              <div className="flex flex-wrap gap-2">
                {quickDateRanges.map((range) => (
                  <Button
                    key={range.label}
                    variant="outline"
                    size="xs"
                    onClick={() => handleQuickDateRange(range.value)}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between items-center pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onDateRangeChange({ start: '', end: '' });
                  onSearchChange('');
                }}
              >
                Clear Filters
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderFilters;