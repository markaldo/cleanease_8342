import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BillingHistory = ({ 
  invoices = [], 
  onDownloadInvoice,
  className = '' 
}) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const statusColors = {
    paid: 'text-success bg-success-50 border-success-100',
    pending: 'text-warning bg-warning-50 border-warning-100',
    failed: 'text-error bg-error-50 border-error-100',
    refunded: 'text-secondary bg-secondary-50 border-secondary-100'
  };

  const getStatusIcon = (status) => {
    const icons = {
      paid: 'CheckCircle',
      pending: 'Clock',
      failed: 'XCircle',
      refunded: 'RotateCcw'
    };
    return icons[status] || 'Circle';
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (filter === 'all') return true;
    return invoice.status === filter;
  });

  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortBy === 'amount') {
      return b.amount - a.amount;
    }
    return 0;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Billing History
        </h3>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      </div>

      {/* Invoice List */}
      {sortedInvoices.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-text-muted mx-auto mb-4" />
          <h4 className="text-lg font-medium text-text-primary mb-2">
            No invoices found
          </h4>
          <p className="text-text-secondary">
            {filter === 'all' 
              ? "You don't have any invoices yet." : `No invoices with status"${filter}" found.`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="bg-surface border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-smooth"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                {/* Invoice Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-text-primary">
                      Invoice #{invoice.invoiceNumber}
                    </h4>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${statusColors[invoice.status]}`}>
                      <Icon name={getStatusIcon(invoice.status)} size={12} />
                      <span className="capitalize">{invoice.status}</span>
                    </span>
                  </div>
                  
                  <div className="text-sm text-text-secondary space-y-1">
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={14} />
                      <span>Service Date: {formatDate(invoice.serviceDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={14} />
                      <span>{invoice.serviceType} • {invoice.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="CreditCard" size={14} />
                      <span>Paid with {invoice.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                {/* Amount and Actions */}
                <div className="flex items-center justify-between sm:flex-col sm:items-end sm:space-y-2">
                  <div className="text-right">
                    <div className="text-lg font-heading font-bold text-text-primary">
                      {formatCurrency(invoice.amount)}
                    </div>
                    <div className="text-xs text-text-muted">
                      {formatDate(invoice.date)}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Download"
                      onClick={() => onDownloadInvoice(invoice.id)}
                      title="Download Invoice"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => console.log('View invoice', invoice.id)}
                      title="View Details"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Details for Failed/Pending */}
              {(invoice.status === 'failed' || invoice.status === 'pending') && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-text-secondary">
                      {invoice.status === 'failed' 
                        ? `Payment failed: ${invoice.failureReason}`
                        : 'Payment is being processed'
                      }
                    </div>
                    {invoice.status === 'failed' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => console.log('Retry payment', invoice.id)}
                      >
                        Retry Payment
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {sortedInvoices.length > 0 && sortedInvoices.length >= 10 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => console.log('Load more invoices')}
          >
            Load More Invoices
          </Button>
        </div>
      )}
    </div>
  );
};

export default BillingHistory;