// Orden de áreas para la navegación (sentido horario desde arriba en la rueda)
// Matemática, Lengua y Lit, Cs Naturales, Cs Sociales, Saberes, Ed Artística, Ed Tecnológica, Ed Física, Lenguas Ext
export const areasOrder = [0, 1, 2, 3, 8, 5, 7, 4, 6];

// Color del Marco General
export const MARCO_GENERAL_COLOR = "#494963";

// Color lila de Saberes Vidas y Mundos
export const SABERES_COLOR = "#B159A7";

// Color de enfoques transversales
export const ENFOQUE_COLOR = "#B159A7";

// Secciones de navegación
export const secciones = [
  { id: "ejes", name: "Ejes", icon: "BookOpen" },
  { id: "video", name: "Video", icon: "Video" },
  { id: "materiales", name: "Materiales", icon: "FileText" },
  { id: "formacion", name: "Formaciones Docentes", icon: "Bookmark" },
] as const;

// Grados disponibles
export const grados = [
  { id: "presentacion", name: "PRESENTACIÓN" },
  { id: "primer-grado", name: "PRIMER GRADO" },
  { id: "segundo-grado", name: "SEGUNDO GRADO" },
  { id: "tercer-grado", name: "TERCER GRADO" },
  { id: "cuarto-grado", name: "CUARTO GRADO" },
  { id: "quinto-grado", name: "QUINTO GRADO" },
  { id: "sexto-grado", name: "SEXTO GRADO" },
  { id: "septimo-grado", name: "SÉPTIMO GRADO" },
] as const;

// Enfoques transversales
export const enfoquesTransversales = [
  { id: "esi", name: "ESI" },
  { id: "ei", name: "EI" },
  { id: "eai", name: "EAI" },
  { id: "ecd", name: "ECD" },
  { id: "cdp", name: "CDP" },
] as const;

// Sub áreas por área (solo donde corresponde)
export const subAreasPorArea: Record<string, { id: string; name: string }[]> = {
  "educacion-artistica": [
    { id: "artes-visuales", name: "Artes Visuales" },
    { id: "musica", name: "M\u00fasica" },
    { id: "artes-audiovisuales", name: "Artes Audiovisuales" },
    { id: "teatro", name: "Teatro" },
    { id: "danza", name: "Danza" },
  ],
};

// Formaciones docentes por área
export const formacionesDocentes: Record<string, { titulo: string; enlaces: { nombre: string; url: string }[] }[]> = {
  "matematica": [
    {
      titulo: "Matemática",
      enlaces: [
        { nombre: "La enseñanza de la Matemática en el Primer Ciclo.", url: "#" },
        { nombre: "Resolución de problemas: estrategias y recursos.", url: "#" },
      ]
    }
  ],
  "educacion-tecnologica": [
    {
      titulo: "Educación Tecnológica",
      enlaces: [
        { nombre: "¿Ciencias de la Computación en la escuela? – Aportes para pensar su inclusión, desde la gestión escolar.", url: "#" },
        { nombre: "Desenchufados y en juego.", url: "#" },
        { nombre: "Conectados para Enseñar.", url: "#" },
      ]
    }
  ],
  "saberes-vidas-y-mundos": [
    {
      titulo: "Saberes, Vidas y Mundos",
      enlaces: [
        { nombre: "Diversificación para la Enseñanza.", url: "#" },
        { nombre: "Proyectos interdisciplinarios: planificación y evaluación.", url: "#" },
      ]
    }
  ],
};

// Tipos
export type GradoId = typeof grados[number]["id"];
export type SeccionId = typeof secciones[number]["id"];
export type EnfoqueId = typeof enfoquesTransversales[number]["id"];
