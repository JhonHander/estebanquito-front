import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Wallet,
    ArrowRightLeft,
    PieChart,
    CreditCard,
    TrendingUp,
    Settings,
    HelpCircle,
    ChevronDown,
    ChevronRight,
    LogOut,
    Landmark
} from 'lucide-react';
import { ROUTES } from '@shared/config/constants';
import { useAuth } from '@features/auth';
import { cn } from '@/lib/utils';

const Sidebar = () => {
    const location = useLocation();
    const { user, logout } = useAuth();
    const [expandedGroups, setExpandedGroups] = useState<string[]>(['account', 'transactions']);

    const toggleGroup = (group: string) => {
        setExpandedGroups(prev =>
            prev.includes(group)
                ? prev.filter(g => g !== group)
                : [...prev, group]
        );
    };

    const isActive = (path: string) => location.pathname === path;
    const isGroupActive = (paths: string[]) => paths.some(path => location.pathname.startsWith(path));

    return (
        <aside className="w-64 bg-[#0a0a0a] border-r border-zinc-800 flex flex-col h-screen text-zinc-400 font-sans">
            {/* Logo */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-900/20">
                    E
                </div>
                <span className="text-white text-xl font-bold tracking-tight">Estebanquito</span>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 scrollbar-hide">
                {/* Principal Section */}
                <div>
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2">
                        Principal
                    </h3>
                    <nav className="space-y-1">
                        <NavLink
                            to={ROUTES.DASHBOARD}
                            end
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                                isActive ? "bg-red-600/10 text-red-500" : "hover:bg-zinc-900 hover:text-white"
                            )}
                        >
                            <LayoutDashboard size={20} />
                            <span className="font-medium">Resumen</span>
                        </NavLink>

                        {/* Mis Billeteras Group */}
                        <div>
                            <button
                                onClick={() => toggleGroup('account')}
                                className={cn(
                                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all",
                                    isGroupActive([ROUTES.ACCOUNT.BALANCE, ROUTES.ACCOUNT.MOVEMENTS, ROUTES.ACCOUNT.PROFILE])
                                        ? "text-white"
                                        : "hover:bg-zinc-900 hover:text-white"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <Wallet size={20} className={isGroupActive([ROUTES.ACCOUNT.BALANCE, ROUTES.ACCOUNT.MOVEMENTS, ROUTES.ACCOUNT.PROFILE]) ? "text-red-500" : "text-zinc-500"} />
                                    <span className="font-medium">Mis Billeteras</span>
                                </div>
                                {expandedGroups.includes('account') ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            </button>

                            {expandedGroups.includes('account') && (
                                <div className="pl-9 mt-1 space-y-1 relative">
                                    <div className="absolute left-[1.15rem] top-0 bottom-0 w-px bg-zinc-800"></div>
                                    <NavLink
                                        to={ROUTES.ACCOUNT.BALANCE}
                                        className={({ isActive }) => cn(
                                            "block py-2 px-3 text-sm rounded-lg transition-colors relative",
                                            isActive ? "text-red-500 bg-zinc-900/50" : "text-zinc-500 hover:text-zinc-300"
                                        )}
                                    >
                                        Ver Saldo
                                    </NavLink>
                                    <NavLink
                                        to={ROUTES.ACCOUNT.MOVEMENTS}
                                        className={({ isActive }) => cn(
                                            "block py-2 px-3 text-sm rounded-lg transition-colors relative",
                                            isActive ? "text-red-500 bg-zinc-900/50" : "text-zinc-500 hover:text-zinc-300"
                                        )}
                                    >
                                        Movimientos
                                    </NavLink>
                                    <NavLink
                                        to={ROUTES.ACCOUNT.PROFILE}
                                        className={({ isActive }) => cn(
                                            "block py-2 px-3 text-sm rounded-lg transition-colors relative",
                                            isActive ? "text-red-500 bg-zinc-900/50" : "text-zinc-500 hover:text-zinc-300"
                                        )}
                                    >
                                        Detalle Perfil
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        {/* Transacciones Group */}
                        <div>
                            <button
                                onClick={() => toggleGroup('transactions')}
                                className={cn(
                                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all",
                                    isGroupActive([ROUTES.TRANSACTIONS.TRANSFER, ROUTES.TRANSACTIONS.DEPOSIT, ROUTES.TRANSACTIONS.WITHDRAW])
                                        ? "text-white"
                                        : "hover:bg-zinc-900 hover:text-white"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <ArrowRightLeft size={20} className={isGroupActive([ROUTES.TRANSACTIONS.TRANSFER, ROUTES.TRANSACTIONS.DEPOSIT, ROUTES.TRANSACTIONS.WITHDRAW]) ? "text-red-500" : "text-zinc-500"} />
                                    <span className="font-medium">Transacciones</span>
                                </div>
                                {expandedGroups.includes('transactions') ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            </button>

                            {expandedGroups.includes('transactions') && (
                                <div className="pl-9 mt-1 space-y-1 relative">
                                    <div className="absolute left-[1.15rem] top-0 bottom-0 w-px bg-zinc-800"></div>
                                    <NavLink
                                        to={ROUTES.TRANSACTIONS.TRANSFER}
                                        className={({ isActive }) => cn(
                                            "block py-2 px-3 text-sm rounded-lg transition-colors relative",
                                            isActive ? "text-red-500 bg-zinc-900/50" : "text-zinc-500 hover:text-zinc-300"
                                        )}
                                    >
                                        Transferir
                                    </NavLink>
                                    <NavLink
                                        to={ROUTES.TRANSACTIONS.DEPOSIT}
                                        className={({ isActive }) => cn(
                                            "block py-2 px-3 text-sm rounded-lg transition-colors relative",
                                            isActive ? "text-red-500 bg-zinc-900/50" : "text-zinc-500 hover:text-zinc-300"
                                        )}
                                    >
                                        Depositar
                                    </NavLink>
                                    <NavLink
                                        to={ROUTES.TRANSACTIONS.WITHDRAW}
                                        className={({ isActive }) => cn(
                                            "block py-2 px-3 text-sm rounded-lg transition-colors relative",
                                            isActive ? "text-red-500 bg-zinc-900/50" : "text-zinc-500 hover:text-zinc-300"
                                        )}
                                    >
                                        Retirar
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        <NavLink
                            to={ROUTES.REPORTS.INCOME}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                                isActive ? "bg-red-600/10 text-red-500" : "hover:bg-zinc-900 hover:text-white"
                            )}
                        >
                            <PieChart size={20} />
                            <span className="font-medium">Análisis & Presupuesto</span>
                        </NavLink>

                        <NavLink
                            to={ROUTES.LOANS.REQUEST}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                                isActive ? "bg-red-600/10 text-red-500" : "hover:bg-zinc-900 hover:text-white"
                            )}
                        >
                            <CreditCard size={20} />
                            <span className="font-medium">Tarjetas & Préstamos</span>
                        </NavLink>
                    </nav>
                </div>

                {/* Servicios Section */}
                <div>
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2">
                        Servicios
                    </h3>
                    <nav className="space-y-1">
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-900 hover:text-white cursor-pointer transition-all text-zinc-400">
                            <Landmark size={20} className="text-zinc-500" />
                            <span className="font-medium">Inversiones</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-900 hover:text-white cursor-pointer transition-all text-zinc-400">
                            <Settings size={20} className="text-zinc-500" />
                            <span className="font-medium">Configuración</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-900 hover:text-white cursor-pointer transition-all text-zinc-400">
                            <HelpCircle size={20} className="text-zinc-500" />
                            <span className="font-medium">Ayuda & Soporte</span>
                        </div>
                    </nav>
                </div>
            </div>

            {/* User Profile */}
            <div className="p-4 border-t border-zinc-800">
                <div className="bg-zinc-900 rounded-xl p-3 flex items-center gap-3 hover:bg-zinc-800 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg shadow-red-900/20">
                        {user?.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate group-hover:text-red-500 transition-colors">
                            {user?.nombre || 'Usuario Pro'}
                        </p>
                        <p className="text-xs text-zinc-500 truncate">
                            {user?.email || 'user@estebanquito.com'}
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        className="text-zinc-500 hover:text-white transition-colors"
                        title="Cerrar Sesión"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
