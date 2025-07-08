import React from 'react';
import { useTranslation } from '../../../constants/translations';
import { accessMethods } from '../../../constants/packageBuilder';

const AddressForm = ({ 
  addressData, 
  onAddressChange, 
  accessMethod, 
  onAccessMethodChange,
  accessCodes,
  onAccessCodesChange 
}) => {
  const { t } = useTranslation();

  const handleInputChange = (field, value) => {
    onAddressChange({
      ...addressData,
      [field]: value
    });
  };

  const handleAccessCodeChange = (field, value) => {
    onAccessCodesChange({
      ...accessCodes,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-semibold text-text-primary">
        {t('address')}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t('cityName')}
          </label>
          <input
            type="text"
            value={addressData?.city || ''}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder={t('enterCityName')}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t('streetName')}
          </label>
          <input
            type="text"
            value={addressData?.street || ''}
            onChange={(e) => handleInputChange('street', e.target.value)}
            placeholder={t('enterStreetName')}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t('building')}
          </label>
          <input
            type="text"
            value={addressData?.building || ''}
            onChange={(e) => handleInputChange('building', e.target.value)}
            placeholder={t('enterBuilding')}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t('apartment')}
          </label>
          <input
            type="text"
            value={addressData?.apartment || ''}
            onChange={(e) => handleInputChange('apartment', e.target.value)}
            placeholder={t('enterApartment')}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t('postalCode')}
          </label>
          <input
            type="text"
            value={addressData?.postalCode || ''}
            onChange={(e) => handleInputChange('postalCode', e.target.value)}
            placeholder={t('enterPostalCode')}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
      
      {/* Access Method */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-primary">
          {t('howCanWeEnterHome')}
        </label>
        
        <div className="space-y-2">
          {accessMethods.map((method) => (
            <div key={method.id} className="flex items-center space-x-2">
              <input
                type="radio"
                id={method.id}
                name="accessMethod"
                value={method.id}
                checked={accessMethod === method.id}
                onChange={(e) => onAccessMethodChange(e.target.value)}
                className="w-4 h-4 text-primary border-border focus:ring-primary-500"
              />
              <label htmlFor={method.id} className="text-sm text-text-primary">
                {t(method.name)}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Access Codes */}
      {accessMethod === 'canProvideAccessCodes' && (
        <div className="space-y-3 p-4 bg-primary-50 rounded-lg">
          <h4 className="text-sm font-medium text-primary-700">Access Codes</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                {t('gateCode')}
              </label>
              <input
                type="text"
                value={accessCodes?.gateCode || ''}
                onChange={(e) => handleAccessCodeChange('gateCode', e.target.value)}
                placeholder={t('enterAccessCode')}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                {t('entranceCode')}
              </label>
              <input
                type="text"
                value={accessCodes?.entranceCode || ''}
                onChange={(e) => handleAccessCodeChange('entranceCode', e.target.value)}
                placeholder={t('enterAccessCode')}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                {t('apartmentCode')}
              </label>
              <input
                type="text"
                value={accessCodes?.apartmentCode || ''}
                onChange={(e) => handleAccessCodeChange('apartmentCode', e.target.value)}
                placeholder={t('enterAccessCode')}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressForm;