import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { ROUTES } from '@shared/config/constants';

export const CreditCardWidget: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#121212] rounded-xl p-6 border border-zinc-800 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Mis Tarjetas</h3>
                <button className="text-white hover:text-zinc-300 transition-colors p-2 rounded-lg">
                    <Plus size={16} />
                </button>
            </div>

            <div className="relative w-full aspect-[1.586] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-700 p-6 flex flex-col justify-between mb-4 group hover:scale-[1.02] transition-transform duration-300">
                {/* Abstract Patterns */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-zinc-600/10 rounded-full blur-3xl"></div>

                <div className="flex justify-between items-start z-10">
                    <div className="text-white/80 font-bold italic tracking-wider text-lg">Estebanquito</div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8 opacity-80" />
                </div>

                <div className="z-10">
                    <div className="text-zinc-400 text-xs mb-1 font-mono uppercase tracking-widest">Saldo Disponible</div>
                    <div className="text-3xl font-bold text-white tracking-tight">$ 38.450.000</div>
                </div>

                <div className="flex justify-between items-end z-10">
                    <div className="font-mono text-zinc-300 tracking-widest text-sm">•••• •••• •••• 4289</div>
                    <div className="text-xs text-zinc-400">EXP 12/28</div>
                </div>
            </div>

            <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center text-sm p-3 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer group">
                    <span className="text-zinc-400">Límite mensual</span>
                    <div className="text-white font-medium">$ 8.000.000 / <span className="text-zinc-500">$ 20.000.000</span></div>
                </div>
                <div className="px-3">
                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-white h-full w-1/3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                    </div>
                </div>
                <div className="pt-2">
                    <button
                        onClick={() => navigate(ROUTES.LOANS.REQUEST)}
                        className="w-full py-2 text-sm text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all"
                    >
                        Ver detalles de la tarjeta
                    </button>
                </div>
            </div>
        </div>
    );
};
