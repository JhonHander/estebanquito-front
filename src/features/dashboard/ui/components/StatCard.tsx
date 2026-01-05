import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface StatCardProps {
    title: string;
    amount: number | string;
    change: number;
    icon: React.ElementType;
    trend: 'up' | 'down';
    compact?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ title, amount, change, icon: Icon, trend, compact }) => {
    const isUp = trend === 'up';

    return (
        <div className={`bg-[#121212] rounded-xl border border-zinc-800 hover:border-white/20 transition-all ${compact ? 'p-4' : 'p-6'}`}>
            <div className={`flex justify-between items-start ${compact ? 'mb-2' : 'mb-4'}`}>
                <div className={`${compact ? 'p-2' : 'p-3'} rounded-xl bg-zinc-900 border border-zinc-800 ${isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                    <Icon className={compact ? 'w-5 h-5' : 'w-6 h-6'} />
                </div>
                <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full border ${isUp ? 'text-emerald-400 border-emerald-900/30 bg-emerald-900/10' : 'text-red-400 border-red-900/30 bg-red-900/10'}`}>
                    {isUp ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownLeft size={12} className="mr-1" />}
                    {isUp ? '+' : ''}{change}%
                </div>
            </div>
            <div className="space-y-1">
                <h3 className="text-zinc-500 text-sm font-medium">{title}</h3>
                <p className={`${compact ? 'text-xl' : 'text-2xl'} font-bold text-white tracking-tight`}>
                    {typeof amount === 'number' ? amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }) : amount}
                </p>
            </div>
        </div>
    );
};
