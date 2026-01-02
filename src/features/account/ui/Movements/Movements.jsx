import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMdEye } from 'react-icons/io';
import { transactionService } from '@features/transactions';
import { getToken } from '@shared/lib/storage/tokenStorage';
import './Movements.css';

function Movements() {
    const navigate = useNavigate();
    const [movementData, setMovementData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!getToken()) {
            navigate('/login');
            return;
        }

        const fetchMovements = async () => {
            try {
                const data = await transactionService.getTransactions();
                if (data) {
                    const formattedData = data.map(transaction => ({
                        type: transaction.tipo,
                        date: transaction.fecha,
                        amount: transaction.monto,
                        currentAccount: transaction.cuenta_principal_id,
                        secondaryAccount: transaction.cuenta_destino_id,
                    }));
                    setMovementData(formattedData);
                }
            } catch (err) {
                console.error('Error fetching movements:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovements();
    }, [navigate]);

    const getRowClassName = (movement) => {
        if (movement.type === 'Retiro') {
            return 'movement-red';
        } else if (movement.type === 'Deposito') {
            return 'movement-green';
        } else if (movement.type === 'Transferencia') {
            return movement.secondaryAccount === movement.currentAccount
                ? 'movement-blue'
                : 'movement-yellow';
        }
        return '';
    };

    if (loading) {
        return (
            <div className="movements-container">
                <h1>Cargando movimientos...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="movements-container">
                <h1>Error al cargar movimientos</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="movements-container">
            <h1>Bienvenido a sus movimientos</h1>
            <table className="movements-table">
                <caption>Movimientos</caption>
                <thead>
                    <tr>
                        <th>Tipo transferencia</th>
                        <th>Fecha</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {movementData.map((movement, index) => (
                        <tr key={index} className={getRowClassName(movement)}>
                            <td>{movement.type}</td>
                            <td>{movement.date}</td>
                            <td>${movement.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="saldo-transaction">
                <p>¿Quizás buscabas el saldo?</p>
                <NavLink to="/gestionar/ver-saldo" className="to-button">
                    <IoMdEye /> Ver Saldo
                </NavLink>
            </div>
        </div>
    );
}

export default Movements;
