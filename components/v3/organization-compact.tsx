"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel";

function PresentacionIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={className} fill="currentColor">
      <path d="M13.4,2.2c0,0,.1,0,.2,0-.5-.2-1.1-.4-1.7-.6V.6h0c-.2-.4-.4-.6-.7-.6h-2.2c-.3,0-.5.2-.6.5h0v1.1c-.6.1-1.3.3-1.9.6-.9.4-1.7.9-2.4,1.5C1.9,5.4.5,8,.5,10.8c0,5.1,4.2,9.2,9.5,9.2s9.5-4.1,9.5-9.2-2.5-7.3-6.1-8.6ZM17.2,4.9c-.1-.1-.3-.3-.4-.4.1.1.3.3.4.4ZM13.5,17.9l-1.8-4.1c.7-.4,1.2-1,1.5-1.7l4,1.9c-.7,1.6-2,3-3.7,3.9ZM11.1,13.3c-1.4.6-3.1,0-3.7-1.5-.3-.7-.3-1.4,0-2.1.3-.7.8-1.2,1.5-1.5.4-.2.7-.2,1.1-.2s.7,0,1,.2c.7.3,1.2.8,1.5,1.5s.3,1.4,0,2.1-.8,1.2-1.5,1.5h0ZM8.3,14l-1.6,4.1c-1.6-.7-3-2-3.9-3.8l4.1-1.7c.3.6.8,1.1,1.4,1.4ZM6.6,11.7l-4.1,1.8c-.7-1.8-.6-3.7,0-5.4l4.1,1.6c-.2.7-.2,1.3,0,2ZM9,14.2c.3,0,.6,0,1,0s.7,0,1-.2l1.8,4.1c-1.8.7-3.7.6-5.4,0l1.6-4ZM13.6,11.3h0c0-.6,0-1.1,0-1.6l4.1-1.8c.7,1.8.6,3.7,0,5.3l-3.9-1.9ZM17.2,4.9c.1.1.2.2.3.3,0-.1-.2-.2-.3-.3ZM17.6,5.4c0,.1.2.2.2.3,0,0-.1-.2-.2-.3ZM17.8,5.8c0,.1.1.2.2.3,0,0-.1-.2-.2-.3ZM14.3,2.7c-.2,0-.3-.2-.5-.2.2,0,.3.1.5.2ZM16.7,4.4c-.1-.1-.2-.2-.4-.3.1.1.3.2.4.3ZM16.2,3.9c-.1,0-.2-.2-.3-.3.1,0,.2.2.3.3ZM15.6,3.5c-.1,0-.2-.2-.4-.3.1,0,.2.2.4.3ZM15,3c-.1,0-.3-.2-.4-.2.1,0,.3.2.4.2ZM17.2,7.2l-4.1,1.8c-.3-.6-.8-1.1-1.4-1.4l1.6-4.1c1.6.7,3,2,3.9,3.7ZM8.1,2.9v.3h0c0,0,.9.9.9.9l.9.9h.2l1.6-1.6h0v-.4c.3,0,.6,0,.8.2l-1.6,4.1c-.7-.2-1.3-.2-2,0l-1.8-4.1c.3-.1.7-.2,1-.3ZM6.5,3.6l1.8,4.1c-.6.3-1.1.8-1.4,1.4l-4.1-1.6c.7-1.6,2-3,3.7-3.9Z" />
    </svg>
  );
}

const items = [
  ["01", "Presentación del área", "Fundamentos, sentido formativo y ejes de contenido que orientan la propuesta curricular.", null],
  ["02", "Objetivos", "Metas de aprendizaje por ciclo (primero, segundo y tercero) y para séptimo grado.", "/images/organizacion/icono-02.png"],
  ["03", "Contenidos", "Organizados en cuadros por eje y grado, con progresión clara y articulación vertical.", "/images/organizacion/icono-03.png"],
  ["04", "Enfoques transversales", "Etiquetas que señalan qué contenidos pueden trabajarse desde la ciudadanía, la educación ambiental y otros enfoques.", "/images/organizacion/icono-04.png"],
  ["05", "Recomendaciones", "Orientaciones específicas para la enseñanza, la evaluación y la diversificación.", "/images/organizacion/icono-05.png"],
  ["06", "Lecturas sugeridas y glosario", "Bibliografía complementaria y definiciones clave para profundizar en cada área.", "/images/organizacion/icono-06.png"],
] as const;

function Arrows() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();
  return (
    <div className="flex shrink-0 items-center gap-3">
      <button type="button" onClick={scrollPrev} disabled={!canScrollPrev} aria-label="Anterior" className="text-[#494963]/40 transition-opacity disabled:opacity-30">
        <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
      </button>
      <button type="button" onClick={scrollNext} disabled={!canScrollNext} aria-label="Siguiente" className="text-[#494963]/40 transition-opacity disabled:opacity-30">
        <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
      </button>
    </div>
  );
}

function Dots() {
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
    <div className="mt-3 flex gap-[6px]">
      {Array.from({ length: snapCount }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => api?.scrollTo(index)}
          aria-label={`Ir a la página ${index + 1}`}
          aria-current={index === selected ? "step" : undefined}
          className={`h-[6px] w-[6px] rounded-full bg-[#494963] transition-opacity ${index === selected ? "opacity-100" : "opacity-20"}`}
        />
      ))}
    </div>
  );
}

export function OrganizationCompact() {
  return (
    <section className="v3-section !p-0 md:!p-[14px]">
      <div className="rounded-none bg-[#F5F5F7] p-5 md:rounded-3xl md:p-8 lg:p-10">
        <Carousel opts={{ align: "start" }}>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-sans text-2xl font-bold leading-[1.05] tracking-[-0.02em] text-[#494963] sm:text-3xl lg:text-4xl">Cómo está<br />organizada cada área</h2>
              <p className="mt-2 max-w-md font-sans text-sm leading-normal text-[#494963]/50 sm:text-base sm:leading-[1.5]">Todas comparten una misma estructura de seis secciones.</p>
            </div>
            <Arrows />
          </div>
          <CarouselContent className="mt-5 sm:mt-7">
            {items.map(([number, title, description, iconSrc]) => (
              <CarouselItem key={number} className="basis-[70%] sm:basis-1/2 lg:basis-1/3">
                <article className="flex h-full flex-col rounded-lg bg-white p-4 sm:p-5">
                  <div className="flex items-center gap-2">
                    {iconSrc ? <Image src={iconSrc} alt="" width={16} height={16} className="h-4 w-4 object-contain" /> : <PresentacionIcon className="h-4 w-4 text-[#494963]" />}
                    <span className="font-sans text-xl font-bold text-[#CFCFCF] sm:text-2xl">{number}</span>
                  </div>
                  <h3 className="mt-4 font-sans text-sm font-extrabold text-[#494963] sm:text-base">{title}</h3>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-[#494963]/50 sm:text-sm">{description}</p>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <Dots />
        </Carousel>
      </div>
    </section>
  );
}
