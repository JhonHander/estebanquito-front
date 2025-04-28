import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../components/Login/Login';
import * as jwtManage from '../../components/requests/jwtManage';

// Mock the navigation function
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mock the JWT management functions
jest.mock('../../components/requests/jwtManage', () => ({
  saveToken: jest.fn(),
  getToken: jest.fn()
}));

// Mock fetch globally
global.fetch = jest.fn();

describe('Login Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  const renderLogin = () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  test('renders login form with all elements', () => {
    renderLogin();
    
    expect(screen.getByText('¡Hola!')).toBeInTheDocument();
    expect(screen.getByText('Completa los campos requeridos')).toBeInTheDocument();
    expect(screen.getByLabelText('Usuario')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Iniciar' })).toBeInTheDocument();
    expect(screen.getByText('¿No eres cliente?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Registrarse' })).toBeInTheDocument();
  });

  test('handles input changes correctly', () => {
    renderLogin();
    
    const accountInput = screen.getByLabelText('Usuario');
    const passwordInput = screen.getByLabelText('Contraseña');

    fireEvent.change(accountInput, { target: { value: '123456789' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(accountInput.value).toBe('123456789');
    expect(passwordInput.value).toBe('password123');
  });

  test('shows loading state during form submission', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'fake-token' })
      })
    );

    renderLogin();
    
    const accountInput = screen.getByLabelText('Usuario');
    const passwordInput = screen.getByLabelText('Contraseña');
    const submitButton = screen.getByRole('button');

    fireEvent.change(accountInput, { target: { value: '123456789' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Verificando...')).toBeInTheDocument();
    });
  });

  test('handles successful login correctly', async () => {
    const fakeToken = 'fake-token';
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: fakeToken })
      })
    );
    jwtManage.getToken.mockImplementation(() => fakeToken);

    renderLogin();
    
    const accountInput = screen.getByLabelText('Usuario');
    const passwordInput = screen.getByLabelText('Contraseña');
    const submitButton = screen.getByRole('button');

    fireEvent.change(accountInput, { target: { value: '123456789' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(jwtManage.saveToken).toHaveBeenCalledWith(fakeToken);
    });

    // Wait for navigation after successful login
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    }, { timeout: 2000 });
  });

  test('handles login failure correctly', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid credentials' })
      })
    );

    renderLogin();
    
    const accountInput = screen.getByLabelText('Usuario');
    const passwordInput = screen.getByLabelText('Contraseña');
    const submitButton = screen.getByRole('button');

    fireEvent.change(accountInput, { target: { value: '123456789' } });
    fireEvent.change(passwordInput, { target: { value: 'wrong-password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith('Error al iniciar sesión:', 'Invalid credentials');
    });

    consoleLogSpy.mockRestore();
  });

  test('handles network error correctly', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Network error'))
    );

    renderLogin();
    
    const accountInput = screen.getByLabelText('Usuario');
    const passwordInput = screen.getByLabelText('Contraseña');
    const submitButton = screen.getByRole('button');

    fireEvent.change(accountInput, { target: { value: '123456789' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith('Error en el login:', 'Network error');
    });

    consoleLogSpy.mockRestore();
  });

  test('validates form before submission', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    renderLogin();
    
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    expect(alertMock).toHaveBeenCalledWith('Por favor, complete todos los campos');
    expect(global.fetch).not.toHaveBeenCalled();

    alertMock.mockRestore();
  });
});