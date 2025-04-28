import React, { useState, useEffect, useContext } from 'react';
import './ReportsTotalExpenses.css';
import { UserContext } from '../context/userContext';
import { getReportTotalOutcome } from '../requests/getTotalOutcome';

function ReportsTotalOutcome() {
    const { user } = useContext(UserContext);
    const [total, setTotal] = useState(null); // Usa null para indicar que el dato aún no se ha cargado.
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTotalOutcome = async () => {
            try {
                const data = await getReportTotalOutcome();
                if (data && data.totalOutcome !== undefined) {
                    setTotal(data.totalOutcome);
                } else {
                    console.log("Error: La respuesta no contiene el total de egresos.");
                }
            } catch (error) {
                console.error("Error al obtener el total de egresos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTotalOutcome();
    }, []);

    return (
        <div className="total-income-container">
            <h1>Total de Egresos</h1>
            <p>
                {user?.nombre ? `${user.nombre}, el total de egresos de tu cuenta:` : 'Cargando...'}
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

export default ReportsTotalOutcome;
