import React from 'react';
import { render, screen, within, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ManageViewBalance from '../../components/Manage/ManageViewBalance';
import { getUserInfo } from '../../components/requests/getUserInfo';

// Mock de las dependencias
jest.mock('../../components/requests/getUserInfo');
jest.mock('react-icons/gr', () => ({
    GrTransaction: () => <div data-testid="transaction-icon" />
}));

describe('ManageViewBalance Component', () => {
    const mockUserData = {
        tipo: 'Ahorros',
        numero_cuenta: '123456789',
        saldo: 1000
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders initial state correctly', () => {
        render(
            <BrowserRouter>
                <ManageViewBalance />
            </BrowserRouter>
        );

        // Verificar elementos estáticos usando selectores más específicos
        const title = screen.getByRole('heading', { level: 1, name: 'Saldo' });
        expect(title).toBeInTheDocument();
        
        expect(screen.getByText('Saldo de cuentas')).toBeInTheDocument();
        
        // Verificar los encabezados de la tabla
        const tableHeaders = screen.getAllByRole('columnheader');
        expect(tableHeaders[0]).toHaveTextContent('Tipo');
        expect(tableHeaders[1]).toHaveTextContent('Número');
        expect(tableHeaders[2]).toHaveTextContent('Saldo');
    });

    test('displays user account information correctly', async () => {
        getUserInfo.mockResolvedValueOnce(mockUserData);

        render(
            <BrowserRouter>
                <ManageViewBalance />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Ahorros')).toBeInTheDocument();
            expect(screen.getByText('123456789')).toBeInTheDocument();
            expect(screen.getByText('$1000')).toBeInTheDocument();
        });
    });

    test('handles empty or invalid user data', async () => {
        getUserInfo.mockResolvedValueOnce({});

        render(
            <BrowserRouter>
                <ManageViewBalance />
            </BrowserRouter>
        );

        // Verificar que no hay filas de datos en el tbody
        await waitFor(() => {
            const rows = screen.queryAllByRole('row');
            // Solo debería existir la fila del encabezado
            expect(rows.length).toBe(1);
        });
    });

    test('renders movements section correctly', () => {
        render(
            <BrowserRouter>
                <ManageViewBalance />
            </BrowserRouter>
        );

        expect(screen.getByText('Deseas ver los movimientos?')).toBeInTheDocument();
        expect(screen.getByTestId('transaction-icon')).toBeInTheDocument();
        expect(screen.getByText('Ver Movimientos')).toBeInTheDocument();
    });

    test('handles API error gracefully', async () => {
        // Mock console.error to avoid error messages in test output
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        
        // Simulate API error
        getUserInfo.mockRejectedValueOnce(new Error('API Error'));

        render(
            <BrowserRouter>
                <ManageViewBalance />
            </BrowserRouter>
        );

        await waitFor(() => {
            // Verify error was logged
            expect(consoleErrorSpy).toHaveBeenCalled();
            
            // Table should be empty but still rendered
            const rows = screen.getAllByRole('row');
            expect(rows.length).toBe(1); // Only header row should be present
        });

        // Cleanup
        consoleErrorSpy.mockRestore();
    });
});