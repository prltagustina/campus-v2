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
      className="group/material grid min-w-0 gap-3 px-4 py-4 transition-colors hover:bg-[#494963]/[.025] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:px-5 sm:py-5"
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

      <div className="flex items-center justify-end gap-1 sm:shrink-0">
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          download
          aria-label={`Descargar ${file.nombre}`}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center gap-1.5 rounded-full text-[var(--area)] transition-colors hover:bg-[#494963]/[.055] hover:text-[#494963] sm:w-auto sm:rounded-none sm:px-2 sm:hover:bg-transparent"
        >
          <Download className="h-4 w-4 shrink-0" />
          <span className="hidden text-xs font-semibold sm:inline sm:text-sm">Descargar</span>
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
  if (!label) {
    return (
      <div className="divide-y divide-[#494963]/[.07] border-b border-[#494963]/[.07] last:border-b-0">
        {files.map(({ label: rowLabel, file }, index) => (
          <RepositoryMaterialRow key={`${file.url}-${index}`} label={rowLabel} file={file} color={color} />
        ))}
      </div>
    );
  }

  return (
    <section className="grid border-b border-[#494963]/[.07] last:border-b-0 md:grid-cols-[9rem_minmax(0,1fr)]">
      <header className="px-4 py-4 md:px-5 md:py-5">
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
    button: "min-h-[78px] gap-4 px-5 py-4 sm:min-h-[88px] sm:px-7 sm:py-5",
    idleBg: "",
    title: "font-display text-[1.4rem] font-medium leading-[1.05] tracking-[-.035em] sm:text-[1.8rem]",
    meta: "mt-1.5 text-xs font-medium sm:text-[13px]",
    description: "mt-1 text-xs font-medium leading-relaxed sm:text-sm",
    arrow: "h-10 w-10",
    /** El título de primer nivel sí puede llevar el color del área. */
    titleTinted: true,
  },
  /** Nivel anidado (ciclos/subgrupos dentro de una categoría de Itinerarios). */
  sm: {
    button: "min-h-[60px] gap-3 py-3 pl-8 pr-5 sm:min-h-[68px] sm:py-3.5 sm:pl-10 sm:pr-6",
    idleBg: "bg-[#F7F7F9]",
    title: "font-display text-base font-semibold leading-tight sm:text-lg",
    meta: "mt-1 text-[11px] font-medium sm:text-xs",
    description: "mt-0.5 text-[11px] font-medium leading-relaxed sm:text-xs",
    arrow: "h-8 w-8",
    /** Los niveles anidados quedan neutros: el color del área ya se ve en el nivel de arriba. */
    titleTinted: false,
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
  open: boolean;
  onToggle: () => void;
  size?: keyof typeof sizeClasses;
  children: ReactNode;
}) {
  const contentId = `repositorio-${id}`;
  const s = sizeClasses[size];
  /** Nivel principal con materiales: relleno sólido del color del área, no solo acento. */
  const filled = s.titleTinted && total > 0;
  const fg = activeForeground ?? "#fff";

  return (
    <section className="[overflow-anchor:none]">
      <button
        type="button"
        onClick={onToggle}
        disabled={total === 0}
        aria-disabled={total === 0}
        aria-expanded={open}
        aria-controls={contentId}
        className={`group grid w-full grid-cols-[minmax(0,1fr)_2.5rem] items-center border-l-4 text-left text-[#494963] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#494963] disabled:cursor-default disabled:hover:bg-transparent ${s.button} ${
          filled ? "hover:brightness-95" : open ? "bg-[var(--area)]/[.06]" : `hover:bg-[var(--area)]/[.04] ${s.idleBg}`
        }`}
        style={{
          ["--area" as string]: color,
          borderLeftColor: total ? color : "transparent",
          backgroundColor: filled ? color : undefined,
          color: filled ? fg : undefined,
        }}
      >
        <span className="min-w-0">
          <span className={`block text-balance ${s.title}`} style={!filled && s.titleTinted && total ? { color } : undefined}>{title}</span>
          <span className={`block ${s.meta}`} style={filled ? { color: fg, opacity: 0.75 } : total ? { color } : { color: "rgba(73,73,99,.45)" }}>
            {total ? `${total} ${total === 1 ? "material" : "materiales"}` : "Próximamente"}
          </span>
          {description ? (
            <span className={`block ${s.description} ${filled ? "" : "text-[#494963]/65"}`} style={filled ? { color: fg, opacity: 0.75 } : undefined}>
              {description}
            </span>
          ) : null}
        </span>
        {total ? (
          <span className={`grid place-items-center transition-transform duration-200 ${s.arrow} ${open ? "rotate-90" : ""}`} style={{ color: filled ? fg : color }} aria-hidden="true">
            <span className="-ml-3"><SolidAreaArrow /></span>
          </span>
        ) : null}
      </button>

      {open ? (
        <div id={contentId} className="border-t border-[#494963]/[.07] [overflow-anchor:none]">
          {children}
        </div>
      ) : null}
    </section>
  );
}
