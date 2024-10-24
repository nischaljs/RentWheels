// Support.jsx
import React from 'react';

const Support = () => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800">Support</h2>
      <p className="text-gray-600">If you have any questions, please contact our support team.</p>
      <form className="mt-4">
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700">Message</label>
          <textarea id="message" className="border p-2 w-full rounded-md" rows="4" placeholder="Enter your message..." />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">Send</button>
      </form>
    </div>
  );
};

export default Support;
