"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function QuickAccessBar() {
  return (
    <div className="w-full bg-white py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-0 border border-[#494963]/8 rounded-2xl overflow-hidden">
          {/* Familias -- dark / primary */}
          <Link
            href="/familias"
            className="group relative flex flex-col justify-between p-8 md:p-10 bg-[#494963] text-white hover:bg-[#3a3a4f] transition-colors"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 block mb-3">
                Acceso r\u00e1pido
              </span>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
                Para Familias
              </h3>
              <p className="text-sm text-white/45 leading-relaxed max-w-xs">
                {"Informaci\u00f3n sobre el nuevo dise\u00f1o curricular pensada para las familias de la comunidad educativa."}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-6 text-white/50 group-hover:text-white transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider">Explorar</span>
              <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
            </div>
          </Link>

          {/* Docentes -- light / secondary */}
          <Link
            href="/marco-general"
            className="group relative flex flex-col justify-between p-8 md:p-10 bg-white text-[#494963] hover:bg-[#494963]/[0.02] transition-colors"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#494963]/25 block mb-3">
                Acceso r\u00e1pido
              </span>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-3 text-[#494963]">
                Para Docentes y Directivos
              </h3>
              <p className="text-sm text-[#494963]/40 leading-relaxed max-w-xs">
                {"Marco general, documentos de descarga, formaciones y orientaciones para la pr\u00e1ctica docente."}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-6 text-[#494963]/40 group-hover:text-[#494963] transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider">Explorar</span>
              <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
