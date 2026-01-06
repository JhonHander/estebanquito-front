import { apiClient } from '@shared/api/client';

export const loanService = {
    async requestLoan(amount: number, term: number) {
        try {
            const response = await apiClient.post('/loan', {
                amount: Number(amount),
                term: Number(term),
            });
            return response;
        } catch (error) {
            console.warn('API requestLoan failed, using mock fallback:', error);
            return { message: "Solicitud de préstamo enviada (Mock)", amount, term };
        }
    },
};
