import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TransactionsDeposit from '../../components/Transaction/TransactionsDeposit';
import { depositMoney } from '../../components/requests/transaction.depositMoney';

// Mock the depositMoney function
jest.mock('../../components/requests/transaction.depositMoney');

// Mock window.alert
const mockAlert = jest.fn();
global.alert = mockAlert;

// Mock window.confirm
const mockConfirm = jest.fn();
global.confirm = mockConfirm;

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <TransactionsDeposit />
    </BrowserRouter>
  );
};

describe('TransactionsDeposit Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    renderComponent();
    expect(screen.getByText('Depositar dinero')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingresa el valor a Depositar')).toBeInTheDocument();
    expect(screen.getByText('Depositar')).toBeInTheDocument();
  });

  it('handles input change correctly', () => {
    renderComponent();
    const input = screen.getByPlaceholderText('Ingresa el valor a Depositar');
    fireEvent.change(input, { target: { value: '1000', name: 'amount' } });
    expect(input.value).toBe('1000');
  });

  it('validates empty amount', () => {
    renderComponent();
    const depositButton = screen.getByText('Depositar');
    fireEvent.click(depositButton);
    expect(mockAlert).toHaveBeenCalledWith('Por favor, complete todos los campos');
  });

  it('validates negative amount', () => {
    renderComponent();
    const input = screen.getByPlaceholderText('Ingresa el valor a Depositar');
    fireEvent.change(input, { target: { value: '-100', name: 'amount' } });
    const depositButton = screen.getByText('Depositar');
    fireEvent.click(depositButton);
    expect(mockAlert).toHaveBeenCalledWith('Por favor, ingrese un monto válido');
  });

  it('handles successful deposit', async () => {
    mockConfirm.mockReturnValue(true);
    depositMoney.mockResolvedValue({ success: true });

    renderComponent();
    const input = screen.getByPlaceholderText('Ingresa el valor a Depositar');
    const depositButton = screen.getByText('Depositar');

    fireEvent.change(input, { target: { value: '1000', name: 'amount' } });
    fireEvent.click(depositButton);

    await waitFor(() => {
      expect(depositMoney).toHaveBeenCalledWith({ amount: '1000' });
      expect(mockAlert).toHaveBeenCalledWith('Depósito realizado con éxito');
      expect(input.value).toBe('');
    });
  });

  it('handles failed deposit', async () => {
    mockConfirm.mockReturnValue(true);
    const errorMessage = 'Error en la transacción';
    depositMoney.mockResolvedValue({ success: false, message: errorMessage });

    renderComponent();
    const input = screen.getByPlaceholderText('Ingresa el valor a Depositar');
    const depositButton = screen.getByText('Depositar');

    fireEvent.change(input, { target: { value: '1000', name: 'amount' } });
    fireEvent.click(depositButton);

    await waitFor(() => {
      expect(depositMoney).toHaveBeenCalledWith({ amount: '1000' });
      expect(mockAlert).toHaveBeenCalledWith(`Error al depositar el dinero: ${errorMessage}`);
    });
  });

  it('cancels deposit when user declines confirmation', () => {
    mockConfirm.mockReturnValue(false);

    renderComponent();
    const input = screen.getByPlaceholderText('Ingresa el valor a Depositar');
    const depositButton = screen.getByText('Depositar');

    fireEvent.change(input, { target: { value: '1000', name: 'amount' } });
    fireEvent.click(depositButton);

    expect(depositMoney).not.toHaveBeenCalled();
  });

  it('disables input and button while loading', async () => {
    mockConfirm.mockReturnValue(true);
    depositMoney.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    renderComponent();
    const input = screen.getByPlaceholderText('Ingresa el valor a Depositar');
    const depositButton = screen.getByText('Depositar');

    fireEvent.change(input, { target: { value: '1000', name: 'amount' } });
    fireEvent.click(depositButton);

    expect(input).toBeDisabled();
    expect(depositButton).toBeDisabled();
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });
});