import React from "react";
import { useState } from "react";
import "./ManageViewProfile.css";
import { getUserInfo } from "../requests/getUserInfo";
import { useEffect } from "react";
import { currrentAccount } from "../requests/jwtManage";
import { updateUserInfo } from "../requests/updateUserInfo";

function ManageViewProfile() {
    const [profileData, setProfileData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const getData = await getUserInfo();
                setProfileData({
                    name: getData?.nombre || '',
                    email: getData?.email || '',
                    accountNumber: getData?.numero_cuenta || '',
                    accountType: getData?.tipo || '',
                });
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
                setError(error.message);
                setProfileData({
                    name: '',
                    email: '',
                    accountNumber: '',
                    accountType: '',
                });
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        setProfileData({
            ...profileData, [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async () => {
        if (!validate()) return;
        const confirmUpdate = window.confirm('¿Estás seguro de actualizar los datos?');
        if (confirmUpdate) {
            setIsEditing(true);

            const data = {
                name: profileData.name,
                email: profileData.email,
                accountNumber: profileData.accountNumber,
            };

            const response = await updateUserInfo(data);

            console.log("Respuesta de la actualización:", response);

            setTimeout(() => {
                setIsEditing(false);
                console.log("Datos actualizados:", profileData);
            }, 1500);
        }
    };


    const validate = () => {
        if (profileData.name === '' || profileData.email === '') {
            alert('Por favor, complete todos los campos');
            return false;
        }
        return true
    }

    return (
        <div className="profile-container" >
            <h1>Detalle perfil</h1>
            {error && <div className="error-message">Error: {error}</div>}
            <div className="profile-details">
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                </label>

                <label>
                    Correo asociado:
                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                </label>

                <label>
                    Número de cuenta:
                    <input
                        type="text"
                        name="accountNumber"
                        value={profileData.accountNumber}
                        onChange={handleChange}
                        disabled={true}
                    />
                </label>
                <label>
                    Tipo de cuenta:
                    <input
                        type="text"
                        name="accountType"
                        value={profileData.accountType}
                        onChange={handleChange}
                        disabled={true}
                    />
                </label>
            </div>

            <button
                className="edit-button"
                onClick={() => {
                    if (!validate()) {
                        return;
                    }
                    else setIsEditing(!isEditing);
                }}
            >
                {isEditing ? "Cancelar" : "Editar"}
            </button>

            {isEditing && (
                <button className="update-button" onClick={handleUpdate}>
                    Actualizar datos
                </button>
            )}
        </div >
    )
}

export default ManageViewProfile;