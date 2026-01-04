const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

interface RequestOptions extends RequestInit {
    headers?: Record<string, string>;
}

/**
 * Generic API client for making HTTP requests to the backend
 * Handles JSON serialization, error responses, and provides typed methods
 */
export const apiClient = {
    baseURL: API_BASE_URL,

    /**
     * Makes a generic HTTP request with JSON handling
     * @param endpoint - API endpoint path (without base URL)
     * @param options - Request options including headers, method, etc.
     * @returns Promise resolving to the response data
     * @throws Error if the request fails or returns an error status
     */
    async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;

        const config: RequestOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error en la petición');
        }

        return data;
    },

    /**
     * Convenience method for GET requests
     */
    async get<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    },

    /**
     * Convenience method for POST requests with automatic JSON serialization
     */
    async post<T = any>(endpoint: string, body: any, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
        });
    },

    /**
     * Convenience method for PUT requests with automatic JSON serialization
     */
    async put<T = any>(endpoint: string, body: any, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body),
        });
    },

    /**
     * Convenience method for DELETE requests
     */
    async delete<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    },
};

export const createAuthenticatedClient = (token) => ({
    ...apiClient,
    async request(endpoint, options = {}) {
        return apiClient.request(endpoint, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
            },
        });
    },
});
