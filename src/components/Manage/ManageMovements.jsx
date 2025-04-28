import React from 'react';
import './ManageMovements.css';
import { NavLink } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { useState } from 'react';
import { useEffect } from 'react';
import { getTransactions } from '../requests/getTransactions';
import { getToken } from '../requests/jwtManage';
import { useNavigate } from 'react-router-dom';

function manageViewTransactions() {
    const navigate = useNavigate();
    const [movementData, setMovementData] = useState([]);

    useEffect(() => {
        if (!getToken()) {
            navigate('/login');
        }

        const fetchMovements = async () => {
            const data = await getTransactions();
            if (data) {
                const formattedData = data.map(transaction => ({
                    tipo: transaction.tipo,
                    fecha: transaction.fecha,
                    monto: transaction.monto,
                    cuenta_principal_id: transaction.cuenta_principal_id,
                    cuenta_destino_id: transaction.cuenta_destino_id,
                }));
                setMovementData(formattedData);
            }
        };
        fetchMovements();
    }, []);

    const getRowClassName = (movement) => {
        switch (movement.tipo) {
            case 'Deposito':
                return 'movement-green';
            case 'Retiro':
                return 'movement-red';
            case 'Transferencia':
                return movement.cuenta_destino_id === movement.cuenta_principal_id ? 'movement-blue' : 'movement-yellow';
            default:
                return '';
        }
    };

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
                            <td>{movement.tipo}</td>
                            <td>{movement.fecha}</td>
                            <td>${movement.monto}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='saldo-transaction'>
                <p>Quizas buscababas el saldo?</p>
                <NavLink to='/gestionar/ver-saldo' className="to-button">
                    <IoMdEye /> Ver Saldo
                </NavLink>
            </div>
        </div>
    );
}

export default manageViewTransactions;