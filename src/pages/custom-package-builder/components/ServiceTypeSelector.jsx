import React from 'react';
import { useTranslation } from '../../../constants/translations';
import { serviceTypes } from '../../../constants/packageBuilder';

const ServiceTypeSelector = ({ selectedServiceType, onServiceTypeChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-semibold text-text-primary">
        {t('serviceType')}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {serviceTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onServiceTypeChange(type.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedServiceType === type.id
                ? 'border-primary bg-primary-50 text-primary-700' :'border-border bg-surface hover:border-primary-200 text-text-primary'
            }`}
          >
            <div className="text-center">
              <div className="text-base font-medium">{t(type.name)}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceTypeSelector;