import React, { useState, useEffect } from 'react';
import { GrLinkDown } from 'react-icons/gr';
import { transactionService } from '../../api/transaction.service';
import './Withdraw.css';

function Withdraw() {
    const [pin, setPin] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPin(generateRandomPin());
    }, []);

    const generateRandomPin = () => Math.floor(1000 + Math.random() * 9000);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleWithdraw = async () => {
        if (!amount || Number(amount) <= 0) {
            window.alert('Por favor, ingresa un valor a retirar.');
            setAmount('');
            return;
        }

        const confirmWithDraw = window.confirm('¿Estás seguro de realizar el retiro?');
        if (!confirmWithDraw) return;

        setLoading(true);
        try {
            await transactionService.withdraw(amount);
            setTimeout(() => {
                alert(`Has solicitado retirar $${amount}. No olvides recoger tu dinero.`);
                setAmount('');
                setLoading(false);
            }, 1000);
        } catch (err) {
            alert(`Error: ${err.message}`);
            setLoading(false);
        }
    };

    return (
        <div className="withdraw-container">
            <h1>Retirar dinero</h1>

            <div className="pin-container">
                <label htmlFor="pin">PIN:</label>
                <input
                    type="text"
                    id="pin"
                    value={pin}
                    className="pin-input"
                    readOnly
                />
            </div>

            <input
                type="number"
                placeholder="Ingresa el valor a retirar"
                value={amount}
                className="withdraw-input"
                onChange={handleAmountChange}
                disabled={loading}
            />

            <button onClick={handleWithdraw} disabled={loading}>
                {loading ? 'Cargando...' : 'Retirar'}
            </button>

            <p className="info-text">
                <GrLinkDown /> Con este pin puedes retirar tu dinero en alguna de las sucursales físicas.
            </p>
        </div>
    );
}

export default Withdraw;
