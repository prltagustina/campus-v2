import Link from "next/link";
import { ArrowUpRight, ExternalLink, Eye, FileDown, ListChecks, Network, type LucideIcon } from "lucide-react";
import { SlideDeckEmbed } from "@/components/v3/content-blocks";
import { RepositoryPanel, ResourceRow } from "@/components/v3/repository-panel";
import { CampusIsologo } from "@/components/programas/campus-isologo";
import { RepositorioCategorias, type CategoriaSecundaria } from "@/components/programas/secundaria-repositorio";
import { TarjetasPortada } from "@/components/programas/tarjetas-portada";
import type { ItinerarioFile } from "@/lib/itinerarios-data";
import type { Tema } from "@/lib/programas/modo-secundaria";
import type { GrupoRecursos, Recurso } from "@/lib/programas/tipos";

/**
 * Temas de Modo Secundaria, cada uno en una pestaña de su sección, con la
 * plantilla de Familias, Equipos y EIB: cajas de repositorio
 * (RepositoryPanel + ResourceRow), 24 px entre bloques como entre las cajas
 * de esas páginas.
 */

const rotulo = "mb-6 px-1 text-xs font-bold uppercase tracking-[.12em] text-[#494963]/[.82]";

/** Fila de recurso de la web, con el verbo según el destino real. */
function Fila({ recurso }: { recurso: Recurso }) {
  // Si hay descarga directa, es la acción explícita del Campus ("Descargar PDF").
  const accion = recurso.acciones.find((a) => a.tipo === "descargar") ?? recurso.acciones[0];
  const descripcion = [recurso.detalle, recurso.aviso].filter(Boolean).join(" · ") || undefined;
  const props =
    accion.tipo === "descargar"
      ? { download: true }
      : accion.tipo === "ver"
        ? { actionLabel: "Ver documento", actionIcon: <Eye className="h-4 w-4 shrink-0" /> }
        : accion.tipo === "aula"
          ? // Como en el Campus: el isologo del Campus junto al acceso al aula.
            { actionLabel: "Acceder al aula", actionIcon: <ExternalLink className="h-4 w-4 shrink-0" />, icon: <CampusIsologo className="h-9 w-auto shrink-0" /> }
          : { icon: <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[#494963]" aria-hidden="true" /> };
  return <ResourceRow title={recurso.titulo} description={descripcion} href={accion.url} sideActions showActionLabel {...props} />;
}

/** Recursos con tapa como tarjetas de la grilla compartida (en tinta). */
function TarjetasConPortada({ recursos }: { recursos: Recurso[] }) {
  return (
    <TarjetasPortada
      items={recursos.map((recurso) => ({
        id: recurso.id,
        titulo: recurso.titulo,
        detalle: recurso.detalle,
        meta: recurso.meta,
        portada: recurso.portada!,
        descargar: recurso.acciones.find((a) => a.tipo === "descargar")?.url,
        ver: recurso.acciones.find((a) => a.tipo === "ver")?.url,
      }))}
    />
  );
}

/**
 * Un grupo de recursos. Con portadas, las tapas (como en el Campus); si no,
 * el repositorio de Familias/Equipos/EIB en su versión de caja: una sola
 * caja blanca con filas separadas por línea y el nombre del grupo como
 * encabezado (no tarjetas sueltas).
 */
function Grupo({ grupo, conRotulo }: { grupo: GrupoRecursos; conRotulo: boolean }) {
  const conPortadas = grupo.recursos.every((recurso) => recurso.portada && recurso.portadaFormato !== "horizontal");
  if (conPortadas) {
    return (
      <div>
        {conRotulo ? <p className={rotulo}>{grupo.titulo}</p> : null}
        <TarjetasConPortada recursos={grupo.recursos} />
      </div>
    );
  }
  return (
    <RepositoryPanel title={conRotulo ? grupo.titulo : undefined}>
      {grupo.recursos.map((recurso) => <Fila key={recurso.id} recurso={recurso} />)}
    </RepositoryPanel>
  );
}

/** Un recurso como archivo del repositorio de las áreas. */
const comoArchivo = (recurso: Recurso): ItinerarioFile => ({
  nombre: recurso.titulo,
  descripcion: recurso.detalle,
  formato: "PDF",
  url: recurso.acciones[0].url,
  accion: recurso.acciones[0].tipo === "ver" ? "ver" : undefined,
});

/** Un grupo como categoría del repositorio, con sus subgrupos (Resoluciones primero, después Anexos). */
const comoCategoria = (grupo: GrupoRecursos): CategoriaSecundaria => {
  const nombres = [...new Set(grupo.recursos.map((recurso) => recurso.subgrupo))].sort((a, b) => (a === "Anexos" ? 1 : b === "Anexos" ? -1 : 0));
  return {
    id: grupo.id,
    titulo: grupo.titulo,
    grupos: nombres.map((nombre) => ({
      id: nombre ? nombre.toLowerCase() : "todo",
      titulo: nombre,
      archivos: grupo.recursos.filter((recurso) => recurso.subgrupo === nombre).map(comoArchivo),
    })),
  };
};

/* Íconos de la banda, los mismos del Campus (síntesis visual, lista, archivo). */
const ICONOS_BANDA: Record<string, LucideIcon> = { "eca-sintesis": Network, "eca-orientaciones": ListChecks, "eca-resolucion": FileDown };

/**
 * Espacios Curriculares Articulados: la banda del Campus (degradé violeta a
 * naranja) en clave editorial, como tarjeta de su pestaña. Arriba (o a la
 * izquierda desde 1280 px), la bajada como rótulo y el título grande; los
 * tres documentos, como un índice de filas amplias separadas por líneas
 * finas. El degradé termina en un naranja apenas más profundo que el del
 * Campus para que el texto blanco se lea mejor.
 */
function Banda({ tema, headingId }: { tema: Tema; headingId: string }) {
  return (
    <section
      aria-labelledby={headingId}
      className="overflow-hidden rounded-2xl text-white"
      style={{ backgroundImage: "linear-gradient(100deg, #8F4597 0%, #A3586F 48%, #C2702F 100%)" }}
    >
      <div className="grid gap-8 px-6 py-10 sm:px-10 md:py-12 xl:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] xl:items-center xl:gap-14">
        <div>
          {tema.subtitulo ? <p className="text-xs font-bold uppercase tracking-[.16em]">{tema.subtitulo}</p> : null}
          <h2 id={headingId} className="mt-4 text-balance font-display text-[2.2rem] font-bold leading-[.98] tracking-[-.035em] sm:text-5xl">
            {tema.titulo}
          </h2>
        </div>
        <ul className="divide-y divide-white/40 border-y border-white/40">
          {tema.grupos.flatMap((grupo) => grupo.recursos).map((recurso) => {
            const Icono = ICONOS_BANDA[recurso.id] ?? FileDown;
            return (
              <li key={recurso.id}>
                <a
                  href={recurso.acciones[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:py-6"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/15 ring-1 ring-white/50 transition-colors duration-150 group-hover:bg-white group-hover:text-[#8F4597]">
                    <Icono className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xl font-semibold leading-tight tracking-[-.015em]">{recurso.titulo}</span>
                    {recurso.detalle ? <span className="mt-1 block text-[15px] font-medium leading-snug">{recurso.detalle}</span> : null}
                    {recurso.meta ? <span className="mt-1.5 block text-xs font-semibold uppercase tracking-[.1em]">{recurso.meta}</span> : null}
                    <span className="sr-only">: ver documento (se abre en una pestaña nueva)</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Accesos: las portadas de cada programa, con su nombre debajo. */
export function Accesos({ grupo }: { grupo: GrupoRecursos }) {
  const alt: Record<string, string> = {
    "vivamos-los-juegos": "Vivamos los juegos en la escuela",
    quedate: "¡Quedate! Te acompañamos a terminar la secundaria",
    "tutorias-virtuales": "Tutorías Virtuales. Apoyo para estudiantes del ciclo básico en Secundaria",
  };
  return (
    <ul className="grid gap-6 sm:grid-cols-3 sm:gap-4">
      {grupo.recursos.map((recurso) => (
        <li key={recurso.id}>
          <a
            href={recurso.acciones[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#494963]"
          >
            <span className="block overflow-hidden rounded-2xl border border-[#494963]/[.08] bg-white transition-[box-shadow] duration-150 group-hover:shadow-[0_14px_35px_-24px_rgba(73,73,99,.7)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={recurso.portada} alt={alt[recurso.id] ?? recurso.titulo} loading="lazy" className="aspect-[2/1] w-full object-cover" />
            </span>
            <span className="mt-3 flex items-center justify-between gap-2 px-1 text-[15px] font-semibold text-[#494963]">
              {recurso.titulo}
              <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
            <span className="sr-only">(se abre en una pestaña nueva)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Un tema como contenido de su pestaña: título del Campus, foto, texto y
 * documentos. Sin numeral (ya no es una página larga numerada).
 */
export function TemaPanel({ tema }: { tema: Tema }) {
  const headingId = `titulo-${tema.slug}`;
  if (tema.variante === "banda") return <Banda tema={tema} headingId={headingId} />;
  const variosGrupos = tema.grupos.length > 1;

  return (
    <section aria-labelledby={headingId} className="flex min-w-0 flex-col gap-6">
      <header className="px-1">
        <h2 id={headingId} className="text-balance font-display text-2xl font-semibold leading-[1.1] tracking-[-.03em] text-[#494963] sm:text-3xl">
          {tema.titulo}
        </h2>
        {tema.subtitulo ? <p className="mt-2 text-base text-[#494963]/[.82] sm:text-lg">{tema.subtitulo}</p> : null}
      </header>

      {tema.imagen ? (
        tema.imagen.href ? (
          // Como en el Campus, la foto lleva a la página del programa.
          <a
            href={tema.imagen.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-[560px] overflow-hidden rounded-2xl border border-[#494963]/[.08] transition-[box-shadow] duration-150 hover:shadow-[0_14px_35px_-24px_rgba(73,73,99,.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#494963]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={tema.imagen.src} alt={`${tema.imagen.alt} (se abre en una pestaña nueva)`} width={tema.imagen.width} height={tema.imagen.height} loading="lazy" className="h-auto w-full object-cover" />
          </a>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={tema.imagen.src} alt={tema.imagen.alt} width={tema.imagen.width} height={tema.imagen.height} loading="lazy" className="h-auto w-full max-w-[560px] rounded-2xl border border-[#494963]/[.08] object-cover" />
        )
      ) : null}

      {tema.parrafos?.length || tema.lista ? (
        <div className="flex max-w-[40rem] flex-col gap-4 px-1 text-base leading-[1.7] text-[#494963]/[.88] md:text-[17px]">
          {tema.parrafos?.map((parrafo) => <p key={parrafo.slice(0, 24)} className="text-pretty">{parrafo}</p>)}
          {tema.lista ? (
            <div>
              <p className="font-semibold text-[#494963]">{tema.lista.titulo}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-[#494963]/50">
                {tema.lista.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      {tema.variante === "accesos" ? (
        <Accesos grupo={tema.grupos[0]} />
      ) : tema.variante === "repositorio" ? (
        <RepositorioCategorias id={tema.slug} categorias={tema.grupos.map(comoCategoria)} />
      ) : (
        tema.grupos.map((grupo) => <Grupo key={grupo.id} grupo={grupo} conRotulo={variosGrupos} />)
      )}

      {tema.embebido ? <SlideDeckEmbed src={tema.embebido.src} title={tema.embebido.titulo} label={tema.embebido.titulo} labelClassName="text-[#494963]/[.82]" /> : null}

      {tema.relacionados?.map((relacionado) => (
        <Link key={relacionado.href} href={relacionado.href} className="inline-flex min-h-10 items-center gap-1.5 self-start px-1 text-sm font-semibold text-[#494963] underline underline-offset-4 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494963]">
          {relacionado.texto}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      ))}
    </section>
  );
}
