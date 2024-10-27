
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import LoadingPage from '../pages/Loading';
const API_URL = import.meta.env.VITE_API_URL;
// Create a context for authentication
const AuthContext = createContext();

// Provide a hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component to wrap around parts of the app that need access to auth state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // To handle loading state
    const [error, setError] = useState(null); // To handle errors

    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(API_URL+'/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });
                console.log('User profile:', response.data);
                setUser(response.data.data);
            } catch (err) {
                console.error('Error fetching user profile:', err);
                setError('Failed to fetch user profile');
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchUserProfile();
    }, [token]);


    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); // Clear the token on logout
    };

    const value = {
        user,
        logout,
        loading,
        error,
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? <LoadingPage/> : children} {/* Show loading state while fetching user profile */}
        </AuthContext.Provider>
    );
};
