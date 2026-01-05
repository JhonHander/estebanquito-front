import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

export const HeroBanner: React.FC = () => {
    return (
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-red-950 via-zinc-950 to-red-950 border border-zinc-800 p-8 md:p-10 mb-8">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                <ShieldCheck size={300} className="text-white" />
            </div>
            <div className="relative z-10 max-w-2xl">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    ¡Hola de nuevo, Alex!
                </h1>
                <p className="text-zinc-300 text-lg mb-8 max-w-xl leading-relaxed opacity-90">
                    Tu salud financiera es sólida este mes. Has gastado un 15% menos que el promedio mensual y tus inversiones están en alza. ¡Sigue así!
                </p>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-zinc-100 transition-colors shadow-lg flex items-center gap-2">
                        <Zap size={18} className="fill-black" />
                        Ver Reporte Mensual
                    </button>
                    <button className="bg-red-900/30 backdrop-blur-sm text-white border border-red-500/30 px-6 py-3 rounded-xl font-medium hover:bg-red-900/50 transition-colors">
                        Gestionar Presupuesto
                    </button>
                </div>
            </div>
        </div>
    );
};
