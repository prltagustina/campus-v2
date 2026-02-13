"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface TimelineEvent {
  date: string;
  dateShort: string;
  title: string;
  description: string;
  image: string;
}

interface TimelineYear {
  year: string;
  subtitle: string;
  description: string;
  events?: TimelineEvent[];
}

const timelineData: TimelineYear[] = [
  {
    year: "1997",
    subtitle: "Dise\u00f1o anterior",
    description:
      "Fecha del \u00faltimo dise\u00f1o curricular para la Educaci\u00f3n Primaria en Santa Fe.",
  },
  {
    year: "hasta 2022",
    subtitle: "Experiencias previas",
    description:
      "Experiencias pedag\u00f3gicas y escrituras preliminares del nuevo dise\u00f1o curricular.",
  },
  {
    year: "2023",
    subtitle: "Consultas",
    description: "Jornadas de consulta en las instituciones educativas.",
  },
  {
    year: "2024",
    subtitle: "Conformaci\u00f3n",
    description:
      "Recuperaci\u00f3n de escrituras anteriores y conformaci\u00f3n de nuevos equipos de trabajo. Presentaci\u00f3n de la propuesta y consulta a delegados, coordinadores pedag\u00f3gicos regionales y supervisores. Consultas a especialistas.",
  },
  {
    year: "2025",
    subtitle: "Consolidaci\u00f3n",
    description:
      "Consolidaci\u00f3n de la escritura del nuevo borrador y realizaci\u00f3n de jornadas focales de socializaci\u00f3n y consulta a la comunidad educativa. Formaciones docentes.",
    events: [
      {
        date: "22 de Julio",
        dateShort: "22 Jul",
        title: "Encuentro con el Comit\u00e9 de Educaci\u00f3n Ambiental.",
        description:
          "Se presentaron los enfoques transversales, particularmente el de Educaci\u00f3n Ambiental Integral.",
        image: "/images/foto-1-22julio.jpg",
      },
      {
        date: "25 de Julio",
        dateShort: "25 Jul",
        title: "Encuentro presencial con directores y supervisores.",
        description:
          "Se llev\u00f3 a cabo la presentaci\u00f3n general de la propuesta y se conformaron mesas de trabajo.",
        image: "/images/foto-2-25julio.jpg",
      },
      {
        date: "01 de Agosto",
        dateShort: "01 Ago",
        title: "Reuni\u00f3n con delegados y coordinadores regionales.",
        description:
          "Presentaci\u00f3n del proceso de escritura y di\u00e1logo en torno a dudas e inquietudes.",
        image: "/images/foto-3-01agosto.jpg",
      },
      {
        date: "14 de Agosto",
        dateShort: "14 Ago",
        title: "Socializaci\u00f3n y consulta con equipos de supervisi\u00f3n.",
        description:
          "Con participaci\u00f3n de m\u00e1s de 150 supervisores/as de toda la provincia.",
        image: "/images/foto-4-14agosto.jpg",
      },
      {
        date: "27 de Agosto",
        dateShort: "27 Ago",
        title: "Presentaci\u00f3n al Comit\u00e9 Asesor Provincial de Discapacidad.",
        description:
          "Se present\u00f3 la propuesta en la 3\u00aa Asamblea Ordinaria del Comit\u00e9 Asesor Provincial.",
        image: "/images/foto-5-27agosto.jpg",
      },
      {
        date: "31 de Agosto",
        dateShort: "31 Ago",
        title: "Consulta a instituciones de Educaci\u00f3n Primaria e IFD.",
        description:
          "Consulta mediante la plataforma Educativa del ministerio de educaci\u00f3n.",
        image: "/images/foto-6-31agosto.jpg",
      },
      {
        date: "Septiembre 2025",
        dateShort: "Sep",
        title: "Jornadas de Socializaci\u00f3n y Consulta",
        description:
          "En el norte, centro y sur de la provincia, con equipos directivos y docentes.",
        image: "/images/foto-7-septiembre2025.jpg",
      },
    ],
  },
  {
    year: "2026",
    subtitle: "Implementaci\u00f3n",
    description:
      "Implementaci\u00f3n de nuevo dise\u00f1o curricular. Construcci\u00f3n de metas de aprendizajes. Materiales did\u00e1cticos para el aula. Formaci\u00f3n docente.",
  },
];

function useInViewOnce() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSeen(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, seen };
}

/* -- Year Card with inline event images -- */
function YearCard({
  data,
  index,
  isExpanded,
  onToggle,
}: {
  data: TimelineYear;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { ref, seen } = useInViewOnce();
  const hasEvents = data.events && data.events.length > 0;

  return (
    <div
      ref={ref}
      className={`flex-shrink-0 snap-center transition-all duration-500 ${
        isExpanded ? "w-[90vw] max-w-4xl" : "w-[280px] md:w-[340px]"
      }`}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease-out ${index * 0.08}s, transform 0.7s ease-out ${index * 0.08}s, width 0.5s ease`,
      }}
    >
      {/* Year label + track dot */}
      <div className="flex flex-col items-center mb-6">
        <span className="text-5xl md:text-6xl font-black text-[#494963] leading-none tracking-tight">
          {data.year}
        </span>
        <span className="text-[11px] uppercase tracking-[0.15em] text-[#494963]/40 font-semibold mt-2">
          {data.subtitle}
        </span>
        <div className="mt-5 w-3.5 h-3.5 rounded-full bg-[#494963] border-4 border-[#EDEDF0] relative z-10" />
      </div>

      {/* Card */}
      <div
        className={`rounded-2xl bg-white shadow-sm border border-[#494963]/5 transition-all ${
          hasEvents ? "cursor-pointer hover:shadow-md hover:border-[#494963]/12" : ""
        }`}
        onClick={hasEvents && !isExpanded ? onToggle : undefined}
        role={hasEvents ? "button" : undefined}
        tabIndex={hasEvents ? 0 : undefined}
        onKeyDown={hasEvents ? (e) => { if (e.key === "Enter") onToggle(); } : undefined}
      >
        <div className="p-6 md:p-7">
          <p className="text-sm md:text-base text-[#494963]/70 leading-relaxed">
            {data.description}
          </p>
          {hasEvents && !isExpanded && (
            <div className="mt-4 flex items-center gap-2 text-[#494963] text-xs font-semibold uppercase tracking-wider">
              <span>Ver {data.events!.length} eventos</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        {/* Expanded: events with images */}
        {isExpanded && hasEvents && (
          <div className="border-t border-[#494963]/5">
            <div className="p-6 md:p-7 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#494963]/40">
                Eventos {data.year}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); onToggle(); }}
                className="w-8 h-8 rounded-full bg-[#494963]/5 flex items-center justify-center text-[#494963]/50 hover:bg-[#494963]/10 hover:text-[#494963] transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-6 md:px-7 pb-7 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.events!.map((event, i) => (
                <div key={i} className="group rounded-xl overflow-hidden border border-[#494963]/5 bg-[#fafafa]">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#494963]/35 font-semibold block mb-1.5">
                      {event.date}
                    </span>
                    <h4 className="text-sm font-bold text-[#494963] leading-snug mb-1.5">
                      {event.title}
                    </h4>
                    <p className="text-xs text-[#494963]/50 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* -- Main Timeline -- */
export function TimelineSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  const scroll = useCallback((dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  }, []);

  return (
    <section id="proceso" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#494963]/30 block mb-3">
                Proceso de Escritura
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#494963] leading-tight">
                {"L\u00ednea hist\u00f3rica"}
                <br className="hidden md:block" />
                {" del dise\u00f1o"}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll(-1)}
                className="w-11 h-11 rounded-full border-2 border-[#494963]/15 flex items-center justify-center text-[#494963]/40 hover:border-[#494963]/30 hover:text-[#494963] transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll(1)}
                className="w-11 h-11 rounded-full border-2 border-[#494963]/15 flex items-center justify-center text-[#494963]/40 hover:border-[#494963]/30 hover:text-[#494963] transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div className="relative">
        {/* Horizontal line behind dots */}
        <div className="absolute left-0 right-0 top-[calc(5rem+4.25rem+1.25rem+0.625rem)] h-px bg-[#494963]/10 z-0 hidden md:block" />

        <div
          ref={trackRef}
          className="flex gap-6 md:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 px-[max(1rem,calc((100vw-72rem)/2+1rem))] no-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {timelineData.map((item, i) => (
            <YearCard
              key={i}
              data={item}
              index={i}
              isExpanded={expandedYear === i}
              onToggle={() => setExpandedYear(expandedYear === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
