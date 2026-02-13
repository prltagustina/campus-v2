"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Inter_Tight } from "next/font/google";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sections = [
  {
    id: "que",
    number: "01",
    title: "Que ensenar",
    content:
      "Define los contenidos fundamentales que todas las escuelas deben ensenar, organizados por areas, ciclos y grados.",
    detail:
      "Los contenidos de cada area se presentan en cuadros que muestran su progresion y complejizacion, a fin de facilitar la planificacion de propuestas integrales y articuladas.",
  },
  {
    id: "como",
    number: "02",
    title: "Como hacerlo",
    content:
      "Propone articular contenidos, incorporar enfoques transversales y diversificar las estrategias de ensenanza para garantizar aprendizajes significativos en todas las aulas.",
    detail:
      "Mediante orientaciones didacticas, ejemplos y recomendaciones especificas para cada area y ciclo.",
  },
  {
    id: "por-que",
    number: "03",
    title: "Con que proposito",
    content:
      "Se articula en torno a principios politico-pedagogicos solidos para que las infancias accedan al conocimiento y se desarrollen plenamente como ciudadanas y ciudadanos criticos, creativos y solidarios.",
    detail:
      "En las escuelas, el Estado materializa su responsabilidad indelegable: garantizar el derecho a la Educacion.",
  },
];

export function WhatWhyHowSection() {
  const [active, setActive] = useState(0);

  const prev = useCallback(
    () => setActive((c) => (c - 1 + sections.length) % sections.length),
    []
  );
  const next = useCallback(
    () => setActive((c) => (c + 1) % sections.length),
    []
  );

  return (
    <section id="que-ensenar" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
            <h2
              className={`${interTight.className} text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight`}
            >
              {"Que ensenar,"}
              <br />
              {"como hacerlo"}
              <br />
              {"y con que proposito"}
            </h2>

            {/* Navigation controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border-2 border-white/20 flex items-center justify-center text-white/50 hover:border-white/40 hover:text-white transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-semibold text-white/40 tabular-nums min-w-[3ch] text-center">
                {active + 1}/{sections.length}
              </span>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full border-2 border-white/20 flex items-center justify-center text-white/50 hover:border-white/40 hover:text-white transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Carousel content */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="w-full flex-shrink-0 px-1"
                >
                  <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-14 items-start">
                    {/* Big number */}
                    <span className="text-[7rem] md:text-[10rem] lg:text-[12rem] font-black text-white/5 leading-none select-none -mb-6 md:-mb-8">
                      {section.number}
                    </span>

                    {/* Content */}
                    <div className="flex flex-col justify-center md:py-8">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
                        {section.title}
                      </h3>
                      <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-4 max-w-2xl">
                        {section.content}
                      </p>
                      <p className="text-base md:text-lg text-white/40 leading-relaxed max-w-2xl">
                        {section.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-10 md:mt-14">
            {sections.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  active === i
                    ? "w-8 bg-white"
                    : "w-3 bg-white/15 hover:bg-white/30"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatWhyHowSection;
