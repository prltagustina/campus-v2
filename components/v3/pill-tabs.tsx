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
  /** Ocupar todo el ancho, alineadas con los bordes de lo que hay arriba y
   * abajo (grados del Plan): desde 1024 px, todas en una fila del mismo
   * ancho; antes, de a cuatro por fila, cada fila de borde a borde. Apagado
   * por defecto (idiomas, lenguajes artísticos). */
  fill = false,
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
  fill?: boolean;
}) {
  // gap-2.5 desde sm (no md:gap-3): misma separación que la botonera de
  // áreas (AreaSubnav/rail principal), en vez de un valor propio más
  // grande a partir de tablet.
  return (
    <div className={`flex flex-wrap gap-2 sm:gap-2.5 ${fill ? "lg:flex-nowrap" : ""} ${className}`} role="tablist" aria-label={ariaLabel}>
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
            // px-3.5/py-2.5/text-[15px] y sm:py-4/sm:text-lg (antes px-3/py-2/
            // text-sm y sm:py-3.5/sm:text-[17px]): un toquecito más grandes
            // - pedido explícito (idiomas de Lenguas Extranjeras, lenguajes
            // de Educación Artística).
            className={`rounded-[9px] border py-2.5 font-normal leading-[1.08] tracking-[-0.035em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963] hover:bg-[var(--tab)] hover:text-[var(--tab-fg)] sm:py-4 sm:text-lg ${active ? "bg-[var(--tab)] text-[var(--tab-fg)]" : "bg-white text-[var(--tab)]"} ${
              // fill: mismo alto, el ancho repartido en la fila; en celular,
              // texto un punto más chico para que "1er grado" entre en una línea.
              fill ? "min-w-0 grow basis-[calc(25%-0.5rem)] whitespace-nowrap px-1 text-center text-sm max-[359px]:text-[13px] sm:px-3 lg:basis-0" : "px-3.5 text-[15px] sm:px-5"
            }`}
            style={{ borderColor: color, ["--tab" as string]: color, ["--tab-fg" as string]: activeForeground }}
          >
            {option.name}
          </button>
        );
      })}
    </div>
  );
}
