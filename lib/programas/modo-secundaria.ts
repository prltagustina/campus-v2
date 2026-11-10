import { formacionPrimerAno, itinerariosPrimerAno } from "@/lib/programas/plan-matematica";
import type { GrupoRecursos, Recurso } from "@/lib/programas/tipos";

/**
 * Modo Secundaria. Contenido relevado el 2026-10-19 de
 * https://campuseducativo.santafe.edu.ar/programas/modo-secundaria/. Títulos,
 * textos y enlaces tal como figuran ahí. Lo que en el Campus es un enlace a
 * otra página (Articulación, ConectaDOS, Tutorías, etc.) sigue siendo un
 * enlace: no se trae el contenido de esas páginas. Las secciones y los
 * nombres cortos "Alfabetización", "Jornada de Convivencia" y "Técnicas
 * Profesionales y Orientadas" son de esta propuesta.
 */

const ORIGEN = "Modo Secundaria";
const CAMPUS = "https://campuseducativo.santafe.edu.ar";
const UPLOADS = `${CAMPUS}/wp-content/uploads/sites/3`;
const SECUNDARIA = `${CAMPUS}/programas/modo-secundaria`;
const vistaDrive = (id: string, usp = "drive_link") => `https://drive.google.com/file/d/${id}/view?usp=${usp}`;
const descargaDrive = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`;

export type CategoriaTemaId = "inicio" | "curricular" | "ensenanza" | "trayectorias" | "institucional";

export interface SeccionSecundaria {
  id: CategoriaTemaId;
  /** Tramo de la ruta (`/modo-secundaria/<slug>`); Inicio es la raíz. */
  slug: string | null;
  nombre: string;
}

/**
 * Secciones de la columna principal, como Inicio/Áreas/Equipos/Familias/EIB
 * en Diseño Curricular. Agrupación propuesta: no existe en el Campus actual.
 */
export const seccionesSecundaria: SeccionSecundaria[] = [
  { id: "inicio", slug: null, nombre: "Inicio" },
  { id: "curricular", slug: "diseno-curricular", nombre: "Diseño curricular" },
  { id: "ensenanza", slug: "ensenanza-y-evaluacion", nombre: "Enseñanza y evaluación" },
  { id: "trayectorias", slug: "trayectorias-y-articulacion", nombre: "Trayectorias y articulación" },
  { id: "institucional", slug: "gestion-institucional", nombre: "Gestión institucional" },
];

export interface Tema {
  slug: string;
  /** Nombre corto para el índice y la navegación. */
  nombre: string;
  /** Título institucional de la sección en el Campus. */
  titulo: string;
  subtitulo?: string;
  categoria: CategoriaTemaId;
  /** Cómo se presenta: banda de color (Espacios Curriculares), repositorio
   * con categorías desplegables (Diseño Curricular) o portadas (Accesos). */
  variante?: "banda" | "repositorio" | "accesos";
  parrafos?: string[];
  lista?: { titulo: string; items: string[] };
  grupos: GrupoRecursos[];
  embebido?: { src: string; titulo: string; rotulo: string };
  /** Foto que acompaña la sección en el Campus. */
  imagen?: { src: string; alt: string; width: number; height: number; href?: string };
  /** Enlaces a otras partes del prototipo (sin duplicar datos). */
  relacionados?: { texto: string; href: string }[];
}

/* ── Recursos ── */

const documentoDrive = (
  id: string,
  titulo: string,
  driveId: string,
  ubicacion: string,
  extra: Partial<Recurso> = {},
): Recurso => ({
  id,
  titulo,
  meta: "PDF",
  acciones: [{ tipo: "ver", url: vistaDrive(driveId) }],
  origen: [{ pagina: ORIGEN, ubicacion }],
  ...extra,
});

const tecnicasProfesionales: [string, string][] = [
  ["Res 0069-11 - Estructuras curriculares y de los contenidos correspondientes a la Educación Secundaria Modalidad Técnico Profesional", "1DzCA5J0FJJZSATqR2wuluLRUfWaaD6jt"],
  ["Anexo 02- PRIMER CICLO Educación Técnica", "1XYas2tY7312SStuclYdYQqZ5ygnrmj9l"],
  ["Anexo 03- SC Producción Agropecuaria", "1BCB6kPLEopL14WljiPlaU1Gvyql-zINJ"],
  ["Anexo 04- SC Maestro Mayor de Obra", "12xl0K8PgWzzIJauGA-er_WuV1LXQHicv"],
  ["Anexo 05- SC Electrónica", "1owfdIbAUE3UUR4jPAL3vbMaeKoXtddxw"],
  ["Anexo 06 - SC Equipos e Instalaciones Electromecánicas", "1dhmNHOawmi3K7e1crLSZZt01GfdrmAa9"],
  ["Anexo 07- SC Química", "1UsvJLxOVmc2upWf646ixbUEZgWqB6JP9"],
  ["Anexo 08- SC Industria de Procesos", "11zrSiIlMiYXx2l_QFWebCggIe2Ibd5_h"],
  ["Anexo 09- SC Informática", "1HM50BsN26d06SGV1BPnLwY9pfzOyJcMa"],
  ["Anexo 10- SC Administración y Gestión", "1qsoULTa2tx8dGo61GhXiZEsRP9iAhKU1"],
  ["Anexo 11- SC Automotores", "17YuCy3dscszJ0VGJg7OegnmTpAlHSaou"],
  ["Res 159-14 - Técnico en Tecnología de Alimentos", "1rTgqBiPWUxxRXhOuwlPgKTHycQMZRgdC"],
  ["Res 160-14 y Anexo hasta página 50 - Técnico en Diseño y Comunicación Multimedia", "1SwwtW1VBVsn3CvVwu0-0a7v20R0hylwF"],
  ["Res 398-14 - Técnico en Pesca y Acuicultura", "13rNedR8rVT5Qx7Rfv1b2gglxK0nHPsvd"],
  ["Res 0423-13 - Técnico Mecánico", "1QZTECrYktgr8ocwOJsBVM5-nIo51JRmy"],
  ["Res 424-13 - Técnico en Indumentaria y Productos de Confección Textil", "1xN1U2CCNymzPody0ry31rseMb9Yyp9Uo"],
  ["Res 2486-14 - Técnico en Energías Renovables", "1f7-CfGCeR9YbQbZbra8xVph-YXU1T2ZJ"],
  ["Res. 425-13 - Técnico en Diseño y producción de Joyas", "1wTIVMokIEx2DuIyiDlRu4YgO2zSNNsDb"],
];

const orientadas: [string, string][] = [
  ["Res 2630-14 - Estructuras curriculares ciclo básico y orientado de la Educación Secundaria", "1Q_djS-pI6RdVqgZ_5QvNFoAvqxdpU4Wv"],
  ["Res 2630-14 - Anexo 02", "1wXuUbzTt_hKDYiBJsOx37zNrgsm5MB1s"],
];

/**
 * Diseño Curricular Secundaria separa Resoluciones y Anexos dentro de cada
 * categoría, como los grados dentro de una categoría del Plan. Es anexo lo
 * que se titula "Anexo…" o termina en "- Anexo NN"; "Res 160-14 y Anexo
 * hasta página 50" es una resolución.
 */
const subgrupoNormativa = (titulo: string) => (/^Anexo\b|- Anexo \d+$/.test(titulo) ? "Anexos" : "Resoluciones");

/* ── Temas, en el orden del índice ── */

export const temas: Tema[] = [
  {
    slug: "evaluacion",
    nombre: "Evaluación",
    titulo: "Evaluación en la escuela secundaria",
    categoria: "ensenanza",
    grupos: [
      {
        id: "materiales",
        titulo: "Material",
        recursos: [
          {
            id: "evaluacion-presentacion",
            titulo: "Presentación",
            detalle: "Evaluación en la escuela secundaria",
            meta: "PDF",
            // En el Campus, "Presentación" y "Material" llevan al mismo archivo:
            // se muestra una sola vez.
            acciones: [{ tipo: "ver", url: vistaDrive("10IyPiL8BfNW5IX9R3Hp8ISI6_Kn_V1jI", "sharing") }],
            origen: [
              { pagina: ORIGEN, ubicacion: "Evaluación en la escuela secundaria > Presentación" },
              { pagina: ORIGEN, ubicacion: "Evaluación en la escuela secundaria > Material (mismo archivo)" },
            ],
          },
        ],
      },
    ],
    embebido: {
      rotulo: "Presentación",
      titulo: "Evaluación en la Escuela Secundaria",
      src: "https://docs.google.com/presentation/d/e/2PACX-1vSiw4zr1dz66uwNlYLltkN0BCOb_nt6tN5346bfR1qS1ku7dMeWkXDrMITavwSD0g/pubembed?start=true&loop=true&delayms=5000",
    },
  },
  {
    slug: "espacios-curriculares-articulados",
    nombre: "Espacios Curriculares Articulados",
    variante: "banda",
    titulo: "Espacios Curriculares Articulados",
    subtitulo: "Ciclo Básico de la educación secundaria",
    categoria: "curricular",
    grupos: [
      {
        id: "documentos",
        titulo: "Documentos",
        recursos: [
          {
            id: "eca-sintesis",
            titulo: "Síntesis Visual",
            detalle: "Para Supervisores, Directivos y Docentes",
            meta: "PDF · 3.3 MB",
            acciones: [{ tipo: "ver", url: `${UPLOADS}/2026/05/Espacios_Curriculares_Articulados-Sintesis-Visual.pdf` }],
            origen: [{ pagina: ORIGEN, ubicacion: "Espacios Curriculares Articulados > Ciclo Básico" }],
          },
          {
            id: "eca-orientaciones",
            titulo: "Orientaciones",
            detalle: "Para el desarrollo de los Espacios",
            meta: "PDF · 4.2 MB",
            acciones: [{ tipo: "ver", url: `${UPLOADS}/2026/05/Orientaciones-para-el-desarrollo-de-los-Espacios-Curriculares-1.pdf` }],
            origen: [{ pagina: ORIGEN, ubicacion: "Espacios Curriculares Articulados > Ciclo Básico" }],
          },
          {
            id: "eca-resolucion",
            titulo: "Resolución Ministerial",
            detalle: "Res 1106-26 EE",
            meta: "PDF · 4.3 MB",
            acciones: [{ tipo: "ver", url: `${UPLOADS}/2026/05/Resolucion-1106-26-EE.pdf` }],
            origen: [{ pagina: ORIGEN, ubicacion: "Espacios Curriculares Articulados > Ciclo Básico" }],
          },
        ],
      },
    ],
  },
  {
    slug: "alfabetizacion",
    nombre: "Alfabetización",
    titulo: "Fortalecer las trayectorias de los estudiantes",
    subtitulo: "Alfabetización",
    categoria: "ensenanza",
    parrafos: [
      "La alfabetización en el nivel secundario es un proceso fundamental que no solo implica la capacidad de leer y escribir, sino también el desarrollo de habilidades lingüísticas y cognitivas necesarias para acceder al vasto mundo del conocimiento humano. En este contexto, los directores y directoras de las instituciones educativas juegan un papel crucial al liderar estrategias que promuevan la comprensión y producción de textos complejos. Es esencial que los estudiantes no solo adquieran fluidez en la lectura y escritura de palabras, sino que también desarrollen habilidades superiores de comprensión y producción textual.",
      "Para eso dejamos documentos de apoyo y un espacio virtual en la Plataforma de capacitación e intercambio de experiencias:",
    ],
    grupos: [
      {
        id: "aula",
        titulo: "Espacio virtual",
        recursos: [
          {
            id: "alfabetizacion-aula",
            titulo: "Acceso al aula",
            detalle: "Plataforma Educativa",
            acciones: [{ tipo: "aula", url: "https://plataformaeducativa.santafe.edu.ar/moodle/course/view.php?id=10226" }],
            aviso: "Pide iniciar sesión e inscribirse en la Plataforma Educativa.",
            origen: [{ pagina: ORIGEN, ubicacion: "1) Fortalecer las trayectorias de los estudiantes" }],
          },
        ],
      },
      {
        id: "documentos",
        titulo: "Documentos de apoyo",
        recursos: [
          {
            id: "alfabetizacion-cuaderno",
            titulo: "La Alfabetización Inicial en el nivel Secundario",
            detalle: "Cuaderno de Actividades",
            meta: "PDF",
            portada: `${UPLOADS}/2026/09/portada_alfabetizacion_cuaderno_actividades-211x300.png`,
            acciones: [
              { tipo: "ver", url: vistaDrive("1uMg0n8UFr-yOxrY6ZORslb21yrn0Dnbo") },
              { tipo: "descargar", url: descargaDrive("1uMg0n8UFr-yOxrY6ZORslb21yrn0Dnbo") },
            ],
            origen: [{ pagina: ORIGEN, ubicacion: "1) Fortalecer las trayectorias de los estudiantes" }],
          },
          {
            id: "alfabetizacion-guia",
            titulo: "La Alfabetización Inicial en el nivel Secundario",
            detalle: "Guía para Docentes",
            meta: "PDF",
            portada: `${UPLOADS}/2026/09/portada_alfabetizacion_guia_docentes-e1789493185883-212x300.png`,
            acciones: [
              { tipo: "ver", url: vistaDrive("1OpyGPHXWS4Ytv6MFwY7tlNwSo5XRiUrW") },
              { tipo: "descargar", url: descargaDrive("1OpyGPHXWS4Ytv6MFwY7tlNwSo5XRiUrW") },
            ],
            origen: [{ pagina: ORIGEN, ubicacion: "1) Fortalecer las trayectorias de los estudiantes" }],
          },
          {
            id: "alfabetizacion-trayectorias",
            titulo: "Fortalecer las trayectorias de los estudiantes: Alfabetización.",
            detalle: "Educación Secundaria",
            meta: "PDF",
            portada: `${UPLOADS}/2026/09/portada_alfabetizacion_fortalecer_trayectorias-211x300.png`,
            acciones: [
              { tipo: "ver", url: vistaDrive("1K8gMT0wCusll72olT_Gxzj-2OUwMpwTM") },
              { tipo: "descargar", url: descargaDrive("1K8gMT0wCusll72olT_Gxzj-2OUwMpwTM") },
            ],
            origen: [{ pagina: ORIGEN, ubicacion: "1) Fortalecer las trayectorias de los estudiantes" }],
          },
        ],
      },
    ],
  },
  {
    slug: "matematica",
    nombre: "Matemática",
    titulo: "Plan Provincial de Matemática",
    subtitulo: "Material educativo / Formaciones",
    categoria: "ensenanza",
    grupos: [
      { id: "materiales", titulo: "Cuadernillos · 1er año", recursos: [itinerariosPrimerAno] },
      { id: "formaciones", titulo: "Formaciones", recursos: [formacionPrimerAno] },
    ],
    relacionados: [
      { texto: "Ver Secundaria en el Plan Provincial de Matemática", href: "/plan-provincial-de-matematica/secundaria" },
    ],
  },
  {
    slug: "diseno-curricular",
    nombre: "Técnicas Profesionales y Orientadas",
    variante: "repositorio",
    titulo: "Diseño Curricular Secundaria",
    subtitulo: "Técnicas Profesionales y Orientadas",
    categoria: "curricular",
    grupos: [
      {
        id: "tecnicas-profesionales",
        titulo: "Técnicas Profesionales",
        recursos: tecnicasProfesionales.map(([titulo, driveId], i) =>
          documentoDrive(`tp-${i + 1}`, titulo, driveId, "Diseño Curricular Secundaria > Técnicas Profesionales", { subgrupo: subgrupoNormativa(titulo) }),
        ),
      },
      {
        id: "orientadas",
        titulo: "Orientadas",
        recursos: orientadas.map(([titulo, driveId], i) =>
          documentoDrive(`or-${i + 1}`, titulo, driveId, "Diseño Curricular Secundaria > Orientadas", { subgrupo: subgrupoNormativa(titulo) }),
        ),
      },
    ],
  },
  {
    slug: "articulacion-primaria-secundaria",
    nombre: "Articulación entre Primaria y Secundaria",
    // En Modo Secundaria este bloque es solo la foto y el enlace "Materiales"
    // a su propia página: se enlaza, no se trae el contenido de esa página.
    imagen: {
      src: `${UPLOADS}/2026/10/aprender_a_estudiar.png`,
      alt: "Materiales de Articulación entre Primaria y Secundaria",
      width: 480,
      height: 359,
      href: `${SECUNDARIA}/articulacion-entre-primaria-y-secundaria/`,
    },
    titulo: "Articulación entre Primaria y Secundaria",
    categoria: "trayectorias",
    grupos: [
      {
        id: "articulacion",
        titulo: "Materiales",
        recursos: [
          {
            id: "articulacion-materiales",
            titulo: "Materiales",
            detalle: "Página de Articulación entre Primaria y Secundaria",
            acciones: [{ tipo: "pagina", url: `${SECUNDARIA}/articulacion-entre-primaria-y-secundaria/` }],
            origen: [{ pagina: ORIGEN, ubicacion: "Articulación entre Primaria y Secundaria > Materiales" }],
          },
        ],
      },
    ],
  },
  {
    slug: "accesos",
    nombre: "Accesos",
    titulo: "Accesos",
    categoria: "inicio",
    variante: "accesos",
    grupos: [
      {
        id: "accesos",
        titulo: "Accesos",
        recursos: [
          {
            id: "vivamos-los-juegos",
            titulo: "Vivamos los juegos en la escuela",
            portada: `${UPLOADS}/2026/05/banner_juegos-768x384.png`,
            portadaFormato: "horizontal",
            acciones: [{ tipo: "pagina", url: `${CAMPUS}/vivamos-los-juegos-en-la-escuela/#materiales` }],
            origen: [{ pagina: ORIGEN, ubicacion: "Accesos" }],
          },
          {
            id: "quedate",
            titulo: "¡Quedate!",
            portada: `${UPLOADS}/2026/07/banner_quedate.png`,
            portadaFormato: "horizontal",
            acciones: [{ tipo: "pagina", url: `${CAMPUS}/quedate/` }],
            origen: [{ pagina: ORIGEN, ubicacion: "Accesos" }],
          },
          {
            id: "tutorias-virtuales",
            titulo: "Tutorías Virtuales",
            portada: `${UPLOADS}/2026/07/banner_tutorias-768x384.jpeg`,
            portadaFormato: "horizontal",
            acciones: [{ tipo: "pagina", url: `${SECUNDARIA}/tutorias-virtuales/` }],
            origen: [{ pagina: ORIGEN, ubicacion: "Accesos" }],
          },
        ],
      },
    ],
  },
  {
    slug: "jornada-de-convivencia",
    nombre: "Jornada de Convivencia",
    titulo: "Jornada de Convivencia en Secundaria",
    categoria: "trayectorias",
    grupos: [
      {
        id: "conectados",
        titulo: "ConectaDOS",
        recursos: [
          {
            id: "conectados",
            titulo: "ConectaDOS",
            acciones: [{ tipo: "pagina", url: `${SECUNDARIA}/conectados` }],
            origen: [{ pagina: ORIGEN, ubicacion: "Bloque sin título > ConectaDOS" }],
          },
        ],
      },
    ],
  },
  {
    slug: "jornadas-institucionales",
    nombre: "Jornada institucional",
    titulo: "Jornada institucional",
    categoria: "institucional",
    grupos: [
      {
        id: "jornadas",
        titulo: "Aulas",
        recursos: [
          {
            id: "jornada-2026",
            titulo: "Jornada institucional 03/07/2026",
            detalle: "Acceso al Aula",
            acciones: [{ tipo: "aula", url: "https://plataformaeducativa.santafe.edu.ar/moodle/course/view.php?id=10801" }],
            aviso: "Se abre en la Plataforma Educativa.",
            origen: [{ pagina: ORIGEN, ubicacion: "Bloque sin título > Jornada institucional 03/07/2026" }],
          },
          {
            id: "jornada-2025",
            titulo: "Jornada institucional 21/07/2025",
            detalle: "Acceso a Material",
            acciones: [{ tipo: "aula", url: "https://plataformaeducativa.santafe.edu.ar/moodle/course/view.php?id=10263" }],
            aviso: "Se abre en la Plataforma Educativa.",
            origen: [{ pagina: ORIGEN, ubicacion: "Bloque sin título > Jornada institucional 21/07/2025" }],
          },
        ],
      },
    ],
  },
  {
    slug: "escuelas-agrotecnicas",
    nombre: "Escuelas Agrotécnicas",
    titulo: "Fortalecimiento de las Escuelas Agrotécnicas",
    categoria: "institucional",
    parrafos: [
      "El programa está destinado a 32 escuelas agrotécnicas de la provincia de Santa Fe. El foco está centrado en el fortalecimiento del rol de liderazgo y gestión de directivos, la mejora de los aprendizajes de áreas esenciales, y la innovación pedagógica y tecnológica, con un fuerte componente de articulación con el sector de agroindustria de la región a fin de potenciar aprendizajes y experiencias significativas para los estudiantes, vinculándolo con interrogantes y problemáticas específicas del área.",
    ],
    lista: {
      titulo: "Componentes del programa:",
      items: [
        "Capacitación a miembros del equipo directivo.",
        "Plan de mejora e innovación.",
        "Formación a docentes referentes en áreas estratégicas.",
        "ABP orientado al agro, con inclusión de tecnología.",
      ],
    },
    grupos: [
      {
        id: "documento",
        titulo: "Documento",
        recursos: [
          {
            id: "programa-agrotecnicas",
            titulo: "Programa para Escuelas Agrotécnicas",
            meta: "PDF",
            acciones: [{ tipo: "ver", url: vistaDrive("1pnhbPnfUcQdjJpXW0JF6pTE_e67UT0mE", "sharing") }],
            origen: [{ pagina: ORIGEN, ubicacion: "2) Fortalecimiento de las Escuelas Agrotécnicas" }],
          },
        ],
      },
    ],
  },
];

export const modoSecundaria = {
  slug: "modo-secundaria",
  nombre: "Modo Secundaria",
  urlCampus: `${SECUNDARIA}/`,
  logo: {
    src: `${UPLOADS}/2026/05/modo_2-768x74.png`,
    alt: "Modo Secundaria",
    width: 768,
    height: 74,
  },
  /** Texto institucional de "Introducción". */
  introduccion: [
    "Desde esa perspectiva trabajamos en una hoja de ruta para el fortalecimiento de la escuela secundaria que permita a los estudiantes construir un proyecto de vida con los aprendizajes significativos que hayan incorporado a lo largo de su camino por este nivel.",
    "Queremos una secundaria que reconozca a cada joven para que se apropie del conocimiento, capaz de aprender a aprender, proyectar su futuro y hacerlo en comunidad. Los aprendizajes deben permitirle a los estudiantes incidir en su vida y contexto, dotándolo de saberes con sentido y utilidad.",
  ],
};

/** Orden de la página actual del Campus, que la vista general conserva. */
export const ordenGeneral = [
  "accesos",
  "espacios-curriculares-articulados",
  "alfabetizacion",
  "escuelas-agrotecnicas",
  "evaluacion",
  "articulacion-primaria-secundaria",
  "jornada-de-convivencia",
  "jornadas-institucionales",
  "matematica",
  "diseno-curricular",
];

export function temasEnOrdenGeneral() {
  return ordenGeneral.map((slug) => temas.find((tema) => tema.slug === slug)).filter((tema): tema is Tema => Boolean(tema));
}

export function getTema(slug: string) {
  return temas.find((tema) => tema.slug === slug);
}

/** Temas de una sección, en el orden del Campus (cada uno es una pestaña). */
export function temasDeSeccion(id: CategoriaTemaId) {
  return temasEnOrdenGeneral().filter((tema) => tema.categoria === id);
}

export function getSeccionSecundaria(slug: string) {
  return seccionesSecundaria.find((seccion) => seccion.slug === slug);
}

export const rutaSeccionSecundaria = (seccion: SeccionSecundaria) => (seccion.slug ? `/${modoSecundaria.slug}/${seccion.slug}` : `/${modoSecundaria.slug}`);

/** Dirección de un tema: su sección y, salvo en Inicio, la pestaña (`#evaluacion`). */
export function rutaTema(tema: Tema) {
  const seccion = seccionesSecundaria.find((s) => s.id === tema.categoria) ?? seccionesSecundaria[0];
  return seccion.slug ? `${rutaSeccionSecundaria(seccion)}#${tema.slug}` : rutaSeccionSecundaria(seccion);
}
