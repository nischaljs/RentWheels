import React, { useState } from 'react';
import { User, Lock, Briefcase } from 'lucide-react'; 
import Toggle from '../components/ui/Toggle';
import Input from '../components/ui/Input';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('User'); // Default role

  const roles = [
    { name: 'Admin', icon: <Briefcase className="w-6 h-6" /> },
    { name: 'Owner', icon: <User className="w-6 h-6" /> },
    { name: 'User', icon: <Lock className="w-6 h-6" /> },
  ];

  const handleRegister = () => {
    // Basic validation
    if (email && password && confirmPassword) {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      
      // Here you can implement your registration logic
      localStorage.setItem("user", JSON.stringify({ email, role: selectedRole }));
      alert("Registration successful! Redirecting to login...");
      window.location.href = "/login"; // Redirect to login page
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-500 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Register</h1>
        <p className="text-gray-600 mb-8">Select your role and enter your details</p>

        {/* Role Toggle */}
        <Toggle
          roles={roles}
          selectedRole={selectedRole}
          onChange={setSelectedRole}
        />

        {/* Email Input */}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Confirm Password Input */}
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 w-full"
        >
          Register
        </button>

        <p className="text-gray-500 text-sm mt-6">© 2024 Vehicle Rental. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Register;
