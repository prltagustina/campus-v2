"use client";

import { useState } from "react";
import type { ItinerarioFile } from "@/lib/itinerarios-data";
import { RepositoryAccordionGroup, RepositoryFileGroup } from "@/components/v3/repository-accordion";

export interface CycleAreaGroup {
  slug: string;
  name: string;
  color: string;
  textOnColor: string;
  grades: { id: string; name: string; files: { category: string; file: ItinerarioFile }[] }[];
}

function materialCount(group: CycleAreaGroup) {
  return group.grades.reduce((sum, grade) => sum + grade.files.length, 0);
}

function categoryLabel(category: string) {
  if (category === "Recursos para docentes") return "Docentes";
  if (category === "Recursos para estudiantes") return "Alumnos";
  return category;
}

function AreaRepository({
  group,
  open,
  onToggle,
}: {
  group: CycleAreaGroup;
  open: boolean;
  onToggle: () => void;
}) {
  const total = materialCount(group);
  const publishedGrades = group.grades.filter((grade) => grade.files.length > 0);
  const activeForeground = group.slug === "ciencias-sociales" ? "#F7FAFF" : group.textOnColor;

  return (
    <RepositoryAccordionGroup
      id={group.slug}
      title={group.name}
      total={total}
      color={group.color}
      activeForeground={activeForeground}
      open={open}
      onToggle={onToggle}
    >
      {publishedGrades.length ? (
        <div>
          {publishedGrades.map((grade) => (
            <RepositoryFileGroup
              key={grade.id}
              label={grade.name}
              files={grade.files.map(({ category, file }) => ({ label: categoryLabel(category), file }))}
              color={group.color}
            />
          ))}
        </div>
      ) : (
        <p className="px-6 py-6 text-sm leading-relaxed text-[#494963]/42">
          Todavía no hay materiales publicados para esta área en este ciclo.
        </p>
      )}
    </RepositoryAccordionGroup>
  );
}

export function CycleRepository({
  title,
  detail,
  groups,
}: {
  title: string;
  detail: string;
  groups: CycleAreaGroup[];
}) {
  const available = groups.reduce((sum, group) => sum + materialCount(group), 0);
  const [openAreas, setOpenAreas] = useState<Set<string>>(() => new Set());

  const toggleArea = (slug: string) => {
    setOpenAreas((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <div className="min-h-full bg-[#F7F7F9] [overflow-anchor:none]">
      <header className="mx-auto max-w-5xl px-4 pb-5 pt-10 md:px-8 md:pb-7 md:pt-14">
        <div className="mb-10 flex h-[10px] w-full overflow-hidden" aria-hidden="true">
          {groups.map((group) => {
            const isActiveSegment = openAreas.size === 0 || openAreas.has(group.slug);
            return (
              <span
                key={group.slug}
                className="h-full flex-1 transition-[opacity,filter] duration-200"
                style={{
                  backgroundColor: group.color,
                  opacity: isActiveSegment ? 1 : 0.35,
                  filter: isActiveSegment ? "none" : "grayscale(1)",
                }}
              />
            );
          })}
        </div>
        <div className="flex flex-col gap-3 border-b border-[#494963]/10 pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8 md:pb-8">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-[-.035em] text-[#494963] md:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-3 text-sm text-[#494963]/50 md:text-base">{detail}</p>
          </div>
          <p className="text-xs font-semibold text-[#494963]/70 sm:shrink-0 sm:pb-0.5 sm:text-sm">
            {available} {available === 1 ? "recurso publicado" : "recursos publicados"}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl pb-12 pt-2 [overflow-anchor:none] md:px-8 md:pb-16 md:pt-3">
        <div className="divide-y divide-[#494963]/[.08] overflow-hidden border-y border-[#494963]/[.08] bg-white md:rounded-[1.35rem] md:border-x" aria-label={`Repositorios de ${title}`}>
          {groups.map((group) => (
            <AreaRepository
              key={group.slug}
              group={group}
              open={openAreas.has(group.slug)}
              onToggle={() => toggleArea(group.slug)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
