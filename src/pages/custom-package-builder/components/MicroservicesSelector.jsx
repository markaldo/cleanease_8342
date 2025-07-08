import React from 'react';
import { useTranslation } from '../../../constants/translations';
import { microservices, formatPrice } from '../../../constants/packageBuilder';

const MicroservicesSelector = ({ selectedMicroservices, onMicroservicesChange }) => {
  const { t } = useTranslation();

  const handleServiceToggle = (serviceId) => {
    const isSelected = selectedMicroservices.some(service => service.id === serviceId);
    if (isSelected) {
      onMicroservicesChange(selectedMicroservices.filter(service => service.id !== serviceId));
    } else {
      const serviceData = microservices.find(service => service.id === serviceId);
      onMicroservicesChange([...selectedMicroservices, serviceData]);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-semibold text-text-primary">
        {t('microservices')}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {microservices.map((service) => {
          const isSelected = selectedMicroservices.some(selected => selected.id === service.id);
          
          return (
            <div
              key={service.id}
              onClick={() => handleServiceToggle(service.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                isSelected
                  ? 'border-primary bg-primary-50 text-primary-700' :'border-border bg-surface hover:border-primary-200 text-text-primary'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{t(service.name)}</div>
                  <div className="text-lg font-bold mt-1">{formatPrice(service.price)}</div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleServiceToggle(service.id)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MicroservicesSelector;