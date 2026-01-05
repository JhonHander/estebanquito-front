import React, { useState, useEffect } from 'react';
import { useAuth, userService } from '@features/auth';
import { User, Mail, CreditCard, Shield, Edit2, Save, X, Camera } from 'lucide-react';

const Profile: React.FC = () => {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        } catch (err: any) {
            alert('Error al actualizar los datos: ' + err.message);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Mi Perfil</h2>
                    <p className="text-zinc-400">Gestiona tu información personal y de cuenta.</p>
                </div>
                <button
                    onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
                    className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors ${isEditing ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-white text-black hover:bg-zinc-200'}`}
                >
                    {isEditing ? <><X size={18} /> Cancelar</> : <><Edit2 size={18} /> Editar Perfil</>}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-[#121212] border border-zinc-800 hover:border-white/20 transition-all rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/20 to-transparent"></div>

                        <div className="relative mb-6 group">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center border-4 border-[#121212] shadow-xl">
                                <User size={48} className="text-zinc-400" />
                            </div>
                            <button className="absolute bottom-0 right-0 bg-white text-black p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                <Camera size={16} />
                            </button>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1">{profileData.name}</h3>
                        <p className="text-zinc-500 text-sm mb-6">{profileData.email}</p>

                        <div className="w-full space-y-2">
                            <div className="bg-zinc-900/50 p-3 rounded-xl flex justify-between items-center">
                                <span className="text-zinc-500 text-sm">Estado</span>
                                <span className="text-emerald-500 text-sm font-bold flex items-center gap-1">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    Activo
                                </span>
                            </div>
                            <div className="bg-zinc-900/50 p-3 rounded-xl flex justify-between items-center">
                                <span className="text-zinc-500 text-sm">Miembro desde</span>
                                <span className="text-white text-sm font-medium">Ene 2024</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Form */}
                <div className="lg:col-span-2">
                    <div className="bg-[#121212] border border-zinc-800 hover:border-white/20 transition-all rounded-3xl p-8">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Shield size={20} className="text-zinc-400" />
                            Información de la Cuenta
                        </h3>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400 font-medium ml-1">Nombre Completo</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={profileData.name}
                                            onChange={handleChange}
                                            disabled={!isEditing || loading}
                                            className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400 font-medium ml-1">Correo Electrónico</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={profileData.email}
                                            onChange={handleChange}
                                            disabled={!isEditing || loading}
                                            className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400 font-medium ml-1">Número de Cuenta</label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                        <input
                                            type="text"
                                            name="accountNumber"
                                            value={profileData.accountNumber}
                                            readOnly
                                            className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-400 rounded-xl py-3 pl-12 pr-4 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400 font-medium ml-1">Tipo de Cuenta</label>
                                    <div className="relative">
                                        <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                        <input
                                            type="text"
                                            name="accountType"
                                            value={profileData.accountType}
                                            readOnly
                                            className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-400 rounded-xl py-3 pl-12 pr-4 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>

                            {isEditing && (
                                <div className="pt-4 flex justify-end">
                                    <button
                                        onClick={handleUpdate}
                                        disabled={loading}
                                        className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Guardando...' : <><Save size={18} /> Guardar Cambios</>}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
