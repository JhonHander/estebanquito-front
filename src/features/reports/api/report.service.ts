import { apiClient } from '@shared/api/client';

export const reportService = {
    async getTotalIncome() {
        const response = await apiClient.get('/total-income');
        return response;
    },

    async getTotalOutcome() {
        const response = await apiClient.get('/total-outcome');
        return response;
    },

    async getTotalDebts() {
        const response = await apiClient.get('/debts');
        return response;
    },
};
