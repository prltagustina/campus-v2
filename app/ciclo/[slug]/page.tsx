import { notFound } from "next/navigation";
import { cycles, orderedAreas } from "@/lib/v3-config";
import { getItinerario, type ItinerarioFile } from "@/lib/itinerarios-data";
import { CycleRepository, type CycleAreaGroup } from "@/components/v3/cycle-repository";

function filesForCycle(areaSlug: string, cycleSlug: string, gradeIds: readonly string[]) {
  const result: { category: string; gradeId: string; grade: string; file: ItinerarioFile }[] = [];
  for (const category of getItinerario(areaSlug).categorias) {
    for (const cycle of category.ciclos ?? []) {
      if (cycle.id !== cycleSlug && cycleSlug !== "septimo-grado") continue;
      for (const grade of cycle.grados) {
        if (gradeIds.includes(grade.id)) grade.files.forEach((file) => result.push({ category: category.nombre, gradeId: grade.id, grade: grade.name, file }));
      }
    }
    for (const grade of category.gradosSueltos ?? []) {
      if (gradeIds.includes(grade.id)) grade.files.forEach((file) => result.push({ category: category.nombre, gradeId: grade.id, grade: grade.name, file }));
    }
  }
  return result;
}

export default async function CycleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cycle = cycles.find((item) => item.slug === slug);
  if (!cycle) notFound();
  const groups: CycleAreaGroup[] = orderedAreas.filter((area) => area.slug !== "lenguas-extranjeras").map((area) => {
    const files = filesForCycle(area.slug, cycle.slug, cycle.gradeIds);
    return { slug: area.slug, name: area.name, color: area.color, textOnColor: area.textOnColor, grades: cycle.gradeIds.map((gradeId) => ({ id: gradeId, name: ({ "1ro": "1er grado", "2do": "2do grado", "3ro": "3er grado", "4to": "4to grado", "5to": "5to grado", "6to": "6to grado", "7mo": "7mo grado" } as Record<string, string>)[gradeId], files: files.filter((item) => item.gradeId === gradeId).map(({ category, file }) => ({ category, file })) })) };
  });
  const orderedGroups = cycle.slug === "septimo-grado"
    ? [...groups].sort((left, right) => {
        const leftCount = left.grades.reduce((sum, grade) => sum + grade.files.length, 0);
        const rightCount = right.grades.reduce((sum, grade) => sum + grade.files.length, 0);
        return Number(rightCount > 0) - Number(leftCount > 0);
      })
    : groups;
  return <CycleRepository key={cycle.slug} title={cycle.name} detail={cycle.detail} groups={orderedGroups} />;
}

export function generateStaticParams() {
  return cycles.map((cycle) => ({ slug: cycle.slug }));
}
