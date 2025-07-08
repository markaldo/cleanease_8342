import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import BottomNavigation from '../../components/ui/BottomNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PaymentSummaryCard from './components/PaymentSummaryCard';
import PaymentMethodSelector from './components/PaymentMethodSelector';
import NewCardForm from './components/NewCardForm';
import CostBreakdown from './components/CostBreakdown';
import BillingAddressSelector from './components/BillingAddressSelector';
import PaymentConfirmation from './components/PaymentConfirmation';
import BillingHistory from './components/BillingHistory';

const PaymentBilling = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('payment');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedBillingAddress, setSelectedBillingAddress] = useState('');
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Mock data for service details
  const serviceDetails = {
    serviceName: "Deep House Cleaning",
    date: "March 25, 2024",
    time: "10:00 AM - 12:00 PM",
    address: "123 Main Street, New York, NY 10001",
    rooms: 3,
    duration: "2 hours",
    cleanerName: "Sarah Johnson",
    addOns: ["Window Cleaning", "Carpet Cleaning"]
  };

  // Mock data for cost breakdown
  const costBreakdown = {
    servicePrice: 89.00,
    addOns: [
      { name: "Window Cleaning", price: 25.00 },
      { name: "Carpet Cleaning", price: 35.00 }
    ],
    subtotal: 149.00,
    discount: 14.90,
    promoCode: "SAVE10",
    taxRate: 8.25,
    tax: 11.09,
    serviceFee: 5.00,
    total: 150.19
  };

  // Mock data for saved cards
  const savedCards = [
    {
      id: 'card_1',
      type: 'visa',
      lastFour: '4242',
      expiryMonth: '12',
      expiryYear: '25',
      isDefault: true
    },
    {
      id: 'card_2',
      type: 'mastercard',
      lastFour: '8888',
      expiryMonth: '08',
      expiryYear: '26',
      isDefault: false
    }
  ];

  // Mock data for saved addresses
  const savedAddresses = [
    {
      id: 'addr_1',
      name: 'John Doe',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      isDefault: true
    },
    {
      id: 'addr_2',
      name: 'John Doe',
      street: '456 Office Plaza',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      isDefault: false
    }
  ];

  // Mock data for billing history
  const billingHistory = [
    {
      id: 'inv_001',
      invoiceNumber: 'INV-2024-001',
      date: '2024-03-15',
      serviceDate: '2024-03-15',
      serviceType: 'Regular Cleaning',
      address: '123 Main Street',
      amount: 89.00,
      status: 'paid',
      paymentMethod: 'Visa •••• 4242'
    },
    {
      id: 'inv_002',
      invoiceNumber: 'INV-2024-002',
      date: '2024-03-01',
      serviceDate: '2024-03-01',
      serviceType: 'Deep Cleaning',
      address: '456 Office Plaza',
      amount: 150.00,
      status: 'paid',
      paymentMethod: 'Mastercard •••• 8888'
    },
    {
      id: 'inv_003',
      invoiceNumber: 'INV-2024-003',
      date: '2024-02-15',
      serviceDate: '2024-02-15',
      serviceType: 'Regular Cleaning',
      address: '123 Main Street',
      amount: 89.00,
      status: 'failed',
      paymentMethod: 'Visa •••• 4242',
      failureReason: 'Insufficient funds'
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Set default selections
    if (savedCards.length > 0) {
      const defaultCard = savedCards.find(card => card.isDefault);
      setSelectedPaymentMethod(defaultCard?.id || savedCards[0].id);
    }
    
    if (savedAddresses.length > 0) {
      const defaultAddress = savedAddresses.find(addr => addr.isDefault);
      setSelectedBillingAddress(defaultAddress?.id || savedAddresses[0].id);
    }
  }, []);

  const handlePaymentMethodSelect = (methodId) => {
    setSelectedPaymentMethod(methodId);
    setShowNewCardForm(methodId === 'new_card');
  };

  const handleNewCardSubmit = (cardData) => {
    console.log('New card added:', cardData);
    setShowNewCardForm(false);
    setSelectedPaymentMethod('new_card');
  };

  const handlePromoCodeApply = async (promoCode) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (promoCode === 'SAVE10') {
      return { success: true };
    } else {
      return { success: false, error: 'Invalid promo code' };
    }
  };

  const handleAddressSelect = (addressId) => {
    setSelectedBillingAddress(addressId);
  };

  const handlePaymentSubmit = async () => {
    if (!selectedPaymentMethod || !selectedBillingAddress) {
      alert('Please select payment method and billing address');
      return;
    }

    setIsProcessingPayment(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowConfirmation(true);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleDownloadInvoice = (invoiceId) => {
    console.log('Downloading invoice:', invoiceId);
    // Simulate download
    alert(`Downloading invoice ${invoiceId}`);
  };

  const paymentConfirmationDetails = {
    bookingReference: 'CE-2024-001234',
    serviceDate: serviceDetails.date,
    serviceTime: serviceDetails.time,
    amountPaid: `$${costBreakdown.total.toFixed(2)}`,
    paymentMethod: selectedPaymentMethod === 'card_1' ? 'Visa •••• 4242' : 'New Card'
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-80 pb-20 lg:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-smooth ${
                    activeTab === 'payment' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                  }`}
                >
                  Payment
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-smooth ${
                    activeTab === 'history' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                  }`}
                >
                  Billing History
                </button>
              </nav>
            </div>
          </div>

          {/* Payment Tab */}
          {activeTab === 'payment' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Payment Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Payment Summary - Mobile */}
                <div className="lg:hidden">
                  <PaymentSummaryCard
                    serviceDetails={serviceDetails}
                    totalAmount={costBreakdown.total}
                  />
                </div>

                {/* Payment Method Selection */}
                <div className="bg-surface border border-border rounded-lg p-6">
                  <PaymentMethodSelector
                    selectedMethod={selectedPaymentMethod}
                    onMethodSelect={handlePaymentMethodSelect}
                    savedCards={savedCards}
                  />
                </div>

                {/* New Card Form */}
                {showNewCardForm && (
                  <NewCardForm
                    isVisible={showNewCardForm}
                    onSubmit={handleNewCardSubmit}
                    onCancel={() => {
                      setShowNewCardForm(false);
                      setSelectedPaymentMethod('');
                    }}
                  />
                )}

                {/* Billing Address */}
                <div className="bg-surface border border-border rounded-lg p-6">
                  <BillingAddressSelector
                    selectedAddress={selectedBillingAddress}
                    onAddressSelect={handleAddressSelect}
                    savedAddresses={savedAddresses}
                  />
                </div>

                {/* Security Badges */}
                <div className="flex items-center justify-center space-x-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={20} className="text-success" />
                    <span className="text-sm text-text-secondary">256-bit SSL</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Lock" size={20} className="text-success" />
                    <span className="text-sm text-text-secondary">PCI Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={20} className="text-success" />
                    <span className="text-sm text-text-secondary">Secure Payment</span>
                  </div>
                </div>

                {/* Payment Button - Mobile */}
                <div className="lg:hidden">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handlePaymentSubmit}
                    disabled={!selectedPaymentMethod || !selectedBillingAddress}
                    loading={isProcessingPayment}
                    className="w-full"
                  >
                    {isProcessingPayment ? 'Processing...' : `Pay $${costBreakdown.total.toFixed(2)}`}
                  </Button>
                </div>
              </div>

              {/* Sidebar - Desktop */}
              <div className="hidden lg:block space-y-6">
                {/* Payment Summary */}
                <PaymentSummaryCard
                  serviceDetails={serviceDetails}
                  totalAmount={costBreakdown.total}
                />

                {/* Cost Breakdown */}
                <CostBreakdown
                  breakdown={costBreakdown}
                  onPromoCodeApply={handlePromoCodeApply}
                />

                {/* Payment Button */}
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handlePaymentSubmit}
                  disabled={!selectedPaymentMethod || !selectedBillingAddress}
                  loading={isProcessingPayment}
                  className="w-full"
                >
                  {isProcessingPayment ? 'Processing...' : `Pay $${costBreakdown.total.toFixed(2)}`}
                </Button>
              </div>
            </div>
          )}

          {/* Billing History Tab */}
          {activeTab === 'history' && (
            <BillingHistory
              invoices={billingHistory}
              onDownloadInvoice={handleDownloadInvoice}
            />
          )}
        </div>
      </main>

      {/* Payment Confirmation Modal */}
      <PaymentConfirmation
        isVisible={showConfirmation}
        paymentDetails={paymentConfirmationDetails}
        onClose={() => {
          setShowConfirmation(false);
          navigate('/customer-dashboard');
        }}
        onViewBooking={() => {
          setShowConfirmation(false);
          navigate('/order-management');
        }}
      />

      <BottomNavigation />
    </div>
  );
};

export default PaymentBilling;