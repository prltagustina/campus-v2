"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const items = [
  {
    number: "01",
    title: "Presentaci\u00f3n del \u00e1rea",
    description:
      "Fundamentos, sentido formativo y ejes de contenido que orientan la propuesta curricular.",
  },
  {
    number: "02",
    title: "Objetivos",
    description:
      "Metas de aprendizaje por ciclo (primero, segundo y tercero) y para s\u00e9ptimo grado.",
  },
  {
    number: "03",
    title: "Contenidos",
    description:
      "Organizados en cuadros por eje y grado, con progresi\u00f3n clara y articulaci\u00f3n vertical.",
  },
  {
    number: "04",
    title: "Enfoques transversales",
    description:
      "Etiquetas que se\u00f1alan qu\u00e9 contenidos pueden trabajarse desde la ciudadan\u00eda, la educaci\u00f3n ambiental y otros enfoques.",
  },
  {
    number: "05",
    title: "Recomendaciones",
    description:
      "Orientaciones espec\u00edficas para la ense\u00f1anza, la evaluaci\u00f3n y la diversificaci\u00f3n.",
  },
  {
    number: "06",
    title: "Lecturas sugeridas y glosario",
    description:
      "Bibliograf\u00eda complementaria y definiciones clave para profundizar en cada \u00e1rea.",
  },
];

export function AreaOrganizationSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="organizacion"
      className="w-full py-20 md:py-32 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#494963]/40 mb-3 block">
                Estructura compartida
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#494963] leading-tight">
                {"C\u00f3mo est\u00e1"}
                <br />
                {"organizada cada \u00e1rea"}
              </h2>
              <p className="text-lg text-[#494963]/50 mt-4 max-w-md">
                {"Todas comparten una misma estructura de seis secciones."}
              </p>
            </div>

            {/* Desktop scroll controls */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => scroll("left")}
                className="w-11 h-11 rounded-full border-2 border-[#494963]/15 flex items-center justify-center text-[#494963]/40 hover:border-[#494963]/30 hover:text-[#494963] transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-11 h-11 rounded-full border-2 border-[#494963]/15 flex items-center justify-center text-[#494963]/40 hover:border-[#494963]/30 hover:text-[#494963] transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal scroll cards */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[260px] md:w-[280px] snap-start"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`relative h-full rounded-2xl p-6 md:p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-default ${
                    hoveredIndex === index
                      ? "bg-[#494963] text-white scale-[1.03] shadow-xl"
                      : "bg-[#494963]/[0.03] text-[#494963]"
                  }`}
                >
                  {/* Number */}
                  <span
                    className={`text-5xl md:text-6xl font-black leading-none block mb-5 transition-colors duration-500 ${
                      hoveredIndex === index ? "text-white/20" : "text-[#494963]/8"
                    }`}
                  >
                    {item.number}
                  </span>

                  <h3
                    className={`text-lg md:text-xl font-bold leading-snug mb-3 transition-colors duration-500 ${
                      hoveredIndex === index ? "text-white" : "text-[#494963]"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed transition-colors duration-500 ${
                      hoveredIndex === index
                        ? "text-white/70"
                        : "text-[#494963]/50"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
