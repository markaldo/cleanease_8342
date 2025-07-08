import React, { useState } from 'react';
import OrderCard from './OrderCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderList = ({ 
  orders, 
  loading = false,
  onReschedule,
  onCancel,
  onModify,
  onTrack,
  onRate,
  onRebook,
  onMessage,
  onCall,
  onSelectOrder,
  selectedOrderId,
  viewMode = 'mobile'
}) => {
  const [expandedOrders, setExpandedOrders] = useState(new Set());

  const handleToggleExpand = (orderId) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const handleOrderClick = (order) => {
    if (viewMode === 'desktop' && onSelectOrder) {
      onSelectOrder(order);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-surface border border-border rounded-lg p-4 animate-pulse">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-secondary-200 rounded w-1/3"></div>
                <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
                <div className="h-3 bg-secondary-200 rounded w-2/3"></div>
              </div>
              <div className="h-6 bg-secondary-200 rounded w-16"></div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-secondary-200 rounded-full"></div>
              <div className="h-3 bg-secondary-200 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
          <Icon name="ClipboardList" size={32} className="text-text-muted" />
        </div>
        <h3 className="text-lg font-medium text-text-primary mb-2">No orders found</h3>
        <p className="text-text-secondary text-center mb-6 max-w-sm">
          You don't have any orders in this category yet. Book your first cleaning service to get started.
        </p>
        <Button
          variant="primary"
          iconName="Plus"
          onClick={() => window.location.href = '/service-booking-flow'}
        >
          Book New Service
        </Button>
      </div>
    );
  }

  return (
    <div className={`${viewMode === 'mobile' ? 'space-y-4 p-4' : 'space-y-2'}`}>
      {orders.map((order) => (
        <div
          key={order.id}
          onClick={() => handleOrderClick(order)}
          className={viewMode === 'desktop' && selectedOrderId === order.id ? 'ring-2 ring-primary-500 rounded-lg' : ''}
        >
          <OrderCard
            order={order}
            onReschedule={onReschedule}
            onCancel={onCancel}
            onModify={onModify}
            onTrack={onTrack}
            onRate={onRate}
            onRebook={onRebook}
            onMessage={onMessage}
            onCall={onCall}
            isExpanded={expandedOrders.has(order.id)}
            onToggleExpand={handleToggleExpand}
            viewMode={viewMode}
          />
        </div>
      ))}
    </div>
  );
};

export default OrderList;