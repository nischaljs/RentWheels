import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Car className="w-8 h-8 text-white" />
          <span className="text-xl font-bold ml-2 text-white">RentWheels</span>
        </div>

        {/* Menu for larger screens */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white hover:text-indigo-400 ${
                isActive ? 'font-bold' : 'font-normal'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/vehicles"
            className={({ isActive }) =>
              `text-white hover:text-indigo-400 ${
                isActive ? 'font-bold' : 'font-normal'
              }`
            }
          >
            Vehicles
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-white hover:text-indigo-400 ${
                isActive ? 'font-bold' : 'font-normal'
              }`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-white hover:text-indigo-400 ${
                isActive ? 'font-bold' : 'font-normal'
              }`
            }
          >
            Contact
          </NavLink>
        </div>

        {/* User login and notifications */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleNotifications}
            className="relative text-white hover:text-indigo-400"
          >
            <Bell className="w-5 h-5" />
            {showNotifications && (
              <div className="absolute z-50 right-0 mt-2 w-72 bg-white shadow-lg rounded-lg">
                <Notifications notifications={notifications} />
              </div>
            )}
          </button>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `text-white hover:text-indigo-400 ${
                isActive ? 'font-bold' : 'font-normal'
              }`
            }
          >
            <LogIn className="w-5 h-5 inline-block" />
            <span className="ml-1">Login</span>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `text-white hover:text-indigo-400 ${
                isActive ? 'font-bold' : 'font-normal'
              }`
            }
          >
            <User className="w-5 h-5 inline-block" />
            <span className="ml-1">Profile</span>
          </NavLink>
        </div>

        {/* Hamburger Menu for mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleNavbar}
            className="text-white hover:text-indigo-400"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block text-white py-2 px-4 hover:bg-indigo-600 ${
                isActive ? 'font-bold' : 'font-normal'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/vehicles"
            className={({ isActive }) =>
              `block text-white py-2 px-4 hover:bg-indigo-600 ${
                isActive ? 'font-bold' : 'font-normal'
              }`
            }
          >
            Vehicles
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block text-white py-2 px-4 hover:bg-indigo-600 ${
                isActive ? 'font-bold' : 'font-normal'
              }`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `block text-white py-2 px-4 hover:bg-indigo-600 ${
                isActive ? 'font-bold' : 'font-normal'
              }`
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `block text-white py-2 px-4 hover:bg-indigo-600 ${
                isActive ? 'font-bold' : 'font-normal'
              }`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `block text-white py-2 px-4 hover:bg-indigo-600 ${
                isActive ? 'font-bold' : 'font-normal'
              }`
            }
          >
            Profile
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;