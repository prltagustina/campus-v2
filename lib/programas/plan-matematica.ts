import { areasData } from "@/lib/areas-data";
import type { ItinerarioFile } from "@/lib/itinerarios-data";
import type { Recurso } from "@/lib/programas/tipos";

/**
 * Plan Provincial de Matemática. Contenido relevado el 2026-10-19 de
 * https://campuseducativo.santafe.edu.ar/plan-provincial-de-matematica/
 * Títulos y enlaces tal como figuran ahí.
 */

const ORIGEN = "Plan Provincial de Matemática";
const CAMPUS = "https://campuseducativo.santafe.edu.ar";
const UPLOADS = `${CAMPUS}/wp-content/uploads/sites/3`;
const descarga = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`;

export type NivelId = "inicial" | "primaria" | "secundaria";
export type CategoriaId = "materiales" | "formaciones" | "juegos";

/**
 * Nombres de las categorías, los mismos del Campus y de la maqueta de
 * Visuales Curricular (2026-11-10): Materiales, Formaciones y Juegos
 * Matemáticos.
 */
export const categorias: Record<CategoriaId, string> = {
  materiales: "Materiales",
  formaciones: "Formaciones",
  juegos: "Juegos Matemáticos",
};

export interface Etapa {
  slug: string;
  nombre: string;
}

/** Un recurso ubicado en un nivel, una categoría y, si corresponde, un grado o año. */
export interface Ubicacion {
  categoria: CategoriaId;
  /** Grados o años a los que corresponde; vacío = todo el nivel. */
  etapas: string[];
  recurso: Recurso;
  /** Título en esta ubicación, si el Campus lo cambia según dónde aparece. */
  titulo?: string;
}

export interface Nivel {
  id: NivelId;
  nombre: string;
  nombreCorto: string;
  /** "grado" o "año"; sin etapas, los recursos se muestran directo. */
  etapaTipo?: "grado" | "año";
  etapas: Etapa[];
  ubicaciones: Ubicacion[];
}

/* ── Recursos que aparecen en más de un lugar (un solo registro) ── */

const tesoro: Recurso = {
  id: "tesoro-matematico",
  titulo: "Tesoro Matemático",
  meta: "PDF",
  // Tapas del Campus, copiadas al sitio (/public/portadas) como las de Diseño Curricular.
  portada: "/portadas/tesoro-matematico.jpg",
  acciones: [{ tipo: "descargar", url: descarga("17FWD2utGDmv74KrB92tnH3_KR6BpQI5f") }],
  origen: [
    { pagina: ORIGEN, ubicacion: "Educación Primaria > Juegos Matemáticos > 7mo. Grado" },
    { pagina: ORIGEN, ubicacion: "Educación Secundaria > Juegos Matemáticos > 1er. y 2do. Año" },
  ],
};

const tesoroAnexo: Recurso = {
  id: "tesoro-matematico-anexo",
  titulo: "Tesoro Matemático - Anexo",
  meta: "PDF",
  portada: "/portadas/tesoro-matematico-anexo.jpg",
  acciones: [{ tipo: "descargar", url: descarga("1lbrQwLFsOOSrvEa4f8B2wsv_H20ZQshI") }],
  origen: tesoro.origen,
};

const tesoroGuia: Recurso = {
  id: "tesoro-matematico-guia-docente",
  titulo: "Tesoro Matemático - Guía Docente",
  meta: "PDF",
  portada: "/portadas/tesoro-matematico-guia-docente.jpg",
  acciones: [{ tipo: "descargar", url: descarga("1GsPsWNeh32uFhnbczFBg1pD6mhVxe_l0") }],
  origen: tesoro.origen,
};

/** También se muestra en Modo Secundaria > Plan Provincial de Matemática. */
export const itinerariosPrimerAno: Recurso = {
  id: "itinerarios-matematicos-1er-ano",
  titulo: "Itinerarios Matemáticos - 1er Año",
  meta: "PDF",
  portada: `${UPLOADS}/2026/06/portada_mat_sec-212x300.png`,
  // En el Campus el botón dice "Descargar PDF", pero el enlace abre el
  // visor de Google Drive: se nombra por lo que hace.
  acciones: [{ tipo: "ver", url: "https://drive.google.com/file/d/1FAlrWLUdQ2DF5zTcvnXGlL0C3q376zXw/view?usp=drive_link" }],
  origen: [
    { pagina: ORIGEN, ubicacion: "Educación Secundaria > Materiales > 1er. Año" },
    { pagina: "Modo Secundaria", ubicacion: "Plan Provincial de Matemática > Materiales > 1er. Año" },
  ],
};

/** También se muestra en Modo Secundaria > Plan Provincial de Matemática. */
export const formacionPrimerAno: Recurso = {
  id: "formacion-itinerarios-1er-ano",
  titulo: "Itinerarios Matemáticos para Primer Año de Escuela Secundaria",
  detalle: "Diseño Curricular",
  acciones: [{ tipo: "pagina", url: `${CAMPUS}/itinerarios-matematicos-para-primer-ano-de-escuela-secundaria_c1/` }],
  origen: [
    { pagina: ORIGEN, ubicacion: "Educación Secundaria > Formaciones" },
    { pagina: "Modo Secundaria", ubicacion: "Plan Provincial de Matemática > Formaciones" },
  ],
};

/* ── Primaria: cuadernillos y formaciones por grado ── */

const cuadernillo = (
  id: string,
  titulo: string,
  driveId: string,
  portada: string,
  grado: string,
): Recurso => ({
  id,
  titulo,
  meta: "PDF",
  portada,
  acciones: [{ tipo: "descargar", url: descarga(driveId) }],
  origen: [{ pagina: ORIGEN, ubicacion: `Educación Primaria > Materiales > ${grado}` }],
});

const formacionGrado = (grado: string, slug: string): Recurso => ({
  id: `formacion-${slug}`,
  titulo: `Matemática ${grado}`,
  detalle: "Diseño Curricular",
  acciones: [{ tipo: "pagina", url: `${CAMPUS}/${slug}/` }],
  origen: [{ pagina: ORIGEN, ubicacion: "Educación Primaria > Formaciones" }],
});

const gradosPrimaria: Etapa[] = [
  { slug: "1er-grado", nombre: "1er grado" },
  { slug: "2do-grado", nombre: "2do grado" },
  { slug: "3er-grado", nombre: "3er grado" },
  { slug: "4to-grado", nombre: "4to grado" },
  { slug: "5to-grado", nombre: "5to grado" },
  { slug: "6to-grado", nombre: "6to grado" },
  { slug: "7mo-grado", nombre: "7mo grado" },
];

const materialesPrimaria: [string, Recurso][] = [
  ["1er-grado", cuadernillo("mat-1-n1", "Matemática - 1er Grado Nº 1", "1J2BRX4T7iQHIfYWZS9o8VtDe9nT3stBS", `${UPLOADS}/2026/07/matematica-1ro-212x300.jpg`, "1er. Grado")],
  ["1er-grado", cuadernillo("mat-1-n1-1", "Matemática - 1er Grado Nº 1.1", "13OwasVlY5ftk5O4WiWajr7Wr3UUHZ-PC", `${UPLOADS}/2026/07/matematica-1er-grado-1.1-2026.jpg`, "1er. Grado")],
  ["1er-grado", cuadernillo("mat-1-n1-2", "Matemática - 1er Grado Nº 1.2", "15qurEru4d905xrpEwohJD8QoKgLkEORR", `${UPLOADS}/2026/08/matematica-1er-grado1.2.jpg`, "1er. Grado")],
  ["2do-grado", cuadernillo("mat-2-n1", "Matemática - 2do Grado Nº 1", "1Qu7v-0-hr639y-lPUMKObhi0Cv-zUn2z", `${UPLOADS}/2026/07/matematica-2do-212x300.jpg`, "2do. Grado")],
  ["2do-grado", cuadernillo("mat-2-n1-1", "Matemática - 2do Grado Nº 1.1", "150oX3yGgqcZh9i5cNgp1LzmqLvQ_-GdT", `${UPLOADS}/2026/07/matematica-2do-grado-1.1-2026.jpg`, "2do. Grado")],
  ["2do-grado", cuadernillo("mat-2-n1-2", "Matemática - 2do Grado Nº 1.2", "1U1-ost12lM4KfH9NKIUtyzP62aJD5hOW", `${UPLOADS}/2026/08/matematica-2do-grado1.2.jpg`, "2do. Grado")],
  ["3er-grado", cuadernillo("mat-3-n1", "Matemática - 3er Grado Nº 1", "1CPaQ5ix51Znx2wHwtE0LHSJQQ36UjUEe", `${UPLOADS}/2026/07/matematica-3ro-212x300.jpg`, "3er. Grado")],
  ["3er-grado", cuadernillo("mat-3-n1-1", "Matemática - 3er Grado Nº 1.1", "1zQqYEOuqg7peGgaQBk56e-yUQB0FGnjK", `${UPLOADS}/2026/07/matematica-3er-grado-1.1-2026.jpg`, "3er. Grado")],
  ["3er-grado", cuadernillo("mat-3-n1-2", "Matemática - 3er Grado Nº 1.2", "1AuOy1595Sf_vS3FfNMgm50OCC5RbFx-t", `${UPLOADS}/2026/08/matematica-3er-grado1.2.jpg`, "3er. Grado")],
  ["4to-grado", cuadernillo("mat-4-n1", "Matemática - 4to Grado Nº 1", "1ZZfsiaFI5JKqiGVyEpe4QFuXMoQhimkR", `${UPLOADS}/2026/08/matematica-4tor-grado1.2.jpg`, "4to. Grado")],
  ["4to-grado", cuadernillo("mat-4-n1-1", "Matemática - 4to Grado Nº 1.1", "1c58vDJ7SKtV_BxzIFrIl_r6OHQsPoo08", `${UPLOADS}/2026/08/Matematica-4to-ed1-1.jpg`, "4to. Grado")],
  ["5to-grado", cuadernillo("mat-5-n1", "Matemática - 5to Grado Nº 1", "11XhHm-LcGDG-pEgbiXbSOPjS7IodiyYf", `${UPLOADS}/2026/08/matematica-5tor-grado1.jpg`, "5to. Grado")],
  ["5to-grado", cuadernillo("mat-5-n1-1", "Matemática - 5to Grado Nº 1.1", "1rieZYFnMbiqFkrJcT9WvMh9VjQXLV5OH", `${UPLOADS}/2026/08/matematica-5togrado-1-1.jpg`, "5to. Grado")],
  ["6to-grado", cuadernillo("mat-6-n1", "Matemática - 6to Grado N° 1", "1vRjsPSLehexGFy0iCXt2SJlWMl2fRySQ", `${UPLOADS}/2026/08/portada_mat_6-212x300.png`, "6to. Grado")],
  ["6to-grado", cuadernillo("mat-6-n1-1", "Matemática - 6to Grado N° 1.1", "1bI5qdMdGWcG71jVb41MZ2qfNDPfb4UyJ", `${UPLOADS}/2026/08/matematica-gto-grado-1-1.jpg`, "6to. Grado")],
  ["7mo-grado", cuadernillo("mat-7-n1", "Matemática - 7mo Grado N° 1", "17MOt0A5732BfzMknguoMHcyQIPvXDHaL", `${UPLOADS}/2026/08/portada_mat_7-212x300.png`, "7mo. Grado")],
  ["7mo-grado", cuadernillo("mat-7-n1-1", "Matemática - 7mo Grado N° 1.1", "1niXQ-j5cDkEJFZq4eoSK4IBNw5Ugmg9A", `${UPLOADS}/2026/08/matematica-7mogrdo-1-1.jpg`, "7mo. Grado")],
];

const formacionesPrimaria: [string, Recurso][] = [
  ["1er-grado", formacionGrado("1er. Grado", "matematica-1er-grado_c3")],
  ["2do-grado", formacionGrado("2do. Grado", "matematica-2do-grado_c3")],
  ["3er-grado", formacionGrado("3er. Grado", "matematica-3er-grado_c3")],
  ["4to-grado", formacionGrado("4to. Grado", "matematica-4to-grado_c3")],
  ["5to-grado", formacionGrado("5to. Grado", "matematica-5to-grado_c3")],
  ["6to-grado", formacionGrado("6to. Grado", "matematica-6to-grado_c3")],
  ["7mo-grado", formacionGrado("7mo. Grado", "matematica-7mo-grado_c3")],
];

export const niveles: Nivel[] = [
  {
    id: "inicial",
    nombre: "Educación Inicial",
    nombreCorto: "Inicial",
    etapas: [],
    ubicaciones: [
      {
        categoria: "materiales",
        etapas: [],
        recurso: {
          id: "oportunidades-inicial",
          titulo: "Oportunidades para hacer Matemática en la Educación Inicial",
          meta: "PDF",
          portada: `${UPLOADS}/2026/06/FotalecimientoCurricular-212x300.jpg`,
          acciones: [{ tipo: "descargar", url: descarga("1DQHlu0LkioQ5D0bak2ktkQqSeEXWcIEq") }],
          origen: [{ pagina: ORIGEN, ubicacion: "Educación Inicial > Materiales > Inicial" }],
        },
      },
      {
        categoria: "formaciones",
        etapas: [],
        recurso: {
          id: "jugar-la-matematica",
          titulo: "Jugar la Matemática",
          detalle: "Campus Educativo",
          acciones: [{ tipo: "pagina", url: `${CAMPUS}/jugar-la-matematica/` }],
          origen: [{ pagina: ORIGEN, ubicacion: "Educación Inicial > Formaciones" }],
        },
      },
    ],
  },
  {
    id: "primaria",
    nombre: "Educación Primaria",
    nombreCorto: "Primaria",
    etapaTipo: "grado",
    etapas: gradosPrimaria,
    ubicaciones: [
      ...materialesPrimaria.map(([grado, recurso]) => ({ categoria: "materiales" as const, etapas: [grado], recurso })),
      ...formacionesPrimaria.map(([grado, recurso]) => ({ categoria: "formaciones" as const, etapas: [grado], recurso })),
      { categoria: "juegos", etapas: ["7mo-grado"], recurso: tesoro, titulo: "Tesoro Matemático - 7mo Grado" },
      { categoria: "juegos", etapas: ["7mo-grado"], recurso: tesoroAnexo, titulo: "Tesoro Matemático - Anexo - 7mo Grado" },
      { categoria: "juegos", etapas: ["7mo-grado"], recurso: tesoroGuia, titulo: "Tesoro Matemático - Guía Docente - 7mo Grado" },
    ],
  },
  {
    id: "secundaria",
    nombre: "Educación Secundaria",
    nombreCorto: "Secundaria",
    etapaTipo: "año",
    etapas: [
      { slug: "1er-ano", nombre: "1er año" },
      { slug: "2do-ano", nombre: "2do año" },
    ],
    ubicaciones: [
      { categoria: "materiales", etapas: ["1er-ano"], recurso: itinerariosPrimerAno },
      { categoria: "formaciones", etapas: ["1er-ano"], recurso: formacionPrimerAno },
      { categoria: "juegos", etapas: ["1er-ano", "2do-ano"], recurso: tesoro, titulo: "Tesoro Matemático - 1er y 2do Año" },
      { categoria: "juegos", etapas: ["1er-ano", "2do-ano"], recurso: tesoroAnexo, titulo: "Tesoro Matemático - Anexo - 1er y 2do Año" },
      { categoria: "juegos", etapas: ["1er-ano", "2do-ano"], recurso: tesoroGuia, titulo: "Tesoro Matemático - Guía Docente - 1er y 2do Año" },
    ],
  },
];

const areaMatematica = areasData.find((area) => area.slug === "matematica");

export const planMatematica = {
  slug: "plan-provincial-de-matematica",
  nombre: "Plan Provincial de Matemática",
  /** Rojo de Matemática como acento del Plan (pedido explícito). Blanco
   * encima: 4,5:1. El texto de lectura sigue en la tinta. */
  color: areaMatematica?.color ?? "#E42153",
  colorTexto: areaMatematica?.textOnColor ?? "#ffffff",
  urlCampus: `${CAMPUS}/plan-provincial-de-matematica/`,
  imagen: {
    src: `${UPLOADS}/2026/10/plan_matematicas_slider-768x385.jpeg`,
    alt: "Plan provincial de matemática",
    width: 768,
    height: 385,
  },
};

export const rutaPlan = (nivel?: NivelId, etapa?: string) =>
  ["", planMatematica.slug, nivel, etapa].filter((parte) => parte !== undefined).join("/");

/** Vista de un nivel (los grados o años se abren dentro del repositorio). */
export const rutaNivel = (nivel: Nivel) => rutaPlan(nivel.id);

export function getNivel(id: string) {
  return niveles.find((nivel) => nivel.id === id);
}

export function getEtapa(nivel: Nivel, slug: string) {
  return nivel.etapas.find((etapa) => etapa.slug === slug);
}

/** Ubicaciones de un nivel para una etapa (o todas, si el nivel no tiene etapas). */
export function ubicacionesDe(nivel: Nivel, etapa?: string) {
  return nivel.ubicaciones.filter((ubicacion) => !etapa || ubicacion.etapas.length === 0 || ubicacion.etapas.includes(etapa));
}

/** Agrupa por categoría, en el orden de las pestañas del Campus, sin categorías vacías. */
export function agruparPorCategoria(ubicaciones: Ubicacion[]) {
  return (Object.keys(categorias) as CategoriaId[])
    .map((categoria) => ({ id: categoria, titulo: categorias[categoria], ubicaciones: ubicaciones.filter((u) => u.categoria === categoria) }))
    .filter((grupo) => grupo.ubicaciones.length > 0);
}

const plural = (n: number, singular: string, plural: string) => `${n} ${n === 1 ? singular : plural}`;

/** Qué hay, con conteos reales: "3 materiales, 1 formación y 3 juegos matemáticos". */
export function resumen(ubicaciones: Ubicacion[]) {
  const cantidad = (categoria: CategoriaId) => ubicaciones.filter((u) => u.categoria === categoria).length;
  const partes = [
    cantidad("materiales") ? plural(cantidad("materiales"), "material", "materiales") : null,
    cantidad("formaciones") ? plural(cantidad("formaciones"), "formación", "formaciones") : null,
    cantidad("juegos") ? plural(cantidad("juegos"), "juego matemático", "juegos matemáticos") : null,
  ].filter(Boolean) as string[];
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} y ${partes[partes.length - 1]}` : partes[0] ?? "";
}

/** "De 1er a 7mo grado", para niveles con grados o años. */
export function rango(nivel: Nivel) {
  if (!nivel.etapas.length) return "";
  const primero = nivel.etapas[0].nombre;
  const ultimo = nivel.etapas[nivel.etapas.length - 1].nombre;
  return `${primero.split(" ")[0]} a ${ultimo}`.replace(/^/, "De ");
}

/* ── Adaptación a los componentes de Diseño Curricular ── */

/**
 * Un recurso del Plan como fila del repositorio de las áreas: los PDF se
 * descargan (o se ven en el visor de Drive); las formaciones son páginas
 * del Campus y se abren.
 */
function comoArchivo(ubicacion: Ubicacion): ItinerarioFile {
  const { recurso } = ubicacion;
  const accion = recurso.acciones[0];
  const pagina = accion.tipo === "pagina" || accion.tipo === "aula";
  return {
    nombre: ubicacion.titulo ?? recurso.titulo,
    descripcion: pagina ? undefined : recurso.detalle,
    formato: pagina ? recurso.detalle : "PDF",
    url: accion.url,
    portada: recurso.portada,
    accion: accion.tipo === "ver" ? "ver" : pagina ? "abrir" : undefined,
  };
}

export interface CategoriaPlan {
  id: CategoriaId;
  titulo: string;
  archivos: ItinerarioFile[];
  /** Juegos Matemáticos va con las tapas, como en el Campus; el resto, como filas. */
  conPortadas: boolean;
  /** Si en este grado no hay nada: en qué grados o años sí hay ("Disponibles en 7mo grado"). */
  disponibleEn?: string;
}

/**
 * Las categorías del Campus (Materiales, Formaciones, Juegos Matemáticos)
 * de un grado o año; sin etapas, de todo el nivel. Van las que el nivel
 * tiene, aunque ese grado no tenga nada (queda sin contenido, como las
 * categorías vacías de las áreas): así el repositorio no cambia de forma al
 * pasar de grado.
 */
export function repositorioDe(nivel: Nivel, etapa?: string): CategoriaPlan[] {
  return (Object.keys(categorias) as CategoriaId[])
    .filter((categoria) => nivel.ubicaciones.some((u) => u.categoria === categoria))
    .map((categoria) => {
      const archivos = ubicacionesDe(nivel, etapa).filter((u) => u.categoria === categoria).map(comoArchivo);
      const conContenido = nivel.etapas.filter((e) => ubicacionesDe(nivel, e.slug).some((u) => u.categoria === categoria)).map((e) => e.nombre);
      return {
        id: categoria,
        titulo: categorias[categoria],
        archivos,
        conPortadas: categoria === "juegos",
        disponibleEn: !archivos.length && conContenido.length ? `Disponibles en ${conContenido.join(" y ")}` : undefined,
      };
    });
}
