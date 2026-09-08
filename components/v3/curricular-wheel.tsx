"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { pendingCopy } from "@/lib/v3-config";
import { SolidAreaArrow } from "@/components/v3/area-nav-link";

/**
 * Trama curricular con lógica de foco por estado.
 *
 * Todo lo que cambia entre estados vive en `wheelStates`: para corregir qué se
 * colorea/destaca en cada lectura, se edita ese objeto y nada más. El resto del
 * componente (layout, acordeón, grisado) no depende de qué estado sea.
 *
 * Grisado: hoy la trama es un PNG plano (no tiene capas separables), así que el
 * grisado real "por sector" no se puede hacer en el DOM. El mecanismo previsto
 * es swap de imagen: cada estado apunta a su propio PNG en
 * `/public/images/trama/` (versión que ya trae grisado + realce horneados).
 * Mientras esos assets no existan, `image` de todos los estados apunta al mismo
 * archivo y se aplica un grisado CSS interino sobre la imagen base + un cartel
 * ("caption") que nombra el foco. Cuando lleguen los PNG definitivos:
 *   1. sumar los archivos a /public/images/trama/
 *   2. cambiar `image` de cada estado a su ruta
 *   3. (opcional) quitar el filtro `.wheel-figure[data-focused]` de globals.css
 */

type WheelStateId = "base" | "relacion" | "ejes" | "marco" | "enfoques";

interface WheelStateConfig {
  /** Rótulo del acordeón. */
  label: string;
  /** Texto del panel abierto. */
  blurb: string;
  /** PNG de la trama para este estado. Hoy todos = base (ver comentario arriba). */
  image: string;
  /**
   * Qué partes de la trama quedan EN FOCO (a color) en este estado. Es la fuente
   * única de verdad del grisado: cuando exista un asset con capas separables
   * (PNG por estado o SVG), alcanza con leer esto para pintar/atenuar.
   */
  focus: {
    /** Anillo exterior de enfoques transversales. */
    ring: boolean;
    /** Sectores de color de las nueve áreas. */
    segments: boolean;
    /** Circulitos/nodos que rodean el centro. */
    nodes: boolean;
    /** Núcleo "Marco General". */
    center: boolean;
  };
  /** Pista corta mientras no haya imagen por estado. Vacío = no se muestra. */
  caption: string;
}

const WHEEL_BASE_IMAGE = "/images/rueda-actualizada.png";

export const wheelStates: Record<WheelStateId, WheelStateConfig> = {
  base: {
    label: "Trama completa",
    blurb: "",
    image: WHEEL_BASE_IMAGE,
    focus: { ring: true, segments: true, nodes: true, center: true },
    caption: "",
  },
  relacion: {
    label: "Relación entre las áreas",
    blurb: pendingCopy.wheel.relaciones,
    image: WHEEL_BASE_IMAGE, // TODO(trama): /images/trama/trama-relacion.png
    focus: { ring: false, segments: true, nodes: false, center: false },
    caption: "En foco: las nueve áreas y su diálogo entre sí.",
  },
  ejes: {
    label: "Ejes de contenido",
    blurb: pendingCopy.wheel.ejes,
    image: WHEEL_BASE_IMAGE, // TODO(trama): /images/trama/trama-ejes.png
    focus: { ring: false, segments: false, nodes: true, center: false },
    caption: "En foco: los ejes que organizan los contenidos dentro de cada área.",
  },
  marco: {
    label: "Marco General",
    blurb: pendingCopy.wheel.marco,
    image: WHEEL_BASE_IMAGE, // TODO(trama): /images/trama/trama-marco.png
    focus: { ring: false, segments: false, nodes: false, center: true },
    caption: "En foco: el Marco General, en el centro de la trama.",
  },
  // Modelado pero NO renderizado: el equipo todavía no definió el título de esta
  // lectura. Cuando lo tengan: fijar `label` y sumar "enfoques" a RENDERED_STATE_IDS.
  enfoques: {
    label: "Enfoques transversales",
    blurb: pendingCopy.wheel.transversales,
    image: WHEEL_BASE_IMAGE, // TODO(trama): /images/trama/trama-enfoques.png
    focus: { ring: true, segments: false, nodes: false, center: false },
    caption: "En foco: el anillo de enfoques transversales.",
  },
};

/** Estados que se muestran hoy como ítems del acordeón, en orden. */
const RENDERED_STATE_IDS = ["relacion", "ejes", "marco"] as const satisfies readonly WheelStateId[];

export function CurricularWheel() {
  const [active, setActive] = useState<WheelStateId>("base");
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const hasInteracted = useRef(false);

  useEffect(() => {
    if (!hasInteracted.current || active === "base" || !window.matchMedia("(max-width: 767px)").matches) return;
    const item = itemRefs.current[active];
    if (!item) return;

    const frame = window.requestAnimationFrame(() => {
      item.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [active]);

  const state = wheelStates[active];
  const isFocused = active !== "base";

  return (
    <section className="v3-section !p-0 md:!p-[14px]" aria-labelledby="rueda-title">
      <div className="overflow-hidden rounded-none bg-[#F1F1F4] px-5 py-6 sm:px-8 sm:py-8 md:rounded-3xl md:px-12 md:py-12 md:shadow-[0_12px_45px_rgba(73,73,99,.07)]">
        <div className="grid items-start gap-6 sm:gap-9 xl:grid-cols-[minmax(430px,1.15fr)_minmax(320px,.85fr)] xl:gap-14">
          {/* Debajo de xl la trama es una sola columna: el gráfico se centra con mx-auto. */}
          <figure className="wheel-figure mx-auto w-full max-w-[280px] sm:max-w-[420px] md:max-w-[520px] xl:max-w-[670px]" data-focused={isFocused || undefined}>
            <div className="wheel-figure__media relative aspect-square w-full">
              <Image
                src={state.image}
                alt="Trama curricular: nueve áreas articuladas con cinco enfoques transversales y el Marco General"
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 90vw, 52vw"
                priority={false}
              />
            </div>
            {/* Slot con alto reservado: el cartel de foco aparece sin mover el layout. */}
            <figcaption className="wheel-figure__caption-slot">
              {isFocused && state.caption ? (
                <span className="wheel-figure__caption">{state.caption}</span>
              ) : null}
            </figcaption>
          </figure>

          <div className="min-w-0">
            <div className="py-4 sm:py-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-[#494963]/40">Un marco común</p>
              <h2 id="rueda-title" className="font-display text-3xl font-semibold tracking-[-.035em] text-[#494963] sm:text-4xl md:text-5xl">
                Trama curricular
              </h2>
            </div>

            <div className="wheel-accordion" aria-label="Lecturas de la trama curricular">
              {RENDERED_STATE_IDS.map((id) => {
                const item = wheelStates[id];
                const expanded = active === id;
                return (
                  <div
                    key={id}
                    ref={(node) => { itemRefs.current[id] = node; }}
                    className="wheel-accordion__item"
                  >
                    <button
                      id={`wheel-${id}-button`}
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`wheel-${id}-panel`}
                      onClick={() => {
                        hasInteracted.current = true;
                        setActive((current) => (current === id ? "base" : id));
                      }}
                      className="wheel-accordion__trigger"
                    >
                      <span>{item.label}</span>
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center transition-transform duration-300 ${expanded ? "rotate-90" : ""}`}
                        aria-hidden="true"
                      >
                        <span className="-ml-3"><SolidAreaArrow /></span>
                      </span>
                    </button>
                    <div
                      id={`wheel-${id}-panel`}
                      role="region"
                      aria-labelledby={`wheel-${id}-button`}
                      hidden={!expanded}
                      className="wheel-accordion__panel"
                    >
                      <p>{item.blurb}</p>
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
