import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../api/auth.service';
import './Register.css';

function Register() {
    const [registerData, setRegisterData] = useState({
        accountNumber: '',
        name: '',
        email: '',
        password: '',
        type: 'Corriente',
    });
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
        setMessage({ text: '', type: '' });
    };

    const validate = () => {
        if (!registerData.accountNumber || !registerData.name ||
            !registerData.email || !registerData.password) {
            setMessage({ text: 'Por favor, complete todos los campos', type: 'error' });
            return false;
        }
        if (registerData.password.length < 6) {
            setMessage({ text: 'La contraseña debe tener al menos 6 caracteres', type: 'error' });
            return false;
        }
        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {
            await authService.register(registerData);
            setMessage({ text: 'Registro exitoso. Redirigiendo al login...', type: 'success' });
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (err) {
            setMessage({ text: err.message || 'Error al registrarse. Inténtalo de nuevo', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="father-container-register">
            <div className="register-container">
                <h2>Registro</h2>
                <p>¡Es muy fácil!</p>

                {message.text && (
                    <p className={`message ${message.type}`} style={{ fontSize: '14px', marginBottom: '10px' }}>
                        {message.text}
                    </p>
                )}

                <form onSubmit={handleRegister}>
                    <div className="input-container">
                        <input
                            className="input-login"
                            type="text"
                            name="accountNumber"
                            placeholder="Ingrese su número de celular"
                            value={registerData.accountNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            className="input-login"
                            type="text"
                            name="name"
                            placeholder="Ingrese su nombre"
                            value={registerData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            className="input-login"
                            type="email"
                            name="email"
                            placeholder="Ingrese su email"
                            value={registerData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            className="input-login"
                            type="password"
                            name="password"
                            placeholder="Ingrese su contraseña"
                            value={registerData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-container">
                        <label className="label-register">Tipo de cuenta</label>
                        <select
                            name="type"
                            value={registerData.type}
                            onChange={handleChange}
                            className="input-select"
                        >
                            <option value="Ahorros">Ahorros</option>
                            <option value="Corriente">Corriente</option>
                        </select>
                    </div>

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                <p>
                    ¿Ya estás registrado? <Link to="/login">Iniciar Sesión</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
