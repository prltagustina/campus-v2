"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

interface TimelineEvent {
  date: string;
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
    year: "2026",
    subtitle: "Implementación",
    description:
      "Implementación de nuevo diseño curricular. Construcción de metas de aprendizajes. Materiales didácticos para el aula. Formación docente.",
  },
  {
    year: "2025",
    subtitle: "Consolidación",
    description:
      "Consolidación de la escritura del nuevo borrador y realización de jornadas focales de socialización y consulta a la comunidad educativa. Formaciones docentes.",
    events: [
      {
        date: "Septiembre 2025",
        title: "Jornadas de Socialización y Consulta",
        description:
          "En el norte, centro y sur de la provincia, con equipos directivos y docentes.",
        image: "/images/foto-7-septiembre2025.jpg",
      },
      {
        date: "31 de Agosto",
        title: "Consulta a instituciones de Educación Primaria e IFD.",
        description:
          "Consulta mediante la plataforma Educativa del Ministerio de Educación.",
        image: "/images/foto-6-31agosto.jpg",
      },
      {
        date: "27 de Agosto",
        title: "Presentación al Comité Asesor Provincial de Discapacidad.",
        description:
          "Se presentó la propuesta en la 3ª Asamblea Ordinaria del Comité Asesor Provincial.",
        image: "/images/foto-5-27agosto.jpg",
      },
      {
        date: "14 de Agosto",
        title: "Socialización y consulta con equipos de supervisión.",
        description:
          "Con participación de más de 150 supervisores/as de toda la provincia.",
        image: "/images/foto-4-14agosto.jpg",
      },
      {
        date: "01 de Agosto",
        title: "Reunión con delegados y coordinadores regionales.",
        description:
          "Presentación del proceso de escritura y diálogo en torno a dudas e inquietudes.",
        image: "/images/foto-3-01agosto.jpg",
      },
      {
        date: "25 de Julio",
        title: "Encuentro presencial con directores y supervisores.",
        description:
          "Se llevó a cabo la presentación general de la propuesta y se conformaron mesas de trabajo.",
        image: "/images/foto-2-25julio.jpg",
      },
      {
        date: "22 de Julio",
        title: "Encuentro con el Comité de Educación Ambiental.",
        description:
          "Se presentaron los enfoques transversales, particularmente el de Educación Ambiental Integral.",
        image: "/images/foto-1-22julio.jpg",
      },
    ],
  },
  {
    year: "2024",
    subtitle: "Conformación",
    description:
      "Recuperación de escrituras anteriores y conformación de nuevos equipos de trabajo. Presentación de la propuesta y consulta a delegados, coordinadores pedagógicos regionales y supervisores. Consultas a especialistas.",
  },
  {
    year: "2023",
    subtitle: "Consultas",
    description: "Jornadas de consulta en las instituciones educativas.",
  },
  {
    year: "hasta 2022",
    subtitle: "Experiencias previas",
    description:
      "Experiencias pedagógicas y escrituras preliminares del nuevo diseño curricular.",
  },
  {
    year: "1997",
    subtitle: "Diseño anterior",
    description:
      "Fecha del último diseño curricular para la Educación Primaria en Santa Fe.",
  },
];

function useInViewOnce() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, seen };
}

/* === Single year entry === */
function YearEntry({ data, index }: { data: TimelineYear; index: number }) {
  const { ref, seen } = useInViewOnce();
  const [expanded, setExpanded] = useState(false);
  const hasEvents = data.events && data.events.length > 0;

  return (
    <div
      ref={ref}
      className="relative flex gap-6 md:gap-10"
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 0.7s ease-out ${index * 0.1}s, transform 0.7s ease-out ${index * 0.1}s`,
      }}
    >
      {/* Vertical line + dot */}
      <div className="flex flex-col items-center flex-shrink-0 w-8">
        <div className="w-4 h-4 rounded-full bg-[#494963] border-4 border-[#EDEDF0] relative z-10 mt-1.5" />
        <div className="w-px flex-1 bg-[#494963]/12" />
      </div>

      {/* Content */}
      <div className="pb-12 md:pb-16 flex-1 min-w-0">
        {/* Year heading */}
        <div className="flex items-baseline gap-4 mb-2">
          <span className="text-3xl md:text-4xl font-black text-[#494963] tracking-tight font-sans">
            {data.year}
          </span>
          <span className="text-[11px] uppercase tracking-[0.15em] text-[#494963]/35 font-semibold">
            {data.subtitle}
          </span>
        </div>

        <p className="text-sm md:text-base text-[#494963]/60 leading-relaxed max-w-lg mb-4">
          {data.description}
        </p>

        {/* Events toggle */}
        {hasEvents && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 text-[#494963] text-xs font-semibold uppercase tracking-wider hover:text-[#494963]/70 transition-colors mb-4"
            >
              <span>{expanded ? "Ocultar" : "Ver"} {data.events!.length} eventos</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              />
            </button>

            {/* Events grid with images */}
            <div
              className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                maxHeight: expanded ? 2000 : 0,
                opacity: expanded ? 1 : 0,
              }}
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {data.events!.map((event, i) => (
                  <div
                    key={i}
                    className="group rounded-xl overflow-hidden border border-[#494963]/5 bg-white"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-[#494963]/5">
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={400}
                        height={250}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-[#494963]/30 font-semibold block mb-1.5">
                        {event.date}
                      </span>
                      <h4 className="text-sm font-bold text-[#494963] leading-snug mb-1.5">
                        {event.title}
                      </h4>
                      <p className="text-xs text-[#494963]/45 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* === Main Timeline === */
export function TimelineSection() {
  return (
    <section id="proceso" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-14 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#494963] leading-tight font-display">
              L&iacute;nea hist&oacute;rica
              <br className="hidden md:block" />
              {" del dise\u00f1o"}
            </h2>
          </div>

          {/* Vertical timeline */}
          <div className="relative">
            {timelineData.map((item, i) => (
              <YearEntry key={i} data={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
