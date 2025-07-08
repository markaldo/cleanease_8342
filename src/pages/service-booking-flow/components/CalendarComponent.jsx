import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const CalendarComponent = ({ 
  selectedDate, 
  onDateSelect, 
  availableDates = [],
  className = '' 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isDateAvailable = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return false;
    
    const dateString = date.toISOString().split('T')[0];
    return availableDates.includes(dateString);
  };

  const isDateSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      navigateMonth(1);
    }
    if (isRightSwipe) {
      navigateMonth(-1);
    }
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className={`bg-surface border border-border rounded-lg p-4 ${className}`}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          iconName="ChevronLeft"
          onClick={() => navigateMonth(-1)}
          className="text-text-secondary hover:text-text-primary"
        />
        
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="ChevronRight"
          onClick={() => navigateMonth(1)}
          className="text-text-secondary hover:text-text-primary"
        />
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-xs font-medium text-text-secondary"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div
        className="grid grid-cols-7 gap-1"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {days.map((date, index) => {
          if (!date) {
            return <div key={index} className="h-10" />;
          }

          const isAvailable = isDateAvailable(date);
          const isSelected = isDateSelected(date);
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <button
              key={index}
              onClick={() => isAvailable && onDateSelect(date)}
              disabled={!isAvailable}
              className={`
                h-10 w-full rounded-md text-sm font-medium transition-smooth
                ${isSelected
                  ? 'bg-primary text-primary-foreground'
                  : isAvailable
                  ? 'bg-transparent text-text-primary hover:bg-primary-50 hover:text-primary-600' :'bg-transparent text-text-muted cursor-not-allowed'
                }
                ${isToday && !isSelected ? 'ring-2 ring-primary-200' : ''}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-text-secondary">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-secondary-200 rounded-full"></div>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;