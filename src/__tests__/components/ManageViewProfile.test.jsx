import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ManageViewProfile from '../../components/Manage/ManageViewProfile';
import { getUserInfo } from '../../components/requests/getUserInfo';
import { updateUserInfo } from '../../components/requests/updateUserInfo';

// Mock de las dependencias
jest.mock('../../components/requests/getUserInfo');
jest.mock('../../components/requests/updateUserInfo');

describe('ManageViewProfile Component', () => {
    const mockUserData = {
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        numero_cuenta: '123456789',
        tipo: 'Ahorros'
    };

    beforeEach(() => {
        jest.clearAllMocks();
        // Mock de getUserInfo por defecto
        getUserInfo.mockResolvedValue(mockUserData);
    });

    test('renders profile view with correct headings and fields', async () => {
        render(<ManageViewProfile />);

        // Verificar elementos estáticos
        expect(screen.getByText('Detalle perfil')).toBeInTheDocument();
        expect(screen.getByText('Nombre:')).toBeInTheDocument();
        expect(screen.getByText('Correo asociado:')).toBeInTheDocument();
        expect(screen.getByText('Número de cuenta:')).toBeInTheDocument();
        expect(screen.getByText('Tipo de cuenta:')).toBeInTheDocument();
    });

    test('loads and displays user data correctly', async () => {
        render(<ManageViewProfile />);

        await waitFor(() => {
            expect(screen.getByDisplayValue('Juan Pérez')).toBeInTheDocument();
            expect(screen.getByDisplayValue('juan@example.com')).toBeInTheDocument();
            expect(screen.getByDisplayValue('123456789')).toBeInTheDocument();
            expect(screen.getByDisplayValue('Ahorros')).toBeInTheDocument();
        });
    });

    test('enables editing mode when edit button is clicked', async () => {
        render(<ManageViewProfile />);

        // Esperar a que los datos se carguen
        await waitFor(() => {
            expect(screen.getByDisplayValue('Juan Pérez')).toBeInTheDocument();
        });

        // Click en el botón de editar
        const editButton = screen.getByText('Editar');
        fireEvent.click(editButton);

        // Verificar que los campos editables están habilitados
        const nameInput = screen.getByDisplayValue('Juan Pérez');
        const emailInput = screen.getByDisplayValue('juan@example.com');
        expect(nameInput).not.toBeDisabled();
        expect(emailInput).not.toBeDisabled();

        // Verificar que los campos no editables siguen deshabilitados
        const accountNumberInput = screen.getByDisplayValue('123456789');
        const accountTypeInput = screen.getByDisplayValue('Ahorros');
        expect(accountNumberInput).toBeDisabled();
        expect(accountTypeInput).toBeDisabled();
    });

    test('validates empty fields when trying to edit', async () => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
        render(<ManageViewProfile />);

        await waitFor(() => {
            expect(screen.getByDisplayValue('Juan Pérez')).toBeInTheDocument();
        });

        // Limpiar campos
        const nameInput = screen.getByDisplayValue('Juan Pérez');
        fireEvent.change(nameInput, { target: { value: '' } });

        // Intentar editar
        const editButton = screen.getByText('Editar');
        fireEvent.click(editButton);

        expect(alertMock).toHaveBeenCalledWith('Por favor, complete todos los campos');
        alertMock.mockRestore();
    });

    test('updates user information successfully', async () => {
        const confirmMock = jest.spyOn(window, 'confirm').mockImplementation(() => true);
        updateUserInfo.mockResolvedValueOnce({ success: true });

        render(<ManageViewProfile />);

        await waitFor(() => {
            expect(screen.getByDisplayValue('Juan Pérez')).toBeInTheDocument();
        });

        // Activar modo edición
        fireEvent.click(screen.getByText('Editar'));

        // Modificar datos
        const nameInput = screen.getByDisplayValue('Juan Pérez');
        fireEvent.change(nameInput, { target: { value: 'Juan González' } });

        // Actualizar datos
        const updateButton = screen.getByText('Actualizar datos');
        fireEvent.click(updateButton);

        await waitFor(() => {
            expect(updateUserInfo).toHaveBeenCalledWith({
                name: 'Juan González',
                email: 'juan@example.com',
                accountNumber: '123456789'
            });
        });

        confirmMock.mockRestore();
    });

    test('handles API error gracefully', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        getUserInfo.mockRejectedValueOnce(new Error('Error al cargar los datos'));

        render(<ManageViewProfile />);

        await waitFor(() => {
            // Verificar que el mensaje de error se muestra
            expect(screen.getByText(/Error: Error al cargar los datos/)).toBeInTheDocument();
            
            // Verificar que los campos están vacíos
            expect(screen.getByLabelText(/Nombre:/)).toHaveValue('');
            expect(screen.getByLabelText(/Correo asociado:/)).toHaveValue('');
            expect(screen.getByLabelText(/Número de cuenta:/)).toHaveValue('');
            expect(screen.getByLabelText(/Tipo de cuenta:/)).toHaveValue('');
        });

        consoleErrorSpy.mockRestore();
    });

    test('cancels editing mode correctly', async () => {
        render(<ManageViewProfile />);

        await waitFor(() => {
            expect(screen.getByDisplayValue('Juan Pérez')).toBeInTheDocument();
        });

        // Activar modo edición
        fireEvent.click(screen.getByText('Editar'));
        
        // Verificar que aparece el botón de cancelar
        expect(screen.getByText('Cancelar')).toBeInTheDocument();
        
        // Cancelar edición
        fireEvent.click(screen.getByText('Cancelar'));
        
        // Verificar que volvemos al modo de visualización
        expect(screen.getByText('Editar')).toBeInTheDocument();
        expect(screen.queryByText('Actualizar datos')).not.toBeInTheDocument();
    });
});