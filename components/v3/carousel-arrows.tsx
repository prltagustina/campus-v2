"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarousel } from "@/components/ui/carousel";

/**
 * Anterior/Siguiente de un carrusel. Dos variantes:
 * - "sides" (default): a los costados del contenido que desplazan, AFUERA de
 *   la fila de tarjetas (no superpuestas) — "Siguiente" a la derecha,
 *   "Anterior" a la izquierda, en un margen propio reservado para ellas (ver
 *   `md:px-10` en cada uso). Ocultas en mobile (ahí se navega por swipe).
 * - "inline": agrupadas una al lado de la otra, en flujo normal (pensada
 *   para ir en el header, junto al título) — la usa Formaciones docentes,
 *   donde las tarjetas necesitan arrancar al ras del borde y no hay margen
 *   para reservarles un costado propio.
 */
export function CarouselArrows({
  prevLabel = "Anterior",
  nextLabel = "Siguiente",
  variant = "sides",
  /** Altura a la que centrar las flechas dentro del contenedor `relative`
   * que las envuelve (solo variant "sides"). Por defecto el medio exacto
   * (para tarjetas donde el contenido llena toda la columna); si abajo de
   * la tarjeta hay un pie de foto/texto que no debería tapar
   * (ProcesoFotosCarousel), se puede pasar un valor menor para centrar
   * contra la imagen, no contra imagen+pie. */
  topClassName = "top-1/2",
}: {
  prevLabel?: string;
  nextLabel?: string;
  variant?: "sides" | "inline";
  topClassName?: string;
}) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();
  const baseButtonClass =
    "z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[#494963] shadow-md transition-colors hover:bg-[#F1F1F4] disabled:opacity-25 disabled:hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494963]";

  if (variant === "inline") {
    return (
      <div className="flex shrink-0 items-center gap-2">
        <button type="button" onClick={scrollPrev} disabled={!canScrollPrev} aria-label={prevLabel} className={baseButtonClass}>
          <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <button type="button" onClick={scrollNext} disabled={!canScrollNext} aria-label={nextLabel} className={baseButtonClass}>
          <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
    );
  }

  const sideButtonClass = `absolute ${topClassName} hidden -translate-y-1/2 md:grid ${baseButtonClass}`;

  return (
    <>
      <button type="button" onClick={scrollPrev} disabled={!canScrollPrev} aria-label={prevLabel} className={`${sideButtonClass} left-0`}>
        <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
      </button>
      <button type="button" onClick={scrollNext} disabled={!canScrollNext} aria-label={nextLabel} className={`${sideButtonClass} right-0`}>
        <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </>
  );
}
