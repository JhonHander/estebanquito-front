import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { transactionService } from '../../api/transaction.service';
import { useAuth } from '@features/auth';
import { ROUTES } from '@shared/config/constants';
import './Transfer.css';

function Transfer() {
    const { user } = useAuth();
    const [transferData, setTransferData] = useState({
        accountNumber: '',
        destinationAccountNumber: '',
        amount: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user?.numero_cuenta) {
            setTransferData(prev => ({
                ...prev,
                accountNumber: user.numero_cuenta,
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setTransferData({
            ...transferData,
            [e.target.name]: e.target.value,
        });
    };

    const validate = () => {
        if (!transferData.amount || !transferData.destinationAccountNumber) {
            alert('Por favor, complete todos los campos');
            return false;
        }
        if (Number(transferData.amount) <= 0) {
            alert('Por favor, ingrese un monto válido');
            return false;
        }
        return true;
    };

    const handleTransfer = async () => {
        if (!validate()) return;

        const confirmTransfer = window.confirm('¿Estás seguro de realizar la transferencia?');
        if (!confirmTransfer) return;

        setLoading(true);
        try {
            await transactionService.transfer(transferData);
            alert('Transferencia realizada con éxito');
            setTransferData(prev => ({
                ...prev,
                amount: '',
                destinationAccountNumber: '',
            }));
        } catch (err) {
            alert(`Error al transferir el dinero: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="transfer-container">
            <h1>Transferir dinero</h1>
            <input
                type="number"
                name="amount"
                placeholder="Ingresa el valor a transferir"
                value={transferData.amount}
                onChange={handleChange}
                className="transfer-input"
                disabled={loading}
            />
            <input
                type="text"
                name="destinationAccountNumber"
                placeholder="Ingresa el número de la cuenta destino"
                value={transferData.destinationAccountNumber}
                onChange={handleChange}
                className="transfer-input"
                disabled={loading}
            />
            <button
                className="transfer-button"
                onClick={handleTransfer}
                disabled={loading}
            >
                {loading ? 'Cargando...' : 'Transferir'}
            </button>

            <div className="transfer-transaction">
                <p>¿Deseas ver los movimientos?</p>
                <NavLink to={ROUTES.ACCOUNT.MOVEMENTS} className="to-button">
                    Ver Movimientos
                </NavLink>
            </div>
        </div>
    );
}

export default Transfer;
