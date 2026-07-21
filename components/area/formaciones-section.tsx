"use client";

import { ArrowUpRight, BookOpen, Monitor } from "lucide-react";
import type { Area } from "@/lib/areas-data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function FormacionesSection({ area }: { area: Area }) {
  const items = (area.teacherTrainings ?? []).flatMap((group) =>
    (group.items ?? []).map((item) => ({ ...item, group: group.name })),
  );

  return <section id="formacion" className="scroll-mt-14 lg:scroll-mt-20">
    <header className="mb-8 max-w-2xl pr-24">
      <h2 className="font-display text-3xl font-semibold tracking-[-.03em] text-[#494963] md:text-4xl">Formaciones docentes</h2>
      <p className="mt-2 text-[#494963]/50">Cursos y trayectos de formación vinculados con {area.name}.</p>
    </header>

    {items.length ? <Carousel opts={{ align: "start", containScroll: "trimSnaps" }} className="w-full" aria-label={`Formaciones docentes de ${area.name}`}>
      <CarouselContent className="items-stretch">
        {items.map((item) => <CarouselItem key={item.id} className="basis-[88%] sm:basis-1/2 xl:basis-1/3">
          <article className="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_5px_20px_rgba(73,73,99,.07)]">
            <div className="min-h-[116px] p-5" style={{ backgroundColor: area.color, color: area.textOnColor }}>
              <p className="text-[10px] font-bold uppercase tracking-[.14em] opacity-60">Formación docente</p>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{item.name}</h3>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="space-y-3 text-sm text-[#494963]/60">
                <p className="flex items-center gap-3"><Monitor className="h-4 w-4 shrink-0 text-[#494963]/30" />Campus Educativo</p>
                <p className="flex items-center gap-3"><BookOpen className="h-4 w-4 shrink-0 text-[#494963]/30" />{item.group}</p>
              </div>
              <div className="mt-auto border-t border-[#494963]/[.07] pt-4">
                {item.url ? <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: area.color }}>+ Info<ArrowUpRight className="h-3.5 w-3.5" /></a> : <span className="text-[11px] font-bold uppercase tracking-[.12em] text-[#494963]/30">Próximamente</span>}
              </div>
            </div>
          </article>
        </CarouselItem>)}
      </CarouselContent>
      <CarouselPrevious className="!left-auto !right-11 !top-[-54px] !translate-y-0 border-0 bg-white text-[#494963] shadow-sm disabled:opacity-25" />
      <CarouselNext className="!right-0 !top-[-54px] !translate-y-0 border-0 bg-white text-[#494963] shadow-sm disabled:opacity-25" />
    </Carousel> : <div className="rounded-2xl bg-white px-5 py-8 text-[#494963]/45">Las formaciones vinculadas con esta área se publicarán próximamente.</div>}
  </section>;
}
