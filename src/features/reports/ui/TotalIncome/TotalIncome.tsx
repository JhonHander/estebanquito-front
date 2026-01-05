import React, { useState, useEffect } from 'react';
import { useAuth } from '@features/auth';
import { reportService } from '../../api/report.service';
import { TrendingUp, ArrowUpRight, DollarSign, Calendar, Activity } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Mock data for the chart - in a real app this would come from the API
const data = [
    { name: 'Ene', value: 2400 },
    { name: 'Feb', value: 1398 },
    { name: 'Mar', value: 9800 },
    { name: 'Abr', value: 3908 },
    { name: 'May', value: 4800 },
    { name: 'Jun', value: 3800 },
    { name: 'Jul', value: 4300 },
];

const TotalIncome: React.FC = () => {
    const { user } = useAuth();
    const [total, setTotal] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTotalIncome = async () => {
            try {
                const data = await reportService.getTotalIncome();
                if (data && data.totalIncome !== undefined) {
                    setTotal(data.totalIncome);
                } else {
                    setError('Error al cargar el total de ingresos');
                }
            } catch (err: any) {
                console.error('Error al obtener el total de ingresos:', err);
                setError(err.message || 'Error al cargar datos');
            } finally {
                setLoading(false);
            }
        };

        fetchTotalIncome();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Reporte de Ingresos</h2>
                    <p className="text-zinc-400">
                        {user?.nombre ? `Hola ${user.nombre}, aquí está el resumen de tus ingresos.` : 'Resumen de ingresos totales.'}
                    </p>
                </div>
                <div className="bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                    <Calendar className="text-zinc-400" size={20} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Stat Card */}
                <div className="lg:col-span-1 bg-gradient-to-br from-emerald-900/50 to-zinc-900 border border-emerald-500/20 p-8 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp size={120} className="text-emerald-500" />
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 text-emerald-500">
                            <DollarSign size={24} />
                        </div>

                        <p className="text-zinc-400 font-medium mb-2">Ingresos Totales</p>
                        {loading ? (
                            <div className="h-12 w-32 bg-zinc-800 animate-pulse rounded-lg"></div>
                        ) : error ? (
                            <p className="text-red-400">{error}</p>
                        ) : (
                            <h3 className="text-5xl font-bold text-white tracking-tight">
                                ${total?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </h3>
                        )}

                        <div className="mt-6 flex items-center gap-2 text-emerald-400 bg-emerald-500/10 w-fit px-3 py-1 rounded-full text-sm font-medium">
                            <ArrowUpRight size={16} />
                            <span>+12.5% vs mes anterior</span>
                        </div>
                    </div>
                </div>

                {/* Chart Card */}
                <div className="lg:col-span-2 bg-[#121212] border border-zinc-800 p-8 rounded-3xl">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Activity size={20} className="text-emerald-500" />
                            Tendencia de Ingresos
                        </h3>
                        <select className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm rounded-lg px-3 py-2 outline-none focus:border-emerald-500 transition-colors">
                            <option>Últimos 6 meses</option>
                            <option>Este año</option>
                        </select>
                    </div>

                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
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
                                    tickFormatter={(value) => `$${value / 1000}k`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#10b981' }}
                                    formatter={(value: number) => [`$${value}`, 'Ingresos']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorIncome)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalIncome;
