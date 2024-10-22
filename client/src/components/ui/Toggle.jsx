import React from 'react';

const Toggle = ({ roles, selectedRole, onChange }) => {
  return (
    <div className="flex justify-center items-center mb-4">
      {roles.map((role) => (
        <label key={role.name} className="flex items-center mx-2">
          <input
            type="radio"
            name="role"
            value={role.name}
            checked={selectedRole === role.name}
            onChange={() => onChange(role.name)}
            className="hidden"
          />
          <span className={`py-2 px-4 rounded-lg cursor-pointer flex flex-col items-center justify-center ${selectedRole === role.name ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} transition duration-300`}>
            <span>{role.icon}</span>
            {role.name}
          </span>
        </label>
      ))}
    </div>
  );
};

export default Toggle;
