import React from 'react';
import { Filter, Download, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

const Movements: React.FC = () => {
    const allTransactions = [
        { id: 1, type: "Compra", entity: "Apple Store", date: "12 May, 2025", amount: -5200000, status: "Completado" },
        { id: 2, type: "Suscripción", entity: "Spotify Premium", date: "11 May, 2025", amount: -24900, status: "Completado" },
        { id: 3, type: "Ingreso", entity: "Tech Solutions Inc.", date: "10 May, 2025", amount: 18000000, status: "Completado" },
        { id: 4, type: "Transferencia", entity: "Carlos Ruiz", date: "09 May, 2025", amount: -600000, status: "Pendiente" },
        { id: 5, type: "Compra", entity: "Uber Eats", date: "08 May, 2025", amount: -98000, status: "Completado" },
        { id: 6, type: "Retiro", entity: "ATM Cajero", date: "07 May, 2025", amount: -800000, status: "Completado" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold text-white">Historial de Movimientos</h2>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#121212] border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-white transition-colors">
                        <Filter size={16} /> Filtrar
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm text-black hover:bg-zinc-200 transition-colors font-bold shadow-lg">
                        <Download size={16} /> Exportar
                    </button>
                </div>
            </div>

            <div className="bg-[#121212] rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-800 text-zinc-500 text-xs uppercase tracking-wider bg-zinc-900/50">
                                <th className="p-4 font-medium">Tipo</th>
                                <th className="p-4 font-medium">Entidad / Descripción</th>
                                <th className="p-4 font-medium">Fecha</th>
                                <th className="p-4 font-medium">Estado</th>
                                <th className="p-4 font-medium text-right">Monto</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {allTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-zinc-900/30 transition-colors group">
                                    <td className="p-4 text-sm text-zinc-300">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-900 border border-zinc-800 text-zinc-500">
                                                {tx.amount > 0 ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                                            </div>
                                            {tx.type}
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-white font-medium">{tx.entity}</td>
                                    <td className="p-4 text-sm text-zinc-500">{tx.date}</td>
                                    <td className="p-4">
                                        <span className={`text-xs px-2 py-1 rounded-full font-bold border border-zinc-800 bg-zinc-900 text-zinc-400`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className={`p-4 text-sm font-bold text-right ${tx.amount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-zinc-800 flex justify-center">
                    <button className="text-sm text-zinc-500 hover:text-white transition-colors">Cargar más movimientos...</button>
                </div>
            </div>
        </div>
    );
};

export default Movements;
