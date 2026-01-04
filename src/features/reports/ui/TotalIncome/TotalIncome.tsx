import React, { useState, useEffect } from 'react';
import { useAuth } from '@features/auth';
import { reportService } from '../../api/report.service';
import './TotalIncome.css';

function TotalIncome() {
    const { user } = useAuth();
    const [total, setTotal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTotalIncome = async () => {
            try {
                const data = await reportService.getTotalIncome();
                if (data && data.totalIncome !== undefined) {
                    setTotal(data.totalIncome);
                } else {
                    setError('Error al cargar el total de ingresos');
                }
            } catch (err) {
                console.error('Error al obtener el total de ingresos:', err);
                setError(err.message || 'Error al cargar datos');
            } finally {
                setLoading(false);
            }
        };

        fetchTotalIncome();
    }, []);

    return (
        <div className="report-container">
            <h1>Total Ingresos</h1>
            <p>
                {user?.nombre
                    ? `${user.nombre}, en total ha ingresado a tu cuenta:`
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

export default TotalIncome;
