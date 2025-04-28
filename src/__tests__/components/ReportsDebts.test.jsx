import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReportsDebts from '../../components/Report/ReportsDebts';
import { UserContext } from '../../components/context/userContext';
import { getReportTotalDebts } from '../../components/requests/getTotalDebts';

// Mock del módulo getTotalDebts
jest.mock('../../components/requests/getTotalDebts');

describe('ReportsDebts Component', () => {
    const mockUser = {
        nombre: 'Usuario Test'
    };

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
    });

    test('renderiza el componente correctamente', () => {
        render(
            <UserContext.Provider value={{ user: mockUser }}>
                <ReportsDebts />
            </UserContext.Provider>
        );
        
        expect(screen.getByText('Total de Egresos')).toBeInTheDocument();
        expect(screen.getByText(/Usuario Test, el total de las deudas que tiene:/)).toBeInTheDocument();
    });

    test('muestra "Cargando..." mientras los datos se están cargando', () => {
        render(
            <UserContext.Provider value={{ user: null }}>
                <ReportsDebts />
            </UserContext.Provider>
        );
        
        const loadingInInputGroup = screen.getByText((content, element) => {
            return content === 'Cargando...' && element.closest('.input-group') !== null;
        });
        expect(loadingInInputGroup).toBeInTheDocument();
    });

    test('muestra el total de deudas cuando la API responde exitosamente', async () => {
        const mockTotalDebts = 1000;
        getReportTotalDebts.mockResolvedValueOnce({ totalDebts: mockTotalDebts });

        render(
            <UserContext.Provider value={{ user: mockUser }}>
                <ReportsDebts />
            </UserContext.Provider>
        );

        await waitFor(() => {
            const input = screen.getByRole('textbox');
            expect(input.value).toBe(mockTotalDebts.toString());
        });
    });

    test('muestra "No disponible" cuando hay un error en la API', async () => {
        getReportTotalDebts.mockResolvedValueOnce({ totalDebts: undefined });

        render(
            <UserContext.Provider value={{ user: mockUser }}>
                <ReportsDebts />
            </UserContext.Provider>
        );

        await waitFor(() => {
            const input = screen.getByRole('textbox');
            expect(input.value).toBe('No disponible');
        });
    });

    test('maneja errores de red correctamente', async () => {
        getReportTotalDebts.mockRejectedValueOnce(new Error('Network error'));

        render(
            <UserContext.Provider value={{ user: mockUser }}>
                <ReportsDebts />
            </UserContext.Provider>
        );

        await waitFor(() => {
            const input = screen.getByRole('textbox');
            expect(input.value).toBe('No disponible');
        });
    });
});