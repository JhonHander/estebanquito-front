import { apiClient } from '@shared/api/client';

export const loanService = {
    async requestLoan(amount, term) {
        const response = await apiClient.post('/loan', {
            amount: Number(amount),
            term: Number(term),
        });
        return response;
    },
};
