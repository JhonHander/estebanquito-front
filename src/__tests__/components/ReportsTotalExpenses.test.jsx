import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReportsTotalOutcome from '../../components/Report/ReportsTotalExpenses';
import { UserContext } from '../../components/context/userContext';
import { getReportTotalOutcome } from '../../components/requests/getTotalOutcome';

// Mock del módulo getTotalOutcome
jest.mock('../../components/requests/getTotalOutcome');

describe('ReportsTotalOutcome Component', () => {
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
                <ReportsTotalOutcome />
            </UserContext.Provider>
        );
        
        expect(screen.getByText('Total de Egresos')).toBeInTheDocument();
        expect(screen.getByText(/Usuario Test, el total de egresos de tu cuenta:/)).toBeInTheDocument();
    });

    test('muestra "Cargando..." mientras los datos se están cargando', () => {
        render(
            <UserContext.Provider value={{ user: null }}>
                <ReportsTotalOutcome />
            </UserContext.Provider>
        );
        
        const loadingInInputGroup = screen.getByText((content, element) => {
            return content === 'Cargando...' && element.closest('.input-group') !== null;
        });
        expect(loadingInInputGroup).toBeInTheDocument();
    });

    test('muestra el total de egresos cuando la API responde exitosamente', async () => {
        const mockTotalOutcome = 500;
        getReportTotalOutcome.mockResolvedValueOnce({ totalOutcome: mockTotalOutcome });

        render(
            <UserContext.Provider value={{ user: mockUser }}>
                <ReportsTotalOutcome />
            </UserContext.Provider>
        );

        await waitFor(() => {
            const input = screen.getByRole('textbox');
            expect(input.value).toBe(mockTotalOutcome.toString());
        });
    });

    test('muestra "No disponible" cuando hay un error en la API', async () => {
        getReportTotalOutcome.mockResolvedValueOnce({ totalOutcome: undefined });

        render(
            <UserContext.Provider value={{ user: mockUser }}>
                <ReportsTotalOutcome />
            </UserContext.Provider>
        );

        await waitFor(() => {
            const input = screen.getByRole('textbox');
            expect(input.value).toBe('No disponible');
        });
    });

    test('maneja errores de red correctamente', async () => {
        getReportTotalOutcome.mockRejectedValueOnce(new Error('Network error'));

        render(
            <UserContext.Provider value={{ user: mockUser }}>
                <ReportsTotalOutcome />
            </UserContext.Provider>
        );

        await waitFor(() => {
            const input = screen.getByRole('textbox');
            expect(input.value).toBe('No disponible');
        });
    });
});