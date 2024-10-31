import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  Search,
} from 'lucide-react';
import api from '../services/api';

const UserAllPaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPayment, setExpandedPayment] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get('/payments/user/getpaymentDetails');
        setPayments(response.data.data);
      } catch (error) {
        if (error.code === 'ECONNABORTED') {
          console.error('Request timed out:', error);
        } else {
          console.error('Error fetching payments:', error);
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchPayments();
  }, []);
  
  const getStatusConfig = (status) => {
    const configs = {
      COMPLETED: {
        icon: CheckCircle,
        className: 'text-green-600 bg-green-50',
        label: 'Payment Completed',
      },
      PENDING: {
        icon: Clock,
        className: 'text-yellow-600 bg-yellow-50',
        label: 'Payment Pending',
      },
      FAILED: {
        icon: XCircle,
        className: 'text-red-600 bg-red-50',
        label: 'Payment Failed',
      },
      REFUNDED: {
        icon: RefreshCw,
        className: 'text-blue-600 bg-blue-50',
        label: 'Payment Refunded',
      },
    };
    return configs[status] || {
      icon: AlertCircle,
      className: 'text-gray-600 bg-gray-50',
      label: status,
    };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredPayments = payments.filter(
    (payment) =>
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.bookingId.toString().includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="animate-pulse flex justify-center items-center">
          <div className="text-gray-500">Loading payments...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow mt-16">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-gray-700" />
                Payment History
              </h1>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by Transaction ID or Booking ID"
                  className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Payments List */}
          <div className="divide-y divide-gray-100">
            {filteredPayments.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No payments found matching your search.
              </div>
            ) : (
              filteredPayments.map((payment) => {
                const statusConfig = getStatusConfig(payment.status);
                const StatusIcon = statusConfig.icon;
                const isExpanded = expandedPayment === payment.transactionId;

                return (
                  <div key={payment.transactionId} className="p-6 hover:bg-gray-50">
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        setExpandedPayment(
                          isExpanded ? null : payment.transactionId
                        )
                      }
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-semibold text-gray-900">
                              रु. {payment.amount.toFixed(2)}
                            </div>
                            <div
                              className={`px-3 py-1 rounded-full flex items-center space-x-2 ${statusConfig.className}`}
                            >
                              <StatusIcon className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                {statusConfig.label}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-500">
                            Transaction ID:{' '}
                            <code className="bg-gray-50 px-2 py-0.5 rounded">
                              {payment.transactionId}
                            </code>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-gray-500">
                            {formatDate(payment.createdAt)}
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <div className="text-sm font-medium text-gray-500 mb-1">
                                Booking ID
                              </div>
                              <div className="text-sm text-gray-900">
                                #{payment.bookingId}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <div className="text-sm font-medium text-gray-500 mb-1">
                                Last Updated
                              </div>
                              <div className="flex items-center text-sm text-gray-900">
                                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                {formatDate(payment.updatedAt)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAllPaymentDetails;