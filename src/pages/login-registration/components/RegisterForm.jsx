import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.acceptTerms) {
      errors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const isFormValid = 
    formData.name.trim() &&
    formData.email &&
    formData.phone &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    formData.acceptTerms;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-error-50 border border-error-100 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
            <span className="text-sm text-error">{error}</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full"
            disabled={isLoading}
          />
          {fieldErrors.name && (
            <p className="mt-1 text-sm text-error">{fieldErrors.name}</p>
          )}
        </div>

        <div>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full"
            disabled={isLoading}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-error">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <Input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full"
            disabled={isLoading}
          />
          {fieldErrors.phone && (
            <p className="mt-1 text-sm text-error">{fieldErrors.phone}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full pr-10"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              disabled={isLoading}
            >
              <Icon
                name={showPassword ? "EyeOff" : "Eye"}
                size={16}
                className="text-text-secondary hover:text-text-primary"
              />
            </button>
          </div>
          {fieldErrors.password && (
            <p className="mt-1 text-sm text-error">{fieldErrors.password}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full pr-10"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              disabled={isLoading}
            >
              <Icon
                name={showConfirmPassword ? "EyeOff" : "Eye"}
                size={16}
                className="text-text-secondary hover:text-text-primary"
              />
            </button>
          </div>
          {fieldErrors.confirmPassword && (
            <p className="mt-1 text-sm text-error">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        <div>
          <label className="flex items-start space-x-3 cursor-pointer">
            <Input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              disabled={isLoading}
            />
            <span className="text-sm text-text-secondary leading-relaxed">
              I agree to the{' '}
              <span className="text-primary hover:text-primary-700 transition-smooth">
                Terms of Service
              </span>{' '}
              and{' '}
              <span className="text-primary hover:text-primary-700 transition-smooth">
                Privacy Policy
              </span>
            </span>
          </label>
          {fieldErrors.acceptTerms && (
            <p className="mt-1 text-sm text-error">{fieldErrors.acceptTerms}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        variant={isFormValid ? "primary" : "secondary"}
        fullWidth
        loading={isLoading}
        disabled={!isFormValid || isLoading}
        className="py-3 mt-6"
      >
        Create Account
      </Button>

      <div className="text-center text-sm text-text-secondary">
        Already have an account?{' '}
        <span className="text-primary hover:text-primary-700 cursor-pointer transition-smooth">
          Sign in here
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;