import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'token';

export const tokenStorage = {
    save: (token) => {
        sessionStorage.setItem(TOKEN_KEY, token);
    },

    get: () => {
        return sessionStorage.getItem(TOKEN_KEY);
    },

    remove: () => {
        sessionStorage.removeItem(TOKEN_KEY);
    },

    decode: () => {
        const token = sessionStorage.getItem(TOKEN_KEY);
        if (!token) return null;
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    },

    getCurrentAccount: () => {
        const decoded = tokenStorage.decode();
        return decoded?.numero_cuenta || null;
    },

    isValid: () => {
        const token = tokenStorage.get();
        if (!token) return false;

        const decoded = tokenStorage.decode();
        if (!decoded || !decoded.exp) return false;

        return decoded.exp * 1000 > Date.now();
    }
};

export const getToken = () => tokenStorage.get();
export const saveToken = (token) => tokenStorage.save(token);
export const removeToken = () => tokenStorage.remove();
export const getCurrentAccount = () => tokenStorage.getCurrentAccount();
