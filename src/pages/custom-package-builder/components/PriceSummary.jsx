import React from 'react';
import { useTranslation } from '../../../constants/translations';
import { formatPrice } from '../../../constants/packageBuilder';

const PriceSummary = ({ 
  selectedMicroservices = [], 
  selectedAdditionalServices = [], 
  discount = 0, 
  className = '' 
}) => {
  const { t } = useTranslation();

  const calculateTotal = () => {
    const microservicesTotal = selectedMicroservices?.reduce((sum, service) => sum + (service?.price || 0), 0) || 0;
    const additionalTotal = selectedAdditionalServices?.reduce((sum, service) => sum + (service?.price || 0), 0) || 0;
    return microservicesTotal + additionalTotal;
  };

  const totalPrice = calculateTotal();
  const discountAmount = totalPrice * (discount / 100);
  const finalPrice = totalPrice - discountAmount;

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 shadow-elevation-2 ${className}`}>
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        {t('orderSummary')}
      </h3>
      
      <div className="space-y-3">
        {/* Selected Services */}
        {selectedMicroservices?.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-text-secondary">{t('microservices')}</h4>
            {selectedMicroservices.map((service) => (
              <div key={service?.id} className="flex justify-between items-center text-sm">
                <span className="text-text-primary">{t(service?.name)}</span>
                <span className="text-text-primary font-medium">{formatPrice(service?.price || 0)}</span>
              </div>
            ))}
          </div>
        )}
        
        {selectedAdditionalServices?.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-text-secondary">{t('additionalServices')}</h4>
            {selectedAdditionalServices.map((service) => (
              <div key={service?.id} className="flex justify-between items-center text-sm">
                <span className="text-text-primary">{t(service?.name)}</span>
                <span className="text-text-primary font-medium">{formatPrice(service?.price || 0)}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Divider */}
        <div className="border-t border-border my-4"></div>
        
        {/* Pricing Summary */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">{t('totalPrice')}</span>
            <span className="text-text-primary font-medium">{formatPrice(totalPrice)}</span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">{t('discount')} ({discount}%)</span>
              <span className="text-secondary-600 font-medium">-{formatPrice(discountAmount)}</span>
            </div>
          )}
          
          <div className="border-t border-border pt-2">
            <div className="flex justify-between items-center">
              <span className="text-lg font-heading font-semibold text-text-primary">
                {t('priceToPay')}
              </span>
              <span className="text-lg font-heading font-bold text-primary">
                {formatPrice(finalPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;