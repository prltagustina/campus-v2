"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { orderedAreas, pendingCopy } from "@/lib/v3-config";

const accordionItems = [
  ["transversales", "Enfoques transversales", pendingCopy.wheel.transversales],
  ["relaciones", "Relación entre áreas", pendingCopy.wheel.relaciones],
  ["ejes", "Ejes de contenido", pendingCopy.wheel.ejes],
  ["marco", "Marco General", pendingCopy.wheel.marco],
] as const;

export function CurricularWheel() {
  const [open, setOpen] = useState<string>("transversales");
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const hasInteracted = useRef(false);

  useEffect(() => {
    if (!hasInteracted.current || !window.matchMedia("(max-width: 767px)").matches) return;
    const item = itemRefs.current[open];
    if (!item) return;

    const frame = window.requestAnimationFrame(() => {
      item.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  return (
    <section className="v3-section" aria-labelledby="rueda-title">
      <div className="overflow-hidden rounded-3xl bg-[#F1F1F4] px-5 py-8 shadow-[0_12px_45px_rgba(73,73,99,.07)] sm:px-8 md:px-12 md:py-12">
        <div className="grid items-center gap-9 xl:grid-cols-[minmax(430px,1.15fr)_minmax(320px,.85fr)] xl:gap-14">
          <div className="relative mx-auto aspect-square w-full max-w-[670px]">
            <Image
              src="/images/rueda-actualizada.png"
              alt="Rueda curricular: nueve áreas articuladas con cinco enfoques transversales y el Marco General"
              fill
              className="object-contain"
              sizes="(max-width: 1280px) 90vw, 52vw"
              priority={false}
            />
          </div>

          <div>
            <div className="border-y border-[#494963]/20 py-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-[#B159A7]">Un marco común</p>
              <h2 id="rueda-title" className="font-display text-4xl font-semibold tracking-[-.035em] text-[#494963] md:text-5xl">
                Rueda curricular
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-[#494963]/60">
                La rueda permite leer de una sola vez las áreas, sus ejes y los enfoques que atraviesan toda la propuesta.
              </p>
            </div>

            <div className="mt-3 overflow-hidden rounded-2xl bg-white/70" aria-label="Lecturas de la rueda curricular">
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
                        setOpen(id);
                      }}
                      className={`flex min-h-12 w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#494963] ${expanded ? "bg-[#494963] text-white" : "text-[#494963] hover:bg-white"}`}
                    >
                      <span>{label}</span>
                      <ChevronRight className={`h-4 w-4 shrink-0 opacity-35 transition-transform duration-300 ${expanded ? "rotate-90" : ""}`} />
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

        <nav aria-label="Explorar áreas desde la rueda" className="mt-9 grid grid-cols-2 gap-2 border-t border-[#494963]/10 pt-7 sm:grid-cols-3 xl:grid-cols-5">
          {orderedAreas.map((area) => (
            <Link
              key={area.slug}
              href={`/area/${area.slug}`}
              className="group flex min-h-14 items-center justify-between gap-2 rounded-xl border border-[#494963]/[.08] border-l-2 bg-white px-3 py-2 text-sm font-semibold text-[#494963] transition-colors hover:bg-[#FAFAFB]"
              style={{ borderLeftColor: `${area.color}80` }}
            >
              <span>{area.name}</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-35 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
