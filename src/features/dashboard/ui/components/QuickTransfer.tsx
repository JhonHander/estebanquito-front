import React, { useState } from 'react';
import { Send, Plus } from 'lucide-react';

export const QuickTransfer: React.FC = () => {
    const [selectedContact, setSelectedContact] = useState(1);
    const contacts = [
        { id: 1, name: "Ana", image: "https://i.pravatar.cc/150?u=1" },
        { id: 2, name: "Carlos", image: "https://i.pravatar.cc/150?u=2" },
        { id: 3, name: "Sofia", image: "https://i.pravatar.cc/150?u=3" },
        { id: 4, name: "David", image: "https://i.pravatar.cc/150?u=4" },
        { id: 5, name: "Elena", image: "https://i.pravatar.cc/150?u=5" },
    ];

    return (
        <div className="bg-[#121212] rounded-xl p-6 border border-zinc-800 hover:border-white/20 transition-all flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Transferencia Rápida</h3>
                <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Recientes</span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-6 mb-6 scrollbar-hide">
                <div className="flex flex-col items-center gap-3 min-w-[64px]">
                    <button className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 border-dashed flex items-center justify-center text-zinc-500 hover:text-white hover:border-white transition-all group">
                        <Plus size={24} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <span className="text-xs text-zinc-500">Nuevo</span>
                </div>

                {contacts.map((contact) => (
                    <div
                        key={contact.id}
                        onClick={() => setSelectedContact(contact.id)}
                        className="flex flex-col items-center gap-3 min-w-[64px] cursor-pointer group"
                    >
                        <div className="relative">
                            <img
                                src={contact.image}
                                alt={contact.name}
                                className={`w-14 h-14 rounded-full border-2 transition-all duration-300 ${selectedContact === contact.id ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105' : 'border-transparent group-hover:border-zinc-700'}`}
                            />
                            {selectedContact === contact.id && (
                                <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                            )}
                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-zinc-500 rounded-full border-2 border-[#121212]"></div>
                        </div>
                        <span className={`text-xs transition-colors ${selectedContact === contact.id ? 'text-white font-bold' : 'text-zinc-500 group-hover:text-zinc-300'}`}>{contact.name}</span>
                    </div>
                ))}
            </div>

            <div className="mt-auto space-y-4">
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <span className="text-zinc-500 font-bold">$</span>
                    </div>
                    <input
                        type="text"
                        placeholder="0"
                        defaultValue="50.000"
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-4 pl-10 pr-4 text-white text-lg font-bold placeholder:text-zinc-700 focus:outline-none focus:border-white/20 focus:bg-zinc-900 transition-all"
                    />
                </div>
                <button className="w-full bg-white hover:bg-zinc-200 text-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 font-bold shadow-lg active:scale-[0.98]">
                    Enviar Dinero <Send size={18} />
                </button>
            </div>
        </div>
    );
};
