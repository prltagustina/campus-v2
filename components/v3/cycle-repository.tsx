"use client";

import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { SolidAreaArrow } from "@/components/v3/area-nav-link";
import { ShareResourceButton } from "@/components/v3/share-resource-button";
import type { ItinerarioFile } from "@/lib/itinerarios-data";

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

function CycleMaterialRow({
  category,
  file,
  color,
}: {
  category: string;
  file: ItinerarioFile;
  color: string;
}) {
  const meta = [
    file.formato ?? "PDF",
    file.paginas ? `${file.paginas} páginas` : null,
    file.size,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article
      className="group/material grid min-w-0 gap-3 px-4 py-4 transition-colors hover:bg-[#494963]/[.025] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:px-5 sm:py-5"
      style={{ ["--area" as string]: color }}
    >
      <a
        href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        download
        aria-label={`Descargar ${file.nombre}`}
        className="flex min-w-0 items-start gap-3"
      >
        <FileText className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} aria-hidden="true" />

        <span className="min-w-0 flex-1">
          <span
            className="block text-[9px] font-bold uppercase leading-none tracking-[.15em] sm:text-[10px]"
            style={{ color }}
          >
            {categoryLabel(category)}
          </span>
          <span className="mt-1.5 block text-[15px] font-medium leading-snug text-[#494963] text-pretty sm:text-[17px]">
            {file.nombre}
          </span>
          {file.descripcion ? (
            <span className="mt-1 block text-sm font-medium leading-relaxed text-[#494963]/60 text-pretty">
              {file.descripcion}
            </span>
          ) : null}
          <span className="mt-1 block text-xs text-[#494963]/42 sm:text-sm">{meta}</span>
        </span>
      </a>

      <div className="flex items-center justify-end gap-1 sm:shrink-0">
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          download
          aria-label={`Descargar ${file.nombre}`}
          className="inline-flex h-10 items-center justify-center gap-1.5 px-2 text-xs font-semibold text-[var(--area)] transition-colors hover:text-[#494963] sm:text-sm"
        >
          <Download className="h-4 w-4 shrink-0" />
          <span>Descargar</span>
        </a>
        <ShareResourceButton title={file.nombre} url={file.url} />
      </div>
    </article>
  );
}

function GradeRepository({
  grade,
  color,
}: {
  grade: CycleAreaGroup["grades"][number];
  color: string;
}) {
  return (
    <section className="grid border-b border-[#494963]/[.07] last:border-b-0 md:grid-cols-[9rem_minmax(0,1fr)]">
      <header className="px-4 py-4 md:px-5 md:py-5">
        <h3 className="font-display text-base font-semibold text-[#494963]">{grade.name}</h3>
      </header>
      <div className="divide-y divide-[#494963]/[.07] border-t border-[#494963]/[.07] md:border-l md:border-t-0">
        {grade.files.map(({ category, file }, index) => (
          <CycleMaterialRow
            key={`${file.url}-${index}`}
            category={category}
            file={file}
            color={color}
          />
        ))}
      </div>
    </section>
  );
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
  const contentId = `repositorio-${group.slug}`;
  const activeForeground = group.slug === "ciencias-sociales" ? "#F7FAFF" : group.textOnColor;

  return (
    <section className="[overflow-anchor:none]">
      <button
        type="button"
        onClick={onToggle}
        disabled={total === 0}
        aria-disabled={total === 0}
        aria-expanded={open}
        aria-controls={contentId}
        className={`group grid min-h-[78px] w-full grid-cols-[minmax(0,1fr)_2.5rem] items-center gap-4 px-5 py-4 text-left transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#494963] disabled:cursor-default disabled:hover:bg-transparent disabled:hover:text-[var(--area)] sm:min-h-[88px] sm:px-7 sm:py-5 ${open ? "bg-[var(--area)] text-[var(--area-active-fg)]" : "text-[var(--area)] hover:bg-[var(--area)] hover:text-[var(--area-active-fg)]"}`}
        style={{ ["--area" as string]: group.color, ["--area-active-fg" as string]: activeForeground }}
      >
        <span className="min-w-0">
          <span className="block font-display text-[1.4rem] font-medium leading-[1.05] tracking-[-.035em] text-current text-balance sm:text-[1.8rem]">
            {group.name}
          </span>
          <span className={`mt-1.5 block text-xs font-medium sm:text-[13px] ${total ? "text-current" : "text-[#494963]/45"}`}>
            {total ? `${total} ${total === 1 ? "material" : "materiales"}` : "Próximamente"}
          </span>
        </span>
        {total ? (
          <span className={`grid h-10 w-10 place-items-center text-current transition-transform duration-200 ${open ? "rotate-90" : ""}`} aria-hidden="true">
            <span className="-ml-3"><SolidAreaArrow /></span>
          </span>
        ) : (
          <span className="h-px w-4 justify-self-center bg-[#494963]/15" aria-hidden="true" />
        )}
      </button>

      {open ? (
        <div id={contentId} className="border-t border-[#494963]/[.07] [overflow-anchor:none]">
          {publishedGrades.length ? (
            <div>
              {publishedGrades.map((grade) => (
                <GradeRepository
                  key={grade.id}
                  grade={grade}
                  color={group.color}
                />
              ))}
            </div>
          ) : (
            <p className="px-6 py-6 text-sm leading-relaxed text-[#494963]/42">
              Todavía no hay materiales publicados para esta área en este ciclo.
            </p>
          )}
        </div>
      ) : null}
    </section>
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
      <header className="mx-auto max-w-5xl px-4 pb-5 pt-7 md:px-8 md:pb-7 md:pt-9">
        <div className="flex flex-col gap-3 border-b border-[#494963]/10 pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8 md:pb-8">
          <div>
            <h1 className="font-display text-[2rem] font-medium leading-none tracking-[-.04em] text-[#494963] md:text-[2.75rem]">
              {title}
            </h1>
            <p className="mt-3 text-sm text-[#494963]/50 md:text-base">{detail}</p>
          </div>
          <p className="text-xs font-semibold text-[#494963]/70 sm:shrink-0 sm:pb-0.5 sm:text-sm">
            {available} {available === 1 ? "recurso publicado" : "recursos publicados"}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 pb-12 pt-2 [overflow-anchor:none] md:px-8 md:pb-16 md:pt-3">
        <div className="divide-y divide-[#494963]/[.08] overflow-hidden rounded-[1.35rem] border border-[#494963]/[.08] bg-white" aria-label={`Repositorios de ${title}`}>
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
