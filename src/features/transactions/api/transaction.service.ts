import { apiClient } from '@shared/api/client';

// Mock transactions for portfolio fallback
const MOCK_TRANSACTIONS = [
    { id: 1, name: "Apple Store", date: "Hoy, 10:23 AM", amount: -5200000, category: "Tecnología" },
    { id: 2, name: "Spotify Premium", date: "Ayer, 4:12 PM", amount: -24900, category: "Suscripción" },
    { id: 3, name: "Transferencia Recibida", date: "12 May, 2025", amount: 8500000, category: "Salario" },
    { id: 4, name: "Uber Ride", date: "11 May, 2025", amount: -18500, category: "Transporte" },
];

export const transactionService = {
    async deposit(amount: number) {
        try {
            const response = await apiClient.post('/deposit', { amount: Number(amount) });
            return response;
        } catch (error) {
            console.warn('API deposit failed, using mock fallback:', error);
            return { message: "Depósito exitoso (Mock)", amount };
        }
    },

    async withdraw(amount: number) {
        try {
            const response = await apiClient.post('/withdraw', { amount: Number(amount) });
            return response;
        } catch (error) {
            console.warn('API withdraw failed, using mock fallback:', error);
            return { message: "Retiro exitoso (Mock)", amount };
        }
    },

    async transfer({ accountNumber, destinationAccountNumber, amount }: any) {
        try {
            const response = await apiClient.post('/transfer', {
                accountNumber,
                destinationAccountNumber,
                amount: Number(amount),
            });
            return response;
        } catch (error) {
            console.warn('API transfer failed, using mock fallback:', error);
            return { message: "Transferencia exitosa (Mock)", amount };
        }
    },

    async getTransactions() {
        try {
            const response = await apiClient.get('/transactions');
            return response;
        } catch (error) {
            console.warn('API getTransactions failed, using mock fallback:', error);
            return MOCK_TRANSACTIONS;
        }
    },
};
