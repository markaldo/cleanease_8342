import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderDetailPanel = ({ order, onClose, onReschedule, onCancel, onModify, onTrack, onRate, onRebook, onMessage, onCall }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!order) {
    return (
      <div className="h-full flex items-center justify-center bg-secondary-50">
        <div className="text-center">
          <Icon name="ClipboardList" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">Select an Order</h3>
          <p className="text-text-secondary">Choose an order from the list to view details</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'text-primary bg-primary-50 border-primary-100';
      case 'in-progress': return 'text-warning bg-warning-50 border-warning-100';
      case 'completed': return 'text-success bg-success-50 border-success-100';
      case 'cancelled': return 'text-error bg-error-50 border-error-100';
      default: return 'text-secondary bg-secondary-50 border-secondary-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming': return 'Clock';
      case 'in-progress': return 'Play';
      case 'completed': return 'CheckCircle';
      case 'cancelled': return 'XCircle';
      default: return 'Circle';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: 'FileText' },
    { id: 'cleaner', label: 'Cleaner', icon: 'User' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' }
  ];

  const renderQuickActions = () => {
    switch (order.status) {
      case 'upcoming':
        return (
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Calendar"
              onClick={() => onReschedule(order.id)}
            >
              Reschedule
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Edit"
              onClick={() => onModify(order.id)}
            >
              Modify Service
            </Button>
            <Button
              variant="danger"
              size="sm"
              iconName="X"
              onClick={() => onCancel(order.id)}
            >
              Cancel
            </Button>
          </div>
        );
      case 'in-progress':
        return (
          <div className="flex flex-wrap gap-2">
            <Button
              variant="primary"
              size="sm"
              iconName="MapPin"
              onClick={() => onTrack(order.id)}
            >
              Track Live
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              onClick={() => onMessage(order.id)}
            >
              Message Cleaner
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              onClick={() => onCall(order.id)}
            >
              Call Support
            </Button>
          </div>
        );
      case 'completed':
        return (
          <div className="flex flex-wrap gap-2">
            {!order.rated && (
              <Button
                variant="warning"
                size="sm"
                iconName="Star"
                onClick={() => onRate(order.id)}
              >
                Rate Service
              </Button>
            )}
            <Button
              variant="primary"
              size="sm"
              iconName="RotateCcw"
              onClick={() => onRebook(order.id)}
            >
              Book Again
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderDetailsTab = () => (
    <div className="space-y-6">
      {/* Service Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-text-primary">Service Information</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between">
            <span className="text-text-secondary">Service Type</span>
            <span className="font-medium text-text-primary">{order.serviceType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Duration</span>
            <span className="font-medium text-text-primary">{order.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Date & Time</span>
            <div className="text-right">
              <div className="font-medium text-text-primary">{formatDate(order.date)}</div>
              <div className="text-sm text-text-secondary">{formatTime(order.time)}</div>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Rooms</span>
            <span className="font-medium text-text-primary">{order.rooms.join(', ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Add-ons</span>
            <span className="font-medium text-text-primary">
              {order.addOns.length > 0 ? order.addOns.join(', ') : 'None'}
            </span>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-text-primary">Service Address</h3>
        <div className="p-3 bg-secondary-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="MapPin" size={16} className="text-text-secondary mt-0.5" />
            <span className="text-text-primary">{order.address}</span>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-text-primary">Pricing Breakdown</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-text-secondary">Base Service</span>
            <span className="text-text-primary">${order.pricing.base}</span>
          </div>
          {order.pricing.addOns > 0 && (
            <div className="flex justify-between">
              <span className="text-text-secondary">Add-ons</span>
              <span className="text-text-primary">${order.pricing.addOns}</span>
            </div>
          )}
          {order.pricing.discount > 0 && (
            <div className="flex justify-between">
              <span className="text-success">Discount</span>
              <span className="text-success">-${order.pricing.discount}</span>
            </div>
          )}
          <div className="border-t border-border pt-2">
            <div className="flex justify-between font-medium text-lg">
              <span className="text-text-primary">Total</span>
              <span className="text-text-primary">${order.pricing.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Special Instructions */}
      {order.instructions && (
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-text-primary">Special Instructions</h3>
          <div className="p-3 bg-secondary-50 rounded-lg">
            <p className="text-text-primary">{order.instructions}</p>
          </div>
        </div>
      )}

      {/* Progress for In-Progress Orders */}
      {order.status === 'in-progress' && order.progress && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text-primary">Current Progress</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Overall Progress</span>
              <span className="font-medium text-text-primary">{order.progress.percentage}%</span>
            </div>
            <div className="w-full bg-secondary-100 rounded-full h-3">
              <div
                className="bg-primary h-3 rounded-full transition-all duration-300"
                style={{ width: `${order.progress.percentage}%` }}
              />
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <p className="text-primary font-medium">{order.progress.currentTask}</p>
              {order.progress.estimatedCompletion && (
                <p className="text-sm text-primary mt-1">
                  Estimated completion: {formatTime(order.progress.estimatedCompletion)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCleanerTab = () => (
    <div className="space-y-6">
      {/* Cleaner Profile */}
      <div className="text-center">
        <Image
          src={order.cleaner.avatar}
          alt={order.cleaner.name}
          className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
        />
        <h3 className="text-xl font-medium text-text-primary mb-2">{order.cleaner.name}</h3>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={16} className="text-warning fill-current" />
            <span className="font-medium text-text-primary">{order.cleaner.rating}</span>
          </div>
          <span className="text-text-muted">•</span>
          <span className="text-text-secondary">{order.cleaner.completedJobs} jobs completed</span>
        </div>
      </div>

      {/* Contact Actions */}
      <div className="flex space-x-3">
        <Button
          variant="outline"
          size="sm"
          iconName="MessageCircle"
          onClick={() => onMessage(order.id)}
          className="flex-1"
        >
          Message
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Phone"
          onClick={() => onCall(order.id)}
          className="flex-1"
        >
          Call Support
        </Button>
      </div>

      {/* Cleaner Details */}
      <div className="space-y-4">
        <h4 className="font-medium text-text-primary">About</h4>
        <p className="text-text-secondary">
          {order.cleaner.bio || `${order.cleaner.name} is a professional cleaner with ${order.cleaner.experience || '3+'} years of experience. They specialize in residential and commercial cleaning services.`}
        </p>
      </div>

      {/* Skills & Specializations */}
      <div className="space-y-4">
        <h4 className="font-medium text-text-primary">Specializations</h4>
        <div className="flex flex-wrap gap-2">
          {(order.cleaner.specializations || ['Deep Cleaning', 'Regular Cleaning', 'Office Cleaning']).map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-50 text-primary text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="space-y-4">
        <h4 className="font-medium text-text-primary">Recent Reviews</h4>
        <div className="space-y-3">
          {(order.cleaner.recentReviews || [
            { rating: 5, comment: "Excellent service! Very thorough and professional.", customer: "Sarah M." },
            { rating: 5, comment: "Always on time and does a fantastic job.", customer: "Mike R." }
          ]).map((review, index) => (
            <div key={index} className="p-3 bg-secondary-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      className={i < review.rating ? 'text-warning fill-current' : 'text-secondary-200'}
                    />
                  ))}
                </div>
                <span className="text-sm text-text-secondary">- {review.customer}</span>
              </div>
              <p className="text-sm text-text-primary">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTimelineTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-text-primary">Order Timeline</h3>
      <div className="space-y-4">
        {(order.timeline || [
          { time: '2024-01-15 09:00', event: 'Order placed', status: 'completed' },
          { time: '2024-01-15 09:05', event: 'Payment confirmed', status: 'completed' },
          { time: '2024-01-15 09:10', event: 'Cleaner assigned', status: 'completed' },
          { time: '2024-01-16 08:00', event: 'Service scheduled', status: order.status === 'upcoming' ? 'upcoming' : 'completed' }
        ]).map((event, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`w-3 h-3 rounded-full mt-2 ${
              event.status === 'completed' ? 'bg-success' : 
              event.status === 'current' ? 'bg-primary' : 'bg-secondary-200'
            }`} />
            <div className="flex-1">
              <p className="font-medium text-text-primary">{event.event}</p>
              <p className="text-sm text-text-secondary">
                {new Date(event.time).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-surface">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-medium text-text-primary">{order.serviceType}</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
            <Icon name={getStatusIcon(order.status)} size={14} className="inline mr-1" />
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onClose}
          title="Close details"
        />
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-border">
        {renderQuickActions()}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-smooth ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'details' && renderDetailsTab()}
        {activeTab === 'cleaner' && renderCleanerTab()}
        {activeTab === 'timeline' && renderTimelineTab()}
      </div>
    </div>
  );
};

export default OrderDetailPanel;