import React from 'react';
import { Car, DollarSign, ClipboardCheck } from 'lucide-react'; // Lucide icons

const WhyChooseUs = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white p-8 shadow-lg rounded-lg my-10">
      {/* Left section with heading, description, and button */}
      <div className="w-full md:w-1/2 p-4">
        <h3 className="text-indigo-600 font-bold text-lg mb-2">Why Choose Us</h3>
        <h2 className="text-3xl font-extrabold mb-4">
          Best valued deals you will ever find
        </h2>
        <p className="text-gray-600 mb-6">
          Discover the best deals you'll ever find with our unbeatable offers. 
          We’re dedicated to providing you with the best value for your money, so you can enjoy top-quality services and products without breaking the bank. Our deals are designed to give you the ultimate renting experience, so don’t miss out on your chance to save big.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Find Details
        </button>
      </div>

      {/* Right section with icons and benefits */}
      <div className="w-full md:w-1/2 p-4 grid grid-cols-1 gap-6">
        <div className="flex items-start">
          <div className="p-3 bg-red-100 rounded-full">
            <Car className="w-6 h-6 text-red-600" />
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-bold">Cross Country Drive</h4>
            <p className="text-gray-600">
              Take your driving experience to the next level with our top-notch vehicles for your cross-country adventures.
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="p-3 bg-blue-100 rounded-full">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-bold">All Inclusive Pricing</h4>
            <p className="text-gray-600">
              Get everything you need in one convenient, transparent price with our all-inclusive pricing policy.
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="p-3 bg-green-100 rounded-full">
            <ClipboardCheck className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-bold">No Hidden Charges</h4>
            <p className="text-gray-600">
              Enjoy peace of mind with our no hidden charges policy. We believe in transparent and honest pricing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
