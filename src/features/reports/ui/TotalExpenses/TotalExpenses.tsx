import React, { useState, useEffect } from 'react';
import { useAuth } from '@features/auth';
import { reportService } from '../../api/report.service';
import { TrendingDown, ArrowDownRight, DollarSign, Calendar, PieChart } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';

// Mock data for the chart
const data = [
    { name: 'Comida', value: 1200 },
    { name: 'Transporte', value: 800 },
    { name: 'Servicios', value: 1500 },
    { name: 'Ocio', value: 600 },
    { name: 'Salud', value: 400 },
];

const TotalExpenses: React.FC = () => {
    const { user } = useAuth();
    const [total, setTotal] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTotalOutcome = async () => {
            try {
                const data = await reportService.getTotalOutcome();
                if (data && data.totalOutcome !== undefined) {
                    setTotal(data.totalOutcome);
                } else {
                    setError('Error al cargar el total de egresos');
                }
            } catch (err: any) {
                console.error('Error al obtener el total de egresos:', err);
                setError(err.message || 'Error al cargar datos');
            } finally {
                setLoading(false);
            }
        };

        fetchTotalOutcome();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Reporte de Gastos</h2>
                    <p className="text-zinc-400">
                        {user?.nombre ? `Hola ${user.nombre}, aquí está el desglose de tus gastos.` : 'Resumen de gastos totales.'}
                    </p>
                </div>
                <div className="bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                    <Calendar className="text-zinc-400" size={20} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Stat Card */}
                <div className="lg:col-span-1 bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-8 rounded-3xl relative overflow-hidden group hover:border-white/20 transition-all">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingDown size={120} className="text-zinc-500" />
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 text-zinc-400">
                            <DollarSign size={24} />
                        </div>

                        <p className="text-zinc-400 font-medium mb-2">Gastos Totales</p>
                        {loading ? (
                            <div className="h-12 w-32 bg-zinc-800 animate-pulse rounded-lg"></div>
                        ) : error ? (
                            <p className="text-red-400">{error}</p>
                        ) : (
                            <h3 className="text-5xl font-bold text-white tracking-tight">
                                ${total?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </h3>
                        )}

                        <div className="mt-6 flex items-center gap-2 text-red-400 bg-red-500/10 w-fit px-3 py-1 rounded-full text-sm font-medium">
                            <ArrowDownRight size={16} />
                            <span>+5.2% vs mes anterior</span>
                        </div>
                    </div>
                </div>

                {/* Chart Card */}
                <div className="lg:col-span-2 bg-[#121212] border border-zinc-800 p-8 rounded-3xl hover:border-white/20 transition-all">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <PieChart size={20} className="text-zinc-400" />
                            Categorías de Gastos
                        </h3>
                        <select className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm rounded-lg px-3 py-2 outline-none focus:border-white/30 transition-colors">
                            <option>Este mes</option>
                            <option>Mes pasado</option>
                        </select>
                    </div>

                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#71717a' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#71717a' }}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    cursor={{ fill: '#27272a', opacity: 0.4 }}
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#ef4444' }}
                                    formatter={(value: number) => [`$${value}`, 'Gasto']}
                                />
                                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill="#ef4444" fillOpacity={0.6 + (index * 0.1)} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalExpenses;
