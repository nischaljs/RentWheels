import React from 'react';

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-lg py-2 px-4 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default Input;
