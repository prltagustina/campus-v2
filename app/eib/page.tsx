"use client";

import type { ReactNode } from "react";
import { Calendar, Download, ExternalLink, FileText, FolderOpen, Scale } from "lucide-react";
import { SectionTabs } from "@/components/v3/section-rail";

/* Legislación, normativa y documentos curriculares */
const legislacion = {
  resolucion: {
    titulo: "Descargar Resolución",
    archivo: "Resolución 1023-26 EE.pdf",
    url: "/documentos/resolucion-1023-26-eib.pdf",
  },
  elementosJuridicos: {
    titulo: "ELEMENTOS JURÍDICOS RELACIONADOS",
    subtitulo: "CON LA EDUCACIÓN INTERCULTURAL BILINGÜE",
    documentos: [
      {
        nombre: "Documento 1",
        url: "https://campuseducativo.santafe.edu.ar/elementos-juridicos-relacionados-con-la-educacion-intercultural-bilingue/",
      },
      {
        nombre: "Documento 2",
        url: "https://www.amsafe.org.ar/normativa_2025/modalidades/modalidad_educaci%C3%B3n_intercultural_bilingue/elementos_juridicos_eI_bilingue.pdf",
      },
    ],
  },
  marcoLegal: {
    titulo: "MARCO LEGAL QUE ENCUADRA EL TRABAJO DE LA",
    subtitulo: "MODALIDAD DE EDUCACIÓN INTERCULTURAL BILINGÜE",
    descripcion: "Referencias a legislación nacional, provincial e internacional vinculada",
    descripcion2: "con la Modalidad de Educación Intercultural Bilingüe.",
    url: "https://campuseducativo.santafe.edu.ar/marco-legal-que-encuadra-el-trabajo-de-la-modalidad-de-educacion-intercultural-bilingue/",
  },
};

/* Proyectos por nivel */
const proyectos = {
  inicial: [
    {
      nombre: "Semillas de Identidad",
      url: "https://campuseducativo.santafe.edu.ar/semillas-de-identidad/",
    },
  ],
  primario: [
    {
      nombre: '"Varias especies de remedios naturales" - "NATARIPI"',
      url: "https://campuseducativo.santafe.edu.ar/varias-especies-de-remedios-naturales-nataripi/",
    },
    {
      nombre: "Aprendemos haciendo",
      url: "https://campuseducativo.santafe.edu.ar/aprendemos-haciendo/",
    },
    {
      nombre: "Cosechando aprendizajes: la huerta escolar en acción 2025",
      url: "https://campuseducativo.santafe.edu.ar/cosechando-aprendizajes-la-huerta-escolar-en-accion/",
    },
    {
      nombre: "Cosechando aprendizajes: la huerta escolar en acción 2026",
      url: "https://campuseducativo.santafe.edu.ar/manos-a-la-huerta",
    },
    {
      nombre: "Fortaleciendo nuestra identidad",
      url: "https://campuseducativo.santafe.edu.ar/fortaleciendo-nuestra-identidad/",
    },
  ],
  secundario: [
    {
      nombre: "Guardianes de la Naturaleza. Vivir en un Mundo Sustentable.",
      url: "https://campuseducativo.santafe.edu.ar/guardianes-de-la-naturaleza-509-vivir-en-un-mundo-sustentable/",
    },
    {
      nombre: "En el mundo del reciclado: flores que transforman y murales que embellecen",
      url: "https://campuseducativo.santafe.edu.ar/en-el-mundo-del-reciclado-flores-que-transforman-y-murales-que-embellecen/",
    },
  ],
  terciario: [
    {
      nombre: "Voces diversas, ¿un lenguaje común?: ESI e interculturalidad en Inglés a través de narrativas infantiles",
      url: "https://campuseducativo.santafe.edu.ar/voces-diversas-un-lenguaje-comun-esi-e-interculturalidad-en-ingles-a-traves-de-narrativas-infantile/",
    },
  ],
};

/* Celebraciones y efemérides */
const celebraciones = [
  {
    nombre: "Calishim: Dalagay Ñaga Mokoit. Renacer: Año Nuevo Mocoví",
    url: "https://campuseducativo.santafe.edu.ar/calishim-dalagay-naga-mokoit-documenta-los-origenes/",
  },
  {
    nombre: "Semana de los Pueblos Originarios del territorio Santafesino",
    url: "https://campuseducativo.santafe.edu.ar/semana-de-los-pueblos-originarios-del-territorio-santafesino/",
  },
  {
    nombre: "Semana de los Pueblos Originarios del territorio Santafesino (Actividad)",
    url: "https://campuseducativo.santafe.edu.ar/actividad-semana-de-los-pueblos-originarios/",
  },
  {
    nombre: "Semana de los Pueblos Originarios",
    url: "https://campuseducativo.santafe.edu.ar/semana-de-los-pueblos-originarios/",
  },
  {
    nombre: "Día Internacional de los Pueblos Originarios",
    url: "https://campuseducativo.santafe.edu.ar/dia-internacional-de-los-pueblos-originarios/",
  },
  {
    nombre: "Los Pueblos Originarios Hoy",
    url: "https://campuseducativo.santafe.edu.ar/los-pueblos-originarios-hoy/",
  },
  {
    nombre: "Miradas que nos hablan",
    url: "https://campuseducativo.santafe.edu.ar/miradas-que-nos-hablan/",
  },
  {
    nombre: "Viajando por mi Provincia ¡Santa Fe! Haciendo visibles las miradas históricas. En memoria a los Caciques Nereguiye, Alayquín, Quebachín e Icholay",
    url: "https://campuseducativo.santafe.edu.ar/viajando-por-mi-provinciasanta-fe-haciendo-visibles-las-miradas-historicas/",
  },
  {
    nombre: "11 de Marzo de 1887, Masacre de San Antonio de Obligado",
    url: "https://campuseducativo.santafe.edu.ar/11-de-marzo-de-1887-masacre-de-san-antonio-de-obligado/",
  },
  {
    nombre: "25 de Mayo de 1810",
    url: "https://campuseducativo.santafe.edu.ar/el-25-de-mayo-de-1810/",
  },
  {
    nombre: "9 de Agosto: Día Internacional de los Pueblos Indígenas",
    url: "https://campuseducativo.santafe.edu.ar/9-de-agosto-dia-internacional-de-los-pueblos-indigenas/",
  },
  {
    nombre: "11 de octubre: Último día de libertad indígena. Nada para celebrar. Mucho para reflexionar.",
    url: "https://campuseducativo.santafe.edu.ar/11-de-octubre-ultimo-dia-de-libertad-indigena/",
  },
  {
    nombre: '11 de Octubre. "Último Día de Libertad de los Pueblos Originarios de América"',
    url: "https://campuseducativo.santafe.edu.ar/11-de-octubre-ultimo-dia-de-libertad-de-los-pueblos-originarios-de-america-2/",
  },
  {
    nombre: "Atrapasueños",
    url: "https://campuseducativo.santafe.edu.ar/atrapasuenos/",
  },
  {
    nombre: "Himno Nacional Argentino",
    url: "https://campuseducativo.santafe.edu.ar/himno-nacional-argentino/",
  },
];

const celebracionesCalendario = celebraciones.filter((_, index) => [0, 1, 2, 3, 4, 8, 9, 10, 11, 12].includes(index));
const celebracionesMemoria = celebraciones.filter((_, index) => [5, 6, 7, 13, 14].includes(index));

function EditorialHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="mb-6 max-w-2xl">
      <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#494963]/40">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-.035em] text-[#494963] md:text-4xl">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-[#494963]/50 sm:text-base">{description}</p>
    </header>
  );
}

function RepositoryPanel({ title, detail, icon, children }: { title: string; detail: string; icon: ReactNode; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-[0_5px_24px_rgba(73,73,99,.065)]">
      <div className="flex items-center gap-3 border-b border-[#494963]/[.07] px-5 py-4 sm:px-6">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#494963]/[.055] text-[#494963]">{icon}</span>
        <div className="min-w-0"><h3 className="font-display text-lg font-semibold leading-snug text-[#494963]">{title}</h3><p className="mt-0.5 text-xs text-[#494963]/40">{detail}</p></div>
      </div>
      <div className="divide-y divide-[#494963]/[.07]">{children}</div>
    </div>
  );
}

function ResourceRow({ title, description, href, download = false }: { title: string; description?: string; href: string; download?: boolean }) {
  return (
    <a href={href} download={download || undefined} target={download ? undefined : "_blank"} rel={download ? undefined : "noopener noreferrer"} className="group flex items-center gap-3 px-4 py-4 transition-colors hover:bg-[#F8F8FA] sm:gap-4 sm:px-6 sm:py-5">
      <FileText className="h-4.5 w-4.5 shrink-0 text-[#494963]/35" />
      <span className="min-w-0 flex-1">
        <b className="block text-sm font-semibold leading-snug text-[#494963] sm:text-base">{title}</b>
        {description && <small className="mt-1 block text-xs leading-relaxed text-[#494963]/42 sm:text-sm">{description}</small>}
      </span>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F1F1F4] text-[#494963]/45 transition-colors group-hover:bg-[#494963] group-hover:text-white" aria-hidden="true">
        {download ? <Download className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
      </span>
      <span className="sr-only">{download ? "Descargar" : "Abrir"} {title}</span>
    </a>
  );
}

function ProjectGroup({ title, index, items }: { title: string; index: string; items: { nombre: string; url: string }[] }) {
  return (
    <section className="grid min-w-0 gap-4 px-5 py-5 sm:px-6 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-7 md:py-6">
      <header>
        <p className="font-display text-[11px] font-semibold tabular-nums text-[#494963]/28">{index}</p>
        <h3 className="mt-1 font-display text-base font-semibold leading-tight text-[#494963] sm:text-lg">{title}</h3>
        <p className="mt-1 text-xs text-[#494963]/38">{items.length} {items.length === 1 ? "experiencia" : "experiencias"}</p>
      </header>

      <div className="min-w-0 divide-y divide-[#494963]/[.07] border-t border-[#494963]/[.07] md:border-t-0">
        {items.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-w-0 items-center gap-3 py-3.5 first:pt-3.5 transition-colors md:first:pt-0"
          >
            <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-[#494963] sm:text-[15px]">{item.nombre}</span>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#494963]/[.045] text-[#494963]/35 transition-colors group-hover:bg-[#494963] group-hover:text-white" aria-hidden="true">
              <ExternalLink className="h-3.5 w-3.5" />
            </span>
            <span className="sr-only">Abrir {item.nombre}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function ArchiveGroup({ title, detail, icon, items }: { title: string; detail: string; icon: ReactNode; items: { nombre: string; url: string }[] }) {
  return (
    <section className="overflow-hidden rounded-[1.35rem] bg-white shadow-[0_5px_24px_rgba(73,73,99,.055)]">
      <header className="flex items-center gap-3 px-5 py-4 sm:px-6">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#494963]/[.05] text-[#494963]">{icon}</span>
        <div className="min-w-0">
          <h3 className="font-display text-base font-semibold leading-snug text-[#494963] sm:text-lg">{title}</h3>
          <p className="mt-0.5 text-[11px] text-[#494963]/38 sm:text-xs">{detail}</p>
        </div>
      </header>

      <div className="grid border-t border-[#494963]/[.065] sm:grid-cols-2">
        {items.map((item, index) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid min-w-0 grid-cols-[1.5rem_minmax(0,1fr)_1.75rem] items-start gap-2.5 border-b border-[#494963]/[.065] px-4 py-4 transition-colors last:border-b-0 hover:bg-[#F8F8FA] sm:px-5 sm:odd:border-r"
          >
            <span className="pt-0.5 font-display text-[10px] font-semibold tabular-nums text-[#494963]/25">{String(index + 1).padStart(2, "0")}</span>
            <span className="min-w-0 text-[13px] font-medium leading-[1.4] text-[#494963] sm:text-sm">{item.nombre}</span>
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[#494963]/30 transition-colors group-hover:bg-[#494963] group-hover:text-white" aria-hidden="true">
              <ExternalLink className="h-3.5 w-3.5" />
            </span>
            <span className="sr-only">Abrir {item.nombre}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function EIBPage() {
  return (
    <main className="flex h-full min-h-0 flex-col overflow-hidden bg-[#F7F7F9]">
      <header className="flex min-h-[98px] shrink-0 items-center bg-[#494963] px-5 py-3 text-white md:min-h-[110px] md:px-10 md:py-3.5">
        <div className="mx-auto w-full max-w-4xl">
          <p className="text-[8px] font-bold uppercase tracking-[.18em] text-white/45 sm:text-[9px]">Modalidad educativa</p>
          <h1 className="mt-0.5 font-display text-[1.35rem] font-semibold leading-[1.08] tracking-[-.03em] sm:text-2xl md:text-[1.75rem]">Educación Intercultural Bilingüe</h1>
          <p className="mt-1 max-w-2xl text-[11px] leading-4 text-white/62 sm:text-xs md:text-[13px]">Normativa, experiencias pedagógicas y efemérides para acompañar una educación situada, intercultural y plurilingüe.</p>
        </div>
      </header>

      <SectionTabs title="Contenidos de Educación Intercultural Bilingüe" items={[{ id: "normativa", label: "Normativa" }, { id: "proyectos", label: "Proyectos" }, { id: "efemerides", label: "Efemérides" }]}>
        <section className="px-4 py-9 sm:px-6 sm:py-11 md:py-14">
          <div className="mx-auto max-w-4xl">
            <EditorialHeader eyebrow="Marco institucional" title="Normativa y documentos" description="Resoluciones y referencias jurídicas que enmarcan el trabajo de la modalidad EIB." />
            <RepositoryPanel title="Marco normativo" detail="Resoluciones y documentos de referencia" icon={<Scale className="h-4 w-4" />}>
              <ResourceRow title={legislacion.resolucion.titulo} description={`${legislacion.resolucion.archivo} · PDF`} href={legislacion.resolucion.url} download />
              {legislacion.elementosJuridicos.documentos.map((documento) => <ResourceRow key={documento.url} title={documento.nombre} description="Elementos jurídicos relacionados con la Educación Intercultural Bilingüe" href={documento.url} />)}
              <ResourceRow title="Marco legal de la Modalidad de Educación Intercultural Bilingüe" description={`${legislacion.marcoLegal.descripcion} ${legislacion.marcoLegal.descripcion2}`} href={legislacion.marcoLegal.url} />
            </RepositoryPanel>
          </div>
        </section>

        <section className="px-4 py-9 sm:px-6 sm:py-11 md:py-14">
          <div className="mx-auto max-w-4xl">
            <EditorialHeader eyebrow="Experiencias pedagógicas" title="Proyectos, secuencias e itinerarios" description="Producciones de escuelas de Modalidad EIB de la provincia, organizadas por nivel educativo." />
            <div className="divide-y divide-[#494963]/[.07] overflow-hidden rounded-[1.35rem] bg-white shadow-[0_5px_24px_rgba(73,73,99,.055)]">
              <ProjectGroup index="01" title="Nivel Inicial" items={proyectos.inicial} />
              <ProjectGroup index="02" title="Nivel Primario" items={proyectos.primario} />
              <ProjectGroup index="03" title="Nivel Secundario" items={proyectos.secundario} />
              <ProjectGroup index="04" title="Nivel Terciario" items={proyectos.terciario} />
            </div>
          </div>
        </section>

        <section className="px-4 py-9 sm:px-6 sm:py-11 md:py-14">
          <div className="mx-auto max-w-4xl">
            <EditorialHeader eyebrow="Memoria y comunidad" title="Celebraciones y efemérides" description="Fechas, historias y materiales para reconocer a las comunidades y pueblos originarios." />
            <div className="space-y-4">
              <ArchiveGroup title="Calendario intercultural" detail={`${celebracionesCalendario.length} fechas y conmemoraciones`} icon={<Calendar className="h-4 w-4" />} items={celebracionesCalendario} />
              <ArchiveGroup title="Memorias y recursos" detail={`${celebracionesMemoria.length} historias y materiales`} icon={<FolderOpen className="h-4 w-4" />} items={celebracionesMemoria} />
            </div>
          </div>
        </section>
      </SectionTabs>
    </main>
  );
}
