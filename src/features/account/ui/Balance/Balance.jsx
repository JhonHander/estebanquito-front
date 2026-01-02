import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { GrTransaction } from 'react-icons/gr';
import { useAuth } from '@features/auth';
import './Balance.css';

function Balance() {
    const { user, loading } = useAuth();
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        if (user) {
            setUserData([{
                type: user.tipo,
                accountNumber: user.numero_cuenta,
                amount: user.saldo,
            }]);
        }
    }, [user]);

    if (loading) {
        return (
            <div className="saldo-container">
                <h1>Cargando...</h1>
            </div>
        );
    }

    return (
        <div className="saldo-container">
            <h1>Saldo</h1>

            <table className="saldo-table">
                <caption>Saldo de cuentas</caption>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Número</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((cuenta, index) => (
                        <tr key={index}>
                            <td>{cuenta.type}</td>
                            <td>{cuenta.accountNumber}</td>
                            <td>${cuenta.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="saldo-transaction">
                <p>¿Deseas ver los movimientos?</p>
                <NavLink to="/gestionar/movimientos" className="to-button">
                    <GrTransaction /> Ver Movimientos
                </NavLink>
            </div>
        </div>
    );
}

export default Balance;
