import React, { createContext, useContext, useState } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Provide a hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component to wrap around parts of the app that need access to auth state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Sample data for now, replace with API call later
    const login = () => {
        const sampleUser = { id: 1, username: 'sampleUser', token: 'sampleToken', role:'USER' };
        setUser(sampleUser);
    };

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};