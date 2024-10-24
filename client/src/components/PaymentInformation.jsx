// Updated PaymentInformation Component

import React from 'react';
import { CreditCard } from 'lucide-react';

const PaymentInformation = ({ payment }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold flex items-center mb-4"><CreditCard className="mr-2" />Payment Information</h2>
      <div className="space-y-4">
        <p className="text-sm text-gray-700">Amount: ${payment.amount}</p>
        <p className="text-sm text-gray-700">Payment Status: {payment.status}</p>
        <p className="text-sm text-gray-700">Payment Token: {payment.token}</p>
      </div>
    </div>
  );
};

export default PaymentInformation;


