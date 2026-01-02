import React, { createContext, useState, useEffect, useCallback } from 'react';
import { userService } from '../api/auth.service';
import { getToken, removeToken } from '@shared/lib/storage/tokenStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const fetchUser = useCallback(async () => {
        const token = getToken();
        if (!token) {
            setLoading(false);
            setIsAuthenticated(false);
            return;
        }

        try {
            setLoading(true);
            const userData = await userService.getUserInfo();
            setUser(userData);
            setIsAuthenticated(true);
            setError(null);
        } catch (err) {
            console.error('Error fetching user:', err);
            setError(err.message);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const refreshUser = () => {
        fetchUser();
    };

    const logout = () => {
        removeToken();
        setUser(null);
        setIsAuthenticated(false);
        setError(null);
    };

    const clearError = () => {
        setError(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            loading,
            error,
            isAuthenticated,
            refreshUser,
            logout,
            clearError,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
