"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function QuickAccessBar() {
  return (
    <div className="w-full bg-white py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-0 border border-[#494963]/8 rounded-2xl overflow-hidden">
          {/* Familias -- con imagen de fondo */}
          <Link
            href="/familias"
            className="group relative flex flex-col justify-between p-8 md:p-10 text-white overflow-hidden min-h-[280px]"
          >
            {/* Background image */}
            <Image
              src="/images/banner-familias.jpg"
              alt=""
              fill
              className="object-cover"
              priority
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30 group-hover:from-black/80 group-hover:via-black/60 transition-colors" />
            
            <div className="relative z-10">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 block mb-3">
                Acceso r&aacute;pido
              </span>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-3 font-display">
                Para Familias
              </h3>
              <p className="text-base font-medium text-white/80 leading-relaxed max-w-xs">
                Informaci&oacute;n sobre el nuevo dise&ntilde;o curricular pensada para las familias de la comunidad educativa.
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-2 mt-6 text-white/70 group-hover:text-white transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider">Explorar</span>
              <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
            </div>
          </Link>

          {/* Docentes -- con imagen de fondo */}
          <Link
            href="/docentes"
            className="group relative flex flex-col justify-between p-8 md:p-10 text-white overflow-hidden min-h-[280px]"
          >
            {/* Background image */}
            <Image
              src="/images/banner-directivos.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30 group-hover:from-black/80 group-hover:via-black/60 transition-colors" />
            
            <div className="relative z-10">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 block mb-3">
                Acceso r&aacute;pido
              </span>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-3 font-display">
                Para Docentes y Directivos
              </h3>
              <p className="text-base font-medium text-white/80 leading-relaxed max-w-xs">
                Marco general, documentos de descarga, formaciones y orientaciones para la pr&aacute;ctica docente.
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-2 mt-6 text-white/70 group-hover:text-white transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider">Explorar</span>
              <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
