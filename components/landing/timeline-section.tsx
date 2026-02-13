"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

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
    subtitle: "Diseño anterior",
    description:
      "Fecha del último diseño curricular para la Educación Primaria en Santa Fe.",
  },
  {
    year: "hasta 2022",
    subtitle: "Experiencias previas",
    description:
      "Experiencias pedagógicas y escrituras preliminares del nuevo diseño curricular.",
  },
  {
    year: "2023",
    subtitle: "Consultas",
    description: "Jornadas de consulta en las instituciones educativas.",
  },
  {
    year: "2024",
    subtitle: "Conformación",
    description:
      "Recuperación de escrituras anteriores y conformación de nuevos equipos de trabajo. Presentación de la propuesta y consulta a delegados, coordinadores pedagógicos regionales y supervisores. Consultas a especialistas.",
  },
  {
    year: "2025",
    subtitle: "Consolidación",
    description:
      "Consolidación de la escritura del nuevo borrador y realización de jornadas focales de socialización y consulta  a la comunidad educativa. Formaciones docentes.",
    events: [
      {
        date: "22 de Julio",
        dateShort: "22 Jul",
        title: "Encuentro con el Comité de Educación Ambiental.",
        description:
          "Se presentaron los enfoques transversales, particularmente el de Educación Ambiental Integral. En esta instancia se socializaron contenidos del enfoque y se propuso su abordaje como eje transversal del diseño, así como su inclusión en el nuevo espacio Saberes, Vidas y Mundos.",
        image: "/images/foto-1-22julio.jpg",
      },
      {
        date: "25 de Julio",
        dateShort: "25 Jul",
        title:
          "Encuentro presencial con directores y supervisores de diferentes regionales.",
        description:
          "Se llevó a cabo la presentación general de la propuesta y se conformaron mesas de trabajo dedicadas a la lectura y análisis de fragmentos del diseño.",
        image: "/images/foto-2-25julio.jpg",
      },
      {
        date: "01 de Agosto",
        dateShort: "01 Ago",
        title: "Reunión con delegados y coordinadores regionales.",
        description:
          "En esta oportunidad se realizó la presentación del proceso de escritura, se expusieron los rasgos distintivos de la propuesta y se abrió el diálogo en torno a dudas e inquietudes planteadas por los participantes.",
        image: "/images/foto-3-01agosto.jpg",
      },
      {
        date: "14 de Agosto",
        dateShort: "14 Ago",
        title:
          "Instancia de socialización y consulta con equipos de supervisión.",
        description:
          "Estuvo dirigida a supervisores/as de Nivel Primario, Educación Especial, Educación Física, Música, Plástica, Tecnología y Talleres Manuales, contando con la participación de más de 150 supervisores/as de toda la provincia.",
        image: "/images/foto-4-14agosto.jpg",
      },
      {
        date: "27 de Agosto",
        dateShort: "27 Ago",
        title:
          "Presentación en la 3° Asamblea Ordinaria del Comité Asesor Provincial de Discapacidad.",
        description:
          "Se presentó la propuesta del diseño curricular en la 3° Asamblea Ordinaria del Comité Asesor Provincial de Discapacidad, organizada por la Subsecretaría de Personas con Discapacidad.",
        image: "/images/foto-5-27agosto.jpg",
      },
      {
        date: "31 de Agosto",
        dateShort: "31 Ago",
        title:
          "Instancias de Consulta a instituciones de Educación Primaria y a Institutos de Formación Docente.",
        description:
          "Consulta mediante la plataforma Educativa del ministerio de educación. Se prevé la llegada y lectura del borrador en todas las instituciones de educación primaria y a los Institutos de Formación Docente de la Provincia. Mesa de trabajo focales en diferentes puntos del territorio contando con la participación de directores y maestros.",
        image: "/images/foto-6-31agosto.jpg",
      },
      {
        date: "Septiembre 2025",
        dateShort: "Sep",
        title: "Jornadas de Socialización y Consulta",
        description:
          "En el norte, centro y sur de la provincia, con equipos directivos y docentes del nivel primario, las modalidades especial y rural y el área de tecnología. Trabajo focal sobre la planificación de la enseñanza con el borrador del nuevo diseño curricular como hoja de ruta.",
        image: "/images/foto-7-septiembre2025.jpg",
      },
    ],
  },
  {
    year: "2026",
    subtitle: "Implementación",
    description:
      "Implementación de nuevo diseño curricular.\n Construcción de metas de aprendizajes.\n Materiales didácticos para el aula.\n Formación docente.",
  },
];

// Hook para detectar cuando un elemento entra en viewport
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}

// Componente para cada item del timeline con animación
function TimelineItem({
  data,
  index,
  isLast,
}: {
  data: TimelineYear;
  index: number;
  isLast: boolean;
}) {
  const { ref, isInView } = useInView();
  const hasEvents = data.events && data.events.length > 0;

  return (
    <div ref={ref} className="relative">
      {/* Línea vertical conectora */}
      {!isLast && (
        <div
          className="absolute left-4 md:left-6 top-8 bottom-0 w-px bg-gray-200 transition-all duration-1000"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "top",
          }}
        />
      )}

      {/* Contenido principal del año */}
      <div
        className="relative pl-12 md:pl-20 pb-12 md:pb-16"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        {/* Punto del timeline */}
        <div
          className="absolute left-2 md:left-4 top-1 w-5 h-5 md:w-5 md:h-5 rounded-full bg-[#494963] border-4 border-white shadow-sm z-10"
          style={{
            transform: isInView ? "scale(1)" : "scale(0)",
            transition: "transform 0.4s ease-out 0.2s",
          }}
        />

        {/* Header del año */}
        <div className="mb-4 md:mb-6">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-400 block mb-1">
            {data.subtitle}
          </span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#494963] leading-none tracking-tight">
            {data.year}
          </h3>
        </div>

        {/* Descripción */}
        <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl whitespace-pre-line">
          {data.description}
        </p>

        {/* Eventos (si los hay) */}
        {hasEvents && (
          <div className="mt-8 md:mt-12 space-y-8 md:space-y-12">
            {data.events!.map((event, eventIndex) => (
              <EventCard key={eventIndex} event={event} index={eventIndex} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Componente para cada evento con su propia animación
function EventCard({ event, index }: { event: TimelineEvent; index: number }) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`,
      }}
    >
      {/* Línea conectora al evento */}
      <div
        className="absolute -left-8 md:-left-14 top-4 w-6 md:w-10 h-px bg-gray-300"
        style={{
          transform: isInView ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s ease-out 0.3s",
        }}
      />

      {/* Punto pequeño del evento */}
      <div
        className="absolute -left-10 md:-left-16 top-2.5 w-2.5 h-2.5 rounded-full bg-gray-400"
        style={{
          transform: isInView ? "scale(1)" : "scale(0)",
          transition: "transform 0.3s ease-out 0.4s",
        }}
      />

      {/* Fecha alineada con el punto */}
      <span className="inline-block text-xs uppercase tracking-[0.15em] text-gray-500 mb-4">
        {event.date}
      </span>

      {/* Grid imagen + contenido sin contenedor gris */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Imagen */}
        <div className="relative aspect-[16/10] lg:aspect-[4/3] bg-gray-100 overflow-hidden rounded-md group">
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Contenido texto */}
        <div className="flex flex-col justify-center">
          <h4 className="text-lg md:text-xl lg:text-2xl font-medium text-[#494963] leading-snug mb-3">
            {event.title}
          </h4>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TimelineSection() {
  return (
    <section id="proceso" className="w-full bg-white">
      {/* Header sticky */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6 lg:px-20 py-4 md:py-6">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1 md:mb-2">
            Proceso de Escritura
          </p>

          {/* Aquí aplicamos Inter Tight al título */}
          <h2 className="text-2xl md:text-3xl lg:text-5xl text-[#494963] leading-tight font-bold">
            <span
              style={{
                fontFamily:
                  "'Inter Tight', 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                fontWeight: 700,
                display: "block",
              }}
            >
              Nuevo Diseño Curricular
            </span>

            <span
              style={{
                fontFamily:
                  "'Inter Tight', 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                fontWeight: 700,
                display: "block",
              }}
            >
              para la Educación Primaria
            </span>
          </h2>
        </div>
      </div>

      {/* Timeline vertical scrolleable */}
      <div className="container mx-auto px-4 md:px-6 lg:px-20 py-8 md:py-16">
        <div className="max-w-4xl">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              data={item}
              index={index}
              isLast={index === timelineData.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
