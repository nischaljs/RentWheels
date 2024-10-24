import React, { useState } from 'react';
import { User } from 'lucide-react'; // Use an icon for profile

const UserProfile = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ name, email, phone });
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="flex items-center space-x-2 mb-4">
        <User className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input 
            id="name" 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="border p-2 w-full rounded-md focus:outline-none focus:border-blue-500" 
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="border p-2 w-full rounded-md focus:outline-none focus:border-blue-500" 
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-gray-700">Phone</label>
          <input 
            id="phone" 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            className="border p-2 w-full rounded-md focus:outline-none focus:border-blue-500" 
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
