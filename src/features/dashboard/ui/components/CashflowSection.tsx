import React, { useState } from 'react';
import { Wand2, Download, Loader2 } from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export const CashflowSection: React.FC = () => {
    const [insight, setInsight] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const data = [
        { name: 'Lun', income: 4000, expense: 2400 },
        { name: 'Mar', income: 3000, expense: 1398 },
        { name: 'Mie', income: 2000, expense: 9800 },
        { name: 'Jue', income: 2780, expense: 3908 },
        { name: 'Vie', income: 1890, expense: 4800 },
        { name: 'Sab', income: 2390, expense: 3800 },
        { name: 'Dom', income: 3490, expense: 4300 },
    ];

    const handleGenerateInsight = async () => {
        setLoading(true);
        // Mocking the service call
        setTimeout(() => {
            setInsight("Tu flujo de caja es positivo. Considera invertir el excedente en fondos indexados.");
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="bg-[#121212] rounded-xl p-6 border border-zinc-800 hover:border-white/20 transition-all h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h3 className="text-lg font-bold text-white">Análisis de Flujo de Caja</h3>
                    <p className="text-sm text-zinc-500">Ingresos vs Gastos (Últimos 7 días)</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleGenerateInsight}
                        disabled={loading}
                        className="flex items-center gap-2 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-2 rounded-lg transition-colors border border-zinc-700"
                    >
                        {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                        IA Insight
                    </button>
                    <button className="p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-lg border border-zinc-800">
                        <Download size={16} />
                    </button>
                </div>
            </div>

            {insight && (
                <div className="mb-6 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-sm text-zinc-300 animate-in fade-in slide-in-from-top-2 flex gap-3 items-start">
                    <div className="p-1 bg-zinc-800 rounded-full mt-0.5"><Wand2 size={12} className="text-white" /></div>
                    <div>
                        <span className="text-white font-semibold block mb-1">Análisis Estebanquito:</span>
                        {insight}
                    </div>
                </div>
            )}

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#71717a" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#71717a" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="income" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" name="Ingresos" />
                        <Area type="monotone" dataKey="expense" stroke="#71717a" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" name="Gastos" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
