// api.js
import axios from 'axios';

// Load environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API calls
export const login = (credentials) => api.post('/users/login', credentials);
export const register = (userData) => api.post('/users/register', userData);
export const getVehicles = (params) => api.get('/vehicles', { params });
export const addVehicle = (vehicleData) => api.post('/vehicles/add', vehicleData);
export const bookVehicle = (bookingData) => api.post('/bookings', bookingData);
export const getUserProfile = () => api.get('/users/profile');

// Add more API calls as needed

export default api;
