import React from 'react';
import { Bell, CheckCircle } from 'lucide-react';

const Notifications = ({ notifications }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg absolute">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id} className="border-b py-2 flex items-center justify-start space-x-3">
            <Bell className="text-blue-600 w-4" />
            <div>
              <p className="text-sm text-gray-700">{notification.message}</p>
            </div>
            <button className="ml-auto text-green-500 hover:text-green-700">
              <CheckCircle className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
