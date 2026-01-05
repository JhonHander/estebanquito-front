import React, { useState } from 'react';
import { Send } from 'lucide-react';

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
        <div className="bg-[#121212] rounded-xl p-6 border border-zinc-800 hover:border-white/20 transition-all">
            <h3 className="text-lg font-bold text-white mb-6">Transferencia Rápida</h3>

            <div className="flex gap-4 overflow-x-auto pb-4 mb-4 scrollbar-hide">
                <div className="flex flex-col items-center gap-2 min-w-[60px]">
                    <button className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 border-dashed flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-colors">
                        <span className="text-xl">+</span>
                    </button>
                    <span className="text-xs text-zinc-500">Nuevo</span>
                </div>

                {contacts.map((contact) => (
                    <div
                        key={contact.id}
                        onClick={() => setSelectedContact(contact.id)}
                        className="flex flex-col items-center gap-2 min-w-[60px] cursor-pointer group"
                    >
                        <div className="relative">
                            <img
                                src={contact.image}
                                alt={contact.name}
                                className={`w-12 h-12 rounded-full border-2 transition-all ${selectedContact === contact.id ? 'border-white shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'border-transparent group-hover:border-zinc-500'}`}
                            />
                            {selectedContact === contact.id && <div className="absolute inset-0 bg-white/10 rounded-full"></div>}
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#121212]"></div>
                        </div>
                        <span className={`text-xs transition-colors ${selectedContact === contact.id ? 'text-white font-medium' : 'text-zinc-400 group-hover:text-white'}`}>{contact.name}</span>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-4 mt-2">
                <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">$</span>
                    <input
                        type="number"
                        placeholder="0"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-8 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                    />
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl transition-colors flex items-center gap-2 font-medium">
                    Enviar <Send size={18} />
                </button>
            </div>
        </div>
    );
};
