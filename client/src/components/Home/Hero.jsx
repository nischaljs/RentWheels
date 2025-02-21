import React, { useState } from 'react';
import { Search, Car, ArrowRight } from 'lucide-react';

const Hero = ({onSearch}) => {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(query); // Pass the query to Home component
  };

  return (
    <section className="relative bg-[url('home.png')] bg-cover bg-center h-screen flex items-center justify-center">
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Rent Your Dream Ride with <span className="text-indigo-500">RentWheels</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-2xl mb-8">
          Explore the best cars, manage bookings, and hit the road with ease!
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex justify-center space-x-4">
          {/* Explore Vehicles Button */}
          <a
            href="/vehicles"
            className="flex items-center px-6 py-3 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 transition duration-300"
          >
            <Car className="mr-2 w-5 h-5" />
            Explore Vehicles
          </a>

          {/* Sign Up Button */}
          <a
            href="/vehicles"
            className="flex items-center px-6 py-3 bg-gray-100 text-gray-900 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
          >
            <ArrowRight className="mr-2 w-5 h-5" />
            Get Started
          </a>
        </div>

        {/* Search Bar (optional) */}
        <div className="mt-10">
          <form 
          className="bg-white rounded-full shadow-lg flex items-center max-w-lg mx-auto px-4 py-2"
          onSubmit={handleSearchSubmit}
          >
            <Search className="text-gray-500 w-6 h-6" />
            <input
              type="text"
              className="w-full p-2 bg-transparent outline-none text-gray-700 placeholder-gray-500"
              placeholder="Search your ride..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
