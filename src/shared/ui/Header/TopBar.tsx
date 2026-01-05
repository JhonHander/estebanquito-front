import React from 'react';
import { Search, Bell, Home, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@features/auth';

const TopBar = () => {
    const location = useLocation();
    const { user } = useAuth();

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
        <header className="h-16 border-b border-white/10 bg-[#0a0a0a] flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-2 text-sm">
                <Home size={16} className="text-gray-500" />
                <ChevronRight size={16} className="text-gray-600" />
                {getBreadcrumbs()}
            </div>

            <div className="flex items-center gap-4">
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                    <Input
                        placeholder="Buscar transacciones..."
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-red-500/50 rounded-full h-9"
                    />
                </div>

                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-[#0a0a0a]" />
                </Button>

                <Avatar className="h-9 w-9 border border-white/10">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-yellow-500 text-black font-bold">
                        {user?.nombre ? user.nombre.substring(0, 2).toUpperCase() : 'AM'}
                    </AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
};

export default TopBar;
