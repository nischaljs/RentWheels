// PaymentInformation.jsx
import React from 'react';

const PaymentInformation = ({ paymentMethods }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Information</h2>
      <ul>
        {paymentMethods.map(method => (
          <li key={method.id} className="border-b py-2 px-4">
            <p className="text-gray-700">{method.type} ending in {method.last_four_digits}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentInformation;
