"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export interface ProcesoFoto {
  src: string;
  date: string;
  title: string;
  /** Alt real de la foto, si existe. Si no, se arma uno genérico a partir del título. */
  alt?: string;
}

/** Detecta prefers-reduced-motion para acortar la transición del carrusel. */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Carrusel horizontal de fotos para "Proceso de Construcción Colectiva".
 * Construido sobre el Carousel de shadcn/ui (embla-carousel-react, ya
 * dependencia del proyecto) en vez de escribir uno nuevo desde cero.
 */
export function ProcesoFotosCarousel({ photos }: { photos: ProcesoFoto[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="mt-5">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", duration: prefersReducedMotion ? 0 : 22 }}
        aria-label="Fotos del Proceso de Construcción Colectiva"
      >
        <CarouselContent>
          {photos.map((photo, index) => (
            <CarouselItem key={photo.src} className="basis-full sm:basis-[65%] lg:basis-[46%]">
              <figure>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#DDDDE3]">
                  <Image
                    src={photo.src}
                    alt={photo.alt ?? `Registro de ${photo.title}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 46vw, (min-width: 640px) 65vw, 100vw"
                    priority={index === 0}
                  />
                </div>
                <figcaption className="mt-3">
                  <span className="block text-[10px] font-bold uppercase tracking-[.14em] text-[#494963]/35">
                    {photo.date}
                  </span>
                  <span className="mt-1 block text-sm font-bold leading-snug text-[#494963]">{photo.title}</span>
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-[#494963]/55" aria-live="polite">
            {current} / {photos.length}
          </p>
          <div className="flex gap-2">
            <CarouselPrevious aria-label="Foto anterior" className="static h-10 w-10 translate-y-0" />
            <CarouselNext aria-label="Foto siguiente" className="static h-10 w-10 translate-y-0" />
          </div>
        </div>
      </Carousel>
    </div>
  );
}
