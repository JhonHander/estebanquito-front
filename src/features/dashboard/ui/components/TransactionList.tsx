import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export const TransactionList: React.FC = () => {
    const transactions = [
        { id: 1, name: "Apple Store", date: "Hoy, 10:23 AM", amount: -1299.00, icon: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", category: "Tecnología" },
        { id: 2, name: "Spotify Premium", date: "Ayer, 4:12 PM", amount: -12.99, icon: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg", category: "Suscripción" },
        { id: 3, name: "Transferencia Recibida", date: "12 May, 2025", amount: 2500.00, icon: null, category: "Salario" },
        { id: 4, name: "Uber Ride", date: "11 May, 2025", amount: -24.50, icon: null, category: "Transporte" },
    ];

    return (
        <div className="bg-[#121212] rounded-xl p-6 border border-zinc-800 hover:border-white/20 transition-all h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Transacciones Recientes</h3>
                <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Ver todo</a>
            </div>

            <div className="space-y-4">
                {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-900/50 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount > 0 ? 'bg-emerald-900/20 text-emerald-500' : 'bg-zinc-800 text-white'}`}>
                                {tx.icon ? (
                                    <img src={tx.icon} className="w-5 h-5 opacity-80 invert" alt="logo" />
                                ) : (
                                    tx.amount > 0 ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />
                                )}
                            </div>
                            <div>
                                <p className="font-medium text-white transition-colors">{tx.name}</p>
                                <p className="text-xs text-zinc-500">{tx.date}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`font-semibold ${tx.amount > 0 ? 'text-emerald-500' : 'text-white'}`}>
                                {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}
                            </p>
                            <p className="text-xs text-zinc-500">{tx.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
