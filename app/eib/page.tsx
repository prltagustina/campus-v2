"use client";

import { ArrowUpRight } from "lucide-react";
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

/** Las efemérides y los proyectos son páginas del Campus (no documentos): la
 * fila lleva la flecha de página, la misma que en Modo Secundaria. */
const iconoPagina = <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[#494963]" aria-hidden="true" />;

function PaginaRow({ item }: { item: { nombre: string; url: string } }) {
  return <ResourceRow title={asTitle(item.nombre)} href={item.url} icon={iconoPagina} sideActions />;
}

/**
 * Los niveles (Inicial/Primario/Secundario/Terciario) necesitan más presencia
 * que un simple label: número grande y pálido (mismo criterio que los pasos
 * de DocumentoStepper) + título más grande. Los proyectos van en una caja de
 * repositorio (filas separadas por línea), no en chips sueltos - mismo
 * criterio que Modo Secundaria.
 */
function ProjectGroup({ title, index, items }: { title: string; index: string; items: { nombre: string; url: string }[] }) {
  return (
    <section className="grid min-w-0 gap-4 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-7">
      <header className="flex items-center gap-3 px-1 md:block md:pt-4">
        {/* Mismas clases exactas que el numeral de DocumentoStepper. */}
        <div className="shrink-0">
          <p className="font-sans text-4xl font-black leading-none text-[#E4E4E9] sm:text-5xl" aria-hidden="true">{index}</p>
        </div>
        {/* "Nivel" junto al nombre, como prefijo más liviano, para que lea
           "Nivel Inicial" de corrido. Mismo tamaño que el título de las
           cajas de Efemérides ("Calendario intercultural"). */}
        <h3 className="font-display text-xl leading-tight text-[#494963] md:mt-3">
          <span className="font-normal text-[#494963]/[.82]">Nivel </span>
          <span className="font-semibold">{title}</span>
        </h3>
      </header>

      <RepositoryPanel>
        {items.map((item) => <PaginaRow key={item.url} item={item} />)}
      </RepositoryPanel>
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
            {/* Sin título general (antes Scale): única
               tira de esta tab ("Normativa"). Cada subgrupo es una caja de
               repositorio con su nombre como encabezado (antes label chico +
               chips sueltos), mismo criterio que Modo Secundaria. */}
            <div className="space-y-6">
              <RepositoryPanel title="Resolución">
                {legislacion.resoluciones.map((documento) => (
                  <ResourceRow key={documento.url} title={`"${documento.nombre}"`} href={documento.url} download sideActions showActionLabel />
                ))}
              </RepositoryPanel>
              <RepositoryPanel title="Decretos / Ley">
                {legislacion.decretosLey.map((documento) => (
                  <ResourceRow key={documento.url} title={`"${documento.nombre}"`} href={documento.url} download sideActions showActionLabel />
                ))}
              </RepositoryPanel>
            </div>
          </div>
        </section>

        <section className="px-4 pb-3 sm:px-6 sm:pb-4 md:pb-4">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-6">
              <RepositoryPanel title="Calendario intercultural">
                {celebracionesCalendario.map((item) => <PaginaRow key={item.url} item={item} />)}
              </RepositoryPanel>
              <RepositoryPanel title="Memorias y recursos">
                {celebracionesMemoria.map((item) => <PaginaRow key={item.url} item={item} />)}
              </RepositoryPanel>
            </div>
          </div>
        </section>

        <section className="px-4 pb-3 sm:px-6 sm:pb-4 md:pb-4">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-8">
              <ProjectGroup index="01" title="Inicial" items={proyectos.inicial} />
              <ProjectGroup index="02" title="Primario" items={proyectos.primario} />
              <ProjectGroup index="03" title="Secundario" items={proyectos.secundario} />
              <ProjectGroup index="04" title="Terciario" items={proyectos.terciario} />
            </div>
          </div>
        </section>
      </SectionTabs>
    </main>
  );
}
