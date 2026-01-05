import React, { useState } from 'react';
import { Building, CreditCard, Copy, QrCode, MapPin, Calendar, Hash, CheckCircle } from 'lucide-react';

const Deposit: React.FC = () => {
    const [selectedMethod, setSelectedMethod] = useState<'bank' | 'atm'>('bank');

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Depositar Fondos</h2>
                <p className="text-zinc-400">Elige el método para agregar dinero a tu cuenta.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Method Selection */}
                <div className="space-y-4">
                    <div
                        onClick={() => setSelectedMethod('bank')}
                        className={`p-6 rounded-2xl border cursor-pointer transition-all ${selectedMethod === 'bank' ? 'bg-red-600/10 border-red-500' : 'bg-[#121212] border-zinc-800 hover:border-zinc-600'}`}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 rounded-xl ${selectedMethod === 'bank' ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                                <Building size={24} />
                            </div>
                            <div>
                                <h3 className={`font-bold ${selectedMethod === 'bank' ? 'text-white' : 'text-zinc-300'}`}>Transferencia Bancaria</h3>
                                <p className="text-xs text-zinc-500">SPEI, 24/7</p>
                            </div>
                            {selectedMethod === 'bank' && <CheckCircle className="ml-auto text-red-500" size={24} />}
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Transfiere desde cualquier banco usando tu CLABE interbancaria. Se refleja en minutos.
                        </p>
                    </div>

                    <div
                        onClick={() => setSelectedMethod('atm')}
                        className={`p-6 rounded-2xl border cursor-pointer transition-all ${selectedMethod === 'atm' ? 'bg-red-600/10 border-red-500' : 'bg-[#121212] border-zinc-800 hover:border-zinc-600'}`}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 rounded-xl ${selectedMethod === 'atm' ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <h3 className={`font-bold ${selectedMethod === 'atm' ? 'text-white' : 'text-zinc-300'}`}>Depósito en Efectivo</h3>
                                <p className="text-xs text-zinc-500">Tiendas y Cajeros</p>
                            </div>
                            {selectedMethod === 'atm' && <CheckCircle className="ml-auto text-red-500" size={24} />}
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Deposita efectivo en más de 15,000 puntos: OXXO, 7-Eleven, Farmacias y Cajeros Inteligentes.
                        </p>
                    </div>
                </div>

                {/* Details Panel */}
                <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-8 flex flex-col justify-center h-full">
                    {selectedMethod === 'bank' ? (
                        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                                    <Building size={32} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Datos de tu Cuenta</h3>
                                <p className="text-sm text-zinc-500">Comparte estos datos para recibir transferencias</p>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 group hover:border-zinc-600 transition-colors">
                                    <p className="text-xs text-zinc-500 mb-1">CLABE Interbancaria</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white font-mono text-lg tracking-wider">012 180 0158963472 5</span>
                                        <button className="text-zinc-500 hover:text-white transition-colors"><Copy size={18} /></button>
                                    </div>
                                </div>
                                <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 group hover:border-zinc-600 transition-colors">
                                    <p className="text-xs text-zinc-500 mb-1">Número de Cuenta</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white font-mono text-lg tracking-wider">1589634725</span>
                                        <button className="text-zinc-500 hover:text-white transition-colors"><Copy size={18} /></button>
                                    </div>
                                </div>
                                <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 group hover:border-zinc-600 transition-colors">
                                    <p className="text-xs text-zinc-500 mb-1">Banco Receptor</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white font-medium">STP (Sistema de Transferencias y Pagos)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 text-center">
                            <div className="bg-white p-4 rounded-xl inline-block mb-4">
                                <QrCode size={150} className="text-black" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Código de Depósito</h3>
                                <p className="text-zinc-400 text-sm max-w-xs mx-auto">
                                    Muestra este código al cajero para depositar sin tarjeta. Válido por 24 horas.
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-xs text-zinc-500 mt-6">
                                <div className="flex flex-col items-center gap-2">
                                    <MapPin size={20} className="text-red-500" />
                                    <span>Cualquier Sucursal</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Calendar size={20} className="text-red-500" />
                                    <span>Vence: 24h</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Hash size={20} className="text-red-500" />
                                    <span>Ref: 88291</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Deposit;
