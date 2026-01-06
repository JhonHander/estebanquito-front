import React from 'react';
import { Search, Bell, Home, ChevronRight, Check, Info, AlertCircle, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@features/auth';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface TopBarProps {
    onMenuClick: () => void;
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
    const location = useLocation();
    // const { user } = useAuth();

    const notifications = [
        {
            id: 1,
            title: "Transferencia Recibida",
            description: "Has recibido $500.000 de Carlos Pérez",
            time: "Hace 5 min",
            type: "success",
            unread: true
        },
        {
            id: 2,
            title: "Pago Procesado",
            description: "Tu suscripción a Spotify ha sido renovada",
            time: "Hace 2 horas",
            type: "info",
            unread: true
        },
        {
            id: 3,
            title: "Seguridad",
            description: "Nuevo inicio de sesión desde Bogotá, CO",
            time: "Ayer",
            type: "warning",
            unread: false
        },
        {
            id: 4,
            title: "Límite de Gastos",
            description: "Has alcanzado el 80% de tu presupuesto mensual",
            time: "Ayer",
            type: "info",
            unread: false
        }
    ];

    // Simple breadcrumb logic
    const getBreadcrumbs = () => {
        const path = location.pathname.split('/').filter(Boolean);
        // Default to "Finanzas > Resumen General" if on dashboard root
        if (path.length === 1 && path[0] === 'dashboard') {
            return (
                <>
                    <span className="text-gray-500">Finanzas</span>
                    <ChevronRight size={16} className="text-gray-600" />
                    <span className="text-white font-medium">Resumen General</span>
                </>
            );
        }

        return (
            <>
                <span className="text-gray-500">Finanzas</span>
                {path.slice(1).map((segment, index) => (
                    <React.Fragment key={segment}>
                        <ChevronRight size={16} className="text-gray-600" />
                        <span className="text-white font-medium capitalize">{segment}</span>
                    </React.Fragment>
                ))}
            </>
        );
    };

    return (
        <header className="h-16 border-b border-white/10 bg-[#0a0a0a] flex items-center justify-between px-4 lg:px-6 shrink-0 sticky top-0 z-30">
            <div className="flex items-center gap-2 text-sm">
                <button onClick={onMenuClick} className="lg:hidden text-gray-400 hover:text-white mr-2">
                    <Menu size={24} />
                </button>
                <div className="hidden md:flex items-center gap-2">
                    <Home size={16} className="text-gray-500" />
                    <ChevronRight size={16} className="text-gray-600" />
                    {getBreadcrumbs()}
                </div>
                <div className="md:hidden">
                    <span className="text-white font-medium">Estebanquito</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative w-64 hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                    <Input
                        placeholder="Buscar transacciones..."
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/20 rounded-full h-9"
                    />
                </div>
                <Button variant="ghost" size="icon" className="md:hidden text-gray-400 hover:text-white hover:bg-white/5 rounded-full">
                    <Search size={20} />
                </Button>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full relative">
                            <Bell size={20} />
                            {notifications.some(n => n.unread) && (
                                <span className="absolute top-2 right-2 size-2 bg-white rounded-full border-2 border-[#0a0a0a]" />
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0 bg-[#121212] border-zinc-800 shadow-2xl" align="end">
                        <div className="p-4 flex items-center justify-between">
                            <h4 className="text-sm font-bold text-white">Notificaciones</h4>
                            <Button variant="ghost" className="text-[10px] h-auto p-0 text-zinc-500 hover:text-white uppercase tracking-widest">
                                Marcar todo como leído
                            </Button>
                        </div>
                        <Separator className="bg-zinc-800" />
                        <ScrollArea className="h-[350px]">
                            <div className="flex flex-col">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 flex gap-3 hover:bg-white/5 transition-colors cursor-pointer relative ${notification.unread ? 'bg-white/[0.02]' : ''}`}
                                    >
                                        {notification.unread && (
                                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white" />
                                        )}
                                        <div className={`mt-1 size-8 rounded-full flex items-center justify-center shrink-0 border ${notification.type === 'success' ? 'bg-zinc-900 border-zinc-800 text-white' :
                                            notification.type === 'warning' ? 'bg-zinc-900 border-zinc-800 text-white' :
                                                'bg-zinc-900 border-zinc-800 text-white'
                                            }`}>
                                            {notification.type === 'success' ? <Check size={14} /> :
                                                notification.type === 'warning' ? <AlertCircle size={14} /> :
                                                    <Info size={14} />}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex justify-between items-start gap-2">
                                                <p className={`text-xs font-bold ${notification.unread ? 'text-white' : 'text-zinc-400'}`}>
                                                    {notification.title}
                                                </p>
                                                <span className="text-[10px] text-zinc-600 whitespace-nowrap">{notification.time}</span>
                                            </div>
                                            <p className="text-[11px] text-zinc-500 leading-relaxed">
                                                {notification.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <Separator className="bg-zinc-800" />
                        <div className="p-2">
                            <Button variant="ghost" className="w-full text-xs text-zinc-400 hover:text-white hover:bg-white/5 h-8">
                                Ver todas las notificaciones
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </header>
    );
};

export default TopBar;
