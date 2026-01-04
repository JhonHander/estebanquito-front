import { useContext } from 'react';
import { AuthContext } from '../model/AuthContext';

/**
 * Custom hook for accessing authentication context
 * Must be used within an AuthProvider component
 * @returns Authentication context with user data and auth methods
 * @throws Error if used outside of AuthProvider
 */
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
