import React, { useState } from 'react'
import './Login.css'
import HeaderLogSign from '../Headers/HeaderLogSign'
import { Navigate } from "react-router-dom";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { currrentAccount, saveToken, getToken } from '../requests/jwtManage';
import { useEffect } from 'react';

function Login() {
    const [loginData, setLoginData] = useState({
        accountNumber: '',
        password: '',
    })

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!validate()) return

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            })

            const data = await response.json()
            if (response.ok) {
                console.log('Inicio de sesión exitoso:', data)
                saveToken(data.token) //guardar el token

                // const decoded = jwtDecoded()
                // console.log('Token decodificado:', decoded)
                setLoading(true)

                setTimeout(() => {
                    if (getToken()) {
                        navigate('/')
                    }
                }, 1500);
            } else {
                console.log('Error al iniciar sesión:', data.message)
            }
        } catch (error) {
            console.log('Error en el login:', error.message);
        }
    }

    const validate = () => {
        if (loginData.user === '' || loginData.password === '') {
            alert('Por favor, complete todos los campos');
            return false;
        }
        return true;
    }

    return (
        <div className='father-container-login'>
            <div className="login-container">
                <h2>¡Hola!</h2>
                <p>Completa los campos requeridos</p>
                <form onSubmit={handleLogin}>
                    <MdOutlinePhoneIphone />
                    <div className="input-container">
                        <label htmlFor="accountNumber"> Usuario</label>
                        <input
                            id="accountNumber"
                            className='input-login'
                            type="text"
                            name="accountNumber"
                            value={loginData.accountNumber}
                            onChange={handleChange}
                            placeholder="Número de Teléfono"
                        />
                    </div>

                    <RiLockPasswordFill />
                    <div className="input-container">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            className='input-login'
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            placeholder="Contraseña"
                        />
                    </div>
                    <button type="submit" className="login-button">
                        {loading ? 'Verificando...' : 'Iniciar'}
                    </button>
                </form>

                <p>¿No eres cliente? <a href="/register">Registrarse</a></p>
            </div>
        </div>
    );
}

export default Login;