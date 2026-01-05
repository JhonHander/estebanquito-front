import React from 'react';
import { CreditCard, Plus, ShieldCheck, Zap, Lock, Smartphone, Globe } from 'lucide-react';

const LoanRequest: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Mis Tarjetas</h2>
                    <p className="text-zinc-400">Gestiona tus tarjetas físicas y virtuales.</p>
                </div>
                <button className="bg-white text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-zinc-200 transition-colors">
                    <Plus size={18} /> Nueva Tarjeta
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Card - Large */}
                <div className="lg:col-span-2 relative h-[300px] rounded-3xl overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 transition-all group-hover:border-white/20"></div>

                    {/* Card Visual */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-white italic tracking-wider">Estebanquito <span className="text-zinc-500">Black</span></h3>
                                <p className="text-zinc-500 text-sm mt-1">World Elite</p>
                            </div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-12 opacity-80" />
                        </div>

                        <div className="flex gap-8">
                            <div>
                                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Saldo Actual</p>
                                <p className="text-4xl font-bold text-white">$12,450.00</p>
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Límite</p>
                                <p className="text-4xl font-bold text-zinc-600">$50,000.00</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-end">
                            <p className="font-mono text-xl text-zinc-300 tracking-widest">•••• •••• •••• 4289</p>
                            <div className="text-right">
                                <p className="text-xs text-zinc-500 uppercase">Vence</p>
                                <p className="text-white font-medium">12/28</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -right-20 -bottom-40 w-80 h-80 bg-zinc-600/10 rounded-full blur-3xl group-hover:bg-zinc-600/20 transition-colors"></div>
                </div>

                {/* Virtual Card - Small */}
                <div className="relative h-[300px] rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-800 to-black p-6 flex flex-col justify-between border border-zinc-800 group hover:border-white/20 transition-all">
                    <div className="flex justify-between items-start">
                        <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg">
                            <Zap className="text-white" size={20} />
                        </div>
                        <span className="bg-zinc-800 text-white text-xs font-bold px-2 py-1 rounded-full border border-zinc-700">Virtual</span>
                    </div>

                    <div>
                        <p className="text-zinc-400 text-sm mb-1">Para compras online</p>
                        <h3 className="text-2xl font-bold text-white tracking-tight">$450.00</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-zinc-400 text-sm">
                            <span>•••• 8821</span>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors"><Lock size={16} /></button>
                                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors"><CreditCard size={16} /></button>
                            </div>
                        </div>
                        <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors">
                            Recargar
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#121212] border border-zinc-800 p-6 rounded-2xl hover:border-white/20 transition-all group">
                    <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black transition-colors text-zinc-400">
                        <ShieldCheck size={24} />
                    </div>
                    <h3 className="font-bold text-white mb-2">Protección de Compras</h3>
                    <p className="text-sm text-zinc-400">Tus compras están aseguradas contra robo o daño accidental por 90 días.</p>
                </div>
                <div className="bg-[#121212] border border-zinc-800 p-6 rounded-2xl hover:border-white/20 transition-all group">
                    <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black transition-colors text-zinc-400">
                        <Smartphone size={24} />
                    </div>
                    <h3 className="font-bold text-white mb-2">Apple Pay & Google Pay</h3>
                    <p className="text-sm text-zinc-400">Añade tus tarjetas a tu wallet digital y paga sin contacto.</p>
                </div>
                <div className="bg-[#121212] border border-zinc-800 p-6 rounded-2xl hover:border-white/20 transition-all group">
                    <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black transition-colors text-zinc-400">
                        <Globe size={24} />
                    </div>
                    <h3 className="font-bold text-white mb-2">Sin Comisiones en el Extranjero</h3>
                    <p className="text-sm text-zinc-400">Viaja tranquilo. No cobramos comisiones por uso internacional.</p>
                </div>
            </div>
        </div>
    );
};

export default LoanRequest;
