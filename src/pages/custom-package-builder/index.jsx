import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../constants/translations';
import { formatPrice } from '../../constants/packageBuilder';
import Header from '../../components/ui/Header';
import ClientTypeSelector from './components/ClientTypeSelector';
import ServiceTypeSelector from './components/ServiceTypeSelector';
import HousingTypeSelector from './components/HousingTypeSelector';
import CategorySelector from './components/CategorySelector';
import ExtraRoomsSelector from './components/ExtraRoomsSelector';
import MicroservicesSelector from './components/MicroservicesSelector';
import AdditionalServicesSelector from './components/AdditionalServicesSelector';
import FrequencySelector from './components/FrequencySelector';
import AddressForm from './components/AddressForm';
import ContactForm from './components/ContactForm';
import PriceSummary from './components/PriceSummary';

const CustomPackageBuilder = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    clientType: '',
    serviceType: '',
    housingType: '',
    roomCount: 1,
    bathroomCount: 1,
    extraRooms: [],
    selectedMicroservices: [],
    selectedAdditionalServices: [],
    visitCount: 1,
    frequencyType: 'perWeek',
    selectedDate: '',
    selectedTime: '',
    address: {
      city: '',
      street: '',
      building: '',
      apartment: '',
      postalCode: ''
    },
    accessMethod: '',
    accessCodes: {
      gateCode: '',
      entranceCode: '',
      apartmentCode: ''
    },
    contact: {
      fullName: '',
      phoneNumber: '',
      email: '',
      additionalInfo: ''
    }
  });
  
  const [agreements, setAgreements] = useState({
    publicOffer: false,
    dataProcessing: false
  });

  // Form validation
  const isFormValid = () => {
    const requiredFields = [
      formData.clientType,
      formData.serviceType,
      formData.housingType,
      formData.selectedDate,
      formData.selectedTime,
      formData.address.city,
      formData.address.street,
      formData.address.building,
      formData.address.postalCode,
      formData.accessMethod,
      formData.contact.fullName,
      formData.contact.phoneNumber,
      formData.contact.email,
      agreements.publicOffer,
      agreements.dataProcessing
    ];
    
    return requiredFields.every(field => field);
  };

  const handleMakeOrder = () => {
    if (isFormValid()) {
      // Navigate to payment page with form data
      navigate('/payment-billing', { state: { packageData: formData } });
    }
  };

  const calculateTotal = () => {
    const microservicesTotal = formData.selectedMicroservices.reduce((sum, service) => sum + service.price, 0);
    const additionalTotal = formData.selectedAdditionalServices.reduce((sum, service) => sum + service.price, 0);
    return microservicesTotal + additionalTotal;
  };

  const totalPrice = calculateTotal();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-surface rounded-lg p-6 shadow-elevation-1">
              <h1 className="text-2xl font-heading font-bold text-text-primary mb-6">
                {t('createCustomPackage')}
              </h1>
              
              <div className="space-y-8">
                {/* Client Type */}
                <ClientTypeSelector
                  selectedClientType={formData.clientType}
                  onClientTypeChange={(type) => setFormData({...formData, clientType: type})}
                />
                
                {/* Service Type */}
                <ServiceTypeSelector
                  selectedServiceType={formData.serviceType}
                  onServiceTypeChange={(type) => setFormData({...formData, serviceType: type})}
                />
                
                {/* Housing Type */}
                <HousingTypeSelector
                  selectedHousingType={formData.housingType}
                  onHousingTypeChange={(type) => setFormData({...formData, housingType: type})}
                />
                
                {/* Category */}
                <CategorySelector
                  roomCount={formData.roomCount}
                  bathroomCount={formData.bathroomCount}
                  onRoomCountChange={(count) => setFormData({...formData, roomCount: count})}
                  onBathroomCountChange={(count) => setFormData({...formData, bathroomCount: count})}
                />
                
                {/* Extra Rooms */}
                <ExtraRoomsSelector
                  selectedExtraRooms={formData.extraRooms}
                  onExtraRoomsChange={(rooms) => setFormData({...formData, extraRooms: rooms})}
                />
                
                {/* Microservices */}
                <MicroservicesSelector
                  selectedMicroservices={formData.selectedMicroservices}
                  onMicroservicesChange={(services) => setFormData({...formData, selectedMicroservices: services})}
                />
                
                {/* Additional Services */}
                <AdditionalServicesSelector
                  selectedAdditionalServices={formData.selectedAdditionalServices}
                  onAdditionalServicesChange={(services) => setFormData({...formData, selectedAdditionalServices: services})}
                />
                
                {/* Frequency */}
                <FrequencySelector
                  visitCount={formData.visitCount}
                  frequencyType={formData.frequencyType}
                  selectedDate={formData.selectedDate}
                  selectedTime={formData.selectedTime}
                  onVisitCountChange={(count) => setFormData({...formData, visitCount: count})}
                  onFrequencyTypeChange={(type) => setFormData({...formData, frequencyType: type})}
                  onDateChange={(date) => setFormData({...formData, selectedDate: date})}
                  onTimeChange={(time) => setFormData({...formData, selectedTime: time})}
                />
                
                {/* Address */}
                <AddressForm
                  addressData={formData.address}
                  onAddressChange={(address) => setFormData({...formData, address})}
                  accessMethod={formData.accessMethod}
                  onAccessMethodChange={(method) => setFormData({...formData, accessMethod: method})}
                  accessCodes={formData.accessCodes}
                  onAccessCodesChange={(codes) => setFormData({...formData, accessCodes: codes})}
                />
                
                {/* Contact */}
                <ContactForm
                  contactData={formData.contact}
                  onContactChange={(contact) => setFormData({...formData, contact})}
                />
                
                {/* Agreements */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="publicOffer"
                      checked={agreements.publicOffer}
                      onChange={(e) => setAgreements({...agreements, publicOffer: e.target.checked})}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500 mt-1"
                    />
                    <label htmlFor="publicOffer" className="text-sm text-text-primary">
                      {t('agreeToPublicOffer')}
                    </label>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="dataProcessing"
                      checked={agreements.dataProcessing}
                      onChange={(e) => setAgreements({...agreements, dataProcessing: e.target.checked})}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500 mt-1"
                    />
                    <label htmlFor="dataProcessing" className="text-sm text-text-primary">
                      {t('consentToDataProcessing')}
                    </label>
                  </div>
                </div>
                
                {/* Make Order Button */}
                <button
                  onClick={handleMakeOrder}
                  disabled={!isFormValid()}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                    isFormValid()
                      ? 'bg-primary text-primary-foreground hover:bg-primary-700 shadow-elevation-2'
                      : 'bg-secondary-200 text-text-muted cursor-not-allowed'
                  }`}
                >
                  {t('makeOrder')} - {formatPrice(totalPrice)}
                </button>
              </div>
            </div>
          </div>
          
          {/* Price Summary - Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <PriceSummary
                selectedMicroservices={formData.selectedMicroservices}
                selectedAdditionalServices={formData.selectedAdditionalServices}
                discount={0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPackageBuilder;