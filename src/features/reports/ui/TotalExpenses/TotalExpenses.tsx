import React, { useState, useEffect } from 'react';
import { useAuth } from '@features/auth';
import { reportService } from '../../api/report.service';
import './TotalExpenses.css';

function TotalExpenses() {
    const { user } = useAuth();
    const [total, setTotal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTotalOutcome = async () => {
            try {
                const data = await reportService.getTotalOutcome();
                if (data && data.totalOutcome !== undefined) {
                    setTotal(data.totalOutcome);
                } else {
                    setError('Error al cargar el total de egresos');
                }
            } catch (err) {
                console.error('Error al obtener el total de egresos:', err);
                setError(err.message || 'Error al cargar datos');
            } finally {
                setLoading(false);
            }
        };

        fetchTotalOutcome();
    }, []);

    return (
        <div className="report-container">
            <h1>Total de Egresos</h1>
            <p>
                {user?.nombre
                    ? `${user.nombre}, el total de egresos de tu cuenta:`
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

export default TotalExpenses;
