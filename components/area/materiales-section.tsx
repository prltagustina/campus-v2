"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, ChevronDown, BookOpen, Download, ArrowUpRight } from "lucide-react";
import type { Area } from "@/lib/areas-data";
import {
  getItinerario,
  type ItinerarioGrado,
  type ItinerarioFile,
  type ItinerarioCategoria,
  type ItinerarioSubgrupo,
} from "@/lib/itinerarios-data";
import { areaNavForeground } from "@/components/v3/area-nav-link";
import { RepositoryAccordionGroup, RepositoryFileGroup } from "@/components/v3/repository-accordion";

interface MaterialesSectionProps {
  area: Area;
  artisticLanguage?: string;
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

/** Cuenta materiales de una lista de grados. */
function totalFilesInGrados(grados: ItinerarioGrado[]) {
  return grados.reduce((sum, grado) => sum + grado.files.length, 0);
}

interface ItinerarioCicloEntry {
  id: string;
  name: string;
  grados: ItinerarioGrado[];
}

/** Ciclos de una categoría, con el 7mo grado (gradosSueltos) como un "ciclo" más. */
function ciclosDeCategoria(categoria: ItinerarioCategoria): ItinerarioCicloEntry[] {
  const ciclos: ItinerarioCicloEntry[] = (categoria.ciclos ?? []).map((ciclo) => ({
    id: ciclo.id,
    name: ciclo.name,
    grados: ciclo.grados,
  }));

  if (categoria.gradosSueltos && categoria.gradosSueltos.length > 0) {
    ciclos.push({ id: "septimo-grado", name: "Séptimo grado", grados: categoria.gradosSueltos });
  }

  return ciclos;
}

/* Ciclo desplegable (Primer ciclo, Segundo ciclo, Séptimo grado) dentro de una
   categoría de Docencia/Estudiantes. Reutiliza el mismo acordeón de color por
   grupo que ya resolvía Materiales por ciclo, en un tamaño anidado. */
function CicloAccordion({
  groupId,
  ciclo,
  color,
  activeForeground,
  open,
  onToggle,
}: {
  groupId: string;
  ciclo: ItinerarioCicloEntry;
  color: string;
  activeForeground: string;
  open: boolean;
  onToggle: () => void;
}) {
  const total = totalFilesInGrados(ciclo.grados);
  const publishedGrados = ciclo.grados.filter((grado) => grado.files.length > 0);
  const singleGrado = ciclo.grados.length === 1;

  return (
    <RepositoryAccordionGroup
      id={groupId}
      title={ciclo.name}
      total={total}
      color={color}
      activeForeground={activeForeground}
      open={open}
      onToggle={onToggle}
      size="sm"
    >
      {singleGrado ? (
        <RepositoryFileGroup
          files={publishedGrados.flatMap((grado) => grado.files.map((file) => ({ file })))}
          color={color}
        />
      ) : (
        publishedGrados.map((grado) => (
          <RepositoryFileGroup key={grado.id} label={grado.name} files={grado.files.map((file) => ({ file }))} color={color} />
        ))
      )}
    </RepositoryAccordionGroup>
  );
}

/* Subgrupo desplegable (Docencia / Estudiantes) dentro de la categoría
   Articulación Primaria-Secundaria. Mismo patrón que CicloAccordion, sin
   subdivisión por grado porque los archivos de articulación son una lista plana. */
function SubgrupoAccordion({
  groupId,
  subgrupo,
  color,
  activeForeground,
  open,
  onToggle,
}: {
  groupId: string;
  subgrupo: ItinerarioSubgrupo;
  color: string;
  activeForeground: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <RepositoryAccordionGroup
      id={groupId}
      title={subgrupo.nombre}
      total={subgrupo.files.length}
      color={color}
      activeForeground={activeForeground}
      open={open}
      onToggle={onToggle}
      size="sm"
    >
      <RepositoryFileGroup files={subgrupo.files.map((file) => ({ file }))} color={color} />
    </RepositoryAccordionGroup>
  );
}

/* Denominación de categoría para Itinerarios Didácticos (Docencia / Estudiantes /
   Articulación Primaria-Secundaria). Es solo el título mostrado acá: no toca
   `categoria.nombre` en lib/itinerarios-data.ts, que sigue siendo la etiqueta
   ("Recursos para docentes"/"Recursos para estudiantes") que usa la vista
   oculta de Materiales por ciclo. */
function categoriaDisplayTitle(categoria: ItinerarioCategoria) {
  if (categoria.id === "docencia") return "Docencia";
  if (categoria.id === "estudiantes") return "Estudiantes";
  return categoria.nombre;
}

/* Categoría de nivel principal: Docencia, Estudiantes o Articulación
   Primaria-Secundaria. La estructura interna (ciclos o subgrupos) se adapta
   a los datos reales de cada categoría, sin volver a mezclar Articulación
   dentro del 7mo grado de Docencia/Estudiantes. */
function CategoriaAccordion({
  categoria,
  color,
  activeForeground,
  open,
  onToggle,
  openGroupIds,
  onToggleGroup,
}: {
  categoria: ItinerarioCategoria;
  color: string;
  activeForeground: string;
  open: boolean;
  onToggle: () => void;
  openGroupIds: Set<string>;
  onToggleGroup: (id: string) => void;
}) {
  const ciclos = categoria.ciclos || categoria.gradosSueltos ? ciclosDeCategoria(categoria) : null;
  const total = ciclos
    ? ciclos.reduce((sum, ciclo) => sum + totalFilesInGrados(ciclo.grados), 0)
    : categoria.subgrupos
      ? categoria.subgrupos.reduce((sum, subgrupo) => sum + subgrupo.files.length, 0)
      : categoria.files?.length ?? 0;

  return (
    <RepositoryAccordionGroup
      id={`categoria-${categoria.id}`}
      title={categoriaDisplayTitle(categoria)}
      description={categoria.descripcion}
      total={total}
      color={color}
      activeForeground={activeForeground}
      open={open}
      onToggle={onToggle}
    >
      {categoria.recursoGeneral ? (
        <a
          href={categoria.recursoGeneral.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 border-b border-[#494963]/[.07] px-5 py-4 text-sm font-semibold transition-opacity hover:opacity-70 sm:px-7"
          style={{ color }}
        >
          <span>{categoria.recursoGeneral.nombre}</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      ) : null}

      {ciclos ? (
        ciclos.map((ciclo) => (
          <CicloAccordion
            key={ciclo.id}
            groupId={`categoria-${categoria.id}-ciclo-${ciclo.id}`}
            ciclo={ciclo}
            color={color}
            activeForeground={activeForeground}
            open={openGroupIds.has(`categoria-${categoria.id}-ciclo-${ciclo.id}`)}
            onToggle={() => onToggleGroup(`categoria-${categoria.id}-ciclo-${ciclo.id}`)}
          />
        ))
      ) : categoria.subgrupos ? (
        categoria.subgrupos.map((subgrupo) => (
          <SubgrupoAccordion
            key={subgrupo.id}
            groupId={`categoria-${categoria.id}-subgrupo-${subgrupo.id}`}
            subgrupo={subgrupo}
            color={color}
            activeForeground={activeForeground}
            open={openGroupIds.has(`categoria-${categoria.id}-subgrupo-${subgrupo.id}`)}
            onToggle={() => onToggleGroup(`categoria-${categoria.id}-subgrupo-${subgrupo.id}`)}
          />
        ))
      ) : categoria.files && categoria.files.length > 0 ? (
        <RepositoryFileGroup files={categoria.files.map((file) => ({ file }))} color={color} />
      ) : null}
    </RepositoryAccordionGroup>
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
    <section id="materiales">
      <div className="mb-8 max-w-2xl px-4 md:mb-10 md:px-0">
        <h3 className="font-display text-2xl font-semibold tracking-[-.03em] text-[#494963] sm:text-3xl lg:text-4xl">
          Itinerarios didácticos
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#494963]/50 sm:text-base">
          Recursos organizados por idioma, sin división por ciclos.
        </p>
      </div>

      <div
        className="flex flex-wrap gap-2.5 px-4 md:gap-5 md:px-0"
        role="tablist"
        aria-label="Idiomas de Lenguas Extranjeras"
      >
        {idiomas.map((idioma) => {
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
                "rounded-full border px-5 py-2.5 text-[14px] font-semibold leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#494963]/30 focus-visible:ring-offset-2 " +
                (active
                  ? "border-transparent text-white"
                  : "border-[#EBEDEC] bg-white text-[#7A7A7A] hover:bg-[#EBEDEC] hover:text-[#494963]")
              }
              style={active ? { backgroundColor: area.color } : undefined}
            >
              {idioma.name}
            </button>
          );
        })}
      </div>

      <div
        id="idioma-recursos-panel"
        role="tabpanel"
        aria-labelledby={"idioma-tab-" + idiomaSeleccionado}
        className="mt-7 sm:mt-8"
      >
        <div className="flex flex-col gap-2 px-4 pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:px-0 sm:pb-6">
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

        <div className="divide-y divide-[#494963]/[.08] overflow-hidden border-y border-[#494963]/[.08] bg-white md:rounded-[1.35rem] md:border-x">
          <RepositoryAccordionGroup
            id={`${idiomaSeleccionado}-secuencias`}
            title="Secuencias didácticas"
            total={secuencias.length}
            color={area.color}
            activeForeground={area.textOnColor}
            open={categoriaAbierta === "secuencias"}
            onToggle={() => toggleCategory("secuencias")}
          >
            <RepositoryFileGroup files={secuencias.map((item) => ({ file: item }))} color={area.color} />
          </RepositoryAccordionGroup>
          <RepositoryAccordionGroup
            id={`${idiomaSeleccionado}-normativa`}
            title="Normativa"
            total={normativa.length}
            color={area.color}
            activeForeground={area.textOnColor}
            open={categoriaAbierta === "guias"}
            onToggle={() => toggleCategory("guias")}
          >
            <RepositoryFileGroup files={normativa.map((item) => ({ file: item }))} color={area.color} />
          </RepositoryAccordionGroup>
        </div>
      </div>

      {idiomaSeleccionado === "ingles" ? (
        <Link
          href="/area/lenguas-extranjeras/materiales/ingles"
          className="group mx-4 mt-5 grid min-h-[112px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 overflow-hidden rounded-3xl px-5 py-5 text-[#494963] shadow-[0_14px_35px_-28px_rgba(73,73,99,.7)] transition-[box-shadow] hover:shadow-[0_18px_38px_-24px_rgba(73,73,99,.7)] sm:mt-6 sm:min-h-[124px] sm:px-7 sm:py-6 md:mx-0"
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

function filterItinerarioByLanguage(
  itinerario: ReturnType<typeof getItinerario>,
  artisticLanguage?: string,
) {
  if (!artisticLanguage) return itinerario;

  const language = artisticLanguage.toLocaleLowerCase("es");
  const matches = (file: ItinerarioFile) =>
    file.descripcion?.toLocaleLowerCase("es").includes(language) ?? false;

  return {
    categorias: itinerario.categorias.map((categoria) => ({
      ...categoria,
      ciclos: categoria.ciclos?.map((ciclo) => ({
        ...ciclo,
        grados: ciclo.grados.map((grado) => ({
          ...grado,
          files: grado.files.filter(matches),
        })),
      })),
      gradosSueltos: categoria.gradosSueltos?.map((grado) => ({
        ...grado,
        files: grado.files.filter(matches),
      })),
      subgrupos: categoria.subgrupos?.map((subgrupo) => ({
        ...subgrupo,
        files: subgrupo.files.filter(matches),
      })),
      files: categoria.files?.filter(matches),
    })),
  };
}

/* Contenedor con estado de apertura de categorías (Docencia/Estudiantes/
   Articulación) y de sus grupos anidados (ciclos/subgrupos). Vive en su
   propio componente para no llamar hooks condicionalmente detrás del
   `return` temprano de Lenguas Extranjeras en MaterialesSection. */
function ItinerarioRepository({
  itinerario,
  color,
  activeForeground,
}: {
  itinerario: ReturnType<typeof getItinerario>;
  color: string;
  activeForeground: string;
}) {
  const [openCategorias, setOpenCategorias] = useState<Set<string>>(() => new Set());
  const [openGrupos, setOpenGrupos] = useState<Set<string>>(() => new Set());

  const toggleCategoria = (id: string) => {
    setOpenCategorias((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleGrupo = (id: string) => {
    setOpenGrupos((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="mx-auto w-full min-w-0 max-w-4xl divide-y divide-[#494963]/[.08] overflow-hidden border-y border-[#494963]/[.08] bg-white md:rounded-[1.35rem] md:border-x">
      {itinerario.categorias.map((categoria) => (
        <CategoriaAccordion
          key={categoria.id}
          categoria={categoria}
          color={color}
          activeForeground={activeForeground}
          open={openCategorias.has(categoria.id)}
          onToggle={() => toggleCategoria(categoria.id)}
          openGroupIds={openGrupos}
          onToggleGroup={toggleGrupo}
        />
      ))}
    </div>
  );
}

export function MaterialesSection({ area, artisticLanguage }: MaterialesSectionProps) {
  if (area.slug === "lenguas-extranjeras") {
    return <LenguasExtranjerasRepository area={area} />;
  }

  const itinerario = filterItinerarioByLanguage(getItinerario(area.slug), artisticLanguage);

  return (
    <section id="materiales" className="min-w-0 max-w-full">
      <div className="mb-10 max-w-2xl px-4 md:mb-14 md:px-0">
        <h3 className="text-2xl font-semibold tracking-[-.03em] text-[#494963] font-display text-balance sm:text-3xl lg:text-4xl">
          Itinerarios didácticos
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-[#494963]/50 mt-3 max-w-xl text-pretty">
          Materiales y recursos para docentes y estudiantes
        </p>
      </div>

      <ItinerarioRepository itinerario={itinerario} color={area.color} activeForeground={areaNavForeground(area)} />
    </section>
  );
}
