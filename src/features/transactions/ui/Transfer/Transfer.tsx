import React, { useState } from 'react';
import { Wallet, ChevronRight, ArrowRight, Plus, X } from 'lucide-react';

const Transfer: React.FC = () => {
    const [isNewContactOpen, setIsNewContactOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(0);
    const contacts = [
        { name: "Ana Lopez", img: "https://ui-avatars.com/api/?name=Ana+L&background=random" },
        { name: "Carlos Ruiz", img: "https://ui-avatars.com/api/?name=Carlos+R&background=random" },
        { name: "Sofia M.", img: "https://ui-avatars.com/api/?name=Sofia+M&background=random" },
        { name: "Mike T.", img: "https://ui-avatars.com/api/?name=Mike+T&background=random" },
        { name: "Juan P.", img: "https://ui-avatars.com/api/?name=Juan+P&background=random" },
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Transferir Dinero</h2>
                <p className="text-zinc-400">Envía dinero a tus amigos o cuentas bancarias al instante.</p>
            </div>

            <div className="bg-[#121212] rounded-2xl border border-zinc-800 p-6 md:p-8 shadow-xl">

                {/* Step 1: Select Contact */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-zinc-400 mb-3">Enviar a</label>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        <button
                            onClick={() => setIsNewContactOpen(true)}
                            className="flex flex-col items-center gap-2 min-w-[60px]"
                        >
                            <div className="w-14 h-14 rounded-full border-2 border-dashed border-zinc-700 flex items-center justify-center text-zinc-500 hover:border-red-500 hover:text-red-500 transition-colors bg-zinc-900">
                                <Plus size={24} />
                            </div>
                            <span className="text-xs text-zinc-400">Nuevo</span>
                        </button>
                        {contacts.map((u, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedContact(i)}
                                className={`flex flex-col items-center gap-2 min-w-[60px] group ${selectedContact === i ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                            >
                                <div className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all relative ${selectedContact === i ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'border-transparent group-hover:border-zinc-500'}`}>
                                    <img src={u.img} alt={u.name} className="w-full h-full object-cover" />
                                    {selectedContact === i && <div className="absolute inset-0 bg-white/10"></div>}
                                </div>
                                <span className={`text-xs transition-colors ${selectedContact === i ? 'text-white font-medium' : 'text-zinc-500 group-hover:text-zinc-300'}`}>{u.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Step 2: Amount */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-zinc-400 mb-3">Monto a transferir</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-zinc-500">$</span>
                        <input
                            type="number"
                            defaultValue="600000"
                            className="w-full bg-zinc-900/50 border border-zinc-700 rounded-2xl py-6 pl-12 pr-4 text-4xl font-bold text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-zinc-700"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500 font-medium">COP</span>
                    </div>
                    <p className="text-right text-xs text-zinc-500 mt-2">Saldo disponible: $98.248.000</p>
                </div>

                {/* Step 3: Source */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-zinc-400 mb-3">Desde</label>
                    <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-between cursor-pointer hover:border-zinc-700 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-600 p-2 rounded-lg">
                                <Wallet className="text-white" size={20} />
                            </div>
                            <div>
                                <p className="text-white font-medium text-sm">Billetera Principal</p>
                                <p className="text-zinc-500 text-xs">**** 4289</p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-zinc-500" />
                    </div>
                </div>

                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 transform active:scale-[0.99]">
                    Transferir Ahora <ArrowRight size={20} />
                </button>
            </div>

            {/* New Contact Modal */}
            {isNewContactOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#121212] border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-white">Nuevo Contacto</h3>
                            <button onClick={() => setIsNewContactOpen(false)} className="text-zinc-500 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Nombre Completo</label>
                                <input type="text" placeholder="Ej. Juan Perez" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Número de Cuenta / Teléfono</label>
                                <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Banco (Opcional)</label>
                                <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors appearance-none">
                                    <option>Seleccionar Banco...</option>
                                    <option>BBVA</option>
                                    <option>Santander</option>
                                    <option>Banorte</option>
                                </select>
                            </div>
                        </div>
                        <div className="p-6 border-t border-zinc-800 bg-zinc-900/30 flex gap-3 justify-end">
                            <button
                                onClick={() => setIsNewContactOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => setIsNewContactOpen(false)}
                                className="px-6 py-2 text-sm font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-lg shadow-red-900/20"
                            >
                                Guardar Contacto
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transfer;
