
import React from "react";

// Primary Button
export const PrimaryButton = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${className}`}
  >
    {children}
  </button>
);

// Secondary Button
export const SecondaryButton = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${className}`}
  >
    {children}
  </button>
);

// Danger Button
export const DangerButton = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${className}`}
  >
    {children}
  </button>
);


