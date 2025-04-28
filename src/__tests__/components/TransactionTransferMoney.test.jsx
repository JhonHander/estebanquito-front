import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TransactionsTransferMoney from '../../components/Transaction/TransactionsTransferMoney';
import { tranferMoney } from '../../components/requests/transferMoney';
import { getUserInfo } from '../../components/requests/getUserInfo';

// Mock the external modules
jest.mock('../../components/requests/transferMoney');
jest.mock('../../components/requests/getUserInfo');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    NavLink: jest.fn(({ children }) => children)
}));

describe('TransactionsTransferMoney Component', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
        window.alert = jest.fn();
        window.confirm = jest.fn();

        // Setup default mock implementations
        getUserInfo.mockResolvedValue({ numero_cuenta: '123456789' });
    });

    const renderComponent = () => {
        return render(
            <MemoryRouter>
                <TransactionsTransferMoney />
            </MemoryRouter>
        );
    };

    test('renders transfer money form', () => {
        renderComponent();
        
        expect(screen.getByText('Transferir dinero')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ingresa el valor a transferir')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ingresa el número de la cuenta')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Transferir' })).toBeInTheDocument();
    });

    test('handles input changes correctly', () => {
        renderComponent();
        
        const amountInput = screen.getByPlaceholderText('Ingresa el valor a transferir');
        const accountInput = screen.getByPlaceholderText('Ingresa el número de la cuenta');

        fireEvent.change(amountInput, { target: { name: 'amount', value: '1000' } });
        fireEvent.change(accountInput, { target: { name: 'destinationAccountNumber', value: '987654321' } });

        expect(amountInput.value).toBe('1000');
        expect(accountInput.value).toBe('987654321');
    });

    test('validates empty fields', async () => {
        renderComponent();
        
        const transferButton = screen.getByRole('button', { name: 'Transferir' });
        fireEvent.click(transferButton);

        expect(window.alert).toHaveBeenCalledWith('Por favor, complete todos los campos');
    });

    test('validates invalid amount', async () => {
        renderComponent();
        
        const amountInput = screen.getByPlaceholderText('Ingresa el valor a transferir');
        const accountInput = screen.getByPlaceholderText('Ingresa el número de la cuenta');
        const transferButton = screen.getByRole('button', { name: 'Transferir' });

        fireEvent.change(amountInput, { target: { name: 'amount', value: '0' } });
        fireEvent.change(accountInput, { target: { name: 'destinationAccountNumber', value: '987654321' } });
        fireEvent.click(transferButton);

        expect(window.alert).toHaveBeenCalledWith('Por favor, ingrese un monto válido');
    });

    test('successful transfer flow', async () => {
        window.confirm.mockReturnValue(true);
        tranferMoney.mockResolvedValue({ success: true });
        
        renderComponent();
        
        const amountInput = screen.getByPlaceholderText('Ingresa el valor a transferir');
        const accountInput = screen.getByPlaceholderText('Ingresa el número de la cuenta');
        const transferButton = screen.getByRole('button', { name: 'Transferir' });

        fireEvent.change(amountInput, { target: { name: 'amount', value: '1000' } });
        fireEvent.change(accountInput, { target: { name: 'destinationAccountNumber', value: '987654321' } });
        
        fireEvent.click(transferButton);

        await waitFor(() => {
            expect(tranferMoney).toHaveBeenCalledWith(expect.objectContaining({
                amount: '1000',
                destinationAccountNumber: '987654321'
            }));
            expect(window.alert).toHaveBeenCalledWith('Transferencia realizada con éxito');
        });
    });

    test('failed transfer flow', async () => {
        window.confirm.mockReturnValue(true);
        tranferMoney.mockResolvedValue({ success: false, message: 'Insufficient funds' });
        
        renderComponent();
        
        const amountInput = screen.getByPlaceholderText('Ingresa el valor a transferir');
        const accountInput = screen.getByPlaceholderText('Ingresa el número de la cuenta');
        const transferButton = screen.getByRole('button', { name: 'Transferir' });

        fireEvent.change(amountInput, { target: { name: 'amount', value: '1000' } });
        fireEvent.change(accountInput, { target: { name: 'destinationAccountNumber', value: '987654321' } });
        
        fireEvent.click(transferButton);

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Error al transferir el dinero: Insufficient funds');
        });
    });

    test('cancel transfer when user declines confirmation', async () => {
        window.confirm.mockReturnValue(false);
        
        renderComponent();
        
        const amountInput = screen.getByPlaceholderText('Ingresa el valor a transferir');
        const accountInput = screen.getByPlaceholderText('Ingresa el número de la cuenta');
        const transferButton = screen.getByRole('button', { name: 'Transferir' });

        fireEvent.change(amountInput, { target: { name: 'amount', value: '1000' } });
        fireEvent.change(accountInput, { target: { name: 'destinationAccountNumber', value: '987654321' } });
        
        fireEvent.click(transferButton);

        expect(tranferMoney).not.toHaveBeenCalled();
    });

    test('loads user account number on mount', async () => {
        renderComponent();

        await waitFor(() => {
            expect(getUserInfo).toHaveBeenCalled();
        });
    });
});