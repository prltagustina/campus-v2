"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const sections = [
  {
    id: "que",
    number: "01",
    title: "Qu\u00e9 ense\u00f1ar",
    content:
      "Define los contenidos fundamentales que todas las escuelas deben ense\u00f1ar, organizados por \u00e1reas, ciclos y grados.",
    detail:
      "Los contenidos de cada \u00e1rea se presentan en cuadros que muestran su progresi\u00f3n y complejizaci\u00f3n, a fin de facilitar la planificaci\u00f3n de propuestas integrales y articuladas.",
  },
  {
    id: "como",
    number: "02",
    title: "C\u00f3mo hacerlo",
    content:
      "Propone articular contenidos, incorporar enfoques transversales y diversificar las estrategias de ense\u00f1anza para garantizar aprendizajes significativos en todas las aulas.",
    detail:
      "Mediante orientaciones did\u00e1cticas, ejemplos y recomendaciones espec\u00edficas para cada \u00e1rea y ciclo.",
  },
  {
    id: "por-que",
    number: "03",
    title: "Con qu\u00e9 prop\u00f3sito",
    content:
      "Se articula en torno a principios pol\u00edtico-pedag\u00f3gicos s\u00f3lidos para que las infancias accedan al conocimiento y se desarrollen plenamente como ciudadanas y ciudadanos cr\u00edticos, creativos y solidarios.",
    detail:
      "En las escuelas, el Estado materializa su responsabilidad indelegable: garantizar el derecho a la Educaci\u00f3n.",
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
    <section id="que-ensenar" className="w-full py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#494963]/30 mb-3 block">
                Propuesta curricular
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#494963] leading-tight font-sans">
                Qu&eacute; ense&ntilde;ar
                <br />
                C&oacute;mo hacerlo
                <br />
                Y con qu&eacute; prop&oacute;sito
              </h2>
            </div>

            {/* Navigation controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border-2 border-[#494963]/15 flex items-center justify-center text-[#494963]/40 hover:border-[#494963]/30 hover:text-[#494963] transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-semibold text-[#494963]/30 tabular-nums min-w-[3ch] text-center">
                {active + 1}/{sections.length}
              </span>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full border-2 border-[#494963]/15 flex items-center justify-center text-[#494963]/40 hover:border-[#494963]/30 hover:text-[#494963] transition-colors"
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
                    <span className="text-[7rem] md:text-[10rem] lg:text-[12rem] font-black text-[#494963]/5 leading-none select-none -mb-6 md:-mb-8">
                      {section.number}
                    </span>

                    {/* Content */}
                    <div className="flex flex-col justify-center md:py-8">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#494963] mb-6">
                        {section.title}
                      </h3>
                      <p className="text-lg md:text-xl text-[#494963]/65 leading-relaxed mb-4 max-w-2xl">
                        {section.content}
                      </p>
                      <p className="text-base md:text-lg text-[#494963]/35 leading-relaxed max-w-2xl">
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
                    ? "w-8 bg-[#494963]"
                    : "w-3 bg-[#494963]/10 hover:bg-[#494963]/25"
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
