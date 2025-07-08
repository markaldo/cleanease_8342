import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import BookingCard from './components/BookingCard';
import QuickStatsCard from './components/QuickStatsCard';
import QuickActionCard from './components/QuickActionCard';
import RecentActivityItem from './components/RecentActivityItem';
import NotificationBanner from './components/NotificationBanner';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock data for upcoming bookings
  const upcomingBookings = [
    {
      id: 1,
      serviceName: "Deep Home Cleaning",
      serviceType: "deep",
      location: "123 Main St, Apt 4B",
      date: "2024-01-15",
      time: "10:00",
      status: "confirmed",
      price: 120,
      cleaner: {
        name: "Sarah Johnson",
        rating: 4.8
      },
      hasUpdate: false
    },
    {
      id: 2,
      serviceName: "Office Cleaning",
      serviceType: "office",
      location: "456 Business Ave, Suite 200",
      date: "2024-01-18",
      time: "14:00",
      status: "in-progress",
      price: 85,
      progress: 65,
      cleaner: {
        name: "Mike Chen",
        rating: 4.9
      },
      hasUpdate: true
    },
    {
      id: 3,
      serviceName: "Regular Home Cleaning",
      serviceType: "home",
      location: "789 Oak Street",
      date: "2024-01-20",
      time: "09:00",
      status: "confirmed",
      price: 75,
      cleaner: {
        name: "Emily Rodriguez",
        rating: 4.7
      },
      hasUpdate: false
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: "booking_completed",
      title: "Cleaning service completed",
      description: "Your deep cleaning service has been completed successfully",
      serviceName: "Deep Home Cleaning",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      bookingId: 101,
      rated: false,
      amount: 120
    },
    {
      id: 2,
      type: "payment_received",
      title: "Payment processed",
      description: "Payment of $85 has been successfully processed",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      amount: 85
    },
    {
      id: 3,
      type: "cleaner_assigned",
      title: "Cleaner assigned",
      description: "Sarah Johnson has been assigned to your upcoming booking",
      serviceName: "Regular Home Cleaning",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: 4,
      type: "rating_submitted",
      title: "Review submitted",
      description: "Thank you for rating your cleaning service",
      serviceName: "Office Cleaning",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  ];

  // Mock data for quick stats
  const quickStats = [
    {
      title: "Total Bookings",
      value: "24",
      subtitle: "This year",
      icon: "Calendar",
      trend: "up",
      trendValue: "+12%",
      color: "primary"
    },
    {
      title: "Favorite Cleaners",
      value: "3",
      subtitle: "Trusted professionals",
      icon: "Heart",
      color: "success"
    },
    {
      title: "Loyalty Points",
      value: "1,250",
      subtitle: "Available to redeem",
      icon: "Award",
      trend: "up",
      trendValue: "+150",
      color: "warning"
    },
    {
      title: "Money Saved",
      value: "$180",
      subtitle: "With discounts",
      icon: "DollarSign",
      trend: "up",
      trendValue: "+$45",
      color: "success"
    }
  ];

  // Mock notification
  const [notification, setNotification] = useState({
    id: 1,
    type: "info",
    title: "Special Offer Available!",
    message: "Get 20% off your next deep cleaning service. Limited time offer.",
    actionText: "View Offer"
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handlePullToRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleBookNewService = () => {
    navigate('/service-booking-flow');
  };

  const handleViewAllBookings = () => {
    navigate('/order-management');
  };

  const handleRescheduleBooking = (bookingId) => {
    console.log('Reschedule booking:', bookingId);
    navigate('/service-booking-flow', { state: { rescheduleId: bookingId } });
  };

  const handleCancelBooking = (bookingId) => {
    console.log('Cancel booking:', bookingId);
    // Show confirmation modal
  };

  const handleRebookService = (booking) => {
    console.log('Rebook service:', booking);
    navigate('/service-booking-flow', { state: { rebookData: booking } });
  };

  const handleRateService = (bookingId) => {
    console.log('Rate service:', bookingId);
    // Show rating modal
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'emergency': navigate('/service-booking-flow', { state: { emergency: true } });
        break;
      case 'support': console.log('Contact support');
        break;
      case 'referral': console.log('Refer friends');
        break;
      default:
        break;
    }
  };

  const handleNotificationAction = (notification) => {
    console.log('Notification action:', notification);
    if (notification.actionText === "View Offer") {
      navigate('/service-booking-flow', { state: { specialOffer: true } });
    }
  };

  const handleDismissNotification = (notificationId) => {
    setNotification(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="lg:ml-80 pb-20 lg:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Notification Banner */}
          {notification && (
            <NotificationBanner
              notification={notification}
              onDismiss={handleDismissNotification}
              onAction={handleNotificationAction}
            />
          )}

          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">
                  Welcome back, John!
                </h1>
                <p className="text-text-secondary mt-1">
                  Here's what's happening with your cleaning services
                </p>
              </div>
              
              {/* Pull to Refresh - Mobile */}
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="RefreshCw"
                  onClick={handlePullToRefresh}
                  className={`text-text-secondary hover:text-text-primary ${isRefreshing ? 'animate-spin' : ''}`}
                  disabled={isRefreshing}
                  title="Refresh"
                />
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Left Sidebar - Quick Stats */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Stats</h2>
                <div className="space-y-4">
                  {quickStats.map((stat, index) => (
                    <QuickStatsCard key={index} {...stat} />
                  ))}
                </div>
              </div>
            </div>

            {/* Center - Main Content */}
            <div className="lg:col-span-6 space-y-8">
              {/* Book New Service CTA */}
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-primary-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Need a cleaning service?</h2>
                    <p className="opacity-90">Book your next cleaning in just a few clicks</p>
                  </div>
                  <Button
                    variant="secondary"
                    size="lg"
                    iconName="Plus"
                    onClick={handleBookNewService}
                  >
                    Book Now
                  </Button>
                </div>
              </div>

              {/* Upcoming Bookings */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-text-primary">Upcoming Bookings</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ArrowRight"
                    onClick={handleViewAllBookings}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    View All
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {upcomingBookings.slice(0, 3).map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onReschedule={handleRescheduleBooking}
                      onCancel={handleCancelBooking}
                      onRebook={handleRebookService}
                      onRate={handleRateService}
                    />
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h2>
                <div className="bg-surface border border-border rounded-lg divide-y divide-border">
                  {recentActivities.slice(0, 4).map((activity) => (
                    <RecentActivityItem
                      key={activity.id}
                      activity={activity}
                      onRate={handleRateService}
                      onRebook={handleRebookService}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Quick Actions */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
                <div className="space-y-4">
                  <QuickActionCard
                    title="Emergency Cleaning"
                    description="Need urgent cleaning service?"
                    icon="Zap"
                    buttonText="Book Emergency"
                    onClick={() => handleQuickAction('emergency')}
                    color="warning"
                  />
                  <QuickActionCard
                    title="Contact Support"
                    description="Get help with your bookings"
                    icon="MessageCircle"
                    buttonText="Get Help"
                    onClick={() => handleQuickAction('support')}
                    color="secondary"
                  />
                  <QuickActionCard
                    title="Refer Friends"
                    description="Earn rewards for referrals"
                    icon="Users"
                    buttonText="Refer Now"
                    onClick={() => handleQuickAction('referral')}
                    color="success"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            {/* Book New Service CTA */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-primary-foreground">
              <div className="text-center space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Need a cleaning service?</h2>
                  <p className="opacity-90">Book your next cleaning in just a few clicks</p>
                </div>
                <Button
                  variant="secondary"
                  size="lg"
                  iconName="Plus"
                  onClick={handleBookNewService}
                  className="w-full"
                >
                  Book New Service
                </Button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div>
              <h2 className="text-lg font-semibold text-text-primary mb-4">Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickStats.map((stat, index) => (
                  <QuickStatsCard key={index} {...stat} />
                ))}
              </div>
            </div>

            {/* Upcoming Bookings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">Upcoming Bookings</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ArrowRight"
                  onClick={handleViewAllBookings}
                  className="text-primary-600 hover:text-primary-700"
                >
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {upcomingBookings.slice(0, 2).map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onReschedule={handleRescheduleBooking}
                    onCancel={handleCancelBooking}
                    onRebook={handleRebookService}
                    onRate={handleRateService}
                  />
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h2>
              <div className="bg-surface border border-border rounded-lg divide-y divide-border">
                {recentActivities.slice(0, 3).map((activity) => (
                  <RecentActivityItem
                    key={activity.id}
                    activity={activity}
                    onRate={handleRateService}
                    onRebook={handleRebookService}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-4">
                <QuickActionCard
                  title="Emergency Cleaning"
                  description="Need urgent cleaning service?"
                  icon="Zap"
                  buttonText="Book Emergency"
                  onClick={() => handleQuickAction('emergency')}
                  color="warning"
                />
                <div className="grid grid-cols-2 gap-4">
                  <QuickActionCard
                    title="Support"
                    description="Get help"
                    icon="MessageCircle"
                    buttonText="Contact"
                    onClick={() => handleQuickAction('support')}
                    color="secondary"
                  />
                  <QuickActionCard
                    title="Refer"
                    description="Earn rewards"
                    icon="Users"
                    buttonText="Refer"
                    onClick={() => handleQuickAction('referral')}
                    color="success"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;