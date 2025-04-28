import React, { useState, useEffect, useContext } from 'react';
import './ReportsDebts.css';
import { UserContext } from '../context/userContext';
import { getReportTotalDebts } from '../requests/getTotalDebts';

function ReportsDebts() {
    const { user } = useContext(UserContext);
    const [total, setTotal] = useState(null); // Usa null para indicar que el dato aún no se ha cargado.
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTotalDebts = async () => {
            try {
                const data = await getReportTotalDebts();
                if (data && data.totalDebts !== undefined) {
                    setTotal(data.totalDebts);
                } else {
                    console.log("Error: La respuesta no contiene el total de deudas.");
                }
            } catch (error) {
                console.error("Error al obtener el total de egresos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTotalDebts();
    }, []);

    return (
        <div className="total-income-container">
            <h1>Total de Egresos</h1>
            <p>
                {user?.nombre ? `${user.nombre}, el total de las deudas que tiene:` : 'Cargando...'}
            </p>

            <div className="input-group">
                <label>Total</label>
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <input
                        type="text"
                        id="total"
                        value={total !== null ? total : 'No disponible'}
                        readOnly={true}
                    />
                )}
            </div>
        </div>
    );
}

export default ReportsDebts;