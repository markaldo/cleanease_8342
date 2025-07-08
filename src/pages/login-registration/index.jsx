import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialAuthButtons from './components/SocialAuthButtons';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import AuthToggle from './components/AuthToggle';


const LoginRegistration = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);

  // Mock credentials for testing
  const mockCredentials = {
    email: 'john.doe@example.com',
    password: 'CleanEase123'
  };

  useEffect(() => {
    // Clear error when switching tabs or views
    setError('');
  }, [activeTab, showForgotPassword]);

  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate social auth API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful social authentication
      const mockUser = {
        id: Date.now().toString(),
        name: provider === 'google' ? 'John Doe' : 'Jane Smith',
        email: provider === 'google' ? 'john.doe@gmail.com' : 'jane.smith@facebook.com',
        avatar: null,
        provider: provider
      };
      
      localStorage.setItem('authToken', 'mock-social-token');
      localStorage.setItem('userData', JSON.stringify(mockUser));
      
      navigate('/customer-dashboard');
    } catch (err) {
      setError(`${provider} authentication failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check mock credentials
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        const mockUser = {
          id: '1',
          name: 'John Doe',
          email: formData.email,
          avatar: null
        };
        
        localStorage.setItem('authToken', 'mock-jwt-token');
        localStorage.setItem('userData', JSON.stringify(mockUser));
        
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        navigate('/customer-dashboard');
      } else {
        setError('Invalid email or password. Please use: john.doe@example.com / CleanEase123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        avatar: null
      };
      
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('userData', JSON.stringify(mockUser));
      
      navigate('/customer-dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate forgot password API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setForgotPasswordSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setForgotPasswordSuccess(false);
    setActiveTab('login');
    setError('');
  };

  const handleTabChange = (tab) => {
    if (!isLoading) {
      setActiveTab(tab);
      setShowForgotPassword(false);
      setForgotPasswordSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary-foreground"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-heading font-bold text-text-primary">
                CleanEase
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Welcome Section */}
          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold text-text-primary">
              {showForgotPassword ? 'Reset Password' : activeTab === 'login' ? 'Welcome Back' : 'Join CleanEase'}
            </h2>
            <p className="mt-2 text-text-secondary">
              {showForgotPassword 
                ? 'Enter your email to receive reset instructions'
                : activeTab === 'login' ?'Sign in to your account to continue' :'Create your account to get started'
              }
            </p>
          </div>

          {/* Auth Container */}
          <div className="bg-surface border border-border rounded-lg shadow-elevation-2 p-6 sm:p-8">
            {showForgotPassword ? (
              <ForgotPasswordForm
                onSubmit={handleForgotPassword}
                onBack={handleBackToLogin}
                isLoading={isLoading}
                error={error}
                success={forgotPasswordSuccess}
              />
            ) : (
              <>
                <AuthToggle
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                  isLoading={isLoading}
                />

                <SocialAuthButtons
                  onGoogleAuth={() => handleSocialAuth('google')}
                  onFacebookAuth={() => handleSocialAuth('facebook')}
                  isLoading={isLoading}
                />

                {activeTab === 'login' ? (
                  <LoginForm
                    onSubmit={handleLogin}
                    onForgotPassword={() => setShowForgotPassword(true)}
                    isLoading={isLoading}
                    error={error}
                  />
                ) : (
                  <RegisterForm
                    onSubmit={handleRegister}
                    isLoading={isLoading}
                    error={error}
                  />
                )}
              </>
            )}
          </div>

          {/* Footer Links */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
              <button className="hover:text-text-primary transition-smooth">
                Help Center
              </button>
              <button className="hover:text-text-primary transition-smooth">
                Privacy Policy
              </button>
              <button className="hover:text-text-primary transition-smooth">
                Terms of Service
              </button>
            </div>
            
            <p className="text-xs text-text-muted">
              © {new Date().getFullYear()} CleanEase. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginRegistration;