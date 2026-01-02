import React, { useState, useEffect } from 'react';
import { useAuth } from '@features/auth';
import { reportService } from '../../api/report.service';
import './TotalDebts.css';

function TotalDebts() {
    const { user } = useAuth();
    const [total, setTotal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTotalDebts = async () => {
            try {
                const data = await reportService.getTotalDebts();
                if (data && data.totalDebts !== undefined) {
                    setTotal(data.totalDebts);
                } else {
                    setError('Error al cargar el total de deudas');
                }
            } catch (err) {
                console.error('Error al obtener el total de deudas:', err);
                setError(err.message || 'Error al cargar datos');
            } finally {
                setLoading(false);
            }
        };

        fetchTotalDebts();
    }, []);

    return (
        <div className="report-container">
            <h1>Total Deudas</h1>
            <p>
                {user?.nombre
                    ? `${user.nombre}, el total de las deudas que tiene:`
                    : 'Cargando...'}
            </p>

            <div className="input-group">
                <label>Total</label>
                {loading ? (
                    <p>Cargando...</p>
                ) : error ? (
                    <p className="error-text">{error}</p>
                ) : (
                    <input
                        type="text"
                        id="total"
                        value={total !== null ? `$${total}` : 'No disponible'}
                        readOnly
                    />
                )}
            </div>
        </div>
    );
}

export default TotalDebts;
