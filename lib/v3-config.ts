import { areasData } from "@/lib/areas-data";

// TODO(v3-contenido): estos textos introductorios deben validarse con el equipo editorial.
export const pendingCopy = {
  areas:
    "Explorá el diseño curricular por área y encontrá documentos de descarga, itinerarios didácticos y formaciones docentes para acompañar la enseñanza.",
  cycles:
    "Accedé a los materiales de descarga organizados según el recorrido escolar de cada ciclo de la Educación Primaria.",
  wheel: {
    transversales:
      "Los enfoques transversales atraviesan las decisiones de enseñanza y conectan los aprendizajes con desafíos contemporáneos.",
    relaciones:
      "Las áreas dialogan entre sí para construir propuestas integradas y situadas.",
    ejes:
      "Los ejes organizan los contenidos y muestran la progresión de los aprendizajes.",
    marco:
      "El Marco General reúne los fundamentos, propósitos y criterios comunes del diseño curricular.",
  },
} as const;

export const cycles = [
  {
    slug: "primer-ciclo",
    name: "Primer Ciclo",
    detail: "1°, 2° y 3° grado",
    gradeIds: ["1ro", "2do", "3ro"],
  },
  {
    slug: "segundo-ciclo",
    name: "Segundo Ciclo",
    detail: "4°, 5° y 6° grado",
    gradeIds: ["4to", "5to", "6to"],
  },
  {
    slug: "septimo-grado",
    name: "Séptimo grado",
    detail: "7° grado",
    gradeIds: ["7mo"],
  },
] as const;

export const orderedAreas = [0, 1, 2, 3, 8, 5, 7, 4, 6]
  .map((id) => areasData.find((area) => area.id === id))
  .filter((area): area is (typeof areasData)[number] => Boolean(area));
