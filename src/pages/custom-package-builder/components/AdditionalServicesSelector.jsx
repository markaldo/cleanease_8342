import React from 'react';
import { useTranslation } from '../../../constants/translations';
import { additionalServices, formatPrice } from '../../../constants/packageBuilder';

const AdditionalServicesSelector = ({ selectedAdditionalServices, onAdditionalServicesChange }) => {
  const { t } = useTranslation();

  const handleServiceToggle = (serviceId) => {
    const isSelected = selectedAdditionalServices.some(service => service.id === serviceId);
    if (isSelected) {
      onAdditionalServicesChange(selectedAdditionalServices.filter(service => service.id !== serviceId));
    } else {
      const serviceData = additionalServices.find(service => service.id === serviceId);
      onAdditionalServicesChange([...selectedAdditionalServices, serviceData]);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-semibold text-text-primary">
        {t('additionalServices')}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {additionalServices.map((service) => {
          const isSelected = selectedAdditionalServices.some(selected => selected.id === service.id);
          
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
                  <div className="font-medium">{t(service.name)}</div>
                  <div className="text-lg font-bold text-primary mt-1">{formatPrice(service.price)}</div>
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

export default AdditionalServicesSelector;