export const APP_CONFIG = {
    APP_NAME: import.meta.env.VITE_APP_NAME || 'Estebanquito',
    APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
};

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',

    ACCOUNT: {
        BALANCE: '/gestionar/ver-saldo',
        MOVEMENTS: '/gestionar/movimientos',
        PROFILE: '/gestionar/detalle-perfil',
    },

    TRANSACTIONS: {
        TRANSFER: '/transacciones/transferir-dinero',
        DEPOSIT: '/transacciones/depositar',
        WITHDRAW: '/transacciones/retirar',
    },

    LOANS: {
        REQUEST: '/prestamos/solicitar-prestamo',
    },

    REPORTS: {
        INCOME: '/reportes/total-ingresos',
        EXPENSES: '/reportes/total-egresos',
        DEBTS: '/reportes/deudas',
    },
};
