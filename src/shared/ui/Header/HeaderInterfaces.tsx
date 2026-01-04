import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from 'react-icons/md';
import { useAuth } from '@features/auth';
import logo from '@assets/3.png';
import './HeaderInterfaces.css';

function HeaderInterfaces() {
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return (
            <header className="header">
                <div className="header-center">
                    <p>Cargando...</p>
                </div>
            </header>
        );
    }

    return (
        <header className="header">
            <div className="header-left">
                <img src={logo} alt="Estebanquito" className="logo" />
            </div>
            <div className="header-center">
                <h3>Hola, {user?.nombre || 'Usuario'}</h3>
            </div>
            <div className="header-right">
                <button className="logout-button" onClick={handleLogOut}>
                    Salir <span role="img" aria-label="logout"><MdOutlineLogout /></span>
                </button>
            </div>
        </header>
    );
}

export default HeaderInterfaces;
