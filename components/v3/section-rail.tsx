"use client";

import { Children, type KeyboardEvent, type ReactNode, useId, useRef, useState } from "react";

export interface SectionRailItem {
  id: string;
  label: string;
  description?: string;
}

interface SectionTabsProps {
  title?: string;
  items: SectionRailItem[];
  children: ReactNode;
  /** Mantiene montados los paneles ya visitados para no recargar embeds remotos. */
  keepVisitedPanels?: boolean;
  /** Al cambiar de tab, lleva el scroll de #contenido al tope — tiene sentido
   * cuando el SectionTabs es casi toda la página (Familias/Docentes/EIB,
   * arranca pegado al header). Cuando el SectionTabs vive a mitad de una
   * página más larga (Marco General), saltar al tope aleja al usuario de
   * donde estaba mirando — pasar `false` ahí. */
  scrollToTopOnChange?: boolean;
  /** Alineación de la tira de tabs dentro de la sección. "center" (default):
   * misma caja `mx-auto max-w-4xl` que trae `EditorialPageHeading`, así los
   * tabs quedan alineados con el título en Familias/Docentes/EIB. "left":
   * sin centrar — para Marco General, cuyo encabezado propio no usa
   * `EditorialPageHeading` sino un título pegado a la izquierda; con
   * "center" los tabs quedaban corridos a la derecha del título en
   * pantallas anchas (la tarjeta supera los 896px del max-w-4xl). */
  align?: "left" | "center";
  /** PRUEBA: color de borde/relleno de los tabs, mismo criterio que
   * PillTabs (botonera de idiomas/lenguajes artísticos) - por default el
   * neutro de siempre, para institucionales sin color propio. */
  color?: string;
}

/** Selector editorial estable para páginas con varias colecciones de contenido. */
export function SectionTabs({ title = "Secciones", items, children, keepVisitedPanels = false, scrollToTopOnChange = true, align = "center", color = "#494963" }: SectionTabsProps) {
  const panels = Children.toArray(children);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visitedIndices, setVisitedIndices] = useState<Set<number>>(() => new Set([0]));
  const panelViewportRef = useRef<HTMLDivElement>(null);
  const instanceId = useId().replaceAll(":", "");
  const safeIndex = Math.min(activeIndex, Math.max(items.length - 1, 0));
  const activeItem = items[safeIndex];

  const activateTab = (index: number) => {
    if (index === safeIndex) return;
    if (keepVisitedPanels) {
      setVisitedIndices((current) => {
        if (current.has(index)) return current;
        const next = new Set(current);
        next.add(index);
        return next;
      });
    }
    setActiveIndex(index);
    if (scrollToTopOnChange) document.getElementById("contenido")?.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % items.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = items.length - 1;
    else return;

    event.preventDefault();
    activateTab(nextIndex);
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("[role=tab]");
    tabs?.[nextIndex]?.focus();
  };

  // PRUEBA: mismo estilo que PillTabs (botonera de idiomas/lenguajes
  // artísticos) - botón individual con borde del color, relleno sólido al
  // activarse, en vez de la píldora oscura sobre fondo gris redondeado.
  const tabs = items.map((item, index) => {
    const selected = index === safeIndex;
    return (
      <button
        key={item.id}
        id={`${instanceId}-tab-${item.id}`}
        type="button"
        role="tab"
        aria-selected={selected}
        aria-controls={`${instanceId}-panel-${item.id}`}
        tabIndex={selected ? 0 : -1}
        onClick={() => activateTab(index)}
        onKeyDown={(event) => handleKeyDown(event, index)}
        className={`rounded-[9px] border px-3 py-2 text-sm font-normal leading-[1.08] tracking-[-0.035em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963] hover:bg-[var(--tab)] hover:text-white sm:px-5 sm:py-3.5 sm:text-[17px] ${selected ? "bg-[var(--tab)] text-white" : "bg-white text-[var(--tab)]"}`}
        style={{ borderColor: color, ["--tab" as string]: color }}
      >
        {item.label}
      </button>
    );
  });

  if (!activeItem || panels.length === 0) return null;

  return (
    <div
      id={`${instanceId}-switcher`}
      className="flex w-full flex-col bg-[#F7F7F9]"
    >
      {/* py-6/md:py-8 (antes py-4/py-5, y antes de eso py-2.5/py-3, sin
         equivalente abajo — el panel sumaba su propio pt encima, así que el
         aire de arriba y de abajo de los tabs no medían igual): mismo valor
         arriba y abajo, ya que cada panel ahora solo trae su pb propio, no
         su pt. Más grande que antes: el título del panel (p. ej. "Marco
         normativo") quedaba muy pegado a los tabs. */}
      <div className="shrink-0 bg-[#F7F7F9] px-4 py-6 sm:px-6 md:py-8">
        <div className={`max-w-4xl ${align === "center" ? "mx-auto" : ""}`}>
          <span className="sr-only">{title}</span>
          <div
            role="tablist"
            aria-label={title}
            className="flex w-full min-w-0 flex-wrap gap-2 sm:gap-2.5 md:w-fit"
          >
            {tabs}
          </div>
        </div>
      </div>

      <div
        ref={panelViewportRef}
        className="min-w-0 overflow-x-hidden"
      >
        {keepVisitedPanels ? panels.map((panel, index) => {
          if (!visitedIndices.has(index)) return null;
          const item = items[index];
          if (!item) return null;
          const active = index === safeIndex;
          return (
            <div
              key={item.id}
              id={`${instanceId}-panel-${item.id}`}
              role="tabpanel"
              aria-labelledby={`${instanceId}-tab-${item.id}`}
              aria-label={item.label}
              className="min-w-0"
              hidden={!active}
            >
              {panel}
            </div>
          );
        }) : (
          <div
            id={`${instanceId}-panel-${activeItem.id}`}
            role="tabpanel"
            aria-labelledby={`${instanceId}-tab-${activeItem.id}`}
            aria-label={activeItem.label}
            className="min-w-0"
          >
            {panels[safeIndex]}
          </div>
        )}
      </div>
    </div>
  );
}
