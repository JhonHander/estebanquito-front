import { apiClient } from '@shared/api/client';

export const transactionService = {
    async deposit(amount) {
        const response = await apiClient.post('/deposit', { amount: Number(amount) });
        return response;
    },

    async withdraw(amount) {
        const response = await apiClient.post('/withdraw', { amount: Number(amount) });
        return response;
    },

    async transfer({ accountNumber, destinationAccountNumber, amount }) {
        const response = await apiClient.post('/transfer', {
            accountNumber,
            destinationAccountNumber,
            amount: Number(amount),
        });
        return response;
    },

    async getTransactions() {
        const response = await apiClient.get('/transactions');
        return response;
    },
};
