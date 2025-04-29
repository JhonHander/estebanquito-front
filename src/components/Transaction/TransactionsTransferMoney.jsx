import React, { useEffect, useState } from "react";
import "./TransactionsTransferMoney.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { tranferMoney } from "../requests/transferMoney";
import { getUserInfo } from "../requests/getUserInfo";

function TransactionsTransferMoney() {
    // const { user } = useContext(UserContext);

    const [transferData, setTransferData] = useState({
        accountNumber: '',
        destinationAccountNumber: '',
        amount: '',
    });

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const getData = await getUserInfo();
    //         setTransferData({
    //             accountNumber: getData.numero_cuenta, //porque es lo que necesito de getUserInfo
    //         });
    //     };
    //     fetchUser();
    // }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const getData = await getUserInfo();
            setTransferData(prevData => ({
                ...prevData,
                accountNumber: getData.numero_cuenta || '' // Asegurarse de que no sea undefined
            }));
        };
        fetchUser();
    }, []);


    const [Loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setTransferData({
            ...transferData, [e.target.name]: e.target.value
        });
    };


    const handleTransfer = async () => {
        if (!validate()) return;

        const confirmTransfer = window.confirm('¿Estás seguro de realizar la transferencia?');
        if (confirmTransfer) {
            setLoading(true);

            setTransferData({
                accountNumber: transferData.accountNumber,
                destinationAccountNumber: transferData.destinationAccountNumber,
                amount: transferData.amount,
            });

            // Llamar a tranferMoney y manejar la respuesta
            const result = await tranferMoney(transferData);

            console.log('Data:', transferData);

            setLoading(false);
            if (result.success) {
                alert("Transferencia realizada con éxito");
                setTransferData({ amount: '', destinationAccountNumber: '' });
            } else {
                alert(`Error al transferir el dinero: ${result.message}`);
            }
        }
    };


    const validate = () => {
        if (transferData.amount === '' || transferData.destinationAccountNumber === '') {
            alert('Por favor, complete todos los campos');
            return false;
        }
        if (transferData.amount <= 0) {
            alert('Por favor, ingrese un monto válido');
            return false;
        }
        return true
    }

    return (
        <div className="transfer-container">
            <h1>Transferir dinero</h1>
            <input
                type="number"
                name="amount"
                placeholder="Ingresa el valor a transferir"
                value={transferData.amount || ''}
                onChange={handleChange}
                className="transfer-input"
                disabled={Loading}
            />
            <input
                type="text"
                name="destinationAccountNumber"
                placeholder="Ingresa el número de la cuenta"
                value={transferData.destinationAccountNumber || ''}
                onChange={handleChange}
                className="transfer-input"
                disabled={Loading}
            />
            <button
                className="transfer-button"
                onClick={handleTransfer}
                disabled={Loading}
            >
                {Loading ? 'Cargando...' : 'Transferir'}
            </button>

            <div className='transfer-transaction'>
                <p>Deseas ver los movimientos?</p>
                <NavLink to='/gestionar/movimientos' className="to-button" disabled={Loading}>
                    Ver Movimientos
                </NavLink>
            </div>

        </div>
    );
}

export default TransactionsTransferMoney;
