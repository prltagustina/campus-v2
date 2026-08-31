import { areasData } from "@/lib/areas-data";

// TODO(v3-contenido): estos textos introductorios deben validarse con el equipo editorial.
export const pendingCopy = {
  areas:
    "Explorá el diseño curricular por área y encontrá materiales y recursos didácticos, así como formaciones para acompañar tus prácticas de enseñanza.",
  cycles:
    "Accedé a los materiales de descarga organizados según el recorrido escolar de cada ciclo de la Educación Primaria.",
  wheel: {
    // Sin uso en la pestaña de la trama curricular por ahora (ver curricular-wheel.tsx):
    // se conserva el contenido porque puede cumplir otra función más adelante.
    transversales:
      "proponen posicionamientos que permiten resignificar los contenidos de todas las áreas.",
    relaciones:
      "A partir de principios pedagógico-didácticos comunes, las áreas dialogan entre sí y con los enfoques transversales.",
    ejes:
      "En las áreas, los ejes organizan los contenidos de manera interrelacionada.",
    marco:
      "El Marco General reúne las finalidades, los fundamentos y las recomendaciones generales del diseño curricular.",
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
