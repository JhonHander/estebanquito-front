import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Wallet,
    ArrowRightLeft,
    PieChart,
    CreditCard,
    Settings,
    HelpCircle,
    ChevronDown,
    ChevronRight,
    LogOut,
    Landmark,
    User as UserIcon,
    Settings as SettingsIcon
} from 'lucide-react';
import { ROUTES } from '@shared/config/constants';
import { useAuth } from '@features/auth';
import { cn } from '@/lib/utils';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [expandedGroups, setExpandedGroups] = useState<string[]>(['account', 'transactions']);

    const handleLogout = () => {
        logout();
        navigate(ROUTES.HOME);
    };

    const toggleGroup = (group: string) => {
        setExpandedGroups(prev =>
            prev.includes(group)
                ? prev.filter(g => g !== group)
                : [...prev, group]
        );
    };

    const isGroupActive = (paths: string[]) => paths.some(path => location.pathname.startsWith(path));

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0a0a] border-r border-zinc-800 flex flex-col h-screen text-zinc-400 font-sans transition-transform duration-300 lg:static lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Logo */}
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-white/10">
                            E
                        </div>
                        <span className="text-white text-xl font-bold tracking-tight">Estebanquito</span>
                    </div>
                    {/* Close button for mobile */}
                    <button onClick={onClose} className="lg:hidden text-zinc-500 hover:text-white">
                        <ChevronRight className="rotate-180" size={24} />
                    </button>
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
                                    isActive ? "bg-white/10 text-white" : "hover:bg-zinc-900 hover:text-white"
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
                                        <Wallet size={20} className={isGroupActive([ROUTES.ACCOUNT.BALANCE, ROUTES.ACCOUNT.MOVEMENTS, ROUTES.ACCOUNT.PROFILE]) ? "text-white" : "text-zinc-500"} />
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
                                                isActive ? "text-white bg-zinc-900/50" : "text-zinc-500 hover:text-zinc-300"
                                            )}
                                        >
                                            Ver Saldo
                                        </NavLink>
                                        <NavLink
                                            to={ROUTES.ACCOUNT.MOVEMENTS}
                                            className={({ isActive }) => cn(
                                                "block py-2 px-3 text-sm rounded-lg transition-colors relative",
                                                isActive ? "text-white bg-zinc-900/50" : "text-zinc-500 hover:text-zinc-300"
                                            )}
                                        >
                                            Movimientos
                                        </NavLink>
                                        <NavLink
                                            to={ROUTES.ACCOUNT.PROFILE}
                                            className={({ isActive }) => cn(
                                                "block py-2 px-3 text-sm rounded-lg transition-colors relative",
                                                isActive ? "text-white bg-zinc-900/50" : "text-zinc-500 hover:text-zinc-300"
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
                                        <ArrowRightLeft size={20} className={isGroupActive([ROUTES.TRANSACTIONS.DEPOSIT, ROUTES.TRANSACTIONS.WITHDRAW, ROUTES.TRANSACTIONS.TRANSFER]) ? "text-white" : "text-zinc-500"} />
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
                                                isActive ? "text-white bg-zinc-900/50" : "text-zinc-500 hover:text-zinc-300"
                                            )}
                                        >
                                            Transferir
                                        </NavLink>
                                        <NavLink
                                            to={ROUTES.TRANSACTIONS.DEPOSIT}
                                            className={({ isActive }) => cn(
                                                "block py-2 px-3 text-sm rounded-lg transition-colors relative",
                                                isActive ? "text-white bg-zinc-900/50" : "text-zinc-500 hover:text-zinc-300"
                                            )}
                                        >
                                            Depositar
                                        </NavLink>
                                        <NavLink
                                            to={ROUTES.TRANSACTIONS.WITHDRAW}
                                            className={({ isActive }) => cn(
                                                "block py-2 px-3 text-sm rounded-lg transition-colors relative",
                                                isActive ? "text-white bg-zinc-900/50" : "text-zinc-500 hover:text-zinc-300"
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
                                    isActive ? "bg-white/10 text-white" : "hover:bg-zinc-900 hover:text-white"
                                )}
                            >
                                <PieChart size={20} />
                                <span className="font-medium">Análisis & Presupuesto</span>
                            </NavLink>

                            <NavLink
                                to={ROUTES.LOANS.REQUEST}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                                    isActive ? "bg-white/10 text-white" : "hover:bg-zinc-900 hover:text-white"
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
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="bg-zinc-900 rounded-xl p-3 flex items-center gap-3 hover:bg-zinc-800 transition-colors cursor-pointer group">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg shadow-red-900/20">
                                    {(user?.firstName || user?.nombre || 'U').charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate group-hover:text-zinc-400 transition-colors">
                                        {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : (user?.nombre || 'Usuario Pro')}
                                    </p>
                                    <p className="text-xs text-zinc-500 truncate">
                                        {user?.email || 'user@estebanquito.com'}
                                    </p>
                                </div>
                                <ChevronRight size={16} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent side="right" align="end" className="w-56 bg-[#121212] border-zinc-800 p-2 text-zinc-400 shadow-2xl">
                            <div className="space-y-1">
                                <NavLink
                                    to={ROUTES.ACCOUNT.PROFILE}
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-900 hover:text-white transition-colors text-sm"
                                >
                                    <UserIcon size={16} />
                                    <span>Mi Perfil</span>
                                </NavLink>
                                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-900 hover:text-white cursor-pointer transition-colors text-sm">
                                    <SettingsIcon size={16} />
                                    <span>Configuración</span>
                                </div>
                                <div className="h-px bg-zinc-800 my-1" />
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-900 hover:text-white transition-colors text-sm text-left"
                                >
                                    <LogOut size={16} />
                                    <span>Cerrar Sesión</span>
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
