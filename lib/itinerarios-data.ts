/* ─────────────────────────────────────────────
 * Itinerarios didácticos por área
 * Estructura por ciclo y grado para todas las áreas
 * (excepto Lenguas Extranjeras, que se organiza por idioma).
 * ───────────────────────────────────────────── */

export interface ItinerarioFile {
  nombre: string;
  formato?: string;
  size?: string;
  paginas?: number;
  url: string;
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

export interface ArticulacionLink {
  nombre: string;
  descripcion: string;
  url: string;
}

export interface AreaItinerario {
  /** Recurso general (p. ej. planilla de secuencias didácticas) */
  recursoGeneral?: { nombre: string; descripcion: string; url: string };
  /** Ciclos con sus grados */
  ciclos: ItinerarioCiclo[];
  /** Grados que no se agrupan en un ciclo (p. ej. Séptimo grado) */
  gradosSueltos?: ItinerarioGrado[];
  /** Bloque "Articulación entre Primaria y Secundaria" (solo algunas áreas) */
  articulacion?: ArticulacionLink[];
}

const PDF_BASE =
  "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/06";

const ARTICULACION_URL =
  "https://campuseducativo.santafe.edu.ar/programas/modo-secundaria/articulacion-entre-primaria-y-secundaria/";

const articulacionLinks: ArticulacionLink[] = [
  {
    nombre: "Para estudiantes",
    descripcion: "Recursos de articulación dirigidos a estudiantes",
    url: ARTICULACION_URL,
  },
  {
    nombre: "Para docentes",
    descripcion: "Recursos de articulación dirigidos a la docencia",
    url: ARTICULACION_URL,
  },
];

/* Estructura base de ciclos/grados vacía (sin material aún) */
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

/* Áreas que incluyen el bloque de Articulación Primaria-Secundaria */
const areasConArticulacion = [
  "ciencias-sociales",
  "ciencias-naturales",
  "lenguas-extranjeras",
];

/* Itinerarios con material cargado */
const itinerariosCargados: Record<string, AreaItinerario> = {
  matematica: {
    recursoGeneral: {
      nombre: "Secuencias didácticas",
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

/**
 * Devuelve el itinerario de un área. Si no hay material cargado,
 * devuelve la estructura base vacía (ciclos/grados "Próximamente").
 * Agrega el bloque de articulación a las áreas que corresponda.
 */
export function getItinerario(slug: string): AreaItinerario {
  const base: AreaItinerario =
    itinerariosCargados[slug] ?? {
      ciclos: ciclosVacios(),
      gradosSueltos: septimoVacio(),
    };

  if (areasConArticulacion.includes(slug)) {
    return { ...base, articulacion: articulacionLinks };
  }

  return base;
}
