import { getToken, saveToken, getCurrentAccount } from '@shared/lib/storage/tokenStorage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const authService = {
    async login(credentials) {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al iniciar sesión');
        }

        // Save token to localStorage
        if (data.token) {
            saveToken(data.token);
        }

        return data;
    },

    async register(userData) {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al registrarse');
        }

        return data;
    },
};

export const userService = {
    async getUserInfo() {
        const token = getToken();
        const accountNumber = getCurrentAccount();

        if (!token || !accountNumber) {
            throw new Error('Usuario no autenticado');
        }

        const response = await fetch(`${API_BASE_URL}/getUserByAccountNumber`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ accountNumber }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al obtener información del usuario');
        }

        return response.json();
    },

    async updateUserInfo(data) {
        const token = getToken();

        if (!token) {
            throw new Error('Usuario no autenticado');
        }

        const response = await fetch(`${API_BASE_URL}/updateUserByAccountNumber`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al actualizar datos');
        }

        return response.json();
    },
};
