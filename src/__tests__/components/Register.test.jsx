import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Register from '../../components/Register/Register';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();
global.alert = jest.fn();

describe('Register Component', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        useNavigate.mockImplementation(() => mockNavigate);
        global.fetch.mockClear();
        global.alert.mockClear();
    });

    test('renders register form', () => {
        render(<Register />);
        
        expect(screen.getByText('Registro')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ingrese su número de celular')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ingrese su nombre')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ingrese su email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ingrese su contraseña')).toBeInTheDocument();
        expect(screen.getByText('Tipo de cuenta')).toBeInTheDocument();
    });

    test('handles input changes', () => {
        render(<Register />);
        
        const accountInput = screen.getByPlaceholderText('Ingrese su número de celular');
        fireEvent.change(accountInput, { target: { value: '1234567890' } });
        expect(accountInput.value).toBe('1234567890');
        
        const nameInput = screen.getByPlaceholderText('Ingrese su nombre');
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        expect(nameInput.value).toBe('John Doe');
    });

    test('shows validation error when form is submitted with empty fields', () => {
        render(<Register />);
        
        const submitButton = screen.getByText('Registrarse');
        fireEvent.click(submitButton);
        
        expect(global.alert).toHaveBeenCalledWith('Por favor, complete todos los campos');
    });

    test('handles successful registration', async () => {
        const mockResponse = { ok: true, json: () => Promise.resolve({ message: 'Success' }) };
        global.fetch.mockResolvedValueOnce(mockResponse);
        
        render(<Register />);
        
        // Fill in the form
        fireEvent.change(screen.getByPlaceholderText('Ingrese su número de celular'), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByPlaceholderText('Ingrese su nombre'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Ingrese su email'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Ingrese su contraseña'), { target: { value: 'password123' } });
        
        // Submit form
        fireEvent.click(screen.getByText('Registrarse'));
        
        await waitFor(() => {
            expect(screen.getByText('Registro exitoso bienvenido a Estebanquito')).toBeInTheDocument();
        });
        
        // Wait for navigation
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        }, { timeout: 2000 });
    });

    test('handles registration error', async () => {
        const mockResponse = { ok: false, json: () => Promise.resolve({ message: 'Error message' }) };
        global.fetch.mockResolvedValueOnce(mockResponse);
        
        render(<Register />);
        
        // Fill in the form
        fireEvent.change(screen.getByPlaceholderText('Ingrese su número de celular'), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByPlaceholderText('Ingrese su nombre'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Ingrese su email'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Ingrese su contraseña'), { target: { value: 'password123' } });
        
        // Submit form
        fireEvent.click(screen.getByText('Registrarse'));
        
        await waitFor(() => {
            expect(screen.getByText('Error message')).toBeInTheDocument();
        });
    });

    test('handles network error during registration', async () => {
        // Mock fetch to reject with network error
        global.fetch.mockRejectedValueOnce(new Error('Failed to fetch'));
        
        render(<Register />);
        
        // Fill in the form
        fireEvent.change(screen.getByPlaceholderText('Ingrese su número de celular'), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByPlaceholderText('Ingrese su nombre'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Ingrese su email'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Ingrese su contraseña'), { target: { value: 'password123' } });
        
        // Submit form
        fireEvent.click(screen.getByText('Registrarse'));
        
        // Verify error message is shown
        await waitFor(() => {
            expect(screen.getByText('Error al registrarse. Intentalo de nuevo o más tarde')).toBeInTheDocument();
        });
    });

    test('handles account type select changes', () => {
        render(<Register />);
        
        const typeSelect = screen.getByLabelText('Tipo de cuenta');
        expect(typeSelect.value).toBe('Corriente'); // Default value
        
        fireEvent.change(typeSelect, { target: { value: 'Ahorros' } });
        expect(typeSelect.value).toBe('Ahorros');
    });

    test('resets form fields after successful registration', async () => {
        const mockResponse = { ok: true, json: () => Promise.resolve({ message: 'Success' }) };
        global.fetch.mockResolvedValueOnce(mockResponse);
        
        render(<Register />);
        
        // Fill in the form
        const accountInput = screen.getByPlaceholderText('Ingrese su número de celular');
        const nameInput = screen.getByPlaceholderText('Ingrese su nombre');
        const emailInput = screen.getByPlaceholderText('Ingrese su email');
        const passwordInput = screen.getByPlaceholderText('Ingrese su contraseña');
        const typeSelect = screen.getByLabelText('Tipo de cuenta', { selector: 'select' });
        
        fireEvent.change(accountInput, { target: { value: '1234567890' } });
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(typeSelect, { target: { value: 'Ahorros' } });
        
        // Submit form
        fireEvent.click(screen.getByText('Registrarse'));
        
        // Verify fields are reset
        await waitFor(() => {
            expect(accountInput.value).toBe('');
            expect(nameInput.value).toBe('');
            expect(emailInput.value).toBe('');
            expect(passwordInput.value).toBe('');
            expect(typeSelect.value).toBe('Ahorros');
        });
    });
});