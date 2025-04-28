import React from "react";
import { useState } from "react";
import "./LoanRequest.css";
import { askForLoan } from "../requests/askForLoan";

function loanRequest() {
    const [loanData, setLoanData] = useState({
        amount: '',
        term: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoanData({ ...loanData, [name]: value });
    };

    const handleConfirm = async () => {
        if (!validate()) return;

        const confirmLoan = window.confirm('¿Estás seguro de solicitar el préstamo?');
        if (confirmLoan) {
            setLoading(true);
            try {
                await askForLoan(loanData.amount, loanData.term);
                alert(`Has solicitado un préstamo de $${loanData.amount} a pagar en ${loanData.term}.`);
                setLoanData({ amount: '', term: '' });
            } catch (error) {
                console.error('Error al solicitar el préstamo:', error);
                alert('Hubo un error al procesar tu solicitud');
            } finally {
                setLoading(false);
            }
        }
    }

    const validate = () => {
        if (loanData.amount < 0) {
            alert('Por favor, ingrese un monto válido');
            return false;
        }
        if (loanData.amount === '' || loanData.term === '') {
            alert('Por favor, complete todos los campos');
            return false;
        }
        return true;
    }

    return (
        <div className="loan-request-container">
            <h1>Solicitar préstamo</h1>

            <input
                type="number"
                name="amount"
                placeholder="Ingresa el valor del préstamo"
                value={loanData.amount}
                className="withdraw-input"
                onChange={handleChange}
            />

            <label>Plazo</label>
            <select
                id="term"
                name="term"
                value={loanData.term}
                onChange={handleChange}
            >
                <option value="" disabled>
                    Selecciona el plazo que necesites
                </option>
                <option value="1">1 semana</option>
                <option value="2">2 semanas</option>
                <option value="4">4 semanas</option>
                <option value="8">8 semanas</option>
            </select>

            <button onClick={handleConfirm}>
                {loading ? 'Cargando...' : 'Solicitar préstamo'}
            </button>
        </div>
    )
}

export default loanRequest;
