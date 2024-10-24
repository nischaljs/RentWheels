import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    const login = async (credentials) => {
        // Make request to backend to login
        // Example: const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify(credentials) });
        // const data = await response.json();
        // setAuth(data);
    };

    const logout = () => {
        // Make request to backend to logout
        // Example: await fetch('/api/logout', { method: 'POST' });
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};