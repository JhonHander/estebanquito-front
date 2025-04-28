import React, { useState, useEffect, useContext } from 'react';
import './ReportsTotalIncome.css';
import { UserContext } from '../context/userContext';
import { getReportTotalIncome } from '../requests/getTotalIncome';

function ReportsTotalIncome() {
    const { user } = useContext(UserContext);
    const [total, setTotal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTotalIncome = async () => {
            try {
                const data = await getReportTotalIncome();
                if (data && data.totalIncome !== undefined) {
                    setTotal(data.totalIncome);
                } else {
                    console.log("Error: La respuesta no contiene el total de ingresos.");
                }
            } catch (error) {
                console.error("Error al obtener el total de ingresos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTotalIncome();
    }, []);

    return (
        <div className="total-income-container">
            <h1>Total Ingresos</h1>
            <p>
                {user?.nombre ? `${user.nombre}, en total ha ingresado a tu cuenta:` : 'Cargando...'}
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

export default ReportsTotalIncome;
