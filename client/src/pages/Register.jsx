import React, { useState } from 'react';
import { Car, User, Lock, Briefcase, Mail, EyeOff, Eye, Phone, User as UserIcon } from 'lucide-react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState('User');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const roles = [
    { name: 'user', icon: User },
    { name: 'owner', icon: Briefcase },
  ];

  const validateForm = () => {
    if (!email || !password || !confirmPassword || !fullName || !phone) {
      setError('Please fill in all fields');
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleRegister = async () => {
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/users/register`, {
        email,
        password,
        fullName,
        phone,
        role: selectedRole.toUpperCase()
      });
      if (response.data.success) {
        localStorage.setItem('token', response.data.data); 
        window.location.href = `/${selectedRole}/dashboard`; 
      }
    } catch (err) {
      console.log(err);
      
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Car className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Rent Wheels</h2>
          <p className="mt-2 text-gray-600">Create your account</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-xl p-6 space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900">Sign Up</h3>
            <p className="text-sm text-gray-600">Choose your role and enter your details</p>
          </div>

          <div className="space-y-6">
            {/* Role Selection */}
            <div className="flex justify-center space-x-4">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.name}
                    onClick={() => setSelectedRole(role.name)}
                    className={`p-3 rounded-lg flex flex-col items-center transition-all ${
                      selectedRole === role.name
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-6 w-6 mb-1" />
                    <span className="text-sm">{role.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Registration Form */}
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>

            {/* Links */}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-500">
                Sign in
              </a>
            </div>
          </div>
        </div>

        <footer className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Rent Wheels. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Register;