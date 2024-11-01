import React, { useState } from 'react';
import { Car, User, Lock, Briefcase, Mail } from 'lucide-react';
import axios from 'axios';

const API_URL =import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('USER');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const roles = [
    { name: 'User', icon: User },
    { name: 'Owner', icon: Briefcase },
    { name: 'Admin', icon: Lock }
  ];

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Sending credentials to the backend
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
        role: selectedRole.toUpperCase()
      });
      
      

      if (response.data.success) {

        localStorage.setItem('token', response.data.data); 
        window.location.href = `/${selectedRole}/dashboard`; 
      }
      else{
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      if (err.response && err.response.status === 500) {
        setError('Invalid credentials. Please try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
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
          <p className="mt-2 text-gray-600">Access your rental dashboard</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-xl p-6 space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900">Welcome Back</h3>
            <p className="text-sm text-gray-600">Please sign in to continue</p>
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

            {/* Login Form */}
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
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            {/* Links */}
            <div className="space-y-2 text-center">
              <div className="text-sm">
                <a href="/forgot-password" className="text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
              <div className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/register" className="text-blue-600 hover:text-blue-500">
                  Sign up
                </a>
              </div>
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

export default Login;