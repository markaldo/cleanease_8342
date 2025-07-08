import React from 'react';
import { useTranslation } from '../../../constants/translations';
import { frequencyOptions } from '../../../constants/packageBuilder';
import { Plus, Minus } from 'lucide-react';

const FrequencySelector = ({ 
  visitCount, 
  frequencyType, 
  selectedDate, 
  selectedTime, 
  onVisitCountChange, 
  onFrequencyTypeChange,
  onDateChange,
  onTimeChange 
}) => {
  const { t } = useTranslation();

  const Counter = ({ label, count, onIncrement, onDecrement }) => (
    <div className="flex items-center justify-between p-3 bg-surface border border-border rounded-lg">
      <span className="text-sm font-medium text-text-primary">{label}</span>
      <div className="flex items-center space-x-2">
        <button
          onClick={onDecrement}
          disabled={count <= 1}
          className="w-8 h-8 rounded-full border border-border bg-surface hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        >
          <Minus size={14} className="text-text-primary" />
        </button>
        <span className="text-base font-semibold text-text-primary min-w-[2rem] text-center">
          {count}
        </span>
        <button
          onClick={onIncrement}
          className="w-8 h-8 rounded-full border border-primary bg-primary-50 hover:bg-primary-100 text-primary flex items-center justify-center transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-semibold text-text-primary">
        {t('frequency')}
      </h3>
      
      <div className="space-y-4">
        {/* Visit Count */}
        <Counter
          label={t('numberOfVisits')}
          count={visitCount}
          onIncrement={() => onVisitCountChange(visitCount + 1)}
          onDecrement={() => onVisitCountChange(Math.max(1, visitCount - 1))}
        />
        
        {/* Frequency Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Frequency Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {frequencyOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onFrequencyTypeChange(option.id)}
                className={`p-3 rounded-lg border transition-all ${
                  frequencyType === option.id
                    ? 'border-primary bg-primary-50 text-primary-700' :'border-border bg-surface hover:border-primary-200 text-text-primary'
                }`}
              >
                <div className="text-sm font-medium">{t(option.name)}</div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t('dateAndTime')}
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => onTimeChange(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequencySelector;