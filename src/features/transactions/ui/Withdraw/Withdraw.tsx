import React, { useState } from 'react';
import { Wallet, Hash, CheckCircle, MapPin } from 'lucide-react';

const Withdraw: React.FC = () => {
    const [step, setStep] = useState<'input' | 'code'>('input');
    const [amount, setAmount] = useState('20000');

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-white mb-2">Retiro sin Tarjeta</h2>
                <p className="text-zinc-400">Genera un código para retirar efectivo en cajeros automáticos sin usar tu tarjeta.</p>
            </div>

            {step === 'input' ? (
                <div className="bg-[#121212] rounded-2xl border border-zinc-800 hover:border-white/20 transition-all p-8 shadow-xl">
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-zinc-400 mb-3">Monto a retirar</label>
                        <div className="relative mb-4">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-zinc-500">$</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-zinc-900/50 border border-zinc-700 rounded-2xl py-6 pl-12 pr-4 text-4xl font-bold text-white focus:outline-none focus:border-white/30 transition-all placeholder-zinc-700"
                            />
                        </div>
                        <div className="flex gap-3 justify-center">
                            {['40000', '100000', '500000'].map(val => (
                                <button
                                    key={val}
                                    onClick={() => setAmount(val)}
                                    className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors"
                                >
                                    ${val}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-medium text-zinc-400 mb-3">Cuenta de Origen</label>
                        <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-red-600 p-2 rounded-lg">
                                    <Wallet className="text-white" size={20} />
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm">Billetera Principal</p>
                                    <p className="text-zinc-500 text-xs">Saldo: $38.450.000</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setStep('code')}
                        className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 transform active:scale-[0.99]"
                    >
                        <Hash size={20} /> Generar Código de Retiro
                    </button>
                </div>
            ) : (
                <div className="bg-[#121212] rounded-2xl border border-zinc-800 hover:border-white/20 transition-all p-8 shadow-xl text-center relative overflow-hidden animate-in zoom-in-95 duration-300">
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse"></div>

                    <div className="mb-6">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500">
                            <CheckCircle size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white">¡Código Generado!</h3>
                        <p className="text-zinc-400 text-sm">Utiliza estos datos en el cajero automático.</p>
                    </div>

                    <div className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
                        <div className="grid grid-cols-2 gap-4 divide-x divide-zinc-800">
                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Referencia</p>
                                <p className="text-2xl font-mono font-bold text-white tracking-widest">8492 1029</p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Código de Seguridad</p>
                                <p className="text-2xl font-mono font-bold text-white tracking-widest">4812</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center text-sm">
                            <span className="text-zinc-400">Monto a retirar:</span>
                            <span className="text-white font-bold text-lg">${amount}.00</span>
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 text-left p-3 rounded-lg bg-zinc-900/50">
                            <div className="bg-zinc-800 p-2 rounded-full text-zinc-400"><MapPin size={16} /></div>
                            <p className="text-xs text-zinc-400">Acude a cualquier cajero de la red <span className="text-white font-medium">Red compartida</span>.</p>
                        </div>
                        <div className="flex items-center gap-3 text-left p-3 rounded-lg bg-zinc-900/50">
                            <div className="bg-zinc-800 p-2 rounded-full text-zinc-400"><Hash size={16} /></div>
                            <p className="text-xs text-zinc-400">Selecciona "Retiro sin Tarjeta" en la pantalla e ingresa los códigos.</p>
                        </div>
                    </div>

                    <p className="text-red-500 text-xs font-medium mb-6 animate-pulse">Este código expira en 15:00 minutos</p>

                    <button
                        onClick={() => setStep('input')}
                        className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 rounded-xl transition-colors"
                    >
                        Finalizar
                    </button>
                </div>
            )}
        </div>
    );
};

export default Withdraw;
