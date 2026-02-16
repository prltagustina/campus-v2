"use client";

import { Download } from "lucide-react";

export function MarcoHero() {
  return (
    <section className="w-full bg-[#494963] py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-4">
            {"Marco General"}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {"Los fundamentos del"}
            <br />
            {"nuevo Diseño curricular"}
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
            {"El marco general establece los principios politico-pedagogicos, los ejes centrales y las orientaciones que organizan la propuesta curricular para la educacion primaria de la provincia de Santa Fe."}
          </p>
          <a
            href="https://campuseducativo.santafe.edu.ar/diseno-curricular/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#494963] font-semibold text-sm rounded-lg hover:bg-white/90 transition-colors"
          >
            <Download className="w-4 h-4" />
            {"DESCARGAR DISEÑO CURRICULAR COMPLETO"}
          </a>
        </div>
      </div>
    </section>
  );
}
