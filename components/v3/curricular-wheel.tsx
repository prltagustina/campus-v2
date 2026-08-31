"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { pendingCopy } from "@/lib/v3-config";
import { SolidAreaArrow } from "@/components/v3/area-nav-link";

// "Enfoques transversales" se retiró de esta pestaña por decisión del equipo:
// todavía no definieron el nuevo título que debería llevar. El contenido
// (pendingCopy.wheel.transversales) se conserva sin borrar por si cumple otra
// función más adelante.
const accordionItems = [
  ["relaciones", "Relación entre las áreas", pendingCopy.wheel.relaciones],
  ["ejes", "Ejes de contenido", pendingCopy.wheel.ejes],
  ["marco", "Marco General", pendingCopy.wheel.marco],
] as const;

type WheelState = "base" | (typeof accordionItems)[number][0];

/**
 * Sistema de grisado interactivo preparado para PNG (no SVG), para que el
 * equipo de WordPress lo pueda portar sin depender de paths/SVG editables.
 *
 * Lógica: cada estado del acordeón (más "base", sin nada seleccionado) tiene
 * su propia imagen completa de la trama. Al abrir un ítem, se reemplaza la
 * imagen entera por la versión que destaca ese sector y atenúa el resto —
 * el "grisado" queda resuelto adentro del PNG, no con CSS ni máscaras.
 *
 * Convención de archivos (agregar en public/images/trama/ cuando estén listos):
 *   trama-base.png        -> estado neutro, nada seleccionado (el que se ve hoy)
 *   trama-relaciones.png  -> "Relación entre las áreas" destacado, resto grisado
 *   trama-ejes.png        -> "Ejes de contenido" destacado, resto grisado
 *   trama-marco.png       -> "Marco General" destacado, resto grisado
 * (si en el futuro vuelve la pestaña de enfoques transversales, sumar
 * trama-transversales.png y una entrada "transversales" acá y en accordionItems)
 *
 * Hoy las 4 claves apuntan al mismo archivo existente como placeholder seguro:
 * no hay grisado real todavía, pero el mecanismo de intercambio ya funciona.
 * Para activarlo, alcanza con reemplazar cada valor por su PNG definitivo en
 * public/images/trama/ y actualizar la ruta acá — no hace falta tocar más
 * código ni el layout.
 */
const wheelImageByState: Record<WheelState, string> = {
  base: "/images/rueda-actualizada.png",
  relaciones: "/images/rueda-actualizada.png",
  ejes: "/images/rueda-actualizada.png",
  marco: "/images/rueda-actualizada.png",
};

export function CurricularWheel() {
  const [open, setOpen] = useState<string | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const hasInteracted = useRef(false);

  useEffect(() => {
    if (!hasInteracted.current || !open || !window.matchMedia("(max-width: 767px)").matches) return;
    const item = itemRefs.current[open];
    if (!item) return;

    const frame = window.requestAnimationFrame(() => {
      item.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  const wheelSrc = wheelImageByState[(open as WheelState) ?? "base"];

  return (
    <section className="v3-section" aria-labelledby="rueda-title">
      <div className="overflow-hidden rounded-3xl bg-[#F1F1F4] px-5 py-6 shadow-[0_12px_45px_rgba(73,73,99,.07)] sm:px-8 sm:py-8 md:px-12 md:py-12">
        <div className="grid items-start gap-6 sm:gap-9 xl:grid-cols-[minmax(430px,1.15fr)_minmax(320px,.85fr)] xl:gap-14">
          <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[420px] md:max-w-[520px] xl:max-w-[670px]">
            <Image
              src={wheelSrc}
              alt="Trama curricular: nueve áreas articuladas con cinco enfoques transversales y el Marco General"
              fill
              className="object-contain"
              sizes="(max-width: 1280px) 90vw, 52vw"
              priority={false}
            />
          </div>

          <div>
            <div className="py-4 sm:py-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-[#494963]/40">Un marco común</p>
              <h2 id="rueda-title" className="font-display text-3xl font-semibold tracking-[-.035em] text-[#494963] sm:text-4xl md:text-5xl">
                Trama curricular
              </h2>
            </div>

            <div className="mt-3 overflow-hidden rounded-2xl bg-white/70" aria-label="Lecturas de la trama curricular">
              {accordionItems.map(([id, label, description]) => {
                const expanded = open === id;
                return (
                  <div
                    key={id}
                    ref={(node) => { itemRefs.current[id] = node; }}
                    className="border-b border-[#494963]/[.08] last:border-0"
                  >
                    <button
                      id={`wheel-${id}-button`}
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`wheel-${id}-panel`}
                      onClick={() => {
                        hasInteracted.current = true;
                        setOpen((current) => (current === id ? null : id));
                      }}
                      className={`flex min-h-12 w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#494963] ${expanded ? "bg-[#494963]/[.16] text-[#494963]" : "text-[#494963] hover:bg-white"}`}
                    >
                      <span>{label}</span>
                      <span className={`grid h-5 w-5 shrink-0 place-items-center transition-transform duration-300 ${expanded ? "rotate-90" : ""}`} aria-hidden="true">
                        <SolidAreaArrow compact />
                      </span>
                    </button>
                    <div
                      id={`wheel-${id}-panel`}
                      role="region"
                      aria-labelledby={`wheel-${id}-button`}
                      hidden={!expanded}
                      className="border-t border-[#494963]/[.08] bg-white px-4 py-5 text-[#494963]"
                    >
                      <p className="max-w-lg text-sm leading-relaxed text-[#494963]/65">{description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
