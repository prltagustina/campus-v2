"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ejes = [
  "Aprendizajes comunes, fundantes y significativos",
  "Relacion dialogica entre la ensenanza y la evaluacion",
  "Alfabetizacion desde el inicio",
  "Matematica en situaciones reales",
  "Mas tiempo para pensar cientificamente",
  "Saberes, Vidas y Mundos: un espacio flexible y por proyectos",
  "Educacion Tecnologica actualizada",
  "Lenguas Extranjeras a lo largo de toda la escolaridad",
  "Lenguajes artisticos con sentido territorial",
  "Practicas corporales como diversidad cultural",
  "Enfoques transversales en todas las areas",
  "La heterogeneidad como punto de partida",
  "Formacion Etica y Ciudadana",
];

export function EjesCentralesSection() {
  return (
    <section id="ejes-centrales" className="w-full py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#494963]">
                {"Ejes centrales de la propuesta"}
              </h3>
              <p className="text-[#494963]/50 text-base mt-2 max-w-lg">
                {"13 ejes que definen la identidad del nuevo diseno curricular."}
              </p>
            </div>
            <Link
              href="/marco-general#ejes"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#494963]/70 hover:text-[#494963] transition-colors flex-shrink-0"
            >
              {"Ver ejes en detalle"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="w-full h-px bg-[#494963]/10 mb-8" />

          {/* Compact grid of eje titles */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ejes.map((eje, index) => (
              <div
                key={index}
                className="flex items-start gap-3 px-4 py-3.5 rounded-lg bg-[#494963]/3 hover:bg-[#494963]/6 transition-colors"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#494963]/10 text-[#494963]/60 text-xs font-semibold flex items-center justify-center mt-0.5">
                  {index + 1}
                </span>
                <span className="text-sm text-[#494963]/80 leading-snug font-medium">
                  {eje}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EjesCentralesSection;
