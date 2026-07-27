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

function EventGallery({ event, categoryStyle }: { event: TerritorioEvent; categoryStyle: CategoryStyle }) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const photos = event.photos ?? [];

  function showPhoto(index: number) {
    const nextIndex = (index + photos.length) % photos.length;
    galleryRef.current?.scrollTo({ left: (galleryRef.current?.clientWidth ?? 0) * nextIndex, behavior: "smooth" });
    setActivePhoto(nextIndex);
  }

  if (!photos.length) {
    return (
      <div className="relative grid min-h-40 place-items-center" style={{ backgroundColor: categoryStyle.soft, color: categoryStyle.accent }}>
        <MapPinned className="h-16 w-16 opacity-35" strokeWidth={1.25} aria-hidden="true" />
        <TerritoryStamp />
      </div>
    );
  }

  return (
    <div className="relative bg-[#ECECF1]">
      <div
        ref={galleryRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-1"
        onScroll={(scrollEvent) => {
          const gallery = scrollEvent.currentTarget;
          if (gallery.clientWidth) setActivePhoto(Math.round(gallery.scrollLeft / gallery.clientWidth));
        }}
      >
        {photos.map((photo) => (
          <div key={photo.src} className="relative aspect-[16/9] min-w-full snap-center">
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 767px) 100vw, 768px" className="object-cover" />
          </div>
        ))}
      </div>
      {photos.length > 1 ? (
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
          <span className="rounded-full bg-[#494963]/85 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm">{activePhoto + 1} / {photos.length}</span>
          <div className="flex gap-2">
            <button type="button" onClick={() => showPhoto(activePhoto - 1)} aria-label="Foto anterior" className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#494963] shadow-md"><ChevronLeft className="h-4 w-4" /></button>
            <button type="button" onClick={() => showPhoto(activePhoto + 1)} aria-label="Foto siguiente" className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#494963] shadow-md"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      ) : null}
      <TerritoryStamp />
    </div>
  );
}

function TerritoryStamp() {
  return (
    <Image
      src="/images/territorio/sello-en-territorio.png"
      alt=""
      width={231}
      height={231}
      className="absolute right-2.5 top-2.5 h-[72px] w-[72px] object-contain"
      aria-hidden="true"
    />
  );
}

function CardArtwork({ category }: { category: TerritorioCategory }) {
  if (category === "Educación Artística") {
    return (
      <Image
        src="/images/territorio/grafica-educacion-artistica.png"
        alt=""
        width={150}
        height={183}
        className="pointer-events-none absolute -right-1 -top-4 h-[183px] w-[150px] object-contain"
        aria-hidden="true"
      />
    );
  }

  if (category === "Matemática") {
    return (
      <Image
        src="/images/territorio/grafica-matematica.png"
        alt=""
        width={538}
        height={398}
        className="pointer-events-none absolute -right-8 -top-4 h-auto w-[260px] object-contain"
        aria-hidden="true"
      />
    );
  }

  if (category === "Lengua y Literatura") {
    return (
      <Image
        src="/images/territorio/grafica-lengua-y-literatura.png"
        alt=""
        width={576}
        height={347}
        className="pointer-events-none absolute -right-4 -top-3 h-auto w-[275px] object-contain"
        aria-hidden="true"
      />
    );
  }

  if (category === "Ciencias Naturales") {
    return (
      <Image
        src="/images/territorio/grafica-ciencias-naturales.png"
        alt=""
        width={538}
        height={533}
        className="pointer-events-none absolute -right-2 -top-5 h-auto w-[235px] object-contain"
        aria-hidden="true"
      />
    );
  }

  if (category === "Ciencias Sociales") {
    return (
      <Image
        src="/images/territorio/grafica-ciencias-sociales.png"
        alt=""
        width={515}
        height={350}
        className="pointer-events-none absolute -right-3 -top-3 h-auto w-[280px] object-contain"
        aria-hidden="true"
      />
    );
  }

  if (category === "Saberes, Vidas y Mundos") {
    return (
      <Image
        src="/images/territorio/grafica-saberes-vidas-y-mundos.png"
        alt=""
        width={648}
        height={419}
        className="pointer-events-none absolute -right-3 -top-3 h-auto w-[290px] object-contain"
        aria-hidden="true"
      />
    );
  }

  if (category === "Educación Física") {
    return (
      <Image
        src="/images/territorio/grafica-educacion-fisica.png"
        alt=""
        width={524}
        height={376}
        className="pointer-events-none absolute -right-2 -top-5 h-auto w-[290px] object-contain"
        aria-hidden="true"
      />
    );
  }

  if (category === "Educación Tecnológica") {
    return (
      <Image
        src="/images/territorio/grafica-educacion-tecnologica.png"
        alt=""
        width={591}
        height={544}
        className="pointer-events-none absolute -right-3 -top-4 h-auto w-[240px] object-contain"
        aria-hidden="true"
      />
    );
  }

  if (category === "Lenguas Extranjeras") {
    return (
      <Image
        src="/images/territorio/grafica-lenguas-extranjeras.png"
        alt=""
        width={665}
        height={612}
        className="pointer-events-none absolute -right-3 -top-5 h-auto w-[255px] object-contain"
        aria-hidden="true"
      />
    );
  }

  return (
    <svg viewBox="0 0 190 190" className="pointer-events-none absolute -right-7 -top-10 h-48 w-48 opacity-50" fill="none" aria-hidden="true">
      <circle cx="96" cy="96" r="62" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 7" />
      <path d="M54 42A70 70 0 0 0 44 145" stroke="currentColor" strokeWidth="22" opacity=".55" />
      <path d="M151 65l5-5 4 4 5-7 5 4 6-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M81 24l9 12 8-7 8 10" stroke="currentColor" strokeWidth="1.5" opacity=".7" />
    </svg>
  );
}

function getCompactDate(event: TerritorioEvent) {
  if (event.pendingDate) return event.dateLabel;
  const [, month, day] = event.sortDate.split("-");
  return `${day}/${month}`;
}

function EventCard({ event, fluid = false }: { event: TerritorioEvent; fluid?: boolean }) {
  const categoryStyle = categoryStyles[event.category];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`group flex shrink-0 snap-start flex-col overflow-hidden bg-white text-left shadow-[0_8px_26px_rgba(73,73,99,.11)] transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(73,73,99,.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#494963] focus-visible:ring-offset-2 ${fluid ? "h-full w-full max-w-none" : "w-[84vw] max-w-[330px] sm:w-[320px]"}`}
          aria-label={`Ver más sobre ${event.title}`}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden" style={{ backgroundColor: categoryStyle.soft }}>
            {event.photos?.[0] ? (
              <Image src={event.photos[0].src} alt="" fill sizes="(max-width: 640px) 82vw, 300px" className="object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
            ) : (
              <div className="absolute inset-0 grid place-items-center" style={{ color: categoryStyle.accent }}>
                <MapPinned className="h-16 w-16 opacity-30" strokeWidth={1.2} aria-hidden="true" />
              </div>
            )}
            <TerritoryStamp />
            {event.pendingDate ? <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[.09em] text-[#494963]">En agenda</span> : null}
          </div>

          <div className="relative flex min-h-[205px] flex-1 flex-col overflow-hidden px-5 pb-5 pt-4" style={{ backgroundColor: categoryStyle.accent, color: categoryStyle.onAccent }}>
            <CardArtwork category={event.category} />
            <div className="relative z-[1] space-y-1 text-[15px] font-medium leading-tight">
              <p className="flex items-center gap-2"><CalendarDays className="h-[17px] w-[17px] shrink-0" strokeWidth={2.4} aria-hidden="true" />{getCompactDate(event)}</p>
              <p className="flex items-center gap-2 text-lg font-extrabold"><MapPin className="h-[18px] w-[18px] shrink-0" strokeWidth={2.7} aria-hidden="true" />{event.place}</p>
            </div>
            <p className="relative z-[1] mt-3 line-clamp-3 max-w-[78%] text-[10px] font-medium leading-[1.25]"><span className="font-extrabold">{event.title}.</span> {event.summary}</p>
            <p className="relative z-[1] mt-auto line-clamp-2 max-w-[82%] pt-3 text-[9px] font-bold leading-tight">Participación de: {event.team.join(", ")}.</p>
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
        <EventGallery event={event} categoryStyle={categoryStyle} />
        <div className="relative overflow-hidden p-5 sm:p-8" style={{ backgroundColor: categoryStyle.accent, color: categoryStyle.onAccent }}>
          <CardArtwork category={event.category} />
          <div className="relative z-[1]">
            <div className="pr-[82px] sm:pr-[155px]">
              <p className="text-[10px] font-extrabold uppercase tracking-[.14em] opacity-70">{event.discipline ?? event.category}</p>
              <div className="mt-4 space-y-1.5">
                <p className="flex items-center gap-2 text-base font-medium"><CalendarDays className="h-[18px] w-[18px] shrink-0" strokeWidth={2.4} />{getCompactDate(event)}</p>
                <p className="flex items-center gap-2 text-xl font-extrabold sm:text-2xl"><MapPin className="h-5 w-5 shrink-0" strokeWidth={2.7} />{event.place}</p>
              </div>
              <DialogTitle className="mt-5 font-display text-2xl font-semibold leading-tight tracking-[-.03em] text-current sm:text-3xl">{event.title}</DialogTitle>
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

function EmptyAreaState({ category }: { category: TerritorioCategory }) {
  const categoryStyle = categoryStyles[category];

  return (
    <div className="relative mt-4 min-h-[250px] overflow-hidden px-6 py-9 sm:px-9 sm:py-12" style={{ backgroundColor: categoryStyle.accent, color: categoryStyle.onAccent }}>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[320px] origin-top-right scale-[1.35]" aria-hidden="true">
        <CardArtwork category={category} />
      </div>
      <div className="relative z-[1] max-w-[68%] sm:max-w-md">
        <p className="text-[10px] font-extrabold uppercase tracking-[.15em] opacity-70">{category}</p>
        <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-[-.03em] sm:text-3xl">Todavía no hay acciones publicadas</h3>
        <p className="mt-3 max-w-sm text-sm leading-6 opacity-75">Los próximos registros de esta área se incorporarán en este espacio.</p>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-2 bg-cover bg-center" style={{ backgroundImage: territoryGradientImage }} aria-hidden="true" />
    </div>
  );
}

export function TerritorioExplorer() {
  const [activeCategory, setActiveCategory] = useState<(typeof territorioCategories)[number]>("Todas");
  const carouselRef = useRef<HTMLDivElement>(null);
  const explorerRef = useRef<HTMLDivElement>(null);

  const visibleEvents = useMemo(() => {
    return territorioEvents
      .filter((event) => activeCategory === "Todas" || event.category === activeCategory)
      .sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  }, [activeCategory]);

  const areaGroups = useMemo(() => {
    return territorioCategories
      .slice(1)
      .map((category) => {
        const area = category as TerritorioCategory;
        return {
          category: area,
          events: territorioEvents
            .filter((event) => event.category === area)
            .sort((a, b) => b.sortDate.localeCompare(a.sortDate)),
        };
      })
      .filter((group) => group.events.length > 0);
  }, []);

  useEffect(() => {
    const shell = explorerRef.current?.closest(".v3-scroll-theme") as HTMLElement | null;
    if (!shell) return;

    const previousColor = shell.style.getPropertyValue("--section-scrollbar");
    const activeColor = activeCategory === "Todas" ? allCategoriesStyle.accent : categoryStyles[activeCategory].accent;
    shell.style.setProperty("--section-scrollbar", activeColor);

    return () => {
      if (previousColor) shell.style.setProperty("--section-scrollbar", previousColor);
      else shell.style.removeProperty("--section-scrollbar");
    };
  }, [activeCategory]);

  function selectCategory(category: (typeof territorioCategories)[number]) {
    setActiveCategory(category);
    requestAnimationFrame(() => carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" }));
  }

  function moveCarousel(direction: -1 | 1) {
    carouselRef.current?.scrollBy({ left: direction * 330, behavior: "smooth" });
  }

  return (
    <div ref={explorerRef} className="min-h-full bg-[#FAFAFB]">
      <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-10" aria-labelledby="acciones-territorio-title">
        <div className="mx-auto max-w-6xl">
          <header>
            <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#B159A7]">Recorrido territorial</p>
            <h2 id="acciones-territorio-title" className="mt-2 font-display text-3xl font-semibold tracking-[-.035em] text-[#494963] md:text-4xl">Acciones y encuentros</h2>
          </header>

          <div className="mt-7 flex flex-wrap gap-2" role="group" aria-label="Filtrar acciones por área">
            {territorioCategories.map((category) => {
              const active = category === activeCategory;
              const filterStyle = category === "Todas" ? allCategoriesStyle : categoryStyles[category];
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectCategory(category)}
                  className={`min-h-10 rounded-full border px-4 py-2 text-xs font-bold transition-[background-color,color,border-color,transform] hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#494963] focus-visible:ring-offset-2 ${active ? "shadow-sm" : "bg-white"}`}
                  style={{ backgroundColor: active ? filterStyle.accent : "#ffffff", borderColor: filterStyle.accent, color: active ? filterStyle.onAccent : filterStyle.accent }}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {activeCategory !== "Todas" ? (
            <div className="mt-10 flex items-center gap-3">
              <AreasMaterialsIcon className="h-6 w-6 shrink-0" style={{ color: categoryStyles[activeCategory].accent }} aria-hidden="true" />
              <h3 className="font-display text-2xl font-semibold tracking-[-.03em] text-[#494963] sm:text-3xl">{activeCategory}</h3>
              <span className="h-px flex-1" style={{ backgroundColor: categoryStyles[activeCategory].soft }} aria-hidden="true" />
            </div>
          ) : null}

          <div className={`${activeCategory === "Todas" ? "mt-9" : "mt-4"} flex min-h-10 items-center justify-between gap-4`}>
            <p className="text-sm text-[#494963]/55" aria-live="polite">{visibleEvents.length} {visibleEvents.length === 1 ? "registro" : "registros"}</p>
            {activeCategory !== "Todas" && visibleEvents.length > 1 ? (
              <div className="flex gap-2">
                <button type="button" onClick={() => moveCarousel(-1)} aria-label="Ver registros anteriores" className="grid h-10 w-10 place-items-center rounded-full border border-[#494963]/15 bg-white text-[#494963] transition-colors hover:bg-[#494963] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#494963]"><ChevronLeft className="h-5 w-5" /></button>
                <button type="button" onClick={() => moveCarousel(1)} aria-label="Ver registros siguientes" className="grid h-10 w-10 place-items-center rounded-full border border-[#494963]/15 bg-white text-[#494963] transition-colors hover:bg-[#494963] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#494963]"><ChevronRight className="h-5 w-5" /></button>
              </div>
            ) : null}
          </div>

          {activeCategory === "Todas" ? (
            <div className="mt-8 space-y-12">
              {areaGroups.map((group) => {
                const groupStyle = categoryStyles[group.category];
                return (
                  <section key={group.category} aria-labelledby={`territorio-${group.category.replace(/\s+/g, "-").toLowerCase()}`}>
                    <div className="mb-5 flex items-center gap-3">
                      <AreasMaterialsIcon className="h-6 w-6 shrink-0" style={{ color: groupStyle.accent }} aria-hidden="true" />
                      <h3 id={`territorio-${group.category.replace(/\s+/g, "-").toLowerCase()}`} className="font-display text-xl font-semibold tracking-[-.025em] text-[#494963] sm:text-2xl">{group.category}</h3>
                      <span className="h-px flex-1" style={{ backgroundColor: groupStyle.soft }} aria-hidden="true" />
                      <span className="text-xs font-bold text-[#494963]/40">{group.events.length}</span>
                    </div>
                    <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {group.events.map((event) => <EventCard key={event.id} event={event} fluid />)}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : visibleEvents.length ? (
            <div ref={carouselRef} className="-mx-4 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-5 pt-1 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10" aria-label="Registros territoriales">
              {visibleEvents.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          ) : (
            <EmptyAreaState category={activeCategory as TerritorioCategory} />
          )}
        </div>
      </section>
    </div>
  );
}
