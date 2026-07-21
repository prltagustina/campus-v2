"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText, ChevronDown, BookOpen, Download, ArrowUpRight, Share2, Check } from "lucide-react";
import type { Area } from "@/lib/areas-data";
import {
  getItinerario,
  type ItinerarioGrado,
  type ItinerarioFile,
  type ItinerarioCiclo,
  type ItinerarioCategoria,
  type ItinerarioSubgrupo,
} from "@/lib/itinerarios-data";

interface MaterialesSectionProps {
  area: Area;
}

type CategoriaRecurso = "secuencias" | "guias";

/* Idiomas disponibles para Lenguas Extranjeras - orden alfabético, pero Inglés se abre por defecto */
const idiomas = [
  { id: "aleman", name: "Alemán" },
  { id: "frances", name: "Francés" },
  { id: "ingles", name: "Inglés" },
  { id: "italiano", name: "Italiano" },
  { id: "portugues", name: "Portugués" },
];

/* Documento de pautas común a todas las lenguas extranjeras */
const pautaLenguasExtranjeras = {
  nombre: "Res. 43/2026 - Pautas del área de Lenguas Extranjeras",
  descripcion: "Implementación del área de Lenguas Extranjeras",
  url: "/documentos/resolucion-43-26-lenguas-extranjeras.pdf",
};

/* Normativa para Inglés: pauta general + resolución del programa de ruralidad */
const normativaIngles = [
  pautaLenguasExtranjeras,
  {
    nombre: "Res. 1410/2026 - Programa Inglés para la Ruralidad",
    descripcion: "Programa Inglés para la Ruralidad",
    url: "/documentos/resolucion-1410-26-ingles.pdf",
  },
];

/* Normativa para las demás lenguas: solo el documento de pautas */
const normativaOtrasLenguas = [pautaLenguasExtranjeras];

/* Secuencias didácticas reales por idioma (tomadas del Campus Educativo) */
const secuenciasPorIdioma: Record<
  string,
  { nombre: string; descripcion: string; paginas: number; size: string; url: string }[]
> = {
  ingles: [
    {
      nombre: "Del mundo a lo local: diseñamos nuestra mascota mundialista",
      descripcion: "Secuencia 1",
      paginas: 41,
      size: "1.9 MB",
      url: "/documentos/secuencias/secuencia1_ingles.pdf",
    },
  ],
  aleman: [
    {
      nombre: "Del mundo a lo local: diseñamos nuestra mascota mundialista",
      descripcion: "Secuencia 1",
      paginas: 41,
      size: "1.8 MB",
      url: "/documentos/secuencias/secuencia1_aleman.pdf",
    },
  ],
  frances: [
    {
      nombre: "Del mundo a lo local: diseñamos nuestra mascota mundialista",
      descripcion: "Secuencia 1",
      paginas: 41,
      size: "1.9 MB",
      url: "/documentos/secuencias/secuencia1_frances.pdf",
    },
  ],
  italiano: [
    {
      nombre: "Del mundo a lo local: diseñamos nuestra mascota mundialista",
      descripcion: "Secuencia 1",
      paginas: 41,
      size: "1.9 MB",
      url: "/documentos/secuencias/secuencia1_italiano.pdf",
    },
  ],
  portugues: [
    {
      nombre: "Del mundo a lo local: diseñamos nuestra mascota mundialista",
      descripcion: "Secuencia 1",
      paginas: 41,
      size: "1.8 MB",
      url: "/documentos/secuencias/secuencia1_portugues.pdf",
    },
  ],
};

/* Encabezado de grupo (ciclo) con línea divisoria editorial */
function GrupoHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-base sm:text-lg font-extrabold uppercase tracking-[0.12em] text-[#494963] whitespace-nowrap">
        {label}
      </span>
      <span className="h-px flex-1 bg-gray-200/70" />
    </div>
  );
}

/* Fila de un material descargable: miniatura de portada + datos + acciones
   (compartir y descargar) SIEMPRE visibles. */
function MaterialRow({
  file,
  color,
  textOnColor,
}: {
  file: ItinerarioFile;
  color: string;
  textOnColor: string;
}) {
  const [copied, setCopied] = useState(false);
  const meta = [file.formato ?? "PDF", file.paginas ? `${file.paginas} páginas` : null]
    .filter(Boolean)
    .join(" · ");

  const handleShare = async () => {
    const shareData = {
      title: file.nombre,
      text: `${file.nombre} - Campus Educativo Santa Fe`,
      url: file.url,
    };
    const showCopied = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    };
    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(file.url);
        showCopied();
      } else {
        const input = document.createElement("input");
        input.value = file.url;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        showCopied();
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        try {
          await navigator.clipboard.writeText(file.url);
          showCopied();
        } catch {
          /* Silenciar si todo falla */
        }
      }
    }
  };

  return (
    <div
      className="group/item flex w-full min-w-0 max-w-full flex-col gap-3 overflow-hidden rounded-xl px-2 py-2 transition-colors hover:bg-gray-50 sm:flex-row sm:items-center sm:gap-5 sm:px-4 sm:py-4 lg:gap-6 lg:px-5"
      style={{ ["--area" as string]: color, ["--area-fg" as string]: textOnColor }}
    >
      {/* Enlace de descarga -- miniatura + datos (zona principal clickeable) */}
      <a
        href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        download
        aria-label={`Descargar ${file.nombre}`}
        className="flex w-full min-w-0 max-w-full flex-1 items-start gap-3 sm:items-center sm:gap-5 lg:gap-6"
      >
        {/* Miniatura de portada (primera página del PDF) */}
        <div className="relative aspect-[600/848] w-[84px] flex-shrink-0 overflow-hidden rounded-md border border-gray-200/80 bg-gray-50 shadow-sm sm:w-28 lg:w-36">
          {file.portada ? (
            <Image
              src={file.portada}
              alt=""
              fill
              sizes="(min-width: 1024px) 144px, (min-width: 640px) 112px, 84px"
              loading="lazy"
              className="object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#494963]/30" />
            </div>
          )}
        </div>

        {/* Datos del material */}
        <div className="min-w-0 flex-1 pt-0.5 sm:pt-0">
          <span className="block max-w-full text-pretty text-[15px] font-medium leading-snug text-[#494963] [overflow-wrap:anywhere] sm:text-lg lg:text-xl">
            {file.nombre}
          </span>
          {file.descripcion && (
            <span className="mt-1 block text-sm sm:text-base font-medium text-[#494963]/65 text-pretty">
              {file.descripcion}
            </span>
          )}
          <span className="mt-1 block text-sm sm:text-base text-[#494963]/45">{meta}</span>
        </div>
      </a>

      {/* Acciones -- siempre visibles */}
      <div className="flex w-full min-w-0 max-w-full items-center justify-end gap-1.5 pl-[96px] sm:w-auto sm:flex-shrink-0 sm:justify-start sm:gap-2 sm:pl-0">
        {/* Descargar */}
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          download
          aria-label={`Descargar ${file.nombre}`}
          className="inline-flex h-9 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full border px-3 text-sm font-semibold border-[var(--area)] text-[var(--area)] transition-colors group-hover/item:bg-[var(--area)] group-hover/item:text-[var(--area-fg)] sm:h-auto sm:w-auto sm:flex-none sm:px-4 sm:py-2.5 sm:text-base"
        >
          <Download className="w-4 h-4" />
          <span>Descargar</span>
        </a>

        {/* Compartir -- a la derecha de Descargar */}
        <button
          type="button"
          onClick={handleShare}
          aria-label={copied ? "Enlace copiado" : `Compartir ${file.nombre}`}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex flex-shrink-0 items-center justify-center border border-gray-200 text-[#494963]/60 hover:border-[var(--area)] hover:text-[var(--area)] transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-[var(--area)]" /> : <Share2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

/* Bloque de un grado dentro de un ciclo con material: etiqueta + filas.
   Si el grado todavía no tiene material, muestra solo el nombre apagado. */
function GradoBlock({
  grado,
  color,
  textOnColor,
}: {
  grado: ItinerarioGrado;
  color: string;
  textOnColor: string;
}) {
  const hasFiles = grado.files.length > 0;
  const showGradeTitle = grado.id !== "7mo";
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      {showGradeTitle && (
        <div className="flex items-baseline gap-2 mb-3 px-2 sm:px-3">
          <h6
            className={`text-base sm:text-lg font-bold ${hasFiles ? "text-[#494963]" : "text-[#494963]/30"}`}
          >
            {grado.name}
          </h6>
          {hasFiles && grado.files.length > 1 && (
            <span className="text-sm text-[#494963]/35">{grado.files.length} materiales</span>
          )}
        </div>
      )}
      {hasFiles && (
        <div className="space-y-0.5">
          {grado.files.map((file, idx) => (
            <MaterialRow key={idx} file={file} color={color} textOnColor={textOnColor} />
          ))}
        </div>
      )}
    </div>
  );
}

/* Tarjeta de ciclo desplegable. Por defecto se abre si tiene materiales y se
   colapsa si todavía no hay material cargado ("Próximamente"). */
function CicloCollapsible({
  title,
  grados,
  color,
  textOnColor,
}: {
  title: string;
  grados: ItinerarioGrado[];
  color: string;
  textOnColor: string;
}) {
  const totalFiles = grados.reduce((n, g) => n + g.files.length, 0);
  const hasFiles = totalFiles > 0;
  const [open, setOpen] = useState(hasFiles);

  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-4 sm:px-7 lg:px-8 py-4 sm:py-5 text-left hover:bg-gray-50/70 transition-colors"
      >
        <span className="flex flex-col gap-0.5 min-w-0">
          <span className="text-base sm:text-lg font-bold text-[#494963] leading-snug">{title}</span>
          {hasFiles ? (
            <span className="text-sm sm:text-base font-semibold" style={{ color }}>
              {totalFiles} {totalFiles === 1 ? "material disponible" : "materiales disponibles"}
            </span>
          ) : (
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#494963]/30">
              Próximamente
            </span>
          )}
        </span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 text-[#494963]/30 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open &&
        (hasFiles ? (
          <div className="border-t border-gray-100 px-3 sm:px-5 lg:px-6 pt-3 sm:pt-4 pb-3 sm:pb-5">
            <div className="divide-y divide-gray-100">
              {grados.map((grado) => (
                <GradoBlock key={grado.id} grado={grado} color={color} textOnColor={textOnColor} />
              ))}
            </div>
          </div>
        ) : (
          <div className="border-t border-gray-100 px-4 sm:px-6 py-8 text-center">
            <p className="text-base text-[#494963]/40 text-pretty">
              Estamos preparando los materiales de este ciclo.
            </p>
          </div>
        ))}
    </div>
  );
}

/* Estado vacío para categorías de lista plana sin material todavía. */
function EmptyCard({ mensaje }: { mensaje?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 px-5 py-10 flex flex-col items-center justify-center gap-2.5 text-center">
      <FileText className="w-6 h-6 text-[#494963]/20" />
      <span className="text-base text-[#494963]/40 text-pretty">
        {mensaje ?? "Estamos preparando estos materiales."}
      </span>
    </div>
  );
}

/* Subgrupo desplegable de lista plana (p. ej. Estudiantes / Docencia dentro de
   Articulación). Se abre por defecto si tiene materiales. */
function SubgrupoCollapsible({
  subgrupo,
  color,
  textOnColor,
}: {
  subgrupo: ItinerarioSubgrupo;
  color: string;
  textOnColor: string;
}) {
  const totalFiles = subgrupo.files.length;
  const hasFiles = totalFiles > 0;
  const [open, setOpen] = useState(hasFiles);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-4 sm:px-7 lg:px-8 py-4 sm:py-5 text-left hover:bg-gray-50/70 transition-colors"
      >
        <span className="flex flex-col gap-0.5 min-w-0">
          <span className="text-sm sm:text-base font-bold text-[#494963] leading-snug">{subgrupo.nombre}</span>
          {hasFiles ? (
            <span className="text-sm sm:text-base font-semibold" style={{ color }}>
              {totalFiles} {totalFiles === 1 ? "material disponible" : "materiales disponibles"}
            </span>
          ) : (
            <span className="text-[11px] font-semibold uppercase tracking-wide text-[#494963]/30">
              Próximamente
            </span>
          )}
        </span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 text-[#494963]/30 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open &&
        (hasFiles ? (
          <div className="border-t border-gray-100 px-3 sm:px-5 lg:px-6 pt-3 sm:pt-4 pb-3 sm:pb-5 space-y-0.5">
            {subgrupo.files.map((file, idx) => (
              <MaterialRow key={idx} file={file} color={color} textOnColor={textOnColor} />
            ))}
          </div>
        ) : (
          <div className="border-t border-gray-100 px-4 sm:px-6 py-8 text-center">
            <p className="text-sm text-[#494963]/40 text-pretty">
              Estamos preparando estos materiales.
            </p>
          </div>
        ))}
    </div>
  );
}

/* Bloque de una categoría del repositorio (secuencias, guías, articulación,
   anexos). Renderiza ciclos desplegables, subgrupos o una lista plana. */
function CategoriaBlock({
  categoria,
  color,
  textOnColor,
}: {
  categoria: ItinerarioCategoria;
  color: string;
  textOnColor: string;
}) {
  const esPorCiclo = !!categoria.ciclos;

  return (
    <div>
      <GrupoHeader label={categoria.nombre} />
      {(categoria.descripcion || categoria.recursoGeneral) && (
        <div className="-mt-2 mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          {categoria.descripcion && (
            <p className="text-base sm:text-lg text-[#494963]/55 text-pretty">{categoria.descripcion}</p>
          )}
          {categoria.recursoGeneral && (
            <a
              href={categoria.recursoGeneral.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-base font-semibold transition-opacity hover:opacity-70 flex-shrink-0"
              style={{ color }}
            >
              <span>{categoria.recursoGeneral.nombre}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>
      )}

      {esPorCiclo ? (
        <div className="space-y-3">
          {categoria.ciclos!.map((ciclo: ItinerarioCiclo) => (
            <CicloCollapsible
              key={ciclo.id}
              title={ciclo.name}
              grados={ciclo.grados}
              color={color}
              textOnColor={textOnColor}
            />
          ))}
          {categoria.gradosSueltos && categoria.gradosSueltos.length > 0 && (
            <CicloCollapsible
              title="Séptimo grado"
              grados={categoria.gradosSueltos}
              color={color}
              textOnColor={textOnColor}
            />
          )}
        </div>
      ) : categoria.subgrupos ? (
        <div className="space-y-3">
          {categoria.subgrupos.map((subgrupo: ItinerarioSubgrupo) => (
            <SubgrupoCollapsible
              key={subgrupo.id}
              subgrupo={subgrupo}
              color={color}
              textOnColor={textOnColor}
            />
          ))}
        </div>
      ) : categoria.files && categoria.files.length > 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-3 sm:p-5 lg:p-6 shadow-sm space-y-0.5">
          {categoria.files.map((file, idx) => (
            <MaterialRow key={idx} file={file} color={color} textOnColor={textOnColor} />
          ))}
        </div>
      ) : (
        <EmptyCard />
      )}
    </div>
  );
}

interface LanguageResourceItem {
  nombre: string;
  descripcion?: string;
  paginas?: number;
  size?: string;
  url: string;
}

function LanguageResourceRow({
  item,
  accent,
}: {
  item: LanguageResourceItem;
  accent: string;
}) {
  const meta = [
    item.paginas ? item.paginas + " páginas" : "PDF",
    item.size,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      download
      className="group/resource grid grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] items-center gap-3 px-3 py-4 transition-colors hover:bg-[#F7F7F9] sm:grid-cols-[2.75rem_minmax(0,1fr)_auto_2.75rem] sm:gap-4 sm:px-5"
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-xl sm:h-11 sm:w-11"
        style={{ backgroundColor: accent + "18" }}
        aria-hidden="true"
      >
        <FileText className="h-4.5 w-4.5" style={{ color: accent }} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold leading-snug text-[#494963] sm:text-[15px]">
          {item.nombre}
        </span>
        {item.descripcion ? (
          <span className="mt-0.5 block text-xs leading-relaxed text-[#494963]/48 sm:text-sm">
            {item.descripcion}
          </span>
        ) : null}
        <span className="mt-1 block text-xs text-[#494963]/38 sm:hidden">{meta}</span>
      </span>
      <span className="hidden whitespace-nowrap text-xs text-[#494963]/38 sm:block">{meta}</span>
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#494963]/10 bg-white text-[#494963]/50 transition-colors group-hover/resource:border-[#494963]/20 group-hover/resource:text-[#494963] sm:h-11 sm:w-11"
        aria-hidden="true"
      >
        <Download className="h-4 w-4" />
      </span>
    </a>
  );
}

function LanguageResourceAccordion({
  panelId,
  kind,
  title,
  items,
  accent,
  open,
  onToggle,
}: {
  panelId: string;
  kind: CategoriaRecurso;
  title: string;
  items: LanguageResourceItem[];
  accent: string;
  open: boolean;
  onToggle: () => void;
}) {
  const Icon = kind === "secuencias" ? FileText : BookOpen;
  const contentId = "recursos-" + panelId + "-" + kind;
  const countLabel =
    items.length +
    " " +
    (items.length === 1 ? "documento disponible" : "documentos disponibles");

  return (
    <div className="bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={contentId}
        className="flex min-h-[78px] w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-[#FAFAFB] sm:min-h-[84px] sm:px-6"
      >
        <span className="flex min-w-0 items-center gap-3.5">
          <span
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11"
            style={{ backgroundColor: accent + "18" }}
            aria-hidden="true"
          >
            <Icon className="h-4.5 w-4.5" style={{ color: accent }} />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-[#494963] sm:text-base">{title}</span>
            <span className="mt-0.5 block text-xs text-[#494963]/42 sm:text-sm">{countLabel}</span>
          </span>
        </span>
        <ChevronDown
          className={
            "h-5 w-5 flex-shrink-0 text-[#494963]/30 transition-transform duration-200 " +
            (open ? "rotate-180" : "")
          }
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div id={contentId} className="divide-y divide-[#494963]/[0.07] border-t border-[#494963]/[0.07]">
          {items.map((item) => (
            <LanguageResourceRow key={item.url} item={item} accent={accent} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function LenguasExtranjerasRepository({ area }: { area: Area }) {
  const [idiomaSeleccionado, setIdiomaSeleccionado] = useState("ingles");
  const [categoriaAbierta, setCategoriaAbierta] = useState<CategoriaRecurso | null>(null);
  const idiomaInfo = idiomas.find((idioma) => idioma.id === idiomaSeleccionado) ?? idiomas[2];
  const secuencias = secuenciasPorIdioma[idiomaSeleccionado] ?? [];
  const normativa = idiomaSeleccionado === "ingles" ? normativaIngles : normativaOtrasLenguas;
  const totalRecursos = secuencias.length + normativa.length;

  const selectLanguage = (id: string) => {
    setIdiomaSeleccionado(id);
    setCategoriaAbierta(null);
  };

  const toggleCategory = (category: CategoriaRecurso) => {
    setCategoriaAbierta((current) => (current === category ? null : category));
  };

  return (
    <section id="materiales" className="scroll-mt-14 lg:scroll-mt-20">
      <div className="mb-8 max-w-2xl md:mb-10">
        <h3 className="font-display text-3xl font-semibold tracking-[-.03em] text-[#494963] md:text-4xl">
          Itinerarios didácticos
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#494963]/50 sm:text-base">
          Recursos organizados por idioma, sin división por ciclos.
        </p>
      </div>

      <div
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
        role="tablist"
        aria-label="Idiomas de Lenguas Extranjeras"
      >
        {idiomas.map((idioma, index) => {
          const active = idioma.id === idiomaSeleccionado;
          return (
            <button
              key={idioma.id}
              id={"idioma-tab-" + idioma.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="idioma-recursos-panel"
              onClick={() => selectLanguage(idioma.id)}
              className={
                "group flex min-h-[82px] h-full flex-col justify-between rounded-2xl p-3.5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#494963]/30 focus-visible:ring-offset-2 sm:min-h-[86px] sm:p-4 " +
                (active
                  ? "text-[#494963] shadow-[0_10px_26px_-16px_rgba(73,73,99,.55)]"
                  : "bg-[#F7F7F9] text-[#494963] hover:bg-[#EFEFF3]")
              }
              style={active ? { backgroundColor: area.color, color: "#494963" } : undefined}
            >
              <span
                className={
                  "flex w-full items-center justify-between text-[11px] font-bold tracking-[.08em] " +
                  (active ? "text-[#494963]/60" : "text-[#494963]/35")
                }
              >
                {String(index + 1).padStart(2, "0")}
                <span
                  className={
                    "h-2 w-2 rounded-full " +
                    (active ? "bg-[#494963]" : "scale-75 bg-[#494963] opacity-20 group-hover:opacity-40")
                  }
                  aria-hidden="true"
                />
              </span>
              <span className="pr-1 text-sm font-semibold leading-tight sm:text-[15px]">{idioma.name}</span>
            </button>
          );
        })}
      </div>

      <div
        id="idioma-recursos-panel"
        role="tabpanel"
        aria-labelledby={"idioma-tab-" + idiomaSeleccionado}
        className="mt-7 rounded-3xl bg-[#F7F7F9] p-4 sm:mt-8 sm:p-6 lg:p-8"
      >
        <div className="flex flex-col gap-2 border-b border-[#494963]/10 pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:pb-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.15em] text-[#494963]/38">
              Lengua seleccionada
            </p>
            <h4 className="mt-1.5 font-display text-2xl font-semibold tracking-[-.02em] text-[#494963] sm:text-3xl">
              {idiomaInfo.name}
            </h4>
          </div>
          <p className="text-sm font-medium text-[#494963]/48">
            {totalRecursos} {totalRecursos === 1 ? "recurso disponible" : "recursos disponibles"}
          </p>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-[#494963]/[0.08] bg-white shadow-[0_12px_30px_-28px_rgba(73,73,99,.55)] sm:mt-6">
          <div className="divide-y divide-[#494963]/[0.07]">
            <LanguageResourceAccordion
              panelId={idiomaSeleccionado}
              kind="secuencias"
              title="Secuencias didácticas"
              items={secuencias}
              accent={area.color}
              open={categoriaAbierta === "secuencias"}
              onToggle={() => toggleCategory("secuencias")}
            />
            <LanguageResourceAccordion
              panelId={idiomaSeleccionado}
              kind="guias"
              title="Normativa"
              items={normativa}
              accent={area.color}
              open={categoriaAbierta === "guias"}
              onToggle={() => toggleCategory("guias")}
            />
          </div>
        </div>

      </div>

      {idiomaSeleccionado === "ingles" ? (
        <Link
          href="/area/lenguas-extranjeras/materiales/ingles"
          className="group mt-5 grid min-h-[112px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 overflow-hidden rounded-3xl px-5 py-5 text-[#494963] shadow-[0_14px_35px_-28px_rgba(73,73,99,.7)] transition-[box-shadow] hover:shadow-[0_18px_38px_-24px_rgba(73,73,99,.7)] sm:mt-6 sm:min-h-[124px] sm:px-7 sm:py-6"
          style={{ backgroundColor: area.color }}
          aria-label="Abrir English Funzine, recurso de Inglés"
        >
          <span className="min-w-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-english-funzine-JxN2InFZ5FUNsqS0lqWZVRrvPgnxBj.png"
              alt="English Funzine"
              className="h-10 w-auto max-w-[170px] object-contain object-left sm:h-12 sm:max-w-[220px]"
            />
          </span>
          <span className="flex items-center text-[#494963]">
            <span className="grid aspect-square size-11 shrink-0 place-items-center rounded-full bg-[#494963] text-white transition-colors group-hover:bg-[#393950]" aria-hidden="true">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </span>
        </Link>
      ) : null}
    </section>
  );
}

export function MaterialesSection({ area }: MaterialesSectionProps) {
  if (area.slug === "lenguas-extranjeras") {
    return <LenguasExtranjerasRepository area={area} />;
  }

  const itinerario = getItinerario(area.slug);

  return (
    <section id="materiales" className="min-w-0 max-w-full scroll-mt-14 lg:scroll-mt-20">
      <div className="mb-10 max-w-2xl md:mb-14">
        <h3 className="text-3xl font-semibold tracking-[-.03em] text-[#494963] font-display text-balance md:text-4xl">
          Itinerarios didácticos
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-[#494963]/50 mt-3 max-w-xl text-pretty">
          Recursos organizados por ciclo y grado.
        </p>
      </div>

      <div className="mx-auto w-full min-w-0 max-w-4xl space-y-12 md:space-y-16">
        {itinerario.categorias.map((categoria) => (
          <CategoriaBlock
            key={categoria.id}
            categoria={categoria}
            color={area.color}
            textOnColor={area.textOnColor}
          />
        ))}
      </div>
    </section>
  );
}
