import React from 'react';
import { Plus } from 'lucide-react';

export const CreditCardWidget: React.FC = () => {
    return (
        <div className="bg-[#121212] rounded-xl p-6 border border-zinc-800 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Mis Tarjetas</h3>
                <button className="text-red-500 hover:text-red-400 transition-colors bg-red-900/10 p-2 rounded-lg">
                    <Plus size={16} />
                </button>
            </div>

            <div className="relative w-full aspect-[1.586] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-700 p-6 flex flex-col justify-between mb-4 group hover:scale-[1.02] transition-transform duration-300">
                {/* Abstract Patterns */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-600/20 rounded-full blur-3xl"></div>
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-zinc-600/20 rounded-full blur-3xl"></div>

                <div className="flex justify-between items-start z-10">
                    <div className="text-white/80 font-bold italic tracking-wider text-lg">Estebanquito</div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8 opacity-80" />
                </div>

                <div className="z-10">
                    <div className="text-zinc-400 text-xs mb-1 font-mono">Saldo Actual</div>
                    <div className="text-3xl font-bold text-white tracking-tight">$12,450.00</div>
                </div>

                <div className="flex justify-between items-end z-10">
                    <div className="font-mono text-zinc-300 tracking-widest text-sm">•••• •••• •••• 4289</div>
                    <div className="text-xs text-zinc-400">EXP 12/28</div>
                </div>
            </div>

            <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center text-sm p-3 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer">
                    <span className="text-zinc-400">Límite mensual</span>
                    <div className="text-white font-medium">$5,000 / <span className="text-zinc-500">$10,000</span></div>
                </div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-600 h-full w-1/2 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};
