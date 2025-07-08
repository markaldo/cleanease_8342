import React from 'react';
import { useTranslation } from '../../../constants/translations';

const ContactForm = ({ contactData, onContactChange }) => {
  const { t } = useTranslation();

  const handleInputChange = (field, value) => {
    onContactChange({
      ...contactData,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-semibold text-text-primary">
        {t('contactDetails')}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t('fullName')}
          </label>
          <input
            type="text"
            value={contactData?.fullName || ''}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder={t('enterFullName')}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t('phoneNumber')}
          </label>
          <input
            type="tel"
            value={contactData?.phoneNumber || ''}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            placeholder={t('enterPhoneNumber')}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t('email')}
          </label>
          <input
            type="email"
            value={contactData?.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder={t('enterEmail')}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t('additionalInformation')}
          </label>
          <textarea
            value={contactData?.additionalInfo || ''}
            onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
            placeholder={t('enterAdditionalInfo')}
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;