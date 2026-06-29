/* ─────────────────────────────────────────────
 * Itinerarios didácticos por área
 * Organizados en 4 categorías: secuencias didácticas, guías para la
 * docencia, articulación primaria-secundaria y anexos.
 * Las categorías por ciclo se estructuran por ciclo y grado.
 * (Lenguas Extranjeras se organiza por idioma, aparte.)
 * ───────────────────────────────────────────── */

export interface ItinerarioFile {
  nombre: string;
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

export type CategoriaId =
  | "secuencias"
  | "guias"
  | "articulacion-estudiantes"
  | "articulacion-docencia"
  | "anexos";

export interface ItinerarioCategoria {
  id: CategoriaId;
  nombre: string;
  descripcion?: string;
  /** Recurso general opcional (p. ej. planilla de secuencias). */
  recursoGeneral?: { nombre: string; descripcion: string; url: string };
  /** Categorías organizadas por ciclo/grado (secuencias, guías). */
  ciclos?: ItinerarioCiclo[];
  gradosSueltos?: ItinerarioGrado[];
  /** Categorías de lista plana (articulación, anexos). */
  files?: ItinerarioFile[];
}

export interface AreaItinerario {
  categorias: ItinerarioCategoria[];
}

const PDF_BASE =
  "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/06";

const ART_BASE =
  "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2025/08";

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

function septimoVacio(): ItinerarioGrado[] {
  return [{ id: "7mo", name: "7mo Grado", files: [] }];
}

/* ── Secuencias didácticas con material cargado, por área ── */
interface SecuenciasArea {
  recursoGeneral?: { nombre: string; descripcion: string; url: string };
  ciclos: ItinerarioCiclo[];
  gradosSueltos?: ItinerarioGrado[];
}

const secuenciasPorArea: Record<string, SecuenciasArea> = {
  matematica: {
    recursoGeneral: {
      nombre: "Planilla de secuencias",
      descripcion: "Planilla general de secuencias",
      url: "https://docs.google.com/spreadsheets/d/1wzZBRgu58-_jMvlkIjNguKpQc9nKVIJJhdGnDEcYTFQ/edit?usp=sharing",
    },
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
                nombre: "Matemática - 1er Grado",
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
                nombre: "Matemática - 2do Grado",
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
                nombre: "Matemática - 3er Grado",
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
    gradosSueltos: septimoVacio(),
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
        nombre: "Aprender a estudiar con autonomía",
        formato: "PDF",
        url: `${ART_BASE}/CienciasSociales-Estudiantes.pdf`,
        portada: "/portadas/ciencias-sociales-articulacion-estudiantes.jpg",
      },
    ],
    docencia: [
      {
        nombre: "Aprender a estudiar con autonomía",
        formato: "PDF",
        url: `${ART_BASE}/Ciencias-Sociales-Docentes.pdf`,
        portada: "/portadas/ciencias-sociales-articulacion-docentes.jpg",
      },
    ],
  },
  "lengua-y-literatura": {
    estudiantes: [
      {
        nombre: "Aprender a estudiar con autonomía",
        formato: "PDF",
        url: `${ART_BASE}/Lengua-y-Literatura-Estudiantes.pdf`,
        portada: "/portadas/lengua-articulacion-estudiantes.jpg",
      },
    ],
    docencia: [
      {
        nombre: "Aprender a estudiar con autonomía",
        formato: "PDF",
        url: `${ART_BASE}/Lengua-y-Literatura-Docentes.pdf`,
        portada: "/portadas/lengua-articulacion-docentes.jpg",
      },
    ],
  },
  "ciencias-naturales": {
    estudiantes: [
      {
        nombre: "Aprender a estudiar con autonomía",
        formato: "PDF",
        url: `${ART_BASE}/Ciencias-Naturales-Estudiantes.pdf`,
        portada: "/portadas/ciencias-naturales-articulacion-estudiantes.jpg",
      },
    ],
    docencia: [
      {
        nombre: "Aprender a estudiar con autonomía",
        formato: "PDF",
        url: `${ART_BASE}/Ciencias-Naturales-Docentes.pdf`,
        portada: "/portadas/ciencias-naturales-articulacion-docentes.jpg",
      },
    ],
  },
};

/**
 * Devuelve el itinerario de un área dividido en sus 4 categorías.
 * Las categorías sin material todavía se muestran con su estructura
 * (ciclos "Próximamente" o estado vacío) para mantener la consistencia.
 */
export function getItinerario(slug: string): AreaItinerario {
  const secuencias = secuenciasPorArea[slug];
  const articulacion = articulacionPorArea[slug];

  const categorias: ItinerarioCategoria[] = [
    {
      id: "secuencias",
      nombre: "Secuencias didácticas",
      descripcion: "Propuestas de enseñanza organizadas por ciclo y grado.",
      recursoGeneral: secuencias?.recursoGeneral,
      ciclos: secuencias?.ciclos ?? ciclosVacios(),
      gradosSueltos: secuencias?.gradosSueltos ?? septimoVacio(),
    },
    {
      id: "guias",
      nombre: "Guías para la docencia",
      descripcion: "Orientaciones y recursos para acompañar la enseñanza.",
      ciclos: ciclosVacios(),
      gradosSueltos: septimoVacio(),
    },
    {
      id: "articulacion-estudiantes",
      nombre: "Articulación primaria – secundaria · Estudiantes",
      descripcion: "Materiales para acompañar a estudiantes en la articulación.",
      files: articulacion?.estudiantes ?? [],
    },
    {
      id: "articulacion-docencia",
      nombre: "Articulación primaria – secundaria · Docencia",
      descripcion: "Materiales para orientar la tarea docente en la articulación.",
      files: articulacion?.docencia ?? [],
    },
    {
      id: "anexos",
      nombre: "Anexos",
      descripcion: "Material complementario y de apoyo.",
      files: [],
    },
  ];

  return { categorias };
}
