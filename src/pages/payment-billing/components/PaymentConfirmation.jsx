import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentConfirmation = ({ 
  isVisible, 
  paymentDetails, 
  onClose, 
  onViewBooking,
  className = '' 
}) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer1 = setTimeout(() => setAnimationStep(1), 300);
      const timer2 = setTimeout(() => setAnimationStep(2), 800);
      const timer3 = setTimeout(() => setAnimationStep(3), 1300);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setAnimationStep(0);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100 p-4">
      <div className={`bg-surface rounded-lg shadow-elevation-4 max-w-md w-full ${className}`}>
        <div className="p-6 text-center">
          {/* Success Animation */}
          <div className="mb-6">
            <div className={`w-20 h-20 mx-auto rounded-full bg-success flex items-center justify-center transition-all duration-500 ${
              animationStep >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}>
              <Icon 
                name="Check" 
                size={40} 
                className={`text-success-foreground transition-all duration-300 ${
                  animationStep >= 2 ? 'scale-100' : 'scale-0'
                }`} 
              />
            </div>
          </div>

          {/* Success Message */}
          <div className={`transition-all duration-500 ${
            animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
              Payment Successful!
            </h2>
            <p className="text-text-secondary mb-6">
              Your cleaning service has been booked successfully.
            </p>

            {/* Booking Details */}
            <div className="bg-secondary-50 rounded-lg p-4 mb-6 text-left">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Booking Reference</span>
                  <span className="font-mono text-sm font-medium text-text-primary">
                    {paymentDetails.bookingReference}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Service Date</span>
                  <span className="text-sm font-medium text-text-primary">
                    {paymentDetails.serviceDate}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Time</span>
                  <span className="text-sm font-medium text-text-primary">
                    {paymentDetails.serviceTime}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Amount Paid</span>
                  <span className="text-sm font-medium text-primary">
                    {paymentDetails.amountPaid}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Payment Method</span>
                  <span className="text-sm font-medium text-text-primary">
                    {paymentDetails.paymentMethod}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-primary mb-2">What's Next?</h3>
              <ul className="text-sm text-text-secondary space-y-1 text-left">
                <li className="flex items-start space-x-2">
                  <Icon name="Clock" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>You'll receive a confirmation email shortly</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="Bell" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>We'll send reminders before your appointment</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="User" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Your cleaner will contact you 30 minutes before arrival</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                variant="primary"
                onClick={onViewBooking}
                iconName="Calendar"
                className="w-full"
              >
                View Booking Details
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full"
              >
                Continue Browsing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;