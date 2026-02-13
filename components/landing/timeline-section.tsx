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
    subtitle: "Diseno anterior",
    description:
      "Fecha del ultimo diseno curricular para la Educacion Primaria en Santa Fe.",
  },
  {
    year: "hasta 2022",
    subtitle: "Experiencias previas",
    description:
      "Experiencias pedagogicas y escrituras preliminares del nuevo diseno curricular.",
  },
  {
    year: "2023",
    subtitle: "Consultas",
    description: "Jornadas de consulta en las instituciones educativas.",
  },
  {
    year: "2024",
    subtitle: "Conformacion",
    description:
      "Recuperacion de escrituras anteriores y conformacion de nuevos equipos de trabajo. Presentacion de la propuesta y consulta a delegados, coordinadores pedagogicos regionales y supervisores. Consultas a especialistas.",
  },
  {
    year: "2025",
    subtitle: "Consolidacion",
    description:
      "Consolidacion de la escritura del nuevo borrador y realizacion de jornadas focales de socializacion y consulta a la comunidad educativa. Formaciones docentes.",
    events: [
      {
        date: "22 de Julio",
        dateShort: "22 Jul",
        title: "Encuentro con el Comite de Educacion Ambiental.",
        description:
          "Se presentaron los enfoques transversales, particularmente el de Educacion Ambiental Integral.",
        image: "/images/foto-1-22julio.jpg",
      },
      {
        date: "25 de Julio",
        dateShort: "25 Jul",
        title: "Encuentro presencial con directores y supervisores.",
        description:
          "Se llevo a cabo la presentacion general de la propuesta y se conformaron mesas de trabajo.",
        image: "/images/foto-2-25julio.jpg",
      },
      {
        date: "01 de Agosto",
        dateShort: "01 Ago",
        title: "Reunion con delegados y coordinadores regionales.",
        description:
          "Presentacion del proceso de escritura y dialogo en torno a dudas e inquietudes.",
        image: "/images/foto-3-01agosto.jpg",
      },
      {
        date: "14 de Agosto",
        dateShort: "14 Ago",
        title: "Socializacion y consulta con equipos de supervision.",
        description:
          "Con participacion de mas de 150 supervisores/as de toda la provincia.",
        image: "/images/foto-4-14agosto.jpg",
      },
      {
        date: "27 de Agosto",
        dateShort: "27 Ago",
        title: "Presentacion al Comite Asesor Provincial de Discapacidad.",
        description:
          "Se presento la propuesta en la 3a Asamblea Ordinaria del Comite Asesor Provincial.",
        image: "/images/foto-5-27agosto.jpg",
      },
      {
        date: "31 de Agosto",
        dateShort: "31 Ago",
        title: "Consulta a instituciones de Educacion Primaria e IFD.",
        description:
          "Consulta mediante la plataforma Educativa del ministerio de educacion.",
        image: "/images/foto-6-31agosto.jpg",
      },
      {
        date: "Septiembre 2025",
        dateShort: "Sep",
        title: "Jornadas de Socializacion y Consulta",
        description:
          "En el norte, centro y sur de la provincia, con equipos directivos y docentes.",
        image: "/images/foto-7-septiembre2025.jpg",
      },
    ],
  },
  {
    year: "2026",
    subtitle: "Implementacion",
    description:
      "Implementacion de nuevo diseno curricular. Construccion de metas de aprendizajes. Materiales didacticos para el aula. Formacion docente.",
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

/* ── Year Card ─────────────────────────────────── */
function YearCard({
  data,
  index,
  onExpand,
}: {
  data: TimelineYear;
  index: number;
  onExpand: () => void;
}) {
  const { ref, seen } = useInViewOnce();
  const hasEvents = data.events && data.events.length > 0;

  return (
    <div
      ref={ref}
      className="flex-shrink-0 w-[280px] md:w-[340px] snap-center"
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease-out ${index * 0.08}s, transform 0.7s ease-out ${index * 0.08}s`,
      }}
    >
      {/* Top: year + track dot */}
      <div className="flex flex-col items-center mb-6">
        <span className="text-5xl md:text-6xl font-black text-[#494963] leading-none tracking-tight">
          {data.year}
        </span>
        <span className="text-[11px] uppercase tracking-[0.15em] text-[#494963]/40 font-semibold mt-2">
          {data.subtitle}
        </span>
        {/* Dot on track */}
        <div className="mt-5 w-3.5 h-3.5 rounded-full bg-[#494963] border-4 border-[#EDEDF0] relative z-10" />
      </div>

      {/* Card body */}
      <div
        className="rounded-2xl p-6 md:p-7 bg-white shadow-sm border border-[#494963]/5 cursor-pointer hover:shadow-md hover:border-[#494963]/12 transition-all group"
        onClick={hasEvents ? onExpand : undefined}
        role={hasEvents ? "button" : undefined}
        tabIndex={hasEvents ? 0 : undefined}
        onKeyDown={hasEvents ? (e) => { if (e.key === "Enter") onExpand(); } : undefined}
      >
        <p className="text-sm md:text-base text-[#494963]/70 leading-relaxed">
          {data.description}
        </p>
        {hasEvents && (
          <div className="mt-4 flex items-center gap-2 text-[#494963] text-xs font-semibold uppercase tracking-wider group-hover:underline">
            <span>Ver {data.events!.length} eventos</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Events Panel (modal-style overlay) ────────── */
function EventsPanel({
  year,
  events,
  onClose,
}: {
  year: string;
  events: TimelineEvent[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 md:p-8">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-6 md:px-10 py-5 border-b border-[#494963]/5 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#494963]/40 font-semibold">
              Eventos
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-[#494963]">{year}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#494963]/5 flex items-center justify-center text-[#494963]/50 hover:bg-[#494963]/10 hover:text-[#494963] transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Events list */}
        <div className="px-6 md:px-10 py-6 md:py-8 space-y-8">
          {events.map((event, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-5">
              <div className="flex-shrink-0 w-full md:w-56 aspect-[16/10] rounded-xl overflow-hidden bg-[#494963]/5">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <span className="text-[11px] uppercase tracking-[0.15em] text-[#494963]/40 font-semibold block mb-1.5">
                  {event.date}
                </span>
                <h4 className="text-base md:text-lg font-bold text-[#494963] mb-2 leading-snug">
                  {event.title}
                </h4>
                <p className="text-sm text-[#494963]/60 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main Timeline ─────────────────────────────── */
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
                {"Linea historica"}
                <br className="hidden md:block" />
                {" del diseno"}
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
              onExpand={() => setExpandedYear(i)}
            />
          ))}
        </div>
      </div>

      {/* Events modal */}
      {expandedYear !== null && timelineData[expandedYear].events && (
        <EventsPanel
          year={timelineData[expandedYear].year}
          events={timelineData[expandedYear].events!}
          onClose={() => setExpandedYear(null)}
        />
      )}
    </section>
  );
}
