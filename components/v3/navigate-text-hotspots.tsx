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
    x: 24,
    y: 22,
    titulo: "Objetivos por ciclo",
    detalle: "Cada ciclo abre con los aprendizajes que se espera que el estudiantado alcance al finalizarlo.",
  },
  {
    id: "glosario",
    x: 74,
    y: 50,
    titulo: "Términos destacados",
    detalle: "Las palabras subrayadas enlazan a su definición en la columna lateral de referencias.",
  },
  {
    id: "proposito",
    x: 40,
    y: 80,
    titulo: "Propósito del área",
    detalle: "Los recuadros en color sintetizan el sentido formativo de cada sección del documento.",
  },
];

/**
 * Layout del slide "Cómo navegar el texto": tres columnas verticales
 * (título · página con hotspots · panel explicativo), como el boceto.
 * En mobile se apilan en el mismo orden.
 */
export function NavigateTextHotspots({
  hotspots = defaultTextHotspots,
  accent,
  heading,
}: {
  hotspots?: TextHotspot[];
  accent: string;
  /** Bloque de título que ocupa la primera columna (lo arma el componente padre). */
  heading?: ReactNode;
}) {
  const [activeId, setActiveId] = useState(hotspots[0]?.id ?? "");
  const activeIndex = Math.max(0, hotspots.findIndex((hotspot) => hotspot.id === activeId));
  const active = hotspots[activeIndex];

  const move = (direction: 1 | -1) => {
    if (hotspots.length === 0) return;
    const next = (activeIndex + direction + hotspots.length) % hotspots.length;
    setActiveId(hotspots[next].id);
  };

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,0.95fr)] md:items-stretch">
      {heading ? <div className="flex flex-col justify-center">{heading}</div> : null}

      <div
        className="relative min-h-[320px] overflow-hidden rounded-xl bg-white p-6 shadow-[0_16px_36px_rgba(20,20,35,.18)] sm:min-h-[360px] md:min-h-[440px]"
        role="group"
        aria-label="Página del documento con referencias. Usá las flechas para recorrerlas."
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            move(1);
          } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            move(-1);
          }
        }}
      >
        <div className="space-y-2.5" aria-hidden="true">
          <span className="block h-2 w-1/3 rounded-full bg-[#494963]/20" />
          <span className="block h-2 w-2/3 rounded-full bg-[#494963]/10" />
          <span className="block h-2 w-full rounded-full bg-[#494963]/10" />
          <span className="block h-2 w-full rounded-full bg-[#494963]/10" />
          <span className="block h-2 w-4/5 rounded-full bg-[#494963]/10" />
          <span className="block h-2 w-full rounded-full bg-[#494963]/10" />
          <span className="block h-2 w-3/5 rounded-full bg-[#494963]/10" />
          <span className="mt-5 block h-2 w-1/4 rounded-full bg-[#494963]/20" />
          <span className="block h-2 w-full rounded-full bg-[#494963]/10" />
          <span className="block h-2 w-5/6 rounded-full bg-[#494963]/10" />
          <span className="block h-2 w-2/3 rounded-full bg-[#494963]/10" />
          <span className="block h-2 w-full rounded-full bg-[#494963]/10" />
        </div>

        {hotspots.map((hotspot, index) => {
          const isActive = hotspot.id === active?.id;
          return (
            <button
              key={hotspot.id}
              type="button"
              aria-pressed={isActive}
              aria-label={`Referencia ${index + 1}: ${hotspot.titulo}`}
              onClick={() => setActiveId(hotspot.id)}
              className="nav-text-hotspot"
              data-active={isActive || undefined}
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, "--hotspot-accent": accent } as CSSProperties}
            >
              <span className="nav-text-hotspot__num">{index + 1}</span>
            </button>
          );
        })}
      </div>

      <div className="flex min-w-0 flex-col justify-center rounded-xl bg-[#494963] p-6 text-white">
        <span className="text-[11px] font-bold uppercase tracking-[.14em] text-white/60">
          Referencia {activeIndex + 1} de {hotspots.length}
        </span>
        <p className="mt-2 font-display text-lg font-bold leading-snug">{active?.titulo}</p>
        <p className="mt-2 text-sm leading-relaxed text-white/80">{active?.detalle}</p>
        <div className="mt-4 flex gap-1.5" aria-hidden="true">
          {hotspots.map((hotspot) => (
            <span
              key={hotspot.id}
              className={`h-1.5 rounded-full transition-all ${hotspot.id === active?.id ? "w-6 bg-white" : "w-1.5 bg-white/35"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
