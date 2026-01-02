import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdOutlinePhoneIphone } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { authService } from '../../api/auth.service';
import { useAuth } from '../../hooks/useAuth';
import { getToken } from '@shared/lib/storage/tokenStorage';
import HeaderLogSign from '@shared/ui/Header/HeaderLogSign';
import './Login.css';

function Login() {
    const [loginData, setLoginData] = useState({
        accountNumber: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    useEffect(() => {
        if (getToken()) {
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const validate = () => {
        if (!loginData.accountNumber || !loginData.password) {
            setError('Por favor, complete todos los campos');
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setError('');

        try {
            await authService.login(loginData);
            // Refresh user context with the newly saved token
            refreshUser();
            setTimeout(() => {
                navigate('/');
            }, 500);
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="father-container-login">
            <div className="login-container">
                <h2>¡Hola!</h2>
                <p>Completa los campos requeridos</p>

                {error && (
                    <p className="error-message" style={{ color: 'red', fontSize: '14px' }}>
                        {error}
                    </p>
                )}

                <form onSubmit={handleLogin}>
                    <MdOutlinePhoneIphone />
                    <div className="input-container">
                        <label>Usuario</label>
                        <input
                            className="input-login"
                            type="text"
                            name="accountNumber"
                            value={loginData.accountNumber}
                            onChange={handleChange}
                            placeholder="Número de Teléfono"
                        />
                    </div>

                    <RiLockPasswordFill />
                    <div className="input-container">
                        <label>Contraseña</label>
                        <input
                            className="input-login"
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            placeholder="Contraseña"
                        />
                    </div>

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Verificando...' : 'Iniciar'}
                    </button>
                </form>

                <p>
                    ¿No eres cliente? <Link to="/register">Registrarse</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
