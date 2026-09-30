"use client";

import { ArrowUpRight, BookOpen, Monitor } from "lucide-react";
import type { Area } from "@/lib/areas-data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CarouselArrows } from "@/components/v3/carousel-arrows";

export function FormacionesSection({
  area,
  artisticLanguage,
}: {
  area: Area;
  artisticLanguage?: string;
}) {
  const normalizedLanguage = artisticLanguage?.toLocaleLowerCase("es");
  const items = (area.teacherTrainings ?? []).flatMap((group) =>
    (group.items ?? [])
      .filter((item) => !normalizedLanguage || item.name.toLocaleLowerCase("es").includes(normalizedLanguage))
      .map((item) => ({ ...item, group: group.name })),
  );
  const contextName = artisticLanguage ?? area.name;

  const cards = (
    // viewportClassName: reserva 4px a cada lado para que la sombra de la
    // primera/última tarjeta pueda "sangrar" en vez de quedar con un corte
    // plano contra el borde del carrusel (el viewport con overflow-hidden
    // recortaba justo ahí). md:-ml-1 compensa el padding para que la
    // primera tarjeta arranque en el mismo lugar de siempre (al ras).
    <CarouselContent className="items-stretch pb-3 pr-2 md:pr-0" viewportClassName="md:-ml-1 md:px-1">
      {items.map((item) => <CarouselItem key={item.id} className="basis-[88%] sm:basis-1/2 xl:basis-1/3">
        {/* shadow chica (mismo criterio que los chips de EIB/Familias/Marco
           General, ResourceRow), no la sombra grande que traía antes: esas
           tarjetas viven sobre fondo gris claro, donde una sombra de 20px de
           blur se pierde — acá el fondo es blanco y esa misma sombra se veía
           como un halo/fondo gris de más debajo de la tarjeta. */}
        <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_10px_rgba(73,73,99,.065)]">
          <div className="min-h-[116px] p-5" style={{ backgroundColor: area.color, color: area.textOnColor }}>
            <p className="text-[10px] font-bold uppercase tracking-[.14em] opacity-60">Formación docente</p>
            <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{item.name}</h3>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <div className="space-y-3 text-sm text-[#494963]/60">
              <p className="flex items-center gap-3"><Monitor className="h-4 w-4 shrink-0 text-[#494963]/30" />Campus Educativo</p>
              <p className="flex items-center gap-3"><BookOpen className="h-4 w-4 shrink-0 text-[#494963]/30" />{item.group}</p>
            </div>
            {item.url ? (
              <div className="mt-auto border-t border-[#494963]/[.07] pt-4">
                <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: area.color }}>+ Info<ArrowUpRight className="h-3.5 w-3.5" /></a>
              </div>
            ) : null}
          </div>
        </article>
      </CarouselItem>)}
    </CarouselContent>
  );

  return <section id="formacion">
    {/* px-4 md:px-0: mismo criterio que "Itinerarios didácticos" — a partir de
       md, cero padding propio, para que el título quede al ras del borde de
       las tarjetas del carrusel de abajo (que tampoco tienen padding propio,
       solo el inset de 14px de la section exterior), no 28px más adentro. */}
    {items.length ? (
      <Carousel opts={{ align: "start", containScroll: "trimSnaps" }} className="w-full" aria-label={`Formaciones docentes de ${contextName}`}>
        {/* Anterior/Siguiente arriba, junto al título (no a los costados de
           las tarjetas): así las tarjetas vuelven a arrancar al ras del
           borde, alineadas con "Docencia" de Itinerarios, en vez de quedar
           con el margen que necesitaban las flechas a los lados. */}
        <header className="mb-6 flex items-end justify-between gap-4 px-4 md:px-0 md:mb-8">
          <div className="max-w-2xl md:pr-8">
            <h2 className="font-display text-2xl font-semibold tracking-[-.03em] text-[#494963] sm:text-3xl lg:text-4xl">Formaciones docentes</h2>
            <p className="mt-2 text-sm sm:text-base lg:text-lg text-[#494963]/50">Cursos y trayectos de formación vinculados con {contextName}.</p>
          </div>
          <CarouselArrows variant="inline" />
        </header>
        {/* El padding va en un wrapper afuera del Carousel (no en su propio
           className): ponerlo en el div raíz del carousel achicaba el
           viewport interno (el que tiene overflow-hidden) y recortaba la
           última tarjeta. md:pl-0: las tarjetas tienen que arrancar al ras
           del borde (como el botón "Docencia" de Itinerarios). */}
        <div className="pl-4 md:pl-0">{cards}</div>
      </Carousel>
    ) : (
      <header className="mb-6 max-w-2xl px-4 md:px-0 md:pr-24 md:mb-8">
        <h2 className="font-display text-2xl font-semibold tracking-[-.03em] text-[#494963] sm:text-3xl lg:text-4xl">Formaciones docentes</h2>
        <p className="mt-2 text-sm sm:text-base lg:text-lg text-[#494963]/50">Cursos y trayectos de formación vinculados con {contextName}.</p>
      </header>
    )}
  </section>;
}
