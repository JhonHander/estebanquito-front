import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TransactionsWithdraw from '../../components/Transaction/TransactionsWithdraw';
import { withdrawMoney } from '../../components/requests/withdrawMoney';

// Mock the external modules
jest.mock('../../components/requests/withdrawMoney');
jest.mock('react-icons/gr', () => ({
    GrLinkDown: () => <div data-testid="down-arrow-icon" />
}));

describe('TransactionsWithdraw Component', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
        // Mock window.alert and window.confirm
        window.alert = jest.fn();
        window.confirm = jest.fn();
        // Reset timers
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('renders withdraw form with all elements', () => {
        render(<TransactionsWithdraw />);
        
        // Check if all main elements are rendered
        expect(screen.getByText('Retirar dinero')).toBeInTheDocument();
        expect(screen.getByText('PIN:')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ingresa el valor a retirar')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Retirar' })).toBeInTheDocument();
        expect(screen.getByTestId('down-arrow-icon')).toBeInTheDocument();
    });

    test('generates random PIN on component mount', () => {
        render(<TransactionsWithdraw />);
        
        const pinInput = screen.getByRole('textbox');
        expect(pinInput).toBeInTheDocument();
        expect(pinInput.value).toMatch(/^\d{4}$/); // Should be a 4-digit number
        expect(pinInput.readOnly).toBe(true);
    });

    test('handles amount input changes', () => {
        render(<TransactionsWithdraw />);
        
        const amountInput = screen.getByPlaceholderText('Ingresa el valor a retirar');
        fireEvent.change(amountInput, { target: { value: '1000' } });
        expect(amountInput.value).toBe('1000');
    });

    test('shows alert when attempting to withdraw with invalid amount', () => {
        render(<TransactionsWithdraw />);
        
        const submitButton = screen.getByRole('button', { name: 'Retirar' });
        
        // Test with empty amount
        fireEvent.click(submitButton);
        expect(window.alert).toHaveBeenCalledWith('Por favor, ingresa un valor a retirar.');

        // Test with negative amount
        const amountInput = screen.getByPlaceholderText('Ingresa el valor a retirar');
        fireEvent.change(amountInput, { target: { value: '-100' } });
        fireEvent.click(submitButton);
        expect(window.alert).toHaveBeenCalledWith('Por favor, ingresa un valor a retirar.');
    });

    test('processes successful withdrawal', async () => {
        window.confirm.mockReturnValue(true);
        withdrawMoney.mockResolvedValue({ success: true });

        render(<TransactionsWithdraw />);
        
        // Fill in amount and submit
        const amountInput = screen.getByPlaceholderText('Ingresa el valor a retirar');
        const submitButton = screen.getByRole('button', { name: 'Retirar' });
        
        fireEvent.change(amountInput, { target: { value: '1000' } });
        fireEvent.click(submitButton);

        // Check if confirmation was shown
        expect(window.confirm).toHaveBeenCalledWith('¿Estás seguro de realizar la transferencia?');

        // Check if withdrawMoney was called
        expect(withdrawMoney).toHaveBeenCalledWith('1000');

        // Wait for loading state
        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Cargando...' })).toBeInTheDocument();
        });

        // Fast-forward timers
        jest.advanceTimersByTime(1500);

        await waitFor(() => {
            // Check success message
            expect(window.alert).toHaveBeenCalledWith('Has solicitado retirar $1000. No olvides recoger tu dinero.');
            // Check if amount was cleared
            expect(amountInput.value).toBe('');
            // Check if loading state was reset
            expect(screen.getByRole('button', { name: 'Retirar' })).toBeInTheDocument();
        });
    });

    test('cancels withdrawal when user declines confirmation', async () => {
        window.confirm.mockReturnValue(false);
        
        render(<TransactionsWithdraw />);
        
        const amountInput = screen.getByPlaceholderText('Ingresa el valor a retirar');
        const submitButton = screen.getByRole('button', { name: 'Retirar' });
        
        fireEvent.change(amountInput, { target: { value: '1000' } });
        fireEvent.click(submitButton);

        expect(window.confirm).toHaveBeenCalled();
        expect(withdrawMoney).not.toHaveBeenCalled();
        expect(amountInput.value).toBe('1000'); // Value should remain
    });
});