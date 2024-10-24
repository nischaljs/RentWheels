// Notifications.jsx
import React from 'react';

const Notifications = ({ notifications }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id} className="border-b py-2">
            <p>{notification.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
