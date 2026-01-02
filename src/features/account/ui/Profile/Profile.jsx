import React, { useState, useEffect } from 'react';
import { useAuth, userService } from '@features/auth';
import './Profile.css';

function Profile() {
    const { user, refreshUser } = useAuth();
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        accountNumber: '',
        accountType: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.nombre || '',
                email: user.email || '',
                accountNumber: user.numero_cuenta || '',
                accountType: user.tipo || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const validate = () => {
        if (!profileData.name || !profileData.email) {
            alert('Por favor, complete todos los campos');
            return false;
        }
        return true;
    };

    const handleUpdate = async () => {
        if (!validate()) return;

        const confirmUpdate = window.confirm('¿Estás seguro de actualizar los datos?');
        if (!confirmUpdate) return;

        setLoading(true);
        try {
            await userService.updateUserInfo({
                name: profileData.name,
                email: profileData.email,
                accountNumber: profileData.accountNumber,
            });

            setTimeout(() => {
                alert('Datos actualizados correctamente');
                setIsEditing(false);
                setLoading(false);
                refreshUser();
            }, 1000);
        } catch (err) {
            alert('Error al actualizar los datos: ' + err.message);
            setLoading(false);
        }
    };

    const toggleEdit = () => {
        if (!validate()) return;
        setIsEditing(!isEditing);
    };

    return (
        <div className="profile-container">
            <h1>Detalle perfil</h1>
            <div className="profile-details">
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                        disabled={!isEditing || loading}
                    />
                </label>

                <label>
                    Correo asociado:
                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        disabled={!isEditing || loading}
                    />
                </label>

                <label>
                    Número de cuenta:
                    <input
                        type="text"
                        name="accountNumber"
                        value={profileData.accountNumber}
                        disabled
                    />
                </label>

                <label>
                    Tipo de cuenta:
                    <input
                        type="text"
                        name="accountType"
                        value={profileData.accountType}
                        disabled
                    />
                </label>
            </div>

            <button className="edit-button" onClick={toggleEdit} disabled={loading}>
                {isEditing ? 'Cancelar' : 'Editar'}
            </button>

            {isEditing && (
                <button className="update-button" onClick={handleUpdate} disabled={loading}>
                    {loading ? 'Actualizando...' : 'Actualizar datos'}
                </button>
            )}
        </div>
    );
}

export default Profile;
