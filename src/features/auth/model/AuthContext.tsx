import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { userService } from '../api/auth.service';
import { getToken, removeToken } from '@shared/lib/storage/tokenStorage';

interface User {
    accountNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    refreshUser: () => void;
    logout: () => void;
    clearError: () => void;
}

/**
 * React Context for managing authentication state across the application
 * Provides user data, authentication status, and auth-related actions
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

/**
 * Authentication provider component that manages global auth state
 * Automatically fetches user data on mount if token exists
 * Handles token validation and user session management
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    /**
     * Fetches current user information from the API
     * Called on mount and when manually refreshing user data
     * Handles token validation and error states
     */
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
            setError(err instanceof Error ? err.message : 'Unknown error');
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initialize user data on component mount
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const refreshUser = () => {
        fetchUser();
    };

    /**
     * Logs out the current user by clearing all auth-related state
     * Removes stored tokens and resets authentication status
     */
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
