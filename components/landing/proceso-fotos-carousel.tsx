"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CarouselArrows } from "@/components/v3/carousel-arrows";
import { CarouselDots } from "@/components/v3/carousel-dots";

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
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    // mt/mb: antes solo tenía mt-4 y nada abajo — quedaba pegado al párrafo
    // de arriba y, abajo, solo separado por el padding del propio <article>
    // (compartido con las filas sin foto), así que se sentía todo junto.
    <div className="mt-8 mb-4 sm:mt-10 sm:mb-6">
      <Carousel
        opts={{ align: "start", duration: prefersReducedMotion ? 0 : 22, loop: true }}
        aria-label="Fotos del Proceso de Construcción Colectiva"
      >
        {/* Anterior/Siguiente sobre la propia foto (no arriba): centradas
           contra la imagen, no contra imagen+pie de foto (topClassName más
           arriba que el 50% real del bloque). md:px-10: margen propio para
           las flechas, afuera de la foto (antes se superponían al borde de
           la imagen). */}
        <div className="relative md:px-10">
          <CarouselContent>
            {photos.map((photo, index) => (
              <CarouselItem key={photo.src} className="basis-[70%] sm:basis-1/2 lg:basis-1/3">
                <figure>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#DDDDE3]">
                    <Image
                      src={photo.src}
                      alt={photo.alt ?? `Registro de ${photo.title}`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 72vw"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                  <figcaption className="mt-2.5">
                    <span className="block text-[10px] font-bold uppercase tracking-[.14em] text-[#494963]/35">
                      {photo.date}
                    </span>
                    <span className="mt-1 block text-xs font-bold leading-snug text-[#494963] sm:text-sm">{photo.title}</span>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselArrows prevLabel="Foto anterior" nextLabel="Foto siguiente" topClassName="top-[40%]" />
        </div>
        {/* Puntitos, no "N / M": mismo indicador que el resto de los
           carruseles del sitio (DocumentoStepper, "Cómo está organizada
           cada área"), alineado a la izquierda donde arranca la fila de
           fotos. */}
        <CarouselDots className="mt-3" />
      </Carousel>
    </div>
  );
}
