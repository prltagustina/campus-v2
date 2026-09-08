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

function ReferencePanel({
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
    <div className="flex min-w-0 flex-col">
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
 * Slide "Cómo navegar el texto".
 * - Desktop (lg+): tres columnas — título · hoja · panel con la referencia.
 * - Tablet / mobile: la hoja arriba y, debajo, un bloque que arranca con el
 *   título y se reemplaza por la referencia al tocar un número (sin scroll).
 */
export function NavigateTextHotspots({
  hotspots = defaultTextHotspots,
  accent,
  heading,
}: {
  hotspots?: TextHotspot[];
  accent: string;
  /** Bloque de título/intro (lo arma el componente padre). */
  heading?: ReactNode;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIndex = hotspots.findIndex((hotspot) => hotspot.id === activeId);
  const active = activeIndex >= 0 ? hotspots[activeIndex] : null;

  const page = (
    <div
      className="relative mx-auto aspect-[3/4] w-full max-w-[230px] overflow-hidden rounded-xl bg-white p-5 shadow-[0_16px_36px_rgba(20,20,35,.18)] sm:max-w-[280px] lg:max-w-[260px]"
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
        <span className="block h-1.5 w-2/3 rounded-full bg-[#494963]/10" />
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
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-8">
      {/* Columna de título — solo en desktop (en mobile el título va en el bloque de abajo). */}
      <div className="hidden flex-col justify-center lg:flex">{heading}</div>

      {page}

      {/* Desktop: panel siempre visible con la referencia (o pista si no hay ninguna). */}
      <div className="hidden rounded-xl bg-[#494963] p-6 text-white lg:flex lg:min-h-[190px] lg:flex-col lg:justify-center">
        {active ? (
          <ReferencePanel
            hotspot={active}
            index={activeIndex}
            total={hotspots.length}
            hotspots={hotspots}
            activeId={activeId}
            onBack={() => setActiveId(null)}
          />
        ) : (
          <p className="text-sm leading-relaxed opacity-70">
            Tocá un número de la página para ver a qué te ayuda cada referencia.
          </p>
        )}
      </div>

      {/* Tablet / mobile: el título de abajo se reemplaza por la referencia al tocar. */}
      <div className="lg:hidden">
        {active ? (
          <div className="rounded-xl bg-[#494963] p-6 text-white">
            <ReferencePanel
              hotspot={active}
              index={activeIndex}
              total={hotspots.length}
              hotspots={hotspots}
              activeId={activeId}
              onBack={() => setActiveId(null)}
            />
          </div>
        ) : (
          heading
        )}
      </div>
    </div>
  );
}
