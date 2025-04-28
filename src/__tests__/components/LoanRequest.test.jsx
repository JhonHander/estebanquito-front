import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoanRequest from '../../components/Loan/LoanRequest';
import { askForLoan } from '../../components/requests/askForLoan';

// Mock the askForLoan function
jest.mock('../../components/requests/askForLoan');

// Mock window.confirm
const mockConfirm = jest.fn();
window.confirm = mockConfirm;

// Mock window.alert
const mockAlert = jest.fn();
window.alert = mockAlert;

describe('LoanRequest Component', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        askForLoan.mockResolvedValue({ success: true });
    });

    it('renders loan request form correctly', () => {
        render(<LoanRequest />);
        
        expect(screen.getByRole('heading', { name: 'Solicitar préstamo' })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ingresa el valor del préstamo')).toBeInTheDocument();
        expect(screen.getByText('Plazo')).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveTextContent('Solicitar préstamo');
    });

    it('updates form values when user inputs data', () => {
        render(<LoanRequest />);
        
        const amountInput = screen.getByPlaceholderText('Ingresa el valor del préstamo');
        const termSelect = screen.getByRole('combobox');

        fireEvent.change(amountInput, { target: { value: '1000' } });
        fireEvent.change(termSelect, { target: { value: '4' } });

        expect(amountInput.value).toBe('1000');
        expect(termSelect.value).toBe('4');
    });

    it('validates empty fields', async () => {
        render(<LoanRequest />);
        
        const submitButton = screen.getByRole('button');
        fireEvent.click(submitButton);

        expect(mockAlert).toHaveBeenCalledWith('Por favor, complete todos los campos');
        expect(askForLoan).not.toHaveBeenCalled();
    });

    it('validates negative amount', async () => {
        render(<LoanRequest />);
        
        const amountInput = screen.getByPlaceholderText('Ingresa el valor del préstamo');
        fireEvent.change(amountInput, { target: { value: '-100' } });
        
        const submitButton = screen.getByRole('button');
        fireEvent.click(submitButton);

        expect(mockAlert).toHaveBeenCalledWith('Por favor, ingrese un monto válido');
        expect(askForLoan).not.toHaveBeenCalled();
    });

    it('submits loan request successfully', async () => {
        render(<LoanRequest />);
        
        // Fill form
        const amountInput = screen.getByPlaceholderText('Ingresa el valor del préstamo');
        const termSelect = screen.getByRole('combobox');
        fireEvent.change(amountInput, { target: { value: '1000' } });
        fireEvent.change(termSelect, { target: { value: '4' } });

        // Mock confirm dialog to return true
        mockConfirm.mockReturnValue(true);

        // Submit form
        const submitButton = screen.getByRole('button');
        fireEvent.click(submitButton);

        // Verify confirm dialog was shown
        expect(mockConfirm).toHaveBeenCalledWith('¿Estás seguro de solicitar el préstamo?');

        // Verify loading state
        expect(screen.getByText('Cargando...')).toBeInTheDocument();

        // Wait for the process to complete
        await waitFor(() => {
            expect(askForLoan).toHaveBeenCalledWith('1000', '4');
            expect(mockAlert).toHaveBeenCalledWith('Has solicitado un préstamo de $1000 a pagar en 4.');
        });
    });

    it('cancels loan request when user clicks cancel in confirm dialog', () => {
        render(<LoanRequest />);
        
        // Fill form
        const amountInput = screen.getByPlaceholderText('Ingresa el valor del préstamo');
        const termSelect = screen.getByRole('combobox');
        fireEvent.change(amountInput, { target: { value: '1000' } });
        fireEvent.change(termSelect, { target: { value: '4' } });

        // Mock confirm dialog to return false
        mockConfirm.mockReturnValue(false);

        // Submit form
        const submitButton = screen.getByRole('button');
        fireEvent.click(submitButton);

        // Verify confirm dialog was shown but askForLoan was not called
        expect(mockConfirm).toHaveBeenCalled();
        expect(askForLoan).not.toHaveBeenCalled();
    });

    it('handles loan request failure correctly', async () => {
        // Mock askForLoan to reject
        const mockError = new Error('Failed to request loan');
        askForLoan.mockRejectedValueOnce(mockError);

        render(<LoanRequest />);
        
        // Fill form
        const amountInput = screen.getByPlaceholderText('Ingresa el valor del préstamo');
        const termSelect = screen.getByRole('combobox');
        fireEvent.change(amountInput, { target: { value: '1000' } });
        fireEvent.change(termSelect, { target: { value: '4' } });

        // Mock confirm dialog to return true
        mockConfirm.mockReturnValue(true);

        // Create spy for console.error
        const consoleSpy = jest.spyOn(console, 'error');

        // Submit form
        const submitButton = screen.getByRole('button');
        fireEvent.click(submitButton);

        // Verify loading state is shown initially
        expect(screen.getByText('Cargando...')).toBeInTheDocument();

        // Wait for the error to be handled
        await waitFor(() => {
            // Verify error was logged
            expect(consoleSpy).toHaveBeenCalledWith('Error al solicitar el préstamo:', mockError);
            // Verify error message was shown to user
            expect(mockAlert).toHaveBeenCalledWith('Hubo un error al procesar tu solicitud');
            // Verify loading state is removed
            expect(screen.getByRole('button')).toHaveTextContent('Solicitar préstamo');
        });

        // Clean up spy
        consoleSpy.mockRestore();
    });
});