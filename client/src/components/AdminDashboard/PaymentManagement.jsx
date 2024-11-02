import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        // Uncomment the line below to fetch data from the API
        // const response = await axios.get('/api/payments');
        // setPayments(response.data);

        // Sample data for now
        const samplePayments = [
          { id: 1, amount: 299.99, status: 'COMPLETED' },
          { id: 2, amount: 199.99, status: 'PENDING' },
        ];
        setPayments(samplePayments);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div>
      <h2>Payment Management</h2>
      <ul>
        {payments.map(payment => (
          <li key={payment.id}>Amount: ${payment.amount} - Status: {payment.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentManagement;
