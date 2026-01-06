import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface StatCardProps {
    title: string;
    amount: number | string;
    change: number;
    icon: React.ElementType;
    trend: 'up' | 'down';
    description?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    amount,
    change,
    icon: Icon,
    trend,
    description = "vs el mes pasado"
}) => {
    const isUp = trend === 'up';

    return (
        <div className="bg-[#121212] rounded-xl p-4 border border-zinc-800 hover:border-zinc-700 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-2 relative z-10">
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white">
                    <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full border ${isUp ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400' : 'border-red-500/20 bg-red-500/10 text-red-400'}`}>
                    {isUp ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownLeft size={12} className="mr-1" />}
                    <span>{Math.abs(change)}%</span>
                </div>
            </div>

            <div className="space-y-1 mb-3 relative z-10">
                <h3 className="text-zinc-500 text-sm font-medium">{title}</h3>
                <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-white tracking-tight">
                        {typeof amount === 'number' ? amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }) : amount}
                    </p>
                </div>
                <p className="text-xs text-zinc-500">{description}</p>
            </div>
        </div>
    );
};
