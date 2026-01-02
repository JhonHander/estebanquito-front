import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { transactionService } from '../../api/transaction.service';
import './Deposit.css';

function Deposit() {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setAmount(e.target.value);
    };

    const validate = () => {
        if (!amount) {
            alert('Por favor, complete todos los campos');
            return false;
        }
        if (Number(amount) <= 0) {
            alert('Por favor, ingrese un monto válido');
            return false;
        }
        return true;
    };

    const handleDeposit = async () => {
        if (!validate()) return;

        const confirmDeposit = window.confirm('¿Estás seguro de realizar el depósito?');
        if (!confirmDeposit) return;

        setLoading(true);
        try {
            await transactionService.deposit(amount);
            alert('Depósito realizado con éxito');
            setAmount('');
        } catch (err) {
            alert(`Error al depositar el dinero: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="deposit-container">
            <h1>Depositar dinero</h1>
            <input
                type="number"
                name="amount"
                placeholder="Ingresa el valor a Depositar"
                value={amount}
                onChange={handleChange}
                className="deposit-input"
                disabled={loading}
            />

            <button
                className="deposit-button"
                onClick={handleDeposit}
                disabled={loading}
            >
                {loading ? 'Cargando...' : 'Depositar'}
            </button>

            <div className="deposit-transaction">
                <p>¿Deseas ver los movimientos?</p>
                <NavLink to="/gestionar/movimientos" className="to-button">
                    Ver Movimientos
                </NavLink>
            </div>
        </div>
    );
}

export default Deposit;
