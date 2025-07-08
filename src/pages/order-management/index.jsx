import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import BottomNavigation from '../../components/ui/BottomNavigation';
import OrderFilters from './components/OrderFilters';
import OrderList from './components/OrderList';
import OrderDetailPanel from './components/OrderDetailPanel';



const OrderManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState('mobile');

  // Mock orders data
  const mockOrders = [
    {
      id: 'ORD-001',
      serviceType: 'Deep Cleaning',
      status: 'upcoming',
      date: '2024-01-20',
      time: '10:00',
      duration: '3 hours',
      address: '123 Main St, Apt 4B, New York, NY 10001',
      rooms: ['Living Room', 'Kitchen', 'Bedroom', 'Bathroom'],
      addOns: ['Window Cleaning', 'Carpet Cleaning'],
      instructions: 'Please focus on the kitchen area. There are some stubborn stains on the countertop.',
      cleaner: {
        id: 'CLN-001',
        name: 'Maria Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        rating: 4.9,
        completedJobs: 247,
        experience: '5 years',
        bio: 'Professional cleaner with expertise in deep cleaning and eco-friendly products.',
        specializations: ['Deep Cleaning', 'Eco-Friendly Products', 'Pet-Safe Cleaning'],
        recentReviews: [
          { rating: 5, comment: 'Excellent service! Very thorough and professional.', customer: 'Sarah M.' },
          { rating: 5, comment: 'Always on time and does a fantastic job.', customer: 'Mike R.' }
        ]
      },
      pricing: {
        base: 120,
        addOns: 40,
        discount: 0,
        total: 160
      },
      rated: false,
      timeline: [
        { time: '2024-01-15 09:00', event: 'Order placed', status: 'completed' },
        { time: '2024-01-15 09:05', event: 'Payment confirmed', status: 'completed' },
        { time: '2024-01-15 09:10', event: 'Cleaner assigned', status: 'completed' },
        { time: '2024-01-20 08:00', event: 'Service reminder sent', status: 'upcoming' }
      ]
    },
    {
      id: 'ORD-002',
      serviceType: 'Regular Cleaning',
      status: 'in-progress',
      date: '2024-01-16',
      time: '14:00',
      duration: '2 hours',
      address: '456 Oak Avenue, Brooklyn, NY 11201',
      rooms: ['Living Room', 'Kitchen', 'Bathroom'],
      addOns: [],
      instructions: 'Keys are under the doormat. Please lock up when finished.',
      cleaner: {
        id: 'CLN-002',
        name: 'James Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        rating: 4.8,
        completedJobs: 189,
        experience: '4 years',
        specializations: ['Regular Cleaning', 'Quick Service', 'Apartment Cleaning']
      },
      pricing: {
        base: 80,
        addOns: 0,
        discount: 8,
        total: 72
      },
      progress: {
        percentage: 65,
        currentTask: 'Cleaning bathroom - almost finished',
        estimatedCompletion: '15:30'
      },
      rated: false,
      timeline: [
        { time: '2024-01-14 10:00', event: 'Order placed', status: 'completed' },
        { time: '2024-01-14 10:05', event: 'Payment confirmed', status: 'completed' },
        { time: '2024-01-14 10:15', event: 'Cleaner assigned', status: 'completed' },
        { time: '2024-01-16 14:00', event: 'Service started', status: 'completed' },
        { time: '2024-01-16 14:45', event: 'Currently cleaning', status: 'current' }
      ]
    },
    {
      id: 'ORD-003',
      serviceType: 'Office Cleaning',
      status: 'upcoming',
      date: '2024-01-22',
      time: '18:00',
      duration: '4 hours',
      address: '789 Business Plaza, Suite 200, Manhattan, NY 10005',
      rooms: ['Reception', 'Conference Room', 'Office Spaces', 'Kitchen', 'Restrooms'],
      addOns: ['Carpet Cleaning', 'Window Cleaning'],
      instructions: 'After hours cleaning. Security code is 1234. Please clean all workstations.',
      cleaner: {
        id: 'CLN-003',
        name: 'Lisa Chen',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        rating: 4.9,
        completedJobs: 312,
        experience: '6 years',
        specializations: ['Office Cleaning', 'Commercial Spaces', 'After Hours Service']
      },
      pricing: {
        base: 200,
        addOns: 60,
        discount: 20,
        total: 240
      },
      rated: false
    },
    {
      id: 'ORD-004',
      serviceType: 'Deep Cleaning',
      status: 'completed',
      date: '2024-01-10',
      time: '09:00',
      duration: '5 hours',
      address: '321 Park Street, Queens, NY 11375',
      rooms: ['Living Room', 'Kitchen', 'Bedroom', 'Bathroom', 'Balcony'],
      addOns: ['Refrigerator Cleaning', 'Oven Cleaning'],
      instructions: 'Move-in cleaning. Property is empty.',
      cleaner: {
        id: 'CLN-001',
        name: 'Maria Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        rating: 4.9,
        completedJobs: 247
      },
      pricing: {
        base: 180,
        addOns: 50,
        discount: 0,
        total: 230
      },
      rated: true,
      customerRating: 5,
      customerReview: 'Outstanding service! Maria was very professional and thorough.'
    },
    {
      id: 'ORD-005',
      serviceType: 'Regular Cleaning',
      status: 'cancelled',
      date: '2024-01-12',
      time: '11:00',
      duration: '2 hours',
      address: '654 Elm Street, Bronx, NY 10451',
      rooms: ['Living Room', 'Kitchen'],
      addOns: [],
      instructions: '',
      cleaner: {
        id: 'CLN-004',
        name: 'Robert Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        rating: 4.7,
        completedJobs: 156
      },
      pricing: {
        base: 60,
        addOns: 0,
        discount: 0,
        total: 60
      },
      cancellationReason: 'Customer requested cancellation due to schedule conflict',
      rated: false
    }
  ];

  // Filter orders based on active tab, search, and date range
  const filteredOrders = mockOrders.filter(order => {
    // Filter by status
    if (order.status !== activeTab) return false;

    // Filter by search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        order.serviceType.toLowerCase().includes(searchLower) ||
        order.cleaner.name.toLowerCase().includes(searchLower) ||
        order.address.toLowerCase().includes(searchLower) ||
        order.id.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Filter by date range
    if (dateRange.start && dateRange.end) {
      const orderDate = new Date(order.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      if (orderDate < startDate || orderDate > endDate) return false;
    }

    return true;
  });

  // Detect screen size for view mode
  useEffect(() => {
    const handleResize = () => {
      setViewMode(window.innerWidth >= 1024 ? 'desktop' : 'mobile');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // Order action handlers
  const handleReschedule = (orderId) => {
    console.log('Reschedule order:', orderId);
    // Navigate to booking flow with pre-filled data
    navigate('/service-booking-flow', { state: { rescheduleOrderId: orderId } });
  };

  const handleCancel = (orderId) => {
    console.log('Cancel order:', orderId);
    // Show confirmation dialog and handle cancellation
  };

  const handleModify = (orderId) => {
    console.log('Modify order:', orderId);
    // Navigate to booking flow with modification mode
    navigate('/service-booking-flow', { state: { modifyOrderId: orderId } });
  };

  const handleTrack = (orderId) => {
    console.log('Track order:', orderId);
    // Open tracking modal or navigate to tracking page
  };

  const handleRate = (orderId) => {
    console.log('Rate order:', orderId);
    // Open rating modal
  };

  const handleRebook = (orderId) => {
    console.log('Rebook order:', orderId);
    // Navigate to booking flow with previous order data
    navigate('/service-booking-flow', { state: { rebookOrderId: orderId } });
  };

  const handleMessage = (orderId) => {
    console.log('Message cleaner for order:', orderId);
    // Open messaging interface
  };

  const handleCall = (orderId) => {
    console.log('Call support for order:', orderId);
    // Initiate support call
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  if (viewMode === 'desktop') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 lg:ml-80">
            <div className="h-screen flex flex-col">
              <OrderFilters
                activeTab={activeTab}
                onTabChange={setActiveTab}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                onRefresh={handleRefresh}
                isRefreshing={isRefreshing}
              />
              
              <div className="flex-1 flex overflow-hidden">
                {/* Order List - Left Panel */}
                <div className="w-2/5 border-r border-border overflow-y-auto">
                  <OrderList
                    orders={filteredOrders}
                    onReschedule={handleReschedule}
                    onCancel={handleCancel}
                    onModify={handleModify}
                    onTrack={handleTrack}
                    onRate={handleRate}
                    onRebook={handleRebook}
                    onMessage={handleMessage}
                    onCall={handleCall}
                    onSelectOrder={handleSelectOrder}
                    selectedOrderId={selectedOrder?.id}
                    viewMode="desktop"
                  />
                </div>
                
                {/* Order Detail - Right Panel */}
                <div className="flex-1">
                  <OrderDetailPanel
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onReschedule={handleReschedule}
                    onCancel={handleCancel}
                    onModify={handleModify}
                    onTrack={handleTrack}
                    onRate={handleRate}
                    onRebook={handleRebook}
                    onMessage={handleMessage}
                    onCall={handleCall}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      
      <main className="flex flex-col h-screen pt-16">
        <OrderFilters
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />
        
        <div className="flex-1 overflow-y-auto">
          <OrderList
            orders={filteredOrders}
            onReschedule={handleReschedule}
            onCancel={handleCancel}
            onModify={handleModify}
            onTrack={handleTrack}
            onRate={handleRate}
            onRebook={handleRebook}
            onMessage={handleMessage}
            onCall={handleCall}
            viewMode="mobile"
          />
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default OrderManagement;