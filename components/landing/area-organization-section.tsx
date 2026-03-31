"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* Iconos SVG para cada sección */
const PresentacionIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16.31 17.77" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path strokeWidth="1.2" d="M11.05,2.64c1.78.74,3.29,2.17,4.08,4.09,1.59,3.86-.24,8.27-4.1,9.86-3.86,1.59-8.27-.24-9.86-4.1-1.59-3.86.24-8.27,4.1-9.86"/>
    <path d="M9.42,6.54c.78.32,1.43.95,1.79,1.79.7,1.69-.11,3.62-1.79,4.32-1.69.7-3.62-.11-4.32-1.8-.7-1.68.11-3.61,1.79-4.32"/>
    <line x1="9.51" y1="12.9" x2="11.04" y2="16.59"/>
    <line x1="1.17" y1="12.49" x2="4.85" y2="10.98"/>
    <line x1="11.46" y1="8.25" x2="15.14" y2="6.73"/>
    <line x1="5.26" y1="16.59" x2="6.87" y2="12.71"/>
    <polyline strokeWidth="1.2" points="8.15 9.61 11.05 2.64 11.06 .6 5.36 .6 5.36 2.82 8.15 9.61"/>
    <line x1="11.46" y1="10.72" x2="15.13" y2="12.51"/>
    <line x1="1.18" y1="6.71" x2="4.88" y2="8.25"/>
  </svg>
);

const ObjetivosIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16.42 16.42" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2">
    <circle cx="8.21" cy="8.21" r="7.61"/>
    <polyline points="4.35 8.13 6.98 10.76 12.07 5.66"/>
  </svg>
);

const ContenidosIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 12.72 15.95" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path strokeWidth="1.2" d="M.6,15.35v-7.08s3.39,1.83,3.39,1.83l2.37-1.69,2.37,1.69,3.39-1.83v7.08"/>
    <path strokeWidth="1.2" d="M.61,8.27L5.81.89c.27-.38.84-.38,1.11,0l5.2,7.38"/>
    <path strokeWidth="1.2" d="M3.99,10.1v5.25"/>
    <path strokeWidth="1.2" d="M8.73,10.1v5.25"/>
    <path fill="currentColor" strokeWidth=".65" d="M6.36.46l-2.98,3.88h5.96S6.36.46,6.36.46Z"/>
  </svg>
);

const EnfoquesIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16.06 16.89" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <circle fill="currentColor" cx="7.42" cy="8.67" r="1.81"/>
    <polyline points="5.74 4.92 7.42 8.67 10.99 7.5"/>
    <line x1="7.42" y1="8.67" x2="4.01" y2="12.54"/>
    <path strokeWidth="1.2" d="M4.88,14.85c.78.33,1.64.51,2.54.51,3.6,0,6.53-2.84,6.68-6.39"/>
    <path strokeWidth="1.2" d="M1.72,12.17c-.63-1.02-.99-2.22-.99-3.49,0-1.9.79-3.61,2.05-4.81"/>
    <path strokeWidth="1.2" d="M6.96,2c.15,0,.31-.01.46-.01,2.19,0,4.13,1.05,5.35,2.68"/>
    <circle cx="13.45" cy="6.86" r="2.11"/>
    <circle cx="4.72" cy="2.61" r="2.11"/>
    <circle cx="2.61" cy="14.28" r="2.11"/>
  </svg>
);

const RecomendacionesIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 17.4 17.7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6.83" y1="5.33" x2="11.7" y2="5.33"/>
    <line x1="6.79" y1="7.78" x2="10.12" y2="7.78"/>
    <line x1="4.81" y1="5.33" x2="3.79" y2="5.33"/>
    <line x1="4.82" y1="7.78" x2="3.19" y2="7.78"/>
    <line x1="6.79" y1="10.2" x2="9.1" y2="10.2"/>
    <line x1="4.82" y1="10.2" x2="3.79" y2="10.2"/>
    <path strokeWidth="1.2" d="M8.4,14.93h-.85c-3.83,0-6.94-3.11-6.94-6.94h0c0-4.08,3.31-7.39,7.39-7.39h5.88c.34,0,.62.28.62.62v4.41"/>
    <path strokeWidth="1.2" d="M16.08,5.91h0c.82.56.96,1.78.31,2.73l-4.62,6.73-3.37,1.73.41-3.77,4.62-6.73c.65-.94,1.84-1.25,2.66-.69Z"/>
    <line strokeWidth="1.2" x1="15.56" y1="9.84" x2="12.6" y2="7.81"/>
  </svg>
);

const LecturasIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 13.49 15.46" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path strokeWidth="1.2" d="M12.85,14.86H2.11c-.85-.01-1.52-.71-1.51-1.56,0-.4.17-.78.45-1.06.29-.29.68-.45,1.08-.45h10.72"/>
    <path strokeWidth="1.2" d="M11.36,11.8v3.06"/>
    <path strokeWidth="1.2" d="M.6,13.33V1.9c0-.71.58-1.29,1.3-1.3h10.98v11.03"/>
    <path fill="currentColor" strokeWidth=".55" d="M6.45,9.03l-1.61-1.62-1.58,1.62V.6h3.19v8.43Z"/>
  </svg>
);

const items = [
  {
    number: "01",
    title: "Presentación del área",
    description:
      "Fundamentos, sentido formativo y ejes de contenido que orientan la propuesta curricular.",
    icon: PresentacionIcon,
  },
  {
    number: "02",
    title: "Objetivos",
    description:
      "Metas de aprendizaje por ciclo (primero, segundo y tercero) y para séptimo grado.",
    icon: ObjetivosIcon,
  },
  {
    number: "03",
    title: "Contenidos",
    description:
      "Organizados en cuadros por eje y grado, con progresión clara y articulación vertical.",
    icon: ContenidosIcon,
  },
  {
    number: "04",
    title: "Enfoques transversales",
    description:
      "Etiquetas que señalan qué contenidos pueden trabajarse desde la ciudadanía, la educación ambiental y otros enfoques.",
    icon: EnfoquesIcon,
  },
  {
    number: "05",
    title: "Recomendaciones",
    description:
      "Orientaciones específicas para la enseñanza, la evaluación y la diversificación.",
    icon: RecomendacionesIcon,
  },
  {
    number: "06",
    title: "Lecturas sugeridas y glosario",
    description:
      "Bibliografía complementaria y definiciones clave para profundizar en cada área.",
    icon: LecturasIcon,
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
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#494963] leading-tight font-display">
                {"C\u00f3mo est\u00e1"}
                <br />
                {"organizada cada \u00e1rea"}
              </h2>
              <p className="text-lg md:text-xl text-[#494963]/50 mt-4 max-w-md">
                {"Todas comparten una misma estructura de seis secciones."}
              </p>
            </div>

            {/* Desktop scroll controls */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => scroll("left")}
                className="flex items-center justify-center text-[#494963]/30 hover:text-[#494963] transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="flex items-center justify-center text-[#494963]/30 hover:text-[#494963] transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-6 h-6" />
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
                  className={`relative h-full min-h-[220px] rounded-2xl p-6 md:p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-default overflow-hidden ${hoveredIndex === index
                      ? // Hovered state
                      "md:bg-[#494963] md:text-white md:shadow-xl bg-[#494963] text-white"
                      : // Not hovered
                      "md:bg-[#494963]/[0.03] md:text-[#494963] bg-[#494963]/[0.90] text-white"
                    }`}
                >
                  {/* Icon + Number */}
                  <div className="flex items-center gap-3 mb-5">
                    <item.icon
                      className={`w-5 h-5 flex-shrink-0 transition-colors duration-500 ${hoveredIndex === index
                          ? "md:text-white/80 text-white/80"
                          : "md:text-[#494963] text-white/80"
                        }`}
                    />
                    <span
                      className={`text-2xl md:text-3xl font-bold leading-none transition-colors duration-500 ${hoveredIndex === index
                          ? "md:text-white/30 text-white/35"
                          : "md:text-[#494963]/20 text-white/30"
                        }`}
                    >
                      {item.number}
                    </span>
                  </div>

                  <h3
                    className={`text-lg md:text-xl font-bold leading-snug mb-3 transition-colors duration-500 font-display ${hoveredIndex === index
                        ? "md:text-white text-white"
                        : "md:text-[#494963] text-white"
                      }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-sm md:text-base leading-relaxed transition-colors duration-500 ${hoveredIndex === index
                        ? "md:text-white/70 text-white/70"
                        : "md:text-[#494963]/50 text-white/75"
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
