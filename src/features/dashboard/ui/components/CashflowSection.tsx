import React, { useState } from 'react';
import { Wand2, Download, Loader2 } from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export const CashflowSection: React.FC = () => {
    const [insight, setInsight] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const data = [
        { name: 'Lun', income: 4000000, expense: 2400000 },
        { name: 'Mar', income: 3000000, expense: 1398000 },
        { name: 'Mie', income: 2000000, expense: 9800000 },
        { name: 'Jue', income: 2780000, expense: 3908000 },
        { name: 'Vie', income: 1890000, expense: 4800000 },
        { name: 'Sab', income: 2390000, expense: 3800000 },
        { name: 'Dom', income: 3490000, expense: 4300000 },
    ];

    const handleGenerateInsight = async () => {
        setLoading(true);
        // Mocking the service call
        setTimeout(() => {
            setInsight("Tu flujo de caja es positivo este mes. Estebanquito te recomienda diversificar tus ahorros en un CDT o fondo de inversión.");
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
                        className="flex items-center gap-2 text-xs font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 px-4 py-2 rounded-lg transition-all font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] disabled:opacity-50"
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
                <div className="mb-6 p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl text-sm text-zinc-300 animate-in fade-in slide-in-from-top-2 flex gap-3 items-start">
                    <div className="p-1 bg-indigo-600 rounded-full mt-0.5 shadow-[0_0_10px_rgba(79,70,229,0.4)]"><Wand2 size={12} className="text-white" /></div>
                    <div>
                        <span className="text-indigo-400 font-semibold block mb-1">Análisis Estebanquito:</span>
                        {insight}
                    </div>
                </div>
            )}

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(value: number) => value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}
                        />
                        <Legend verticalAlign="top" height={36} iconType="circle" />
                        <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" name="Ingresos" />
                        <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" name="Gastos" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
