import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import BottomNavigation from '../../components/ui/BottomNavigation';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import ServiceTypeCard from './components/ServiceTypeCard';
import CalendarComponent from './components/CalendarComponent';
import TimeSlotSelector from './components/TimeSlotSelector';
import RoomSelector from './components/RoomSelector';
import AddOnServices from './components/AddOnServices';
import SpecialInstructions from './components/SpecialInstructions';
import BookingSummary from './components/BookingSummary';
import Button from '../../components/ui/Button';


const ServiceBookingFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Booking state
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock data
  const services = [
    {
      id: 'regular',
      name: 'Regular Cleaning',
      description: 'Standard cleaning service for maintaining your home\'s cleanliness',
      price: 80,
      duration: '2-3 hours',
      icon: 'Home',
      popular: true,
      features: [
        'Dusting and vacuuming',
        'Kitchen and bathroom cleaning',
        'Trash removal',
        'Basic organization'
      ]
    },
    {
      id: 'deep',
      name: 'Deep Cleaning',
      description: 'Comprehensive cleaning service for a thorough home refresh',
      price: 150,
      duration: '4-6 hours',
      icon: 'Sparkles',
      discount: 15,
      features: [
        'Everything in regular cleaning',
        'Inside appliances cleaning',
        'Baseboards and window sills',
        'Light fixture cleaning',
        'Cabinet fronts'
      ]
    },
    {
      id: 'office',
      name: 'Office Cleaning',
      description: 'Professional cleaning service tailored for office spaces',
      price: 120,
      duration: '3-4 hours',
      icon: 'Building',
      features: [
        'Desk and workspace cleaning',
        'Conference room maintenance',
        'Restroom sanitization',
        'Common area cleaning',
        'Trash and recycling'
      ]
    }
  ];

  const availableDates = [
    '2024-12-20', '2024-12-21', '2024-12-23', '2024-12-24',
    '2024-12-26', '2024-12-27', '2024-12-28', '2024-12-30',
    '2024-12-31', '2025-01-02', '2025-01-03', '2025-01-04',
    '2025-01-06', '2025-01-07', '2025-01-08', '2025-01-09'
  ];

  const timeSlots = [
    { time: '8:00 AM', available: 3, priceModifier: 0, popular: true },
    { time: '9:00 AM', available: 2, priceModifier: 0 },
    { time: '10:00 AM', available: 4, priceModifier: 0 },
    { time: '11:00 AM', available: 1, priceModifier: 5 },
    { time: '12:00 PM', available: 3, priceModifier: 0 },
    { time: '1:00 PM', available: 2, priceModifier: 0 },
    { time: '2:00 PM', available: 4, priceModifier: 0 },
    { time: '3:00 PM', available: 1, priceModifier: 5 },
    { time: '4:00 PM', available: 3, priceModifier: 0 },
    { time: '5:00 PM', available: 0, priceModifier: 10 },
    { time: '6:00 PM', available: 2, priceModifier: 15 },
    { time: '7:00 PM', available: 1, priceModifier: 20 }
  ];

  const steps = [
    { label: 'Service Type', description: 'Choose your cleaning service' },
    { label: 'Date & Time', description: 'Pick date and time' },
    { label: 'Customize', description: 'Add rooms and extras' },
    { label: 'Review', description: 'Review and confirm' }
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // Reset time slot when date changes
  };

  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
  };

  const handleRoomToggle = (room, count) => {
    if (count === 0) {
      setSelectedRooms(prev => prev.filter(r => r.id !== room.id));
    } else {
      setSelectedRooms(prev => {
        const existing = prev.find(r => r.id === room.id);
        if (existing) {
          return prev.map(r => r.id === room.id ? { ...r, count } : r);
        } else {
          return [...prev, { id: room.id, count }];
        }
      });
    }
  };

  const handleAddOnToggle = (addOnId) => {
    setSelectedAddOns(prev => {
      if (prev.includes(addOnId)) {
        return prev.filter(id => id !== addOnId);
      } else {
        return [...prev, addOnId];
      }
    });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to payment
      navigate('/payment-billing');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService !== null;
      case 2:
        return selectedDate !== null && selectedTimeSlot !== null;
      case 3:
        return selectedRooms.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
                Choose Your Service
              </h2>
              <p className="text-text-secondary">
                Select the cleaning service that best fits your needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceTypeCard
                  key={service.id}
                  service={service}
                  isSelected={selectedService?.id === service.id}
                  onSelect={handleServiceSelect}
                />
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
                Select Date & Time
              </h2>
              <p className="text-text-secondary">
                Choose when you'd like your {selectedService?.name.toLowerCase()} service
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CalendarComponent
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                availableDates={availableDates}
              />
              
              {selectedDate && (
                <TimeSlotSelector
                  timeSlots={timeSlots}
                  selectedSlot={selectedTimeSlot}
                  onSlotSelect={handleTimeSlotSelect}
                />
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
                Customize Your Service
              </h2>
              <p className="text-text-secondary">
                Select rooms and add extra services to personalize your cleaning
              </p>
            </div>

            <RoomSelector
              selectedRooms={selectedRooms}
              onRoomToggle={handleRoomToggle}
            />

            <AddOnServices
              selectedAddOns={selectedAddOns}
              onAddOnToggle={handleAddOnToggle}
            />

            <SpecialInstructions
              instructions={specialInstructions}
              onInstructionsChange={setSpecialInstructions}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
                Review Your Booking
              </h2>
              <p className="text-text-secondary">
                Please review all details before proceeding to payment
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <BookingSummary
                selectedService={selectedService}
                selectedDate={selectedDate}
                selectedTimeSlot={selectedTimeSlot}
                selectedRooms={selectedRooms}
                selectedAddOns={selectedAddOns}
                instructions={specialInstructions}
                onContinue={handleNext}
                onBack={handleBack}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <div className="lg:ml-80">
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={4}
          steps={steps}
          onStepClick={handleStepClick}
        />

        <main className="px-4 lg:px-6 py-6 pb-20 lg:pb-6">
          {renderStepContent()}
        </main>

        {/* Mobile Sticky Summary */}
        <div className="lg:hidden">
          <BookingSummary
            selectedService={selectedService}
            selectedDate={selectedDate}
            selectedTimeSlot={selectedTimeSlot}
            selectedRooms={selectedRooms}
            selectedAddOns={selectedAddOns}
            instructions={specialInstructions}
            onContinue={handleNext}
            onBack={currentStep > 1 ? handleBack : null}
            isSticky={true}
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block fixed bottom-6 right-6">
          <div className="flex items-center space-x-3">
            {currentStep > 1 && (
              <Button
                variant="outline"
                iconName="ChevronLeft"
                onClick={handleBack}
              >
                Back
              </Button>
            )}
            <Button
              variant="primary"
              iconName="ArrowRight"
              iconPosition="right"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {currentStep === 4 ? 'Proceed to Payment' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ServiceBookingFlow;