"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MapPinned,
  Users,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AreasMaterialsIcon } from "@/components/v3/navigation-icons";
import {
  territorioCategories,
  territorioEvents,
  type TerritorioCategory,
  type TerritorioEvent,
} from "@/lib/territorio-data";

type CategoryStyle = { accent: string; onAccent: string; soft: string };

const categoryStyles: Record<TerritorioCategory, CategoryStyle> = {
  "Marco general": { accent: "#494963", onAccent: "#ffffff", soft: "#E8E8EE" },
  Matemática: { accent: "#E42153", onAccent: "#ffffff", soft: "#FCE3EA" },
  "Lengua y Literatura": { accent: "#FF7402", onAccent: "#ffffff", soft: "#FFF0E2" },
  "Ciencias Naturales": { accent: "#78BB0B", onAccent: "#ffffff", soft: "#ECF6DC" },
  "Ciencias Sociales": { accent: "#99CCFF", onAccent: "#1A3A5C", soft: "#E7F3FF" },
  "Saberes, Vidas y Mundos": { accent: "#B159A7", onAccent: "#ffffff", soft: "#F2E5F0" },
  "Educación Artística": { accent: "#FF6D7E", onAccent: "#ffffff", soft: "#FFE7EA" },
  "Educación Tecnológica": { accent: "#3C3AE5", onAccent: "#ffffff", soft: "#E8E8FC" },
  "Educación Física": { accent: "#20BAA1", onAccent: "#ffffff", soft: "#DDF6F2" },
  "Lenguas Extranjeras": { accent: "#FFCB02", onAccent: "#5C4A00", soft: "#FFF5C7" },
};

const allCategoriesStyle: CategoryStyle = { accent: "#494963", onAccent: "#ffffff", soft: "#E8E8EE" };
const territoryGradientImage = 'url("/images/territorio/barra-degrade-territorio.png")';
const PROXIMAS_PERIOD = "Próximas acciones";

function EventGallery({ event }: { event: TerritorioEvent }) {
  const [activePhoto, setActivePhoto] = useState(0);
  const photos = event.photos ?? [];

  function showPhoto(index: number) {
    setActivePhoto((index + photos.length) % photos.length);
  }

  if (!photos.length) {
    return (
      <div className="relative grid min-h-40 place-items-center bg-[#ECECF1] text-[#494963]/30">
        <MapPinned className="h-16 w-16" strokeWidth={1.25} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-[#ECECF1]">
      <div
        className="flex transition-transform duration-400 ease-out"
        style={{ transform: `translateX(-${activePhoto * 100}%)` }}
      >
        {photos.map((photo) => (
          <div key={photo.src} className="relative aspect-[16/9] w-full shrink-0">
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 767px) 100vw, 768px" className="object-cover" />
          </div>
        ))}
      </div>
      {photos.length > 1 ? (
        <div className="absolute inset-x-4 bottom-6 flex items-center justify-between">
          <span className="rounded-full bg-[#494963]/85 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm">{activePhoto + 1} / {photos.length}</span>
          <div className="flex gap-2">
            <button type="button" onClick={() => showPhoto(activePhoto - 1)} aria-label="Foto anterior" className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#494963] shadow-md"><ChevronLeft className="h-4 w-4" /></button>
            <button type="button" onClick={() => showPhoto(activePhoto + 1)} aria-label="Foto siguiente" className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#494963] shadow-md"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function TerritoryStamp({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/territorio/sello-en-territorio.png"
      alt=""
      width={231}
      height={231}
      className={`pointer-events-none absolute z-[2] object-contain ${className}`}
      aria-hidden="true"
    />
  );
}

function getCompactDate(event: TerritorioEvent) {
  if (event.pendingDate) return event.dateLabel;
  const [, month, day] = event.sortDate.split("-");
  return `${day}/${month}`;
}

function EventCard({ event }: { event: TerritorioEvent }) {
  const categoryStyle = categoryStyles[event.category];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group flex h-full w-full max-w-none shrink-0 flex-col overflow-hidden bg-white text-left shadow-[0_8px_26px_rgba(73,73,99,.11)] transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(73,73,99,.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#494963] focus-visible:ring-offset-2"
          aria-label={`Ver más sobre ${event.title}`}
        >
          <div className="h-7 w-full lg:h-9" style={{ backgroundColor: categoryStyle.accent }} aria-hidden="true" />
          <div className="relative aspect-[16/10] w-full overflow-hidden" style={{ backgroundColor: categoryStyle.soft }}>
            {event.photos?.[0] ? (
              <Image src={event.photos[0].src} alt="" fill sizes="(max-width: 640px) 82vw, 300px" className="object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
            ) : (
              <div className="absolute inset-0 grid place-items-center" style={{ color: categoryStyle.accent }}>
                <MapPinned className="h-16 w-16 opacity-30" strokeWidth={1.2} aria-hidden="true" />
              </div>
            )}
            {event.pendingDate ? <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[.09em] text-[#494963]">En agenda</span> : null}
          </div>

          <div className="relative flex min-h-[205px] flex-1 flex-col px-5 pb-5 pt-4 lg:min-h-[250px] lg:px-7 lg:pb-7 lg:pt-6" style={{ backgroundColor: categoryStyle.accent, color: categoryStyle.onAccent }}>
            <TerritoryStamp className="-top-7 right-4 h-20 w-20 lg:-top-8 lg:right-5 lg:h-24 lg:w-24" />
            <div className="relative z-[1] space-y-1 text-[15px] font-medium leading-tight lg:text-[18px] lg:space-y-2 xl:text-[19px]">
              <p className="flex items-center gap-2"><CalendarDays className="h-[17px] w-[17px] shrink-0 lg:h-5 lg:w-5" strokeWidth={2.4} aria-hidden="true" />{getCompactDate(event)}</p>
              <p className="flex items-center gap-2 text-lg font-extrabold lg:text-2xl"><MapPin className="h-[18px] w-[18px] shrink-0 lg:h-6 lg:w-6" strokeWidth={2.7} aria-hidden="true" />{event.place}</p>
            </div>
            <p className="relative z-[1] mt-3 max-w-[92%] text-[11px] font-medium leading-[1.35] lg:mt-4 lg:text-sm lg:leading-[1.5]"><span className="font-extrabold">{event.title}.</span> {event.summary}</p>
            <p className="relative z-[1] mt-auto max-w-[94%] pt-3 text-[10px] font-bold leading-[1.35] lg:pt-4 lg:text-xs">Participación de: {event.team.join(", ")}.</p>
            <span className="sr-only">Ver más</span>
          </div>
          <span className="h-1.5 w-full bg-cover bg-center" style={{ backgroundImage: territoryGradientImage }} aria-hidden="true" />
        </button>
      </DialogTrigger>

      <DialogContent
        className="v3-scroll-theme max-h-[92vh] max-w-[860px] gap-0 overflow-y-auto rounded-none border-0 bg-white p-0 shadow-[0_24px_80px_rgba(30,30,48,.28)]"
        style={{ ["--section-scrollbar" as string]: categoryStyle.accent }}
        showCloseButton={false}
      >
        <DialogClose className="absolute left-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white text-[#494963] shadow-md transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#494963]" aria-label="Cerrar">
          <X className="h-5 w-5" aria-hidden="true" />
        </DialogClose>
        <EventGallery event={event} />
        <div className="relative p-5 sm:p-8" style={{ backgroundColor: categoryStyle.accent, color: categoryStyle.onAccent }}>
          <TerritoryStamp className="-top-10 right-6 h-24 w-24 sm:-top-11 sm:right-8 sm:h-28 sm:w-28" />
          <div className="relative z-[1]">
            <div className="pr-28 sm:pr-36">
              <p className="text-[10px] font-extrabold uppercase tracking-[.14em] opacity-70">{event.discipline ?? event.category}</p>
              <div className="mt-4 space-y-1.5">
                <p className="flex items-center gap-2 text-base font-medium"><CalendarDays className="h-[18px] w-[18px] shrink-0" strokeWidth={2.4} />{getCompactDate(event)}</p>
                <p className="flex items-center gap-2 text-xl font-extrabold sm:text-2xl"><MapPin className="h-5 w-5 shrink-0" strokeWidth={2.7} />{event.place}</p>
              </div>
              <DialogTitle className="mt-5 font-display text-2xl font-semibold leading-[1.15] tracking-[-.03em] text-current sm:text-3xl">{event.title}</DialogTitle>
              {event.institution ? <p className="mt-4 flex items-start gap-2 text-sm leading-6 opacity-75"><Building2 className="mt-1 h-4 w-4 shrink-0" />{event.institution}</p> : null}
            </div>
            <DialogDescription className="mt-6 max-w-2xl text-[15px] leading-7 text-current opacity-85">{event.summary}</DialogDescription>
            <div className="mt-6 border-t border-current/20 pt-4">
              <p className="flex items-start gap-2.5 text-sm leading-6 opacity-75"><Users className="mt-1 h-4 w-4 shrink-0" /><span>Participación de: {event.team.join(" · ")}.</span></p>
            </div>
          </div>
        </div>
        <span className="h-2 w-full shrink-0 bg-cover bg-center" style={{ backgroundImage: territoryGradientImage }} aria-hidden="true" />
      </DialogContent>
    </Dialog>
  );
}

export function TerritorioExplorer({ mode }: { mode: "realizadas" | "proximas" }) {
  const explorerRef = useRef<HTMLDivElement>(null);

  const modeEvents = useMemo(() => {
    return territorioEvents.filter((event) =>
      mode === "proximas" ? event.period === PROXIMAS_PERIOD : event.period !== PROXIMAS_PERIOD,
    );
  }, [mode]);

  const areaGroups = useMemo(() => {
    return territorioCategories
      .slice(1)
      .map((category) => {
        const area = category as TerritorioCategory;
        return {
          category: area,
          events: modeEvents
            .filter((event) => event.category === area)
            .sort((a, b) => b.sortDate.localeCompare(a.sortDate)),
        };
      })
      .filter((group) => group.events.length > 0);
  }, [modeEvents]);

  useEffect(() => {
    const shell = explorerRef.current?.closest(".v3-scroll-theme") as HTMLElement | null;
    if (!shell) return;

    const previousColor = shell.style.getPropertyValue("--section-scrollbar");
    shell.style.setProperty("--section-scrollbar", allCategoriesStyle.accent);

    return () => {
      if (previousColor) shell.style.setProperty("--section-scrollbar", previousColor);
      else shell.style.removeProperty("--section-scrollbar");
    };
  }, []);

  const title = mode === "proximas" ? "Próximas acciones" : "Acciones y encuentros";

  return (
    <div ref={explorerRef} className="min-h-full bg-[#FAFAFB]">
      <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-10" aria-labelledby="acciones-territorio-title">
        <div className="mx-auto max-w-6xl">
          <header>
            <h2 id="acciones-territorio-title" className="font-display text-3xl font-semibold tracking-[-.035em] text-[#494963] md:text-4xl lg:text-5xl">{title}</h2>
          </header>

          <p className="mt-7 text-sm text-[#494963]/55 lg:text-base" aria-live="polite">
            {modeEvents.length} {modeEvents.length === 1 ? "registro" : "registros"}
          </p>

          <div className="mt-8 space-y-12">
            {areaGroups.map((group) => {
              const groupStyle = categoryStyles[group.category];
              return (
                <section key={group.category} aria-labelledby={`territorio-${group.category.replace(/\s+/g, "-").toLowerCase()}`}>
                  <div className="mb-5 flex items-center gap-3">
                    <AreasMaterialsIcon className="h-6 w-6 shrink-0 lg:h-7 lg:w-7" style={{ color: groupStyle.accent }} aria-hidden="true" />
                    <h3 id={`territorio-${group.category.replace(/\s+/g, "-").toLowerCase()}`} className="font-display text-xl font-semibold tracking-[-.025em] text-[#494963] sm:text-2xl lg:text-3xl">{group.category}</h3>
                    <span className="h-px flex-1" style={{ backgroundColor: groupStyle.soft }} aria-hidden="true" />
                    <span className="text-xs font-bold text-[#494963]/40 lg:text-sm">{group.events.length}</span>
                  </div>
                  <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.events.map((event) => <EventCard key={event.id} event={event} />)}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
