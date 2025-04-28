import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ManageMovements from '../../components/Manage/ManageMovements';
import { getTransactions } from '../../components/requests/getTransactions';
import { getToken } from '../../components/requests/jwtManage';
import { IoMdEye } from "react-icons/io";

// Mock the required modules
jest.mock('../../components/requests/getTransactions');
jest.mock('../../components/requests/jwtManage');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
    NavLink: jest.fn(({ children }) => children)
}));
jest.mock('react-icons/io', () => ({
    IoMdEye: () => <div data-testid="eye-icon" />
}));

describe('ManageMovements Component', () => {
    const mockTransactions = [
        {
            tipo: 'Deposito',
            fecha: '2024-04-27',
            monto: 1000,
            cuenta_principal_id: '123',
            cuenta_destino_id: '123'
        },
        {
            tipo: 'Retiro',
            fecha: '2024-04-27',
            monto: 500,
            cuenta_principal_id: '123',
            cuenta_destino_id: '123'
        },
        {
            tipo: 'Transferencia',
            fecha: '2024-04-27',
            monto: 750,
            cuenta_principal_id: '123',
            cuenta_destino_id: '456'
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        getToken.mockReturnValue('mock-token');
        getTransactions.mockResolvedValue(mockTransactions);
    });

    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <ManageMovements />
            </BrowserRouter>
        );
    };

    test('renders movements table with correct headers', () => {
        renderComponent();
        
        expect(screen.getByText('Bienvenido a sus movimientos')).toBeInTheDocument();
        expect(screen.getByText('Movimientos')).toBeInTheDocument();
        expect(screen.getByText('Tipo transferencia')).toBeInTheDocument();
        expect(screen.getByText('Fecha')).toBeInTheDocument();
        expect(screen.getByText('Total')).toBeInTheDocument();
    });

    test('fetches and displays transaction data correctly', async () => {
        renderComponent();

        await waitFor(() => {
            mockTransactions.forEach(transaction => {
                expect(screen.getByText(transaction.tipo)).toBeInTheDocument();
                // Usar getAllByText para las fechas ya que pueden estar duplicadas
                const fechaElements = screen.getAllByText(transaction.fecha);
                expect(fechaElements.length).toBeGreaterThan(0);
                expect(screen.getByText(`$${transaction.monto}`)).toBeInTheDocument();
            });
        });
    });

    test('applies correct CSS classes based on transaction type', async () => {
        renderComponent();

        await waitFor(async () => {
            // Esperar a que todos los tipos de transacción estén presentes
            expect(screen.getByText('Deposito')).toBeInTheDocument();
            expect(screen.getByText('Retiro')).toBeInTheDocument();
            expect(screen.getByText('Transferencia')).toBeInTheDocument();

            // Obtener todas las filas que contienen los tipos de transacción
            const depositoRow = screen.getByText('Deposito').closest('tr');
            const retiroRow = screen.getByText('Retiro').closest('tr');
            const transferenciaRow = screen.getByText('Transferencia').closest('tr');

            // Verificar las clases CSS
            expect(depositoRow).toHaveClass('movement-green');
            expect(retiroRow).toHaveClass('movement-red');
            expect(transferenciaRow).toHaveClass('movement-yellow');
        });
    });

    test('redirects to login when no token is present', () => {
        getToken.mockReturnValue(null);
        const mockNavigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate')
            .mockImplementation(() => mockNavigate);

        renderComponent();

        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    test('handles failed transaction fetch', async () => {
        const consoleLogSpy = jest.spyOn(console, 'log');
        getTransactions.mockResolvedValue(null);

        renderComponent();

        await waitFor(() => {
            expect(screen.queryByRole('row')).toBeTruthy();
            expect(screen.queryByText('$1000')).not.toBeInTheDocument();
        });

        consoleLogSpy.mockRestore();
    });

    test('renders "Ver Saldo" link correctly', () => {
        renderComponent();

        expect(screen.getByText('Quizas buscababas el saldo?')).toBeInTheDocument();
        expect(screen.getByTestId('eye-icon')).toBeInTheDocument();
        expect(screen.getByText('Ver Saldo')).toBeInTheDocument();
    });
});