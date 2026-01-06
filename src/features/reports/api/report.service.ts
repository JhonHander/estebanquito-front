import { apiClient } from '@shared/api/client';

export const reportService = {
    async getTotalIncome() {
        try {
            const response = await apiClient.get('/total-income');
            return response;
        } catch (error) {
            console.warn('API getTotalIncome failed, using mock fallback:', error);
            return { total: 32962000 };
        }
    },

    async getTotalOutcome() {
        try {
            const response = await apiClient.get('/total-outcome');
            return response;
        } catch (error) {
            console.warn('API getTotalOutcome failed, using mock fallback:', error);
            return { total: 15280000 };
        }
    },

    async getTotalDebts() {
        try {
            const response = await apiClient.get('/debts');
            return response;
        } catch (error) {
            console.warn('API getTotalDebts failed, using mock fallback:', error);
            return { total: 5400000 };
        }
    },
};
