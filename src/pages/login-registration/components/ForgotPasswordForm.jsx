import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ForgotPasswordForm = ({ onSubmit, onBack, isLoading, error, success }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      onSubmit(email);
    }
  };

  const isFormValid = email && /\S+@\S+\.\S+/.test(email);

  if (success) {
    return (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mx-auto">
          <Icon name="Mail" size={32} className="text-success" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-heading font-semibold text-text-primary">
            Check Your Email
          </h3>
          <p className="text-text-secondary">
            We've sent password reset instructions to{' '}
            <span className="font-medium text-text-primary">{email}</span>
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            Didn't receive the email? Check your spam folder or{' '}
            <button
              onClick={() => onSubmit(email)}
              className="text-primary hover:text-primary-700 transition-smooth"
              disabled={isLoading}
            >
              resend the link
            </button>
          </p>

          <Button
            variant="outline"
            fullWidth
            onClick={onBack}
            disabled={isLoading}
          >
            Back to Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto">
          <Icon name="Lock" size={32} className="text-primary" />
        </div>
        
        <h3 className="text-xl font-heading font-semibold text-text-primary">
          Forgot Password?
        </h3>
        <p className="text-text-secondary">
          No worries! Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-error-50 border border-error-100 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
              <span className="text-sm text-error">{error}</span>
            </div>
          </div>
        )}

        <div>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={handleEmailChange}
            required
            className="w-full"
            disabled={isLoading}
          />
          {emailError && (
            <p className="mt-1 text-sm text-error">{emailError}</p>
          )}
        </div>

        <div className="space-y-3">
          <Button
            type="submit"
            variant={isFormValid ? "primary" : "secondary"}
            fullWidth
            loading={isLoading}
            disabled={!isFormValid || isLoading}
            className="py-3"
          >
            Send Reset Link
          </Button>

          <Button
            type="button"
            variant="ghost"
            fullWidth
            onClick={onBack}
            disabled={isLoading}
          >
            Back to Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;