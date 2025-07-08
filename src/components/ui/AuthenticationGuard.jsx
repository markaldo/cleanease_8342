import React, { useState, useEffect, createContext, useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthenticationGuard');
  }
  return context;
};

const AuthenticationGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();

  const publicRoutes = ['/login-registration'];
  const protectedRoutes = [
    '/customer-dashboard',
    '/service-booking-flow',
    '/order-management',
    '/payment-billing',
    '/profile-settings'
  ];

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Simulate auth check - replace with actual auth logic
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      
      // Simulate login API call - replace with actual login logic
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: credentials.email,
        avatar: null
      };
      
      const mockToken = 'mock-jwt-token';
      
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userData', JSON.stringify(mockUser));
      
      setIsAuthenticated(true);
      setUser(mockUser);
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      
      // Simulate registration API call - replace with actual registration logic
      const mockUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        avatar: null
      };
      
      const mockToken = 'mock-jwt-token';
      
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userData', JSON.stringify(mockUser));
      
      setIsAuthenticated(true);
      setUser(mockUser);
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (updatedUserData) => {
    const updatedUser = { ...user, ...updatedUserData };
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse">
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
          <div className="text-text-secondary">Loading...</div>
        </div>
      </div>
    );
  }

  // Route protection logic
  const isPublicRoute = publicRoutes.includes(location.pathname);
  const isProtectedRoute = protectedRoutes.includes(location.pathname);

  // Redirect authenticated users away from public routes
  if (isAuthenticated && isPublicRoute) {
    return <Navigate to="/customer-dashboard" replace />;
  }

  // Redirect unauthenticated users away from protected routes
  if (!isAuthenticated && isProtectedRoute) {
    return <Navigate to="/login-registration" replace />;
  }

  // Redirect to dashboard if accessing root
  if (location.pathname === '/' && isAuthenticated) {
    return <Navigate to="/customer-dashboard" replace />;
  }

  // Redirect to login if accessing root and not authenticated
  if (location.pathname === '/' && !isAuthenticated) {
    return <Navigate to="/login-registration" replace />;
  }

  const authValue = {
    isAuthenticated,
    user,
    login,
    logout,
    register,
    updateUser,
    isLoading
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticationGuard;