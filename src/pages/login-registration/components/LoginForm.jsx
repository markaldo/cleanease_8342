import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, onForgotPassword, isLoading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
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
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
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

  const isFormValid = formData.email && formData.password && formData.password.length >= 6;

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
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
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

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <Input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4"
              disabled={isLoading}
            />
            <span className="text-sm text-text-secondary">Remember me</span>
          </label>

          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-primary hover:text-primary-700 transition-smooth"
            disabled={isLoading}
          >
            Forgot password?
          </button>
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
        Sign In
      </Button>

      <div className="text-center text-sm text-text-secondary">
        Don't have an account?{' '}
        <span className="text-primary hover:text-primary-700 cursor-pointer transition-smooth">
          Sign up here
        </span>
      </div>
    </form>
  );
};

export default LoginForm;