"use client";

import type { ReactNode } from "react";
import { Download, FileText } from "lucide-react";
import { SolidAreaArrow } from "@/components/v3/area-nav-link";
import { ShareResourceButton } from "@/components/v3/share-resource-button";
import type { ItinerarioFile } from "@/lib/itinerarios-data";

/**
 * Piezas presentacionales compartidas por los repositorios de materiales
 * (Materiales por ciclo e Itinerarios Didácticos): misma fila de material
 * con Descargar/Compartir, mismo acordeón por color de grupo y mismo
 * criterio de estado "Próximamente". Extraídas de lo que ya resolvía
 * `CycleRepository` para no duplicar esa lógica en Itinerarios.
 */

export function RepositoryMaterialRow({
  label,
  file,
  color,
}: {
  label?: string;
  file: ItinerarioFile;
  color: string;
}) {
  const meta = [file.formato ?? "PDF", file.paginas ? `${file.paginas} páginas` : null, file.size]
    .filter(Boolean)
    .join(" · ");

  return (
    <article
      className="group/material grid min-w-0 gap-3 px-4 py-4 transition-colors hover:bg-[#494963]/[.025] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:px-7 sm:py-5"
      style={{ ["--area" as string]: color }}
    >
      <a
        href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        download
        aria-label={`Descargar ${file.nombre}`}
        className="flex min-w-0 items-start gap-3"
      >
        <FileText className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} aria-hidden="true" />

        <span className="min-w-0 flex-1">
          {label ? (
            <span
              className="block text-[9px] font-bold uppercase leading-none tracking-[.15em] sm:text-[10px]"
              style={{ color }}
            >
              {label}
            </span>
          ) : null}
          <span
            className={`block text-[15px] font-medium leading-snug text-[#494963] text-pretty sm:text-[17px] ${label ? "mt-1.5" : ""}`}
          >
            {file.nombre}
          </span>
          {file.descripcion ? (
            <span className="mt-1 block text-sm font-medium leading-relaxed text-[#494963]/60 text-pretty">
              {file.descripcion}
            </span>
          ) : null}
          <span className="mt-1 block text-xs text-[#494963]/42 sm:text-sm">{meta}</span>
        </span>
      </a>

      {/* Mobile: fila de acciones alineada a la izquierda (antes quedaba a la
         derecha cuando el layout es de una sola columna). El botón de
         Descargar mantiene el ícono + fondo gris de mobile también en
         tablet; recién en desktop (xl) pasa a texto sin fondo. */}
      <div className="flex items-center justify-start gap-1 sm:shrink-0">
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          download
          aria-label={`Descargar ${file.nombre}`}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#494963]/[.06] text-[var(--area)] transition-colors hover:bg-[#494963]/[.12] hover:text-[#494963] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494963] xl:w-auto xl:rounded-none xl:bg-transparent xl:px-2 xl:hover:bg-transparent"
        >
          <Download className="h-4 w-4 shrink-0" />
          <span className="hidden text-xs font-semibold xl:inline xl:text-sm">Descargar</span>
        </a>
        <ShareResourceButton title={file.nombre} url={file.url} />
      </div>
    </article>
  );
}

/**
 * Columna de materiales, opcionalmente encabezada por una etiqueta (p. ej. un
 * grado). Sin etiqueta, es solo una lista de filas separadas por línea.
 */
export function RepositoryFileGroup({
  label,
  files,
  color,
}: {
  label?: string;
  files: { label?: string; file: ItinerarioFile }[];
  color: string;
}) {
  {/* border-l-4 border-transparent: los botones de categoría/ciclo de
     arriba (RepositoryAccordionGroup) tienen un border-l-4 propio antes de
     su padding — acá no había ningún borde, así que "1er grado" (y las
     filas de material cuando no hay label, como en "Séptimo grado")
     quedaban 4px más a la izquierda que "Docencia"/"Primer ciclo". */}
  if (!label) {
    return (
      <div className="divide-y divide-[#494963]/[.07] border-b border-l-4 border-transparent border-b-[#494963]/[.07] last:border-b-0">
        {files.map(({ label: rowLabel, file }, index) => (
          <RepositoryMaterialRow key={`${file.url}-${index}`} label={rowLabel} file={file} color={color} />
        ))}
      </div>
    );
  }

  return (
    <section className="grid border-b border-l-4 border-transparent border-b-[#494963]/[.07] last:border-b-0 md:grid-cols-[9rem_minmax(0,1fr)]">
      {/* px-4/sm:px-7 (no px-4/md:px-5): mismo inset horizontal que "Docencia"/
         "Primer Ciclo" arriba, para que "1er grado" quede alineado con ellos. */}
      <header className="px-4 py-4 sm:px-7 md:py-5">
        <h3 className="font-display text-base font-semibold text-[#494963]">{label}</h3>
      </header>
      <div className="divide-y divide-[#494963]/[.07] border-t border-[#494963]/[.07] md:border-l md:border-t-0">
        {files.map(({ label: rowLabel, file }, index) => (
          <RepositoryMaterialRow key={`${file.url}-${index}`} label={rowLabel} file={file} color={color} />
        ))}
      </div>
    </section>
  );
}

const sizeClasses = {
  /** Nivel principal (áreas en Materiales por ciclo, categorías en Itinerarios). */
  lg: {
    button: "min-h-[78px] gap-2 px-4 py-4 sm:min-h-[88px] sm:gap-4 sm:px-7 sm:py-5",
    // Antes vacío: sin materiales, la categoría quedaba lisa/gris, sin
    // ninguna seña del color del área (como si fuera un bloque
    // deshabilitado cualquiera). Mismo tinte clarito que ya usan los
    // subgrupos anidados (sizeClasses.sm) en su estado de reposo.
    idleBg: "bg-[var(--area)]/[.07]",
    title: "font-display text-[1.4rem] font-medium leading-[1.05] tracking-[-.045em] sm:tracking-[-.035em] sm:text-[1.8rem]",
    description: "mt-1 text-xs font-medium leading-relaxed sm:text-sm",
    arrow: "h-10 w-10",
    /** El título de primer nivel sí puede llevar el color del área. */
    titleTinted: true,
    /** Nivel principal con materiales: relleno sólido del color del área. */
    solidFill: true,
  },
  /** Nivel anidado (ciclos/subgrupos dentro de una categoría de Itinerarios).
   * Antes era un fondo gris casi blanco (#F7F7F9) con texto semibold —
   * quedaba tan sutil que se perdía justo debajo de la barra sólida de la
   * categoría. Ahora el fondo se tiñe con el color del área (mismo --area
   * que ya usa el estado "abierto" del nivel principal) y el texto toma ese
   * color — queda visualmente conectado a la categoría de arriba sin
   * gritar. Padding vertical simétrico (py, no pt/pb distintos) para que el
   * texto quede centrado dentro de la franja, no pegado abajo. Mismo
   * padding horizontal (px-4/sm:px-7) que el nivel principal, para que
   * "Primer Ciclo", "Segundo Ciclo", etc. queden alineados con el título de
   * arriba en vez de con un indent extra. */
  sm: {
    button: "min-h-[52px] gap-3 px-4 py-3 sm:px-7 sm:py-3.5",
    idleBg: "bg-[var(--area)]/[.07]",
    title: "font-display text-base font-semibold leading-tight sm:text-lg",
    description: "mt-0.5 text-[11px] font-medium leading-relaxed sm:text-xs",
    arrow: "h-8 w-8",
    /** A diferencia de antes, el título sí lleva el color del área. */
    titleTinted: true,
    /** Nunca relleno sólido (aunque ahora sea colapsable como el nivel
     * principal): tiene que seguir leyéndose como un nivel anidado, no
     * confundirse con Docencia/Estudiantes de arriba. */
    solidFill: false,
  },
} as const;

export function RepositoryAccordionGroup({
  id,
  title,
  description,
  total,
  color,
  activeForeground,
  open,
  onToggle,
  size = "lg",
  /** false: sin botón ni toggle propio — el contenido siempre se muestra (lo
   * usan los niveles anidados de Itinerarios: al abrir el grupo grande ya se
   * ve todo adentro, sin un clic extra por ciclo/subgrupo). */
  collapsible = true,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  total: number;
  color: string;
  /** Color de contraste para el nivel principal (lg) cuando tiene materiales:
   * ese nivel va con relleno sólido del color del área, así que hace falta un
   * texto garantizado legible sobre ese fondo. */
  activeForeground?: string;
  open?: boolean;
  onToggle?: () => void;
  size?: keyof typeof sizeClasses;
  collapsible?: boolean;
  children: ReactNode;
}) {
  const contentId = `repositorio-${id}`;
  const s = sizeClasses[size];
  /** Nivel principal con materiales: relleno sólido del color del área, no solo acento. */
  const filled = s.solidFill && total > 0;
  const fg = activeForeground ?? "#fff";
  const isOpen = collapsible ? open ?? false : true;

  return (
    <section className="[overflow-anchor:none]">
      {collapsible ? (
        <button
          type="button"
          onClick={onToggle}
          disabled={total === 0}
          aria-disabled={total === 0}
          aria-expanded={isOpen}
          aria-controls={contentId}
          className={`group grid w-full grid-cols-[minmax(0,1fr)_2.5rem] items-center border-l-4 text-left text-[#494963] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#494963] disabled:cursor-default disabled:hover:bg-transparent ${s.button} ${
            filled ? "hover:brightness-95" : isOpen ? "bg-[var(--area)]/[.06]" : `hover:bg-[var(--area)]/[.04] ${s.idleBg}`
          }`}
          style={{
            ["--area" as string]: color,
            borderLeftColor: total ? color : "transparent",
            backgroundColor: filled ? color : undefined,
            color: filled ? fg : undefined,
          }}
        >
          <span className="min-w-0">
            {/* Antes exigía total>0 para teñir el título: sin materiales
               quedaba en el gris neutro de siempre, igual que cualquier
               bloque deshabilitado. Con el fondo ya teñido (arriba), un
               título gris encima leía inconsistente — ahora el color se
               aplica siempre que no haya relleno sólido, con o sin
               contenido. */}
            <span className={`block text-balance ${s.title}`} style={!filled && s.titleTinted ? { color } : undefined}>{title}</span>
            {description ? (
              <span className={`block ${s.description} ${filled ? "" : "text-[#494963]/65"}`} style={filled ? { color: fg, opacity: 0.75 } : undefined}>
                {description}
              </span>
            ) : null}
          </span>
          {total ? (
            <span className={`grid place-items-center transition-transform duration-200 ${s.arrow} ${isOpen ? "rotate-90" : ""}`} style={{ color: filled ? fg : color }} aria-hidden="true">
              <span className="-ml-3"><SolidAreaArrow /></span>
            </span>
          ) : null}
        </button>
      ) : (
        <div className={`grid w-full grid-cols-[minmax(0,1fr)_2.5rem] items-center border-l-4 text-left text-[#494963] ${s.button} ${s.idleBg}`} style={{ ["--area" as string]: color, borderLeftColor: color }}>
          <span className="min-w-0">
            <span className={`block text-balance ${s.title}`} style={s.titleTinted ? { color } : undefined}>{title}</span>
            {description ? <span className={`block ${s.description} text-[#494963]/65`}>{description}</span> : null}
          </span>
        </div>
      )}

      {isOpen ? (
        <div id={contentId} className="border-t border-[#494963]/[.07] [overflow-anchor:none]">
          {children}
        </div>
      ) : null}
    </section>
  );
}
