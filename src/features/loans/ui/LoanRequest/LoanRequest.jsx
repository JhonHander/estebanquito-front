import React, { useState } from 'react';
import { loanService } from '../../api/loan.service';
import './LoanRequest.css';

function LoanRequest() {
    const [loanData, setLoanData] = useState({
        amount: '',
        term: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoanData({ ...loanData, [name]: value });
    };

    const validate = () => {
        if (!loanData.amount || !loanData.term) {
            alert('Por favor, complete todos los campos');
            return false;
        }
        if (Number(loanData.amount) < 0) {
            alert('Por favor, ingrese un monto válido');
            return false;
        }
        return true;
    };

    const handleConfirm = async () => {
        if (!validate()) return;

        const confirmLoan = window.confirm('¿Estás seguro de solicitar el préstamo?');
        if (!confirmLoan) return;

        setLoading(true);
        try {
            await loanService.requestLoan(loanData.amount, loanData.term);
            setTimeout(() => {
                alert(`Has solicitado un préstamo de $${loanData.amount} a pagar en ${loanData.term} semanas.`);
                setLoanData({ amount: '', term: '' });
                setLoading(false);
            }, 1000);
        } catch (err) {
            alert(`Error: ${err.message}`);
            setLoading(false);
        }
    };

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
                disabled={loading}
            />

            <label>Plazo</label>
            <select
                id="term"
                name="term"
                value={loanData.term}
                onChange={handleChange}
                disabled={loading}
            >
                <option value="" disabled>
                    Selecciona el plazo que necesites
                </option>
                <option value="1">1 semana</option>
                <option value="2">2 semanas</option>
                <option value="4">4 semanas</option>
                <option value="8">8 semanas</option>
            </select>

            <button onClick={handleConfirm} disabled={loading}>
                {loading ? 'Cargando...' : 'Solicitar préstamo'}
            </button>
        </div>
    );
}

export default LoanRequest;
