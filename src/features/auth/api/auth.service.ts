import { getToken, saveToken, getCurrentAccount } from '@shared/lib/storage/tokenStorage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Mock data for portfolio fallback
const MOCK_USER = {
    accountNumber: "1234567890",
    firstName: "Usuario",
    lastName: "Demo",
    email: "demo@estebanquito.com",
    nombre: "Usuario Demo",
    numero_cuenta: "1234567890",
    tipo: "Corriente",
    balance: 98248000
};

interface LoginCredentials {
    accountNumber: string;
    password: string;
}

interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface AuthResponse {
    token?: string;
    message?: string;
    [key: string]: any;
}

interface UserInfo {
    accountNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    [key: string]: any;
}

/**
 * Authentication service for handling user login, registration, and user data retrieval
 * Manages JWT token lifecycle and API communication
 */
export const authService = {
    /**
     * Authenticates user with account number and password
     * Automatically saves token to storage upon successful login
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al iniciar sesión');
            }

            // Persist token for subsequent authenticated requests
            if (data.token) {
                saveToken(data.token);
            }

            return data;
        } catch (error) {
            console.warn('API Login failed, using mock fallback for portfolio:', error);
            // Fallback for portfolio: allow login with any credentials if API is down
            if (credentials.accountNumber === "1234567890" || credentials.accountNumber === "demo") {
                saveToken("mock-jwt-token");
                return { token: "mock-jwt-token", message: "Login exitoso (Mock)" };
            }
            throw error;
        }
    },

    /**
     * Registers a new user account
     * Validates user data on the server side
     */
    async register(userData: RegisterData): Promise<AuthResponse> {
        try {
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
        } catch (error) {
            console.warn('API Register failed, using mock fallback for portfolio:', error);
            return { message: "Registro exitoso (Mock)" };
        }
    },
};

/**
 * User service for retrieving and updating user profile information
 * Requires valid authentication token for all operations
 */
export const userService = {
    /**
     * Fetches current user's profile information
     * Uses account number from stored JWT token to identify user
     */
    async getUserInfo(): Promise<UserInfo> {
        const token = getToken();
        const accountNumber = getCurrentAccount();

        if (!token) {
            throw new Error('Usuario no autenticado');
        }

        try {
            // If it's a mock token, return mock user immediately
            if (token === "mock-jwt-token") return MOCK_USER as any;

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
        } catch (error) {
            console.warn('API getUserInfo failed, using mock fallback for portfolio:', error);
            return MOCK_USER as any;
        }
    },

    /**
     * Updates user profile information
     * Merges provided data with existing user record
     */
    async updateUserInfo(data: Partial<UserInfo>): Promise<UserInfo> {
        const token = getToken();

        if (!token) {
            throw new Error('Usuario no autenticado');
        }

        try {
            if (token === "mock-jwt-token") return MOCK_USER as any;

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
        } catch (error) {
            console.warn('API updateUserInfo failed, using mock fallback for portfolio:', error);
            return MOCK_USER as any;
        }
    },
};
