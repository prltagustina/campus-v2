"use client";

import { useEffect, useState } from "react";
import { useCarousel } from "@/components/ui/carousel";

/**
 * Indicador de posición por puntitos (no "N / M" en texto) — mismo criterio
 * en todos los carruseles que lo usan (antes DocumentoStepper y "Cómo está
 * organizada cada área" lo reimplementaban cada uno por su lado). Centrados
 * (antes alineados a la izquierda) y con la misma distancia respecto del
 * contenido de arriba en los tres lugares donde aparecen.
 */
export function CarouselDots({ className = "" }: { className?: string }) {
  const { api } = useCarousel();
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setSnapCount(api.scrollSnapList().length);
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className={`flex w-full justify-center gap-[6px] ${className}`} aria-label={`Elemento ${selected + 1} de ${snapCount}`}>
      {Array.from({ length: snapCount }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => api?.scrollTo(index)}
          aria-label={`Ir al elemento ${index + 1}`}
          aria-current={index === selected ? "step" : undefined}
          className={`h-[6px] w-[6px] rounded-full bg-[#494963] transition-opacity ${index === selected ? "opacity-100" : "opacity-20"}`}
        />
      ))}
    </div>
  );
}
