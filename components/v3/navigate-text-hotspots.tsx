"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

export interface TextHotspot {
  id: string;
  /** Posición del hotspot sobre el mock de página, en % (0–100). */
  x: number;
  y: number;
  titulo: string;
  detalle: string;
}

/**
 * Contenido PLACEHOLDER de las referencias del documento. Reemplazar por las
 * definitivas cuando el equipo editorial las confirme. Si además llega una
 * captura real de una página del PDF, se puede montar la imagen detrás de los
 * hotspots (posiciones en % ya lo contemplan) en lugar del mock de líneas.
 */
export const defaultTextHotspots: TextHotspot[] = [
  {
    id: "objetivos",
    x: 26,
    y: 20,
    titulo: "Objetivos por ciclo",
    detalle: "Cada ciclo abre con los aprendizajes que se espera que el estudiantado alcance al finalizarlo.",
  },
  {
    id: "glosario",
    x: 72,
    y: 48,
    titulo: "Términos destacados",
    detalle: "Las palabras subrayadas enlazan a su definición en la columna lateral de referencias.",
  },
  {
    id: "proposito",
    x: 40,
    y: 78,
    titulo: "Propósito del área",
    detalle: "Los recuadros en color sintetizan el sentido formativo de cada sección del documento.",
  },
];

function ReferenceCard({
  hotspot,
  index,
  total,
  hotspots,
  activeId,
  onBack,
}: {
  hotspot: TextHotspot;
  index: number;
  total: number;
  hotspots: TextHotspot[];
  activeId: string | null;
  onBack: () => void;
}) {
  return (
    <div className="rounded-xl bg-[#494963] p-5 text-white sm:p-6">
      <span className="text-[11px] font-bold uppercase tracking-[.14em] opacity-60">
        Referencia {index + 1} de {total}
      </span>
      <p className="mt-2 font-display text-lg font-bold leading-snug">{hotspot.titulo}</p>
      <p className="mt-2 text-sm leading-relaxed opacity-80">{hotspot.detalle}</p>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex gap-1.5" aria-hidden="true">
          {hotspots.map((item) => (
            <span
              key={item.id}
              className={`h-1.5 rounded-full transition-all ${item.id === activeId ? "w-6 bg-current" : "w-1.5 bg-current/35"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-bold underline underline-offset-2 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          Volver
        </button>
      </div>
    </div>
  );
}

/**
 * Slide "Cómo navegar el texto". Usa la MISMA disposición que el slide 1
 * ("Descargá el documento del área"): chip arriba, la hoja a la izquierda con
 * el mismo tamaño que las portadas, y a la derecha el título + un bloque que
 * arranca con una pista y se reemplaza por la referencia al tocar un número.
 */
export function NavigateTextHotspots({
  hotspots = defaultTextHotspots,
  accent,
  badge,
  title,
}: {
  hotspots?: TextHotspot[];
  accent: string;
  /** Chip "2 de 2". */
  badge?: ReactNode;
  /** Título "Cómo navegar el texto". */
  title?: ReactNode;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIndex = hotspots.findIndex((hotspot) => hotspot.id === activeId);
  const active = activeIndex >= 0 ? hotspots[activeIndex] : null;

  return (
    <div className="grid content-start gap-6 sm:gap-8 md:grid-cols-[1fr_1.3fr] md:content-center md:items-center">
      <div className="order-1 md:order-2 md:col-start-2 md:row-start-1">{badge}</div>

      <div className="order-2 md:order-1 md:col-start-1 md:row-span-2">
        <div
          className="relative mx-auto aspect-[3/4] w-full max-w-[200px] overflow-hidden rounded-lg bg-white p-4 shadow-[0_20px_40px_rgba(20,20,35,.28)] sm:max-w-[280px] md:max-w-[320px]"
          role="group"
          aria-label="Página del documento con referencias"
        >
          <div className="space-y-2" aria-hidden="true">
            <span className="block h-1.5 w-1/3 rounded-full bg-[#494963]/20" />
            <span className="block h-1.5 w-2/3 rounded-full bg-[#494963]/10" />
            <span className="block h-1.5 w-full rounded-full bg-[#494963]/10" />
            <span className="block h-1.5 w-full rounded-full bg-[#494963]/10" />
            <span className="block h-1.5 w-4/5 rounded-full bg-[#494963]/10" />
            <span className="block h-1.5 w-full rounded-full bg-[#494963]/10" />
            <span className="block h-1.5 w-3/5 rounded-full bg-[#494963]/10" />
            <span className="mt-4 block h-1.5 w-1/4 rounded-full bg-[#494963]/20" />
            <span className="block h-1.5 w-full rounded-full bg-[#494963]/10" />
            <span className="block h-1.5 w-5/6 rounded-full bg-[#494963]/10" />
          </div>

          {hotspots.map((hotspot, index) => (
            <button
              key={hotspot.id}
              type="button"
              aria-pressed={hotspot.id === activeId}
              aria-label={`Referencia ${index + 1}: ${hotspot.titulo}`}
              onClick={() => setActiveId((current) => (current === hotspot.id ? null : hotspot.id))}
              className="nav-text-hotspot"
              data-active={hotspot.id === activeId || undefined}
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, "--hotspot-accent": accent } as CSSProperties}
            >
              <span className="nav-text-hotspot__num">{index + 1}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="order-3 md:order-3 md:col-start-2 md:row-start-2">
        {title}
        <div className="mt-4 sm:mt-5">
          {active ? (
            <ReferenceCard
              hotspot={active}
              index={activeIndex}
              total={hotspots.length}
              hotspots={hotspots}
              activeId={activeId}
              onBack={() => setActiveId(null)}
            />
          ) : (
            <p className="max-w-md text-sm leading-relaxed opacity-80">
              Tocá un número de la página para ver a qué te ayuda cada referencia.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
