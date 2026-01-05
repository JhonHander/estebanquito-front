import React, { useState, useEffect } from 'react';
import { useAuth } from '@features/auth';
import { reportService } from '../../api/report.service';
import { AlertCircle, ArrowRight, DollarSign, Calendar, CreditCard } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Mock data for the chart
const data = [
    { name: 'Préstamo Personal', value: 5000 },
    { name: 'Tarjeta de Crédito', value: 2500 },
    { name: 'Hipoteca', value: 15000 },
];

const COLORS = ['#f59e0b', '#ef4444', '#3b82f6'];

const TotalDebts: React.FC = () => {
    const { user } = useAuth();
    const [total, setTotal] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTotalDebts = async () => {
            try {
                const data = await reportService.getTotalDebts();
                if (data && data.totalDebts !== undefined) {
                    setTotal(data.totalDebts);
                } else {
                    setError('Error al cargar el total de deudas');
                }
            } catch (err: any) {
                console.error('Error al obtener el total de deudas:', err);
                setError(err.message || 'Error al cargar datos');
            } finally {
                setLoading(false);
            }
        };

        fetchTotalDebts();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Reporte de Deudas</h2>
                    <p className="text-zinc-400">
                        {user?.nombre ? `Hola ${user.nombre}, aquí está el estado de tus deudas.` : 'Resumen de deudas totales.'}
                    </p>
                </div>
                <div className="bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                    <Calendar className="text-zinc-400" size={20} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Stat Card */}
                <div className="lg:col-span-1 bg-gradient-to-br from-amber-900/50 to-zinc-900 border border-amber-500/20 p-8 rounded-3xl relative overflow-hidden group hover:border-white/20 transition-all">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <AlertCircle size={120} className="text-amber-500" />
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center mb-6 text-amber-500">
                            <DollarSign size={24} />
                        </div>

                        <p className="text-zinc-400 font-medium mb-2">Deuda Total</p>
                        {loading ? (
                            <div className="h-12 w-32 bg-zinc-800 animate-pulse rounded-lg"></div>
                        ) : error ? (
                            <p className="text-red-400">{error}</p>
                        ) : (
                            <h3 className="text-5xl font-bold text-white tracking-tight">
                                ${total?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </h3>
                        )}

                        <div className="mt-6 flex items-center gap-2 text-amber-400 bg-amber-500/10 w-fit px-3 py-1 rounded-full text-sm font-medium">
                            <ArrowRight size={16} />
                            <span>Próximo vencimiento: 15/10</span>
                        </div>
                    </div>
                </div>

                {/* Chart Card */}
                <div className="lg:col-span-2 bg-[#121212] border border-zinc-800 p-8 rounded-3xl hover:border-white/20 transition-all">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <CreditCard size={20} className="text-amber-500" />
                            Distribución de Deuda
                        </h3>
                    </div>

                    <div className="h-[250px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                                    formatter={(value: number) => [`$${value}`, 'Monto']}
                                />
                                <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalDebts;
