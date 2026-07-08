/* ─────────────────────────────────────────────
 * Itinerarios didácticos por área
 * Organizados en categorías por ciclo y grado: recursos para la docencia
 * y recursos para estudiantes.
 * (Lenguas Extranjeras se organiza por idioma, aparte.)
 * ───────────────────────────────────────────── */

export interface ItinerarioFile {
  nombre: string;
  descripcion?: string;
  formato?: string;
  size?: string;
  paginas?: number;
  url: string;
  /** Imagen de portada (primera página del PDF) pre-generada en /public/portadas. */
  portada?: string;
}

export interface ItinerarioGrado {
  id: string;
  name: string;
  files: ItinerarioFile[];
}

export interface ItinerarioCiclo {
  id: string;
  name: string;
  grados: ItinerarioGrado[];
}

export type CategoriaId = "docencia" | "estudiantes" | "articulacion";

/** Subgrupo desplegable dentro de una categoría (p. ej. Estudiantes / Docencia). */
export interface ItinerarioSubgrupo {
  id: string;
  nombre: string;
  files: ItinerarioFile[];
}

export interface ItinerarioCategoria {
  id: CategoriaId;
  nombre: string;
  descripcion?: string;
  /** Recurso general opcional (p. ej. planilla de secuencias). */
  recursoGeneral?: { nombre: string; descripcion: string; url: string };
  /** Categorías organizadas por ciclo/grado (secuencias, guías). */
  ciclos?: ItinerarioCiclo[];
  gradosSueltos?: ItinerarioGrado[];
  /** Categorías con subgrupos desplegables (articulación: estudiantes/docencia). */
  subgrupos?: ItinerarioSubgrupo[];
  /** Categorías de lista plana (anexos). */
  files?: ItinerarioFile[];
}

export interface AreaItinerario {
  categorias: ItinerarioCategoria[];
}

const PDF_BASE =
  "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/06";

const ART_BASE = "/documentos/articulacion";

/* ── Estructura base de ciclos/grados vacía (sin material aún) ── */
function ciclosVacios(): ItinerarioCiclo[] {
  return [
    {
      id: "primer-ciclo",
      name: "Primer ciclo",
      grados: [
        { id: "1ro", name: "1er Grado", files: [] },
        { id: "2do", name: "2do Grado", files: [] },
        { id: "3ro", name: "3er Grado", files: [] },
      ],
    },
    {
      id: "segundo-ciclo",
      name: "Segundo ciclo",
      grados: [
        { id: "4to", name: "4to Grado", files: [] },
        { id: "5to", name: "5to Grado", files: [] },
        { id: "6to", name: "6to Grado", files: [] },
      ],
    },
  ];
}

function septimo(files: ItinerarioFile[] = []): ItinerarioGrado[] {
  return [{ id: "7mo", name: "7mo Grado", files }];
}

/* ── Recursos para la docencia con material cargado, por área ── */
interface RecursosDocenciaArea {
  recursoGeneral?: { nombre: string; descripcion: string; url: string };
  ciclos: ItinerarioCiclo[];
  gradosSueltos?: ItinerarioGrado[];
}

const recursosDocenciaPorArea: Record<string, RecursosDocenciaArea> = {
  matematica: {
    ciclos: [
      {
        id: "primer-ciclo",
        name: "Primer ciclo",
        grados: [
          {
            id: "1ro",
            name: "1er Grado",
            files: [
              {
                nombre: "\"La enseñanza del número y del sistema de numeración\"",
                formato: "PDF",
                url: `${PDF_BASE}/matematica_1er_-grado_2026.pdf`,
                portada: "/portadas/matematica-1ro.jpg",
              },
            ],
          },
          {
            id: "2do",
            name: "2do Grado",
            files: [
              {
                nombre: "\"La enseñanza de las operaciones\"",
                formato: "PDF",
                url: `${PDF_BASE}/matematica_2do_grado_2026.pdf`,
                portada: "/portadas/matematica-2do.jpg",
              },
            ],
          },
          {
            id: "3ro",
            name: "3er Grado",
            files: [
              {
                nombre: "\"La enseñanza de la geometría\"",
                formato: "PDF",
                url: `${PDF_BASE}/matematica_3er_grado_2026.pdf`,
                portada: "/portadas/matematica-3ro.jpg",
              },
            ],
          },
        ],
      },
      {
        id: "segundo-ciclo",
        name: "Segundo ciclo",
        grados: [
          { id: "4to", name: "4to Grado", files: [] },
          { id: "5to", name: "5to Grado", files: [] },
          { id: "6to", name: "6to Grado", files: [] },
        ],
      },
    ],
    gradosSueltos: septimo(),
  },
};

/* ── Articulación primaria-secundaria, separada en estudiantes y docencia ── */
interface ArticulacionArea {
  estudiantes: ItinerarioFile[];
  docencia: ItinerarioFile[];
}

const articulacionPorArea: Record<string, ArticulacionArea> = {
  "ciencias-sociales": {
    estudiantes: [
      {
        nombre: "\"Aprender a estudiar con autonomía\"",
        descripcion: "Articulación primaria - secundaria",
        formato: "PDF",
        url: `${ART_BASE}/CienciasSociales-Estudiantes.pdf`,
        portada: "/portadas/ciencias-sociales-articulacion-estudiantes.jpg",
      },
    ],
    docencia: [
      {
        nombre: "\"Aprender a estudiar con autonomía\"",
        descripcion: "Articulación primaria - secundaria",
        formato: "PDF",
        url: `${ART_BASE}/Ciencias-Sociales-Docentes.pdf`,
        portada: "/portadas/ciencias-sociales-articulacion-docentes.jpg",
      },
    ],
  },
  "lengua-y-literatura": {
    estudiantes: [
      {
        nombre: "\"Aprender a estudiar con autonomía\"",
        descripcion: "Articulación primaria - secundaria",
        formato: "PDF",
        url: `${ART_BASE}/Lengua-y-Literatura-Estudiantes.pdf`,
        portada: "/portadas/lengua-articulacion-estudiantes.jpg",
      },
    ],
    docencia: [
      {
        nombre: "\"Aprender a estudiar con autonomía\"",
        descripcion: "Articulación primaria - secundaria",
        formato: "PDF",
        url: `${ART_BASE}/Lengua-y-Literatura-Docentes.pdf`,
        portada: "/portadas/lengua-articulacion-docentes.jpg",
      },
    ],
  },
  "ciencias-naturales": {
    estudiantes: [
      {
        nombre: "\"Aprender a estudiar con autonomía\"",
        descripcion: "Articulación primaria - secundaria",
        formato: "PDF",
        url: `${ART_BASE}/Ciencias-Naturales-Estudiantes.pdf`,
        portada: "/portadas/ciencias-naturales-articulacion-estudiantes.jpg",
      },
    ],
    docencia: [
      {
        nombre: "\"Aprender a estudiar con autonomía\"",
        descripcion: "Articulación primaria - secundaria",
        formato: "PDF",
        url: `${ART_BASE}/Ciencias-Naturales-Docentes.pdf`,
        portada: "/portadas/ciencias-naturales-articulacion-docentes.jpg",
      },
    ],
  },
};

/**
 * Devuelve el itinerario de un área dividido por categorías.
 * Las categorías sin material todavía se muestran con su estructura
 * (ciclos "Próximamente" o estado vacío) para mantener la consistencia.
 */
export function getItinerario(slug: string): AreaItinerario {
  const docencia = recursosDocenciaPorArea[slug];
  const articulacion = articulacionPorArea[slug];
  const articulacionDocencia = articulacion?.docencia ?? [];
  const articulacionEstudiantes = articulacion?.estudiantes ?? [];

  const categorias: ItinerarioCategoria[] = [
    {
      id: "docencia",
      nombre: "Recursos para docentes",
      descripcion: "Secuencias, guías y propuestas de enseñanza.",
      recursoGeneral: docencia?.recursoGeneral,
      ciclos: docencia?.ciclos ?? ciclosVacios(),
      gradosSueltos: docencia?.gradosSueltos ?? septimo(articulacionDocencia),
    },
    {
      id: "estudiantes",
      nombre: "Recursos para estudiantes",
      descripcion: "Materiales para aprender.",
      ciclos: ciclosVacios(),
      gradosSueltos: septimo(articulacionEstudiantes),
    },
  ];

  return { categorias };
}
