/**
 * Application configuration constants
 * Centralized configuration for environment variables and routing paths
 * Uses Vite's import.meta.env for environment variable access in production builds
 */
export const APP_CONFIG = {
    APP_NAME: import.meta.env.VITE_APP_NAME || 'Estebanquito',
    APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
};

/**
 * Route path constants for consistent navigation
 * Centralizes all route definitions to prevent hardcoded strings and enable easy refactoring
 * Nested structure mirrors the application's feature-based organization
 * Dashboard routes are prefixed with '/dashboard' as they are protected nested routes
 */
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',

    ACCOUNT: {
        BALANCE: '/dashboard/account/balance',
        MOVEMENTS: '/dashboard/account/movements',
        PROFILE: '/dashboard/account/profile',
    },

    TRANSACTIONS: {
        TRANSFER: '/dashboard/transactions/transfer',
        DEPOSIT: '/dashboard/transactions/deposit',
        WITHDRAW: '/dashboard/transactions/withdraw',
    },

    LOANS: {
        REQUEST: '/dashboard/loans/request',
    },

    REPORTS: {
        INCOME: '/dashboard/reports/income',
        EXPENSES: '/dashboard/reports/expenses',
        DEBTS: '/dashboard/reports/debts',
    },
};
