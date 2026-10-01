"use client";

import { ExternalLink } from "lucide-react";
import { SectionTabs } from "@/components/v3/section-rail";
import { EditorialPageHeading } from "@/components/v3/editorial-page-heading";
import { RepositoryPanel, ResourceRow } from "@/components/v3/repository-panel";

/* Legislación, normativa y documentos curriculares — mismos documentos y
   PDFs que https://campuseducativo.santafe.edu.ar/diseno-curricular/educacion-intercultural-bilingue/ */
const legislacion = {
  resoluciones: [
    { nombre: "Resolución 1023 - 2026", url: "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/05/Res-1023-26-EE.pdf" },
    { nombre: "Resolución 1188 - 2017", url: "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/05/Resolucion-1188-17.pdf" },
  ],
  decretosLey: [
    { nombre: "Decreto 1719 - 2025", url: "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/05/Decreto-1719.pdf" },
    { nombre: "Decreto 2200 - 1998", url: "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/05/Decreto-2200-1998.pdf" },
    { nombre: "Decreto 3346 - 1990", url: "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/05/Decreto-3346-1990.pdf" },
    { nombre: "Ley 10701 - 1991", url: "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/05/Ley-10701.pdf" },
  ],
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
      nombre: "Varias especies de remedios naturales - NATARIPI",
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
      nombre: "Guardianes de la Naturaleza. Vivir en un Mundo Sustentable",
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
    nombre: "11 de octubre: Último día de libertad indígena. Nada para celebrar. Mucho para reflexionar",
    url: "https://campuseducativo.santafe.edu.ar/11-de-octubre-ultimo-dia-de-libertad-indigena/",
  },
  {
    nombre: "11 de Octubre. Último Día de Libertad de los Pueblos Originarios de América",
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

/** Títulos de proyectos y efemérides: van entre comillas normales (si no las traen ya). */
const asTitle = (nombre: string) => (nombre.trim().startsWith('"') ? nombre : `"${nombre}"`);

/**
 * Los niveles (Inicial/Primario/Secundario/Terciario) necesitan más presencia
 * que un simple label: número grande y pálido (mismo criterio que los pasos
 * de DocumentoStepper) + título más grande, con el mismo borde de acento a
 * la izquierda que ya usan las categorías de Itinerarios Didácticos.
 */
function ProjectGroup({ title, index, items }: { title: string; index: string; items: { nombre: string; url: string }[] }) {
  return (
    <section className="grid min-w-0 gap-4 border-l-4 border-[#494963]/[.12] pl-5 sm:pl-6 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-7">
      <header className="flex items-center gap-3 md:block">
        {/* font-sans + #E4E4E9 sólido (antes font-display + /[.14] navy):
           la idea siempre fue "mismo criterio que los pasos de
           DocumentoStepper" (ver comentario arriba), pero había quedado con
           otra clase de fuente y el color armado como opacidad en vez del
           mismo gris sólido — mismas clases exactas que ese numeral. */}
        <div className="shrink-0">
          <p className="font-sans text-4xl font-black leading-none text-[#E4E4E9] sm:text-5xl">{index}</p>
        </div>
        {/* "Nivel" junto al nombre (antes arriba del numeral, en su propia
           línea): al sacarle el título+ícono al panel "Proyectos por nivel"
           (quedaba redundante con la tab "Proyectos"), el numeral solo
           perdía ese contexto - va en el mismo renglón que el nombre, como
           prefijo más liviano (font-normal + opacidad), para que lea
           "Nivel Inicial" de corrido en vez de quedar separado arriba.
           text-xl fijo (antes sm:text-2xl): mismo tamaño que el título de
           ArchiveGroup ("Calendario intercultural"/"Memorias y recursos"),
           el otro encabezado de subgrupo dentro de EIB. */}
        <h3 className="font-display text-xl leading-tight text-[#494963]">
          <span className="font-normal text-[#494963]/45">Nivel </span>
          <span className="font-semibold">{title}</span>
        </h3>
      </header>

      {/* Chips: cada proyecto es su propia tarjeta suelta (no una lista con
         líneas divisorias dentro de una caja), como en la página de
         referencia. */}
      <div className="min-w-0 space-y-2">
        {items.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-w-0 items-center gap-3 rounded-2xl border border-[#494963]/[.08] bg-white px-4 py-3.5 transition-colors hover:border-[#494963]/[.16] sm:px-5"
          >
            {/* text-[15px]/sm:text-[17px]: mismo tamaño que el título de
               ResourceRow (Normativa, Familias, Docentes) — antes acá era
               text-sm/sm:text-[15px], un punto más chico que el resto. */}
            <span className="min-w-0 flex-1 text-[15px] font-medium leading-snug text-[#494963] sm:text-[17px]">{asTitle(item.nombre)}</span>
            {/* Mismo color y tamaño que el ícono de "Abrir" de ResourceRow
               (Formaciones de Marco General, Documentos, etc.): bg-[.06] +
               texto oscuro sólido, no el gris apagado (/35) que tenía antes. */}
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#494963]/[.06] text-[#494963] transition-colors group-hover:bg-[#494963]/[.12]" aria-hidden="true">
              <ExternalLink className="h-4 w-4" />
            </span>
            <span className="sr-only">Abrir {item.nombre}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function ArchiveGroup({ title, items }: { title: string; items: { nombre: string; url: string }[] }) {
  return (
    <section>
      {/* Sin ícono ni título grande (antes h3 + caja de ícono): mismo
         tratamiento "label chico" que "Resolución"/"Decretos / Ley" del
         Marco normativo, en vez de un encabezado con la misma presencia que
         el título del panel (ya retirado). pb-6 (antes pb-3): separado del
         contenido, mismo criterio en todos los labels "tipo resolución". */}
      <header className="px-1 pb-6">
        <p className="text-xs font-bold uppercase tracking-[.1em] text-[#494963]/40">{title}</p>
      </header>

      {/* Chips: mismo tratamiento que ProjectGroup (flex, sin numerar cada
         ítem, mismo tamaño de texto) — antes tenían un numeral propio
         (text-[10px]) y el título en otro tamaño (text-[13px]/text-sm), y
         los dos carruseles de chips no quedaban parejos entre sí. */}
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-w-0 items-center gap-3 rounded-2xl border border-[#494963]/[.08] bg-white px-4 py-3.5 transition-colors hover:border-[#494963]/[.16] sm:px-5"
          >
            <span className="min-w-0 flex-1 text-[15px] font-medium leading-snug text-[#494963] sm:text-[17px]">{asTitle(item.nombre)}</span>
            {/* Mismo color y tamaño que el ícono de "Abrir" de ResourceRow
               (Formaciones de Marco General, Documentos, etc.): bg-[.06] +
               texto oscuro sólido, no el gris apagado (/35) que tenía antes. */}
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#494963]/[.06] text-[#494963] transition-colors group-hover:bg-[#494963]/[.12]" aria-hidden="true">
              <ExternalLink className="h-4 w-4" />
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
    <main className="flex min-h-full flex-col overflow-hidden rounded-none bg-[#F7F7F9] md:rounded-2xl md:border md:border-[#494963]/[.06]">
      <EditorialPageHeading
        title="Educación Intercultural Bilingüe"
        imageSrc="/images/cabecera-eib.jpg"
      />

      <SectionTabs title="Contenidos de Educación Intercultural Bilingüe" items={[{ id: "normativa", label: "Normativa" }, { id: "efemerides", label: "Efemérides" }, { id: "proyectos", label: "Proyectos" }]}>
        <section className="px-4 pb-3 sm:px-6 sm:pb-4 md:pb-4">
          <div className="mx-auto max-w-4xl">
            {/* Sin título ni ícono (antes Scale): única tira de esta tab
               ("Normativa"), el título quedaba redundante con la tab -
               "Resolución"/"Decretos / Ley" ya distinguen los subgrupos. */}
            <RepositoryPanel chips>
              <div className="space-y-6">
                <div>
                  {/* mb-6 (antes mb-3, y antes mb-2): separado de la primera fila de
                     chips - mismo criterio en todos los labels "tipo resolución". */}
                  <p className="mb-6 px-1 text-xs font-bold uppercase tracking-[.1em] text-[#494963]/40">Resolución</p>
                  <div className="space-y-2">
                    {legislacion.resoluciones.map((documento) => (
                      <ResourceRow key={documento.url} title={`"${documento.nombre}"`} href={documento.url} download chip sideActions showActionLabel />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-6 px-1 text-xs font-bold uppercase tracking-[.1em] text-[#494963]/40">Decretos / Ley</p>
                  <div className="space-y-2">
                    {legislacion.decretosLey.map((documento) => (
                      <ResourceRow key={documento.url} title={`"${documento.nombre}"`} href={documento.url} download chip sideActions showActionLabel />
                    ))}
                  </div>
                </div>
              </div>
            </RepositoryPanel>
          </div>
        </section>

        <section className="px-4 pb-3 sm:px-6 sm:pb-4 md:pb-4">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-6">
              <ArchiveGroup title="Calendario intercultural" items={celebracionesCalendario} />
              <ArchiveGroup title="Memorias y recursos" items={celebracionesMemoria} />
            </div>
          </div>
        </section>

        <section className="px-4 pb-3 sm:px-6 sm:pb-4 md:pb-4">
          <div className="mx-auto max-w-4xl">
            <RepositoryPanel chips>
              <div className="space-y-6">
                <ProjectGroup index="01" title="Inicial" items={proyectos.inicial} />
                <ProjectGroup index="02" title="Primario" items={proyectos.primario} />
                <ProjectGroup index="03" title="Secundario" items={proyectos.secundario} />
                <ProjectGroup index="04" title="Terciario" items={proyectos.terciario} />
              </div>
            </RepositoryPanel>
          </div>
        </section>
      </SectionTabs>
    </main>
  );
}
