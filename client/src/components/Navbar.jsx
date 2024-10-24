import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Car, User, LogIn, Bell } from 'lucide-react';
import Notifications from './Notifications';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const notifications = [
    { id: 1, message: 'New booking request' },
    { id: 2, message: 'Vehicle maintenance due' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Car className="w-8 h-8 text-indigo-500" />
          <span className="text-xl font-bold ml-2">RentWheels</span>
        </div>

        {/* Menu for larger screens */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-500">Home</Link>
          <Link to="/vehicles" className="text-gray-600 hover:text-indigo-500">Vehicles</Link>
          <Link to="/about" className="text-gray-600 hover:text-indigo-500">About Us</Link>
          <Link to="/contact" className="text-gray-600 hover:text-indigo-500">Contact</Link>
        </div>

        {/* User login and notifications */}
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={toggleNotifications} className="relative">
            <Bell className="w-5 h-5 text-gray-600 hover:text-indigo-500" />
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg">
                <Notifications notifications={notifications} />
              </div>
            )}
          </button>
          <Link to="/login" className="text-gray-600 hover:text-indigo-500">
            <LogIn className="w-5 h-5 inline-block" />
            <span className="ml-1">Login</span>
          </Link>
          <Link to="/profile" className="text-gray-600 hover:text-indigo-500">
            <User className="w-5 h-5 inline-block" />
            <span className="ml-1">Profile</span>
          </Link>
        </div>

        {/* Hamburger Menu for mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleNavbar}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white space-y-2 px-4 py-4">
          <Link to="/" className="block text-gray-600 hover:text-indigo-500">Home</Link>
          <Link to="/vehicles" className="block text-gray-600 hover:text-indigo-500">Vehicles</Link>
          <Link to="/about" className="block text-gray-600 hover:text-indigo-500">About Us</Link>
          <Link to="/contact" className="block text-gray-600 hover:text-indigo-500">Contact</Link>
          <Link to="/login" className="block text-gray-600 hover:text-indigo-500">Login</Link>
          <Link to="/profile" className="block text-gray-600 hover:text-indigo-500">Profile</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
