"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, Download, FileText } from "lucide-react";
import { ShareResourceButton } from "@/components/v3/share-resource-button";
import type { ItinerarioFile } from "@/lib/itinerarios-data";

export interface CycleAreaGroup {
  slug: string;
  name: string;
  color: string;
  textOnColor: string;
  grades: { id: string; name: string; files: { category: string; file: ItinerarioFile }[] }[];
}

function CycleMaterialRow({
  category,
  file,
  color,
  textOnColor,
}: {
  category: string;
  file: ItinerarioFile;
  color: string;
  textOnColor: string;
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
      className="group/material flex flex-col gap-3 px-2 py-4 transition-colors hover:bg-[#F8F8FA] sm:flex-row sm:items-center sm:gap-5 sm:px-4 sm:py-5 lg:gap-6 lg:px-5"
      style={{ ["--area" as string]: color, ["--area-fg" as string]: textOnColor }}
    >
      <a
        href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        download
        aria-label={`Descargar ${file.nombre}`}
        className="flex w-full min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-5 lg:gap-6"
      >
        <span className="relative aspect-[600/848] w-[84px] shrink-0 overflow-hidden rounded-md border border-[#494963]/10 bg-[#F3F3F5] shadow-sm sm:w-28 lg:w-36">
          {file.portada ? (
            <Image
              src={file.portada}
              alt=""
              fill
              sizes="(min-width: 1024px) 144px, (min-width: 640px) 112px, 84px"
              loading="lazy"
              className="object-contain"
            />
          ) : (
            <span className="grid h-full place-items-center">
              <FileText className="h-6 w-6 text-[#494963]/25" />
            </span>
          )}
        </span>

        <span className="min-w-0 flex-1 pt-0.5 sm:pt-0">
          <span
            className="inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase leading-none tracking-[.1em]"
            style={{ color, backgroundColor: `${color}12` }}
          >
            {category}
          </span>
          <span className="mt-2 block text-[15px] font-medium leading-snug text-[#494963] text-pretty sm:text-lg lg:text-xl">
            {file.nombre}
          </span>
          {file.descripcion ? (
            <span className="mt-1 block text-sm font-medium leading-relaxed text-[#494963]/65 text-pretty sm:text-base">
              {file.descripcion}
            </span>
          ) : null}
          <span className="mt-1 block text-sm text-[#494963]/45 sm:text-base">{meta}</span>
        </span>
      </a>

      <div className="flex w-full items-center justify-end gap-1.5 pl-[96px] sm:w-auto sm:shrink-0 sm:justify-start sm:gap-2 sm:pl-0">
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          download
          aria-label={`Descargar ${file.nombre}`}
          className="inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full border border-[var(--area)] px-3 text-sm font-semibold text-[var(--area)] transition-colors group-hover/material:bg-[var(--area)] group-hover/material:text-[var(--area-fg)] sm:h-auto sm:w-auto sm:flex-none sm:px-4 sm:py-2.5 sm:text-base"
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
  textOnColor,
  open,
  onToggle,
}: {
  grade: CycleAreaGroup["grades"][number];
  color: string;
  textOnColor: string;
  open: boolean;
  onToggle: () => void;
}) {
  const count = grade.files.length;
  const contentId = `grado-${grade.id}-materiales`;

  return (
    <section className="overflow-hidden rounded-2xl border border-[#494963]/[.08] bg-white shadow-[0_3px_14px_rgba(73,73,99,.04)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={contentId}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-[#FAFAFB] sm:px-6 sm:py-5"
      >
        <span className="min-w-0">
          <b className="block text-base leading-snug text-[#494963] sm:text-lg">{grade.name}</b>
          <small
            className="mt-0.5 block text-sm font-semibold sm:text-base"
            style={{ color: count ? color : "rgba(73,73,99,.3)" }}
          >
            {count ? `${count} ${count === 1 ? "material disponible" : "materiales disponibles"}` : "Próximamente"}
          </small>
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#494963]/30 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div id={contentId} className="border-t border-[#494963]/[.07] px-2 pb-2 [overflow-anchor:none] sm:px-3 sm:pb-3">
          {count ? (
            <div className="divide-y divide-[#494963]/[.07]">
              {grade.files.map(({ category, file }, index) => (
                <CycleMaterialRow
                  key={`${file.url}-${index}`}
                  category={category}
                  file={file}
                  color={color}
                  textOnColor={textOnColor}
                />
              ))}
            </div>
          ) : (
            <p className="px-3 py-6 text-sm leading-relaxed text-[#494963]/40 sm:px-4">
              Todavía no hay materiales publicados para este grado.
            </p>
          )}
        </div>
      ) : null}
    </section>
  );
}

function materialCount(group: CycleAreaGroup) {
  return group.grades.reduce((sum, grade) => sum + grade.files.length, 0);
}

function AreaMenu({
  groups,
  selectedGroup,
  onSelect,
}: {
  groups: CycleAreaGroup[];
  selectedGroup: CycleAreaGroup;
  onSelect: (slug: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const selectedTotal = materialCount(selectedGroup);

  return (
    <div ref={menuRef} className="relative ml-auto w-[72%] min-w-0 max-w-[320px] flex-none">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls="menu-areas-del-ciclo"
        className="flex min-h-10 w-full items-center justify-between gap-3 rounded-lg px-3.5 py-2 text-left transition-[filter] hover:brightness-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#494963]"
        style={{ backgroundColor: selectedGroup.color, color: selectedGroup.textOnColor }}
      >
        <span className="min-w-0 truncate text-sm font-semibold leading-tight sm:text-[15px]">{selectedGroup.name}</span>
        <span className="sr-only">{selectedTotal ? `${selectedTotal} ${selectedTotal === 1 ? "material" : "materiales"}` : "Próximamente"}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open ? (
        <div
          id="menu-areas-del-ciclo"
          role="listbox"
          aria-label="Áreas del ciclo"
          className="absolute inset-x-0 top-[calc(100%+.4rem)] z-50 max-h-[min(410px,55dvh)] overflow-y-auto rounded-xl border border-[#494963]/10 bg-white p-1 shadow-[0_10px_28px_rgba(35,35,55,.14)]"
        >
          {groups.map((group) => {
            const selected = group.slug === selectedGroup.slug;
            const total = materialCount(group);
            return (
              <button
                key={group.slug}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onSelect(group.slug);
                  setOpen(false);
                }}
                className="flex min-h-10 w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#494963]"
                style={{
                  backgroundColor: selected ? group.color : "transparent",
                  color: selected ? group.textOnColor : "#494963",
                }}
              >
                <b className="min-w-0 flex-1 truncate text-sm font-semibold leading-tight">{group.name}</b>
                <span className="flex shrink-0 items-center gap-2">
                  <small className={`text-[10px] font-semibold ${selected ? "opacity-70" : "opacity-40"}`}>
                    {total ? `${total} ${total === 1 ? "material" : "materiales"}` : "Próximamente"}
                  </small>
                  {selected ? <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> : null}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function AreaRepository({ group }: { group: CycleAreaGroup }) {
  const total = materialCount(group);
  const initialGrades = group.grades.filter((grade) => grade.files.length > 0).map((grade) => grade.id);
  const [openGrades, setOpenGrades] = useState<Set<string>>(
    () => new Set(initialGrades.length > 0 ? initialGrades : group.grades[0]?.id ? [group.grades[0].id] : []),
  );

  const toggleGrade = (gradeId: string) => {
    setOpenGrades((current) => {
      const next = new Set(current);
      if (next.has(gradeId)) next.delete(gradeId);
      else next.add(gradeId);
      return next;
    });
  };

  return (
    <section id={`repositorio-${group.slug}`} className="scroll-mt-24 [overflow-anchor:none]">
      <header className="mb-4 text-left sm:mb-5">
        <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#494963]/40">Repositorio del área</p>
        <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="font-display text-xl font-semibold tracking-[-.025em] text-[#494963] sm:text-2xl">
            {group.name}
          </h2>
          <p className="basis-full text-xs font-medium text-[#494963]/45 sm:basis-auto sm:text-right">
            {total ? `${total} ${total === 1 ? "material disponible" : "materiales disponibles"}` : "Sin publicaciones todavía"}
          </p>
        </div>
      </header>

      <div className="space-y-3">
        {group.grades.map((grade) => (
          <GradeRepository
            key={grade.id}
            grade={grade}
            color={group.color}
            textOnColor={group.textOnColor}
            open={openGrades.has(grade.id)}
            onToggle={() => toggleGrade(grade.id)}
          />
        ))}
      </div>
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
  const available = groups.reduce(
    (sum, group) => sum + group.grades.reduce((gradeSum, grade) => gradeSum + grade.files.length, 0),
    0,
  );
  const defaultGroup = groups.find((group) => materialCount(group) > 0)
    ?? groups.find((group) => group.slug === "matematica")
    ?? groups[0];
  const [selectedSlug, setSelectedSlug] = useState(defaultGroup?.slug ?? "");
  const selectedGroup = groups.find((group) => group.slug === selectedSlug) ?? defaultGroup;

  useEffect(() => {
    const scrollRoot = document.getElementById("contenido");
    if (!scrollRoot || !selectedGroup) return;

    const previousColor = scrollRoot.style.getPropertyValue("--section-scrollbar");
    scrollRoot.style.setProperty("--section-scrollbar", selectedGroup.color);

    return () => {
      if (previousColor) scrollRoot.style.setProperty("--section-scrollbar", previousColor);
      else scrollRoot.style.removeProperty("--section-scrollbar");
    };
  }, [selectedGroup]);

  return (
    <div className="min-h-full bg-[#F7F7F9] [overflow-anchor:none]">
      {selectedGroup ? (
        <div className="sticky top-[110px] z-20 border-b border-white/10 bg-[#494963] text-white xl:top-0">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5 md:px-8">
            <span className="shrink-0 text-sm font-semibold text-white/80 sm:text-[15px]">Área</span>
            <AreaMenu groups={groups} selectedGroup={selectedGroup} onSelect={setSelectedSlug} />
          </div>
        </div>
      ) : null}

      <header className="mx-auto max-w-5xl px-4 pb-5 pt-6 md:px-8 md:pb-7 md:pt-7">
        <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#494963]/40">Materiales por ciclo</p>
        <h1 className="mt-2 font-display text-[2rem] font-semibold leading-none tracking-[-.04em] text-[#494963] md:mt-3 md:text-5xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-[#494963]/55 md:mt-3 md:text-lg">
          {detail} · {available} {available === 1 ? "recurso publicado" : "recursos publicados"}
        </p>
      </header>

      <div className="mx-auto max-w-5xl px-4 pb-10 pt-6 [overflow-anchor:none] md:px-8 md:pb-14 md:pt-8">
        {selectedGroup ? (
          <div className="[overflow-anchor:none]">
            <AreaRepository key={selectedGroup.slug} group={selectedGroup} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
