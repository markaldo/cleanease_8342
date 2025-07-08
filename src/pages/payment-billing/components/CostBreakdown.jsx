import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const CostBreakdown = ({ 
  breakdown, 
  onPromoCodeApply, 
  currency = 'USD',
  className = '' 
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const handlePromoSubmit = async (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    setIsApplyingPromo(true);
    setPromoError('');

    try {
      const result = await onPromoCodeApply(promoCode);
      if (!result.success) {
        setPromoError(result.error || 'Invalid promo code');
      } else {
        setPromoCode('');
      }
    } catch (error) {
      setPromoError('Failed to apply promo code');
    } finally {
      setIsApplyingPromo(false);
    }
  };

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Cost Breakdown
      </h3>

      <div className="space-y-3">
        {/* Service Cost */}
        <div className="flex justify-between items-center">
          <span className="text-text-primary">Service Cost</span>
          <span className="font-medium text-text-primary">
            {formatCurrency(breakdown.servicePrice)}
          </span>
        </div>

        {/* Add-ons */}
        {breakdown.addOns && breakdown.addOns.length > 0 && (
          <>
            {breakdown.addOns.map((addon, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">{addon.name}</span>
                <span className="text-text-secondary">
                  {formatCurrency(addon.price)}
                </span>
              </div>
            ))}
          </>
        )}

        {/* Subtotal */}
        <div className="flex justify-between items-center pt-2 border-t border-border">
          <span className="text-text-primary">Subtotal</span>
          <span className="font-medium text-text-primary">
            {formatCurrency(breakdown.subtotal)}
          </span>
        </div>

        {/* Discount */}
        {breakdown.discount && breakdown.discount > 0 && (
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-success">Discount</span>
              {breakdown.promoCode && (
                <span className="text-xs bg-success-100 text-success px-2 py-1 rounded">
                  {breakdown.promoCode}
                </span>
              )}
            </div>
            <span className="font-medium text-success">
              -{formatCurrency(breakdown.discount)}
            </span>
          </div>
        )}

        {/* Tax */}
        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Tax ({breakdown.taxRate}%)</span>
          <span className="text-text-secondary">
            {formatCurrency(breakdown.tax)}
          </span>
        </div>

        {/* Service Fee */}
        {breakdown.serviceFee && breakdown.serviceFee > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Service Fee</span>
            <span className="text-text-secondary">
              {formatCurrency(breakdown.serviceFee)}
            </span>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between items-center pt-3 border-t border-border">
          <span className="text-lg font-heading font-semibold text-text-primary">
            Total
          </span>
          <span className="text-lg font-heading font-bold text-primary">
            {formatCurrency(breakdown.total)}
          </span>
        </div>
      </div>

      {/* Promo Code Section */}
      {!breakdown.promoCode && (
        <div className="mt-6 pt-4 border-t border-border">
          <form onSubmit={handlePromoSubmit} className="space-y-3">
            <label className="block text-sm font-medium text-text-primary">
              Promo Code
            </label>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="flex-1"
              />
              <Button
                type="submit"
                variant="outline"
                disabled={!promoCode.trim() || isApplyingPromo}
                loading={isApplyingPromo}
              >
                Apply
              </Button>
            </div>
            {promoError && (
              <p className="text-sm text-error">{promoError}</p>
            )}
          </form>
        </div>
      )}

      {/* Savings Summary */}
      {breakdown.discount && breakdown.discount > 0 && (
        <div className="mt-4 p-3 bg-success-50 border border-success-100 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">
              You saved {formatCurrency(breakdown.discount)}!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostBreakdown;