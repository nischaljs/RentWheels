import React, { useState } from 'react';
import { Menu, X, Car, User, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

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
          <a href="/" className="text-gray-600 hover:text-indigo-500">Home</a>
          <a href="/vehicles" className="text-gray-600 hover:text-indigo-500">Vehicles</a>
          <a href="/about" className="text-gray-600 hover:text-indigo-500">About Us</a>
          <a href="/contact" className="text-gray-600 hover:text-indigo-500">Contact</a>
        </div>

        {/* User login */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="/login" className="text-gray-600 hover:text-indigo-500">
            <LogIn className="w-5 h-5 inline-block" />
            <span className="ml-1">Login</span>
          </a>
          <a href="/profile" className="text-gray-600 hover:text-indigo-500">
            <User className="w-5 h-5 inline-block" />
            <span className="ml-1">Profile</span>
          </a>
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
          <a href="/" className="block text-gray-600 hover:text-indigo-500">Home</a>
          <a href="/vehicles" className="block text-gray-600 hover:text-indigo-500">Vehicles</a>
          <a href="/about" className="block text-gray-600 hover:text-indigo-500">About Us</a>
          <a href="/contact" className="block text-gray-600 hover:text-indigo-500">Contact</a>
          <a href="/login" className="block text-gray-600 hover:text-indigo-500">Login</a>
          <a href="/profile" className="block text-gray-600 hover:text-indigo-500">Profile</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
