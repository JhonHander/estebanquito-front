import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReportsTotalIncome from '../../components/Report/ReportsTotalIncome';
import { UserContext } from '../../components/context/userContext';
import { getReportTotalIncome } from '../../components/requests/getTotalIncome';

// Mock del módulo getTotalIncome
jest.mock('../../components/requests/getTotalIncome');

describe('ReportsTotalIncome Component', () => {
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
                <ReportsTotalIncome />
            </UserContext.Provider>
        );
        
        expect(screen.getByText('Total Ingresos')).toBeInTheDocument();
        expect(screen.getByText(/Usuario Test, en total ha ingresado a tu cuenta:/)).toBeInTheDocument();
    });

    test('muestra "Cargando..." mientras los datos se están cargando', () => {
        render(
            <UserContext.Provider value={{ user: null }}>
                <ReportsTotalIncome />
            </UserContext.Provider>
        );
        
        const loadingInInputGroup = screen.getByText((content, element) => {
            return content === 'Cargando...' && element.closest('.input-group') !== null;
        });
        expect(loadingInInputGroup).toBeInTheDocument();
    });

    test('muestra el total de ingresos cuando la API responde exitosamente', async () => {
        const mockTotalIncome = 1500;
        getReportTotalIncome.mockResolvedValueOnce({ totalIncome: mockTotalIncome });

        render(
            <UserContext.Provider value={{ user: mockUser }}>
                <ReportsTotalIncome />
            </UserContext.Provider>
        );

        await waitFor(() => {
            const input = screen.getByRole('textbox');
            expect(input.value).toBe(mockTotalIncome.toString());
        });
    });

    test('muestra "No disponible" cuando hay un error en la API', async () => {
        getReportTotalIncome.mockResolvedValueOnce({ totalIncome: undefined });

        render(
            <UserContext.Provider value={{ user: mockUser }}>
                <ReportsTotalIncome />
            </UserContext.Provider>
        );

        await waitFor(() => {
            const input = screen.getByRole('textbox');
            expect(input.value).toBe('No disponible');
        });
    });

    test('maneja errores de red correctamente', async () => {
        getReportTotalIncome.mockRejectedValueOnce(new Error('Network error'));

        render(
            <UserContext.Provider value={{ user: mockUser }}>
                <ReportsTotalIncome />
            </UserContext.Provider>
        );

        await waitFor(() => {
            const input = screen.getByRole('textbox');
            expect(input.value).toBe('No disponible');
        });
    });
});