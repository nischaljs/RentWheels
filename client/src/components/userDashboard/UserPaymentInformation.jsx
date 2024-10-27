import React from 'react';
import { CreditCard, Calendar, CheckCircle, XCircle, Clock, RefreshCw, AlertCircle } from 'lucide-react';

const UserPaymentInformation = ({ payment }) => {
  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Helper function to get status configuration
  const getStatusConfig = (status) => {
    const configs = {
      COMPLETED: {
        icon: CheckCircle,
        className: 'text-green-600 bg-green-50',
        label: 'Payment Completed'
      },
      PENDING: {
        icon: Clock,
        className: 'text-yellow-600 bg-yellow-50',
        label: 'Payment Pending'
      },
      FAILED: {
        icon: XCircle,
        className: 'text-red-600 bg-red-50',
        label: 'Payment Failed'
      },
      REFUNDED: {
        icon: RefreshCw,
        className: 'text-blue-600 bg-blue-50',
        label: 'Payment Refunded'
      }
    };
    return configs[status] || {
      icon: AlertCircle,
      className: 'text-gray-600 bg-gray-50',
      label: status
    };
  };

  const statusConfig = getStatusConfig(payment.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="bg-white rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-gray-700" />
            Payment Information
          </h2>
          <div className={`px-3 py-1 rounded-full flex items-center space-x-2 ${statusConfig.className}`}>
            <StatusIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{statusConfig.label}</span>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="p-6">
        {/* Amount */}
        <div className="mb-6">
          <div className="text-3xl font-bold text-gray-900">
          रु. {payment.amount.toFixed(2)}
          </div>
          <p className="text-sm text-gray-500 mt-1">Total Amount</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Transaction Details */}
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Transaction ID</div>
              <div className="flex items-center space-x-2">
                <code className="text-sm bg-gray-50 px-2 py-1 rounded">
                  {payment.token.substring(0, 12)}...
                </code>
                <button
                  className="text-blue-600 hover:text-blue-700 text-sm"
                  onClick={() => navigator.clipboard.writeText(payment.token)}
                >
                  Copy
                </button>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Booking ID</div>
              <div className="text-sm text-gray-900">#{payment.bookingId}</div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Created At</div>
              <div className="flex items-center text-sm text-gray-900">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                {formatDate(payment.createdAt)}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Last Updated</div>
              <div className="flex items-center text-sm text-gray-900">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                {formatDate(payment.updatedAt)}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-3">
          <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-150">
            View Receipt
          </button>
          <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-150">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPaymentInformation;