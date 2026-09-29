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
import { PillTabs } from "@/components/v3/pill-tabs";

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
  formato: "PDF",
  paginas: 9,
  size: "0.2 MB",
  url: "/documentos/resolucion-43-26-lenguas-extranjeras.pdf",
};

/* Normativa para Inglés: pauta general + resolución del programa de ruralidad */
const normativaIngles = [
  pautaLenguasExtranjeras,
  {
    nombre: "Res. 1410/2026 - Programa Inglés para la Ruralidad",
    descripcion: "Programa Inglés para la Ruralidad",
    formato: "PDF",
    size: "16 KB",
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
      nombre: "\"Del mundo a lo local: diseñamos nuestra mascota mundialista\"",
      descripcion: "Secuencia 1",
      paginas: 41,
      size: "1.9 MB",
      url: "/documentos/secuencias/secuencia1_ingles.pdf",
    },
  ],
  aleman: [
    {
      nombre: "\"Del mundo a lo local: diseñamos nuestra mascota mundialista\"",
      descripcion: "Secuencia 1",
      paginas: 41,
      size: "1.8 MB",
      url: "/documentos/secuencias/secuencia1_aleman.pdf",
    },
  ],
  frances: [
    {
      nombre: "\"Del mundo a lo local: diseñamos nuestra mascota mundialista\"",
      descripcion: "Secuencia 1",
      paginas: 41,
      size: "1.9 MB",
      url: "/documentos/secuencias/secuencia1_frances.pdf",
    },
  ],
  italiano: [
    {
      nombre: "\"Del mundo a lo local: diseñamos nuestra mascota mundialista\"",
      descripcion: "Secuencia 1",
      paginas: 41,
      size: "1.9 MB",
      url: "/documentos/secuencias/secuencia1_italiano.pdf",
    },
  ],
  portugues: [
    {
      nombre: "\"Del mundo a lo local: diseñamos nuestra mascota mundialista\"",
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
   grupo que ya resolvía Materiales por ciclo, en un tamaño anidado — ahora
   colapsable también, igual que la categoría que lo contiene (antes siempre
   quedaba abierto en cuanto se abría Docencia/Estudiantes). */
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
      size="sm"
      open={open}
      onToggle={onToggle}
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
   subdivisión por grado porque los archivos de articulación son una lista
   plana — también colapsable. */
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
      size="sm"
      open={open}
      onToggle={onToggle}
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
}: {
  categoria: ItinerarioCategoria;
  color: string;
  activeForeground: string;
  open: boolean;
  onToggle: () => void;
}) {
  const ciclos = categoria.ciclos || categoria.gradosSueltos ? ciclosDeCategoria(categoria) : null;
  const total = ciclos
    ? ciclos.reduce((sum, ciclo) => sum + totalFilesInGrados(ciclo.grados), 0)
    : categoria.subgrupos
      ? categoria.subgrupos.reduce((sum, subgrupo) => sum + subgrupo.files.length, 0)
      : categoria.files?.length ?? 0;

  // Ciclos/subgrupos anidados (Primer ciclo, Segundo ciclo, Séptimo grado,
  // Docencia/Estudiantes de Articulación): colapsables por su cuenta, no
  // todos abiertos apenas se abre la categoría.
  const [openNested, setOpenNested] = useState<Set<string>>(() => new Set());
  const toggleNested = (id: string) => {
    setOpenNested((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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

      {/* Al abrir la categoría ya se ve todo adentro: ciclos/subgrupos sin
         materiales se omiten (ya no hay "Próximamente" que los explique, y
         no tiene sentido un grupo siempre abierto mostrando nada). */}
      {ciclos ? (
        ciclos
          .filter((ciclo) => totalFilesInGrados(ciclo.grados) > 0)
          .map((ciclo) => (
            <CicloAccordion
              key={ciclo.id}
              groupId={`categoria-${categoria.id}-ciclo-${ciclo.id}`}
              ciclo={ciclo}
              color={color}
              activeForeground={activeForeground}
              open={openNested.has(ciclo.id)}
              onToggle={() => toggleNested(ciclo.id)}
            />
          ))
      ) : categoria.subgrupos ? (
        categoria.subgrupos
          .filter((subgrupo) => subgrupo.files.length > 0)
          .map((subgrupo) => (
            <SubgrupoAccordion
              key={subgrupo.id}
              groupId={`categoria-${categoria.id}-subgrupo-${subgrupo.id}`}
              subgrupo={subgrupo}
              color={color}
              activeForeground={activeForeground}
              open={openNested.has(subgrupo.id)}
              onToggle={() => toggleNested(subgrupo.id)}
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

  const selectLanguage = (id: string) => {
    setIdiomaSeleccionado(id);
    setCategoriaAbierta(null);
  };

  const toggleCategory = (category: CategoriaRecurso) => {
    setCategoriaAbierta((current) => (current === category ? null : category));
  };

  return (
    <section id="materiales">
      {/* sm:px-7 (no md:px-0): mismo inset que el botón de categoría
         (RepositoryAccordionGroup, tamaño lg) para que el título quede
         alineado con "Docencia"/"Estudiantes" de más abajo. */}
      <div className="mb-6 max-w-2xl px-4 sm:px-7 md:mb-8">
        <h3 className="font-display text-2xl font-semibold tracking-[-.03em] text-[#494963] sm:text-3xl lg:text-4xl">
          Itinerarios didácticos
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#494963]/50 sm:text-base">
          Recursos organizados por idioma.
        </p>
      </div>

      {/* Barra de idiomas fija al scrollear, mismo criterio que la barra de
         lenguajes de Educación Artística (PillTabs, compartido). */}
      <div className="sticky top-0 z-30 bg-white px-4 py-3 shadow-[0_8px_16px_-16px_rgba(25,25,42,.35)] sm:px-7">
        <PillTabs
          options={idiomas}
          selectedId={idiomaSeleccionado}
          onSelect={selectLanguage}
          color={area.color}
          activeForeground={areaNavForeground(area)}
          ariaLabel="Idiomas de Lenguas Extranjeras"
          panelId="idioma-recursos-panel"
          idPrefix="idioma-tab"
        />
      </div>

      <div
        id="idioma-recursos-panel"
        role="tabpanel"
        aria-labelledby={"idioma-tab-" + idiomaSeleccionado}
        className="mt-7 sm:mt-8"
      >
        <div className="px-4 pb-5 sm:px-7 sm:pb-6">
          <h4 className="font-display text-2xl font-semibold tracking-[-.02em] text-[#494963] sm:text-3xl">
            {idiomaInfo.name}
          </h4>
        </div>

        <div className="divide-y divide-[#494963]/[.08] overflow-hidden border-y border-[#494963]/[.08] bg-white md:rounded-2xl md:border-x">
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
          className="group mx-4 mt-8 grid min-h-[112px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 overflow-hidden rounded-2xl px-5 py-5 text-[#494963] shadow-[0_14px_35px_-28px_rgba(73,73,99,.7)] transition-[box-shadow] hover:shadow-[0_18px_38px_-24px_rgba(73,73,99,.7)] sm:mt-9 sm:min-h-[124px] sm:px-7 sm:py-6 md:mx-0"
          style={{ backgroundColor: area.color }}
          aria-label="Abrir English Funzine, recurso de Inglés"
        >
          <span className="min-w-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-english-funzine-JxN2InFZ5FUNsqS0lqWZVRrvPgnxBj.png"
              alt="English Funzine"
              className="h-10 w-auto max-w-[170px] object-contain object-left sm:h-12 sm:max-w-[220px] md:h-16 md:max-w-[300px]"
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

  const toggleCategoria = (id: string) => {
    setOpenCategorias((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="w-full min-w-0 divide-y divide-[#494963]/[.08] overflow-hidden border-y border-[#494963]/[.08] bg-white md:rounded-2xl md:border-x">
      {itinerario.categorias.map((categoria) => (
        <CategoriaAccordion
          key={categoria.id}
          categoria={categoria}
          color={color}
          activeForeground={activeForeground}
          open={openCategorias.has(categoria.id)}
          onToggle={() => toggleCategoria(categoria.id)}
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
      {/* px-4 md:px-0: el botón de categoría de más abajo (RepositoryAccordionGroup)
         no tiene ningún padding propio, solo el inset de 14px que ya da la
         section exterior — así que el título tiene que quedar igual (0 a
         partir de md) para alinearse con el BORDE del botón, no con su
         texto interno ("Docencia"), que va más adentro por su propio padding. */}
      <div className="mb-6 max-w-2xl px-4 md:px-0 md:mb-8">
        <h3 className="text-2xl font-semibold tracking-[-.03em] text-[#494963] font-display text-balance sm:text-3xl lg:text-4xl">
          Itinerarios didácticos
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-[#494963]/50 mt-2 max-w-xl text-pretty">
          Materiales y recursos para docentes y estudiantes.
        </p>
      </div>

      <ItinerarioRepository itinerario={itinerario} color={area.color} activeForeground={areaNavForeground(area)} />
    </section>
  );
}
