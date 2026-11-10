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
  /** "ver": el enlace abre un visor (Google Drive), no descarga. "abrir": una
   * página (p. ej. una formación del Campus). Por defecto, descarga. */
  accion?: "ver" | "abrir";
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

/** Descarga directa de un archivo de Drive, como los enlaces del Campus. */
const drive = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`;

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

function ciclosConRecursos(filesPorGrado: Record<string, ItinerarioFile[]>): ItinerarioCiclo[] {
  return ciclosVacios().map((ciclo) => ({
    ...ciclo,
    grados: ciclo.grados.map((grado) => ({
      ...grado,
      files: filesPorGrado[grado.id] ?? [],
    })),
  }));
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
  // Los mismos cuadernillos, títulos, enlaces y tapas que
  // https://campuseducativo.santafe.edu.ar/diseno-curricular/matematica/
  // (relevado el 2026-11-10; tapas copiadas a /public/portadas).
  matematica: {
    ciclos: ciclosConRecursos({
      "1ro": [
      {
        nombre: "Matemática - 1er Grado Nº 1",
        formato: "PDF",
        url: drive("1J2BRX4T7iQHIfYWZS9o8VtDe9nT3stBS"),
        portada: "/portadas/matematica-1ro-n1.jpg",
      },
      {
        nombre: "Matemática - 1er Grado Nº 1.1",
        formato: "PDF",
        url: drive("13OwasVlY5ftk5O4WiWajr7Wr3UUHZ-PC"),
        portada: "/portadas/matematica-1ro-n1-1.jpg",
      },
      {
        nombre: "Matemática - 1er Grado Nº 1.2",
        formato: "PDF",
        url: drive("15qurEru4d905xrpEwohJD8QoKgLkEORR"),
        portada: "/portadas/matematica-1ro-n1-2.jpg",
      },
      {
        nombre: "Matemática - 1er Grado Nº 1.3",
        formato: "PDF",
        url: drive("1v_0NhYi4_baYUFwUaohfoHM0GfAWNt-9"),
        portada: "/portadas/matematica-1ro-n1-3.jpg",
      },
      ],
      "2do": [
      {
        nombre: "Matemática - 2do Grado Nº 1",
        formato: "PDF",
        url: drive("1Qu7v-0-hr639y-lPUMKObhi0Cv-zUn2z"),
        portada: "/portadas/matematica-2do-n1.jpg",
      },
      {
        nombre: "Matemática - 2do Grado Nº 1.1",
        formato: "PDF",
        url: drive("150oX3yGgqcZh9i5cNgp1LzmqLvQ_-GdT"),
        portada: "/portadas/matematica-2do-n1-1.jpg",
      },
      {
        nombre: "Matemática - 2do Grado Nº 1.2",
        formato: "PDF",
        url: drive("1U1-ost12lM4KfH9NKIUtyzP62aJD5hOW"),
        portada: "/portadas/matematica-2do-n1-2.jpg",
      },
      {
        nombre: "Matemática - 2do Grado Nº 1.3",
        formato: "PDF",
        url: drive("15iOlgQZ0MqCzI_OhAJoM3m_k0oY88wWJ"),
        portada: "/portadas/matematica-2do-n1-3.jpg",
      },
      ],
      "3ro": [
      {
        nombre: "Matemática - 3er Grado Nº 1",
        formato: "PDF",
        url: drive("1CPaQ5ix51Znx2wHwtE0LHSJQQ36UjUEe"),
        portada: "/portadas/matematica-3ro-n1.jpg",
      },
      {
        nombre: "Matemática - 3er Grado Nº 1.1",
        formato: "PDF",
        url: drive("1zQqYEOuqg7peGgaQBk56e-yUQB0FGnjK"),
        portada: "/portadas/matematica-3ro-n1-1.jpg",
      },
      {
        nombre: "Matemática - 3er Grado Nº 1.2",
        formato: "PDF",
        url: drive("1AuOy1595Sf_vS3FfNMgm50OCC5RbFx-t"),
        portada: "/portadas/matematica-3ro-n1-2.jpg",
      },
      {
        nombre: "Matemática - 3er Grado Nº 1.3",
        formato: "PDF",
        url: drive("1GWvboZKJ5Ny4-4X4HNY62SaILmdUhzJT"),
        portada: "/portadas/matematica-3ro-n1-3.jpg",
      },
      ],
      "4to": [
      {
        nombre: "Matemática - 4to Grado Nº 1",
        formato: "PDF",
        url: drive("1ZZfsiaFI5JKqiGVyEpe4QFuXMoQhimkR"),
        portada: "/portadas/matematica-4to-n1.jpg",
      },
      {
        nombre: "Matemática - 4to Grado Nº 1.1",
        formato: "PDF",
        url: drive("17WwKtbcqZKW7d1Lc7KRxkPBdIguf3bwA"),
        portada: "/portadas/matematica-4to-n1-1.jpg",
      },
      ],
      "5to": [
      {
        nombre: "Matemática - 5to Grado Nº 1",
        formato: "PDF",
        url: drive("11XhHm-LcGDG-pEgbiXbSOPjS7IodiyYf"),
        portada: "/portadas/matematica-5to-n1.jpg",
      },
      {
        nombre: "Matemática - 5to Grado Nº 1.1",
        formato: "PDF",
        url: drive("1rieZYFnMbiqFkrJcT9WvMh9VjQXLV5OH"),
        portada: "/portadas/matematica-5to-n1-1.jpg",
      },
      ],
      "6to": [
      {
        nombre: "Matemática - 6to Grado Nº 1",
        formato: "PDF",
        url: drive("1vRjsPSLehexGFy0iCXt2SJlWMl2fRySQ"),
        portada: "/portadas/matematica-6to-n1.png",
      },
      {
        nombre: "Matemática - 6to Grado Nº 1.1",
        formato: "PDF",
        url: drive("1WqZD4iVrTnU6B6keafcYFJrdqYKHgMBl"),
        portada: "/portadas/matematica-6to-n1-1.jpg",
      },
      ],
    }),
    gradosSueltos: septimo([
      {
        nombre: "Matemática - 7mo Grado Nº 1",
        formato: "PDF",
        url: drive("17MOt0A5732BfzMknguoMHcyQIPvXDHaL"),
        portada: "/portadas/matematica-7mo-n1.png",
      },
      {
        nombre: "Matemática - 7mo Grado Nº 1.1",
        formato: "PDF",
        url: drive("1niXQ-j5cDkEJFZq4eoSK4IBNw5Ugmg9A"),
        portada: "/portadas/matematica-7mo-n1-1.jpg",
      },
    ]),
  },
  "ciencias-sociales": {
    // Secuencia de 4to grado, publicada en el Campus (pendiente desde agosto).
    ciclos: ciclosConRecursos({
      "4to": [
        {
          nombre: "\"¡Viajamos al pasado! Descubrimos la Santa Fe Colonial\"",
          formato: "PDF",
          url: drive("11TlMYCOOEPJhlgy7H_fvgJrivIzWFeCh"),
          portada: "/portadas/ciencias-sociales-4to.jpg",
        },
      ],
    }),
    gradosSueltos: septimo(),
  },
  "ciencias-naturales": {
    ciclos: ciclosConRecursos({
      "5to": [
        {
          nombre: "“Alimentos en escena: ciencia y salud en nuestra mesa”",
          formato: "PDF",
          size: "26 MB",
          paginas: 22,
          url: "/documentos/secuencias/secuencia-ciencias-naturales-5to-grado.pdf",
          portada: "/portadas/ciencias-naturales-5to.jpg",
        },
      ],
    }),
    gradosSueltos: septimo(),
  },
  "educacion-fisica": {
    ciclos: ciclosConRecursos({
      "1ro": [
        {
          nombre: "“Misión misteriosa: actividades lúdicas para sentir, pensar, hacer y compartir”",
          formato: "PDF",
          size: "1.7 MB",
          paginas: 25,
          url: "/documentos/secuencias/secuencia-educacion-fisica-1er-grado.pdf",
          portada: "/portadas/educacion-fisica-1ro.jpg",
        },
      ],
      "4to": [
        {
          nombre: "“Jugando Ando”",
          formato: "PDF",
          url: drive("1GTvTd-FfdM8iia97pH5YY1HZoBna3O_t"),
          portada: "/portadas/educacion-fisica-4to.jpg",
        },
      ],
    }),
    gradosSueltos: septimo(),
  },
  "educacion-artistica": {
    ciclos: ciclosConRecursos({
      "1ro": [
        {
          nombre: "“Arte en todas partes: exploración de las formas y espacios \"con ojos de artista\"”",
          descripcion: "Artes Visuales",
          formato: "PDF",
          size: "39 MB",
          paginas: 27,
          url: "/documentos/secuencias/secuencia-artes-visuales-1er-grado.pdf",
          portada: "/portadas/artes-visuales-1ro.jpg",
        },
      ],
      "5to": [
        {
          nombre: "“Entre tierra, mate y chamamé: el Litoral argentino desde sus músicas”",
          descripcion: "Música",
          formato: "PDF",
          size: "0.8 MB",
          paginas: 27,
          url: "/documentos/secuencias/secuencia-musica-5to-grado.pdf",
          portada: "/portadas/musica-5to.jpg",
        },
      ],
    }),
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
        size: "1.4 MB",
        paginas: 39,
        url: `${ART_BASE}/CienciasSociales-Estudiantes.pdf`,
        portada: "/portadas/ciencias-sociales-articulacion-estudiantes.jpg",
      },
    ],
    docencia: [
      {
        nombre: "\"Aprender a estudiar con autonomía\"",
        descripcion: "Articulación primaria - secundaria",
        formato: "PDF",
        size: "0.7 MB",
        paginas: 12,
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
        size: "2.2 MB",
        paginas: 36,
        url: `${ART_BASE}/Lengua-y-Literatura-Estudiantes.pdf`,
        portada: "/portadas/lengua-articulacion-estudiantes.jpg",
      },
    ],
    docencia: [
      {
        nombre: "\"Aprender a estudiar con autonomía\"",
        descripcion: "Articulación primaria - secundaria",
        formato: "PDF",
        size: "0.6 MB",
        paginas: 9,
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
        size: "2.3 MB",
        paginas: 43,
        url: `${ART_BASE}/Ciencias-Naturales-Estudiantes.pdf`,
        portada: "/portadas/ciencias-naturales-articulacion-estudiantes.jpg",
      },
    ],
    docencia: [
      {
        nombre: "\"Aprender a estudiar con autonomía\"",
        descripcion: "Articulación primaria - secundaria",
        formato: "PDF",
        size: "0.7 MB",
        paginas: 10,
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
 *
 * "Articulación Primaria-Secundaria" es una categoría propia (no se mezcla
 * dentro del 7mo grado de docencia/estudiantes), con sus dos subgrupos
 * de siempre: recursos para la docencia y recursos para los estudiantes.
 */
/* ── SIMULACIÓN TEMPORAL (QA visual) ──────────────────────────────────
 * Rellena con placeholders las categorías/grados que todavía no tienen
 * material real, para ver el diseño con todo "pintado". Revertir después
 * de la revisión visual - no es contenido real. */
const SIMULATE_ALL_FILLED = false;

function placeholderFile(label: string): ItinerarioFile {
  return {
    nombre: `"${label}"`,
    formato: "PDF",
    paginas: 32,
    size: "4.2 MB",
    url: "#",
  };
}

// SIMULACIÓN TEMPORAL #2: además de rellenar lo vacío, suma archivos extra
// a cada grado (tenga o no material real), para decidir si conviene
// expandir todo por default o dar la opción de colapsar con varios
// documentos por nivel. Revertir junto con SIMULATE_ALL_FILLED.
const SIMULATE_MULTIPLE_FILES_PER_LEVEL = false;

function conVariosArchivos(files: ItinerarioFile[], gradoName: string): ItinerarioFile[] {
  // Solo en grados sin material real: al lado de materiales reales (con sus
  // tapas del Campus) el relleno confundía.
  if (!SIMULATE_MULTIPLE_FILES_PER_LEVEL || files.some((file) => file.url !== "#")) return files;
  const extras = ["Guía complementaria", "Secuencia didáctica adicional"];
  return [...files, ...extras.map((extra) => placeholderFile(`${extra} - ${gradoName}`))];
}

function simularCiclos(ciclos: ItinerarioCiclo[]): ItinerarioCiclo[] {
  return ciclos.map((ciclo) => ({
    ...ciclo,
    grados: ciclo.grados.map((grado) => ({
      ...grado,
      files: conVariosArchivos(grado.files.length ? grado.files : [placeholderFile(`Propuesta de enseñanza - ${grado.name}`)], grado.name),
    })),
  }));
}

function simularGradosSueltos(grados: ItinerarioGrado[]): ItinerarioGrado[] {
  return grados.map((grado) => ({
    ...grado,
    files: conVariosArchivos(grado.files.length ? grado.files : [placeholderFile(`Propuesta de enseñanza - ${grado.name}`)], grado.name),
  }));
}

export function getItinerario(slug: string): AreaItinerario {
  const docencia = recursosDocenciaPorArea[slug];
  const articulacion = articulacionPorArea[slug];

  // Articulación: si ya hay materiales, el conteo ("N materiales") no debe
  // repetirse en la bajada; si todavía no hay, la bajada los nombra.
  const articulacionTieneMateriales =
    (articulacion?.docencia.length ?? 0) + (articulacion?.estudiantes.length ?? 0) > 0;

  let docenciaCiclos = docencia?.ciclos ?? ciclosVacios();
  let docenciaGradosSueltos = docencia?.gradosSueltos ?? septimo();
  let estudiantesCiclos = ciclosVacios();
  let estudiantesGradosSueltos = septimo();
  let articulacionDocencia = articulacion?.docencia ?? [];
  let articulacionEstudiantes = articulacion?.estudiantes ?? [];

  if (SIMULATE_ALL_FILLED) {
    docenciaCiclos = simularCiclos(docenciaCiclos);
    docenciaGradosSueltos = simularGradosSueltos(docenciaGradosSueltos);
    estudiantesCiclos = simularCiclos(estudiantesCiclos);
    estudiantesGradosSueltos = simularGradosSueltos(estudiantesGradosSueltos);
    if (!articulacionDocencia.length) articulacionDocencia = [placeholderFile("Aprender a estudiar con autonomía")];
    if (!articulacionEstudiantes.length) articulacionEstudiantes = [placeholderFile("Aprender a estudiar con autonomía")];
  }

  const categorias: ItinerarioCategoria[] = [
    {
      id: "docencia",
      nombre: "Recursos para docentes",
      descripcion: "Secuencias, guías y propuestas de enseñanza.",
      recursoGeneral: docencia?.recursoGeneral,
      ciclos: docenciaCiclos,
      gradosSueltos: docenciaGradosSueltos,
    },
    {
      id: "estudiantes",
      nombre: "Recursos para estudiantes",
      descripcion: "Materiales para aprender.",
      ciclos: estudiantesCiclos,
      gradosSueltos: estudiantesGradosSueltos,
    },
    {
      id: "articulacion",
      nombre: "Articulación Primaria-Secundaria",
      descripcion: articulacionTieneMateriales || SIMULATE_ALL_FILLED
        ? "Para acompañar el pasaje a la escuela secundaria."
        : "Materiales para acompañar el pasaje a la escuela secundaria.",
      subgrupos: [
        { id: "docencia", nombre: "Recursos para la docencia", files: articulacionDocencia },
        { id: "estudiantes", nombre: "Recursos para los estudiantes", files: articulacionEstudiantes },
      ],
    },
  ];

  return { categorias };
}
