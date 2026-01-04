import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'token';

interface DecodedToken {
    numero_cuenta?: string;
    exp?: number;
    [key: string]: any;
}

/**
 * Token storage utilities for managing JWT authentication tokens
 * Uses sessionStorage to persist tokens across browser sessions
 */
export const tokenStorage = {
    save: (token: string): void => {
        sessionStorage.setItem(TOKEN_KEY, token);
    },

    get: (): string | null => {
        return sessionStorage.getItem(TOKEN_KEY);
    },

    remove: (): void => {
        sessionStorage.removeItem(TOKEN_KEY);
    },

    decode: (): DecodedToken | null => {
        const token = sessionStorage.getItem(TOKEN_KEY);
        if (!token) return null;
        try {
            return jwtDecode<DecodedToken>(token);
        } catch (error) {
            // JWT decode failed - token might be malformed
            console.error('Error decoding token:', error);
            return null;
        }
    },

    getCurrentAccount: (): string | null => {
        const decoded = tokenStorage.decode();
        return decoded?.numero_cuenta || null;
    },

    /**
     * Validates if the stored token is still valid
     * Checks both presence and expiration time
     */
    isValid: (): boolean => {
        const token = tokenStorage.get();
        if (!token) return false;

        const decoded = tokenStorage.decode();
        if (!decoded || !decoded.exp) return false;

        // Convert expiration time from seconds to milliseconds and compare with current time
        return decoded.exp * 1000 > Date.now();
    }
};

export const getToken = (): string | null => tokenStorage.get();
export const saveToken = (token: string): void => tokenStorage.save(token);
export const removeToken = (): void => tokenStorage.remove();
export const getCurrentAccount = (): string | null => tokenStorage.getCurrentAccount();
