import React from 'react';
import { useTranslation } from '../../../constants/translations';
import { Plus, Minus } from 'lucide-react';

const CategorySelector = ({ roomCount, bathroomCount, onRoomCountChange, onBathroomCountChange }) => {
  const { t } = useTranslation();

  const Counter = ({ label, count, onIncrement, onDecrement }) => (
    <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
      <span className="text-base font-medium text-text-primary">{label}</span>
      <div className="flex items-center space-x-3">
        <button
          onClick={onDecrement}
          disabled={count <= 0}
          className="w-10 h-10 rounded-full border border-border bg-surface hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        >
          <Minus size={16} className="text-text-primary" />
        </button>
        <span className="text-lg font-semibold text-text-primary min-w-[2rem] text-center">
          {count}
        </span>
        <button
          onClick={onIncrement}
          className="w-10 h-10 rounded-full border border-primary bg-primary-50 hover:bg-primary-100 text-primary flex items-center justify-center transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-semibold text-text-primary">
        {t('category')}
      </h3>
      
      <div className="space-y-3">
        <Counter
          label={t('rooms')}
          count={roomCount}
          onIncrement={() => onRoomCountChange(roomCount + 1)}
          onDecrement={() => onRoomCountChange(Math.max(0, roomCount - 1))}
        />
        
        <Counter
          label={t('bathrooms')}
          count={bathroomCount}
          onIncrement={() => onBathroomCountChange(bathroomCount + 1)}
          onDecrement={() => onBathroomCountChange(Math.max(0, bathroomCount - 1))}
        />
      </div>
    </div>
  );
};

export default CategorySelector;