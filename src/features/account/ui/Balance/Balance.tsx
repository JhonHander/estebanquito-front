import React from 'react';
import { Wallet, ShieldCheck, Bitcoin, TrendingUp } from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

const Balance: React.FC = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-white mb-6">Mis Saldos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Main Wallet */}
                <div className="bg-gradient-to-br from-red-900 to-red-950 rounded-2xl p-6 border border-zinc-800 relative overflow-hidden group hover:scale-[1.01] transition-transform">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Wallet size={120} className="text-white" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8">
                            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                                <Wallet className="text-white" size={24} />
                            </div>
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">Principal</span>
                        </div>
                        <p className="text-red-200 text-sm font-medium mb-1">Saldo Disponible</p>
                        <h3 className="text-4xl font-bold text-white mb-6">$98.248.000</h3>
                        <div className="flex gap-2">
                            <p className="text-xs text-red-200">**** **** **** 4289</p>
                        </div>
                    </div>
                </div>

                {/* Savings Wallet */}
                <div className="bg-[#121212] rounded-2xl p-6 border border-zinc-800 relative overflow-hidden group hover:border-white/20 transition-all">
                    <div className="flex justify-between items-start mb-8">
                        <div className="bg-zinc-800 p-2 rounded-lg">
                            <ShieldCheck className="text-emerald-500" size={24} />
                        </div>
                        <span className="text-zinc-500 text-xs font-medium">Ahorros</span>
                    </div>
                    <p className="text-zinc-400 text-sm font-medium mb-1">Meta: $200.000.000</p>
                    <h3 className="text-3xl font-bold text-white mb-6">$49.602.000</h3>
                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[24%]"></div>
                    </div>
                    <p className="text-right text-xs text-emerald-500 mt-2">24% completado</p>
                </div>

                {/* Crypto Wallet */}
                <div className="bg-[#121212] rounded-2xl p-6 border border-zinc-800 relative overflow-hidden group hover:border-white/20 transition-all">
                    <div className="flex justify-between items-start mb-8">
                        <div className="bg-zinc-800 p-2 rounded-lg">
                            <Bitcoin className="text-orange-500" size={24} />
                        </div>
                        <span className="text-zinc-500 text-xs font-medium">Cripto</span>
                    </div>
                    <p className="text-zinc-400 text-sm font-medium mb-1">Valor Total</p>
                    <h3 className="text-3xl font-bold text-white mb-6">$16.920.480</h3>
                    <div className="flex items-center gap-2 text-sm text-emerald-500">
                        <TrendingUp size={16} />
                        <span>+5.2% (24h)</span>
                    </div>
                </div>
            </div>

            <div className="bg-[#121212] rounded-xl border border-zinc-800 p-6 mt-8">
                <h3 className="text-lg font-bold text-white mb-4">Resumen Total de Activos</h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                            { name: 'Jan', value: 120000000 },
                            { name: 'Feb', value: 128000000 },
                            { name: 'Mar', value: 126000000 },
                            { name: 'Apr', value: 136000000 },
                            { name: 'May', value: 164768000 }
                        ]}>
                            <defs>
                                <linearGradient id="totalColor" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#totalColor)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Balance;
