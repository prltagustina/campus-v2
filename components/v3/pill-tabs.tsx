"use client";

export interface PillTabOption {
  id: string;
  name: string;
}

/**
 * Barra de tabs tipo píldora con borde del color del área (lenguajes de
 * Educación Artística, idiomas de Lenguas Extranjeras — antes cada una
 * reimplementaba el mismo botón). Compacta en mobile: antes tenía el mismo
 * tamaño grande (px-5 py-3.5, texto 17px) en todos los anchos, y con varias
 * opciones envolviendo en mobile ocupaba varias filas enormes.
 */
export function PillTabs({
  options,
  selectedId,
  onSelect,
  color,
  activeForeground = "#fff",
  ariaLabel,
  panelId,
  idPrefix,
  className = "",
}: {
  options: PillTabOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  color: string;
  /** Color de texto sobre el fondo activo (bordado del color del área). */
  activeForeground?: string;
  ariaLabel: string;
  panelId: string;
  idPrefix: string;
  className?: string;
}) {
  // gap-2.5 desde sm (no md:gap-3): misma separación que la botonera de
  // áreas (AreaSubnav/rail principal), en vez de un valor propio más
  // grande a partir de tablet.
  return (
    <div className={`flex flex-wrap gap-2 sm:gap-2.5 ${className}`} role="tablist" aria-label={ariaLabel}>
      {options.map((option) => {
        const active = option.id === selectedId;
        return (
          <button
            key={option.id}
            id={`${idPrefix}-${option.id}`}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={panelId}
            onClick={() => onSelect(option.id)}
            className={`rounded-[9px] border px-3 py-2 text-sm font-normal leading-[1.08] tracking-[-0.035em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963] hover:bg-[var(--tab)] hover:text-[var(--tab-fg)] sm:px-5 sm:py-3.5 sm:text-[17px] ${active ? "bg-[var(--tab)] text-[var(--tab-fg)]" : "bg-white text-[var(--tab)]"}`}
            style={{ borderColor: color, ["--tab" as string]: color, ["--tab-fg" as string]: activeForeground }}
          >
            {option.name}
          </button>
        );
      })}
    </div>
  );
}
