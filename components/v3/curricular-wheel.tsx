"use client";

import Image from "next/image";
import { useState } from "react";
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

type WheelStateId = "base" | "intro" | "relacion" | "ejes" | "marco" | "enfoques";

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
  // Primer ítem del acordeón: es el propio título "Trama curricular". Al abrirlo
  // muestra una introducción y la rueda queda a color (no atenúa nada).
  intro: {
    label: "Trama curricular",
    blurb:
      "Las nueve áreas se articulan entre sí y con los cinco enfoques transversales, alrededor del Marco General.",
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
    // PNG definitivo: grisado + circulitos a color horneados en el propio PNG
    // (no lleva el filtro CSS interino, ver `isFocused`).
    image: "/images/trama/trama-ejes.png",
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

/** Ítems del acordeón, en orden. El primero ("intro") es el propio título. */
const RENDERED_STATE_IDS = ["intro", "relacion", "ejes", "marco"] as const satisfies readonly WheelStateId[];

export function CurricularWheel() {
  const [active, setActive] = useState<WheelStateId>("base");

  const state = wheelStates[active];
  // El grisado CSS interino solo se aplica a los estados que todavía usan el PNG
  // base; los que ya tienen su PNG propio (grisado horneado) se muestran tal cual.
  const isFocused = active !== "base" && active !== "intro" && state.image === WHEEL_BASE_IMAGE;

  return (
    // !p-0 md:!pb-[14px] md:!pl-[14px] md:!pr-[14px] md:!pt-0 (antes
    // md:!p-[14px], con padding arriba también): con el apilado por scroll
    // de Inicio, ese padding superior dejaba un hueco al quedar la sección
    // pegada arriba - el fondo de la tarjeta no llegaba hasta la línea de
    // arriba y se veía la sección de atrás (violeta/gris) asomando. Mismo
    // criterio que DocumentoExplainer (sin ese padding arriba tampoco).
    <section className="v3-section !p-0 md:!pb-[14px] md:!pl-[14px] md:!pr-[14px] md:!pt-0" aria-label="Trama curricular">
      {/* Sin shadow propia (antes md:shadow-[0_12px_45px_rgba(73,73,99,.07)]):
         con el apilado por scroll de Inicio, esa sombra se veía como una
         mancha/desprolijidad al despegarse la tarjeta de la siguiente
         sección - pedido explícito de blancos/transparencias, sin sombras. */}
      <div className="overflow-hidden rounded-none bg-[#F1F1F4] px-5 pb-12 pt-4 sm:px-8 sm:pb-10 sm:pt-6 md:rounded-2xl md:px-12 md:py-12">
        {/* Mobile/tablet: la rueda arriba y el acordeón (con "Trama curricular"
            como primer ítem) debajo. Al quedar el acordeón al final, desplegar
            un ítem lo hace crecer hacia abajo y la rueda no se mueve (sin
            reservar alto). No hay scrollIntoView: todo entra en la vista.
            xl: rueda a la izquierda, acordeón a la derecha. Tamaño de
            siempre (no achicado): con el apilado por scroll de Inicio, si
            la rueda + el acordeón con un panel abierto no entran en una
            sola pantalla, la parte que sobra queda inalcanzable (la sección
            queda pegada arriba, sin scroll propio) - en vez de achicar la
            rueda (se pidió que se vea grande), el acordeón es el que tiene
            su propio scroll acotado en mobile/tablet (ver
            wheel-accordion--scroll más abajo), así nunca tapa nada. */}
        <div className="grid items-start gap-6 sm:gap-9 xl:grid-cols-[minmax(430px,1.15fr)_minmax(320px,.85fr)] xl:gap-14">
          <figure className="wheel-figure order-1 mx-auto w-full max-w-[284px] min-[400px]:max-w-[320px] sm:max-w-[440px] md:max-w-[520px] xl:max-w-[670px]" data-focused={isFocused || undefined}>
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
          </figure>

          <div className="order-2 min-w-0">
            {/* wheel-accordion--scroll (ver globals.css): en mobile/tablet, tope
               de alto + scroll propio - con la rueda apilada arriba a tamaño
               grande, un panel abierto podría no entrar en una sola pantalla;
               al quedar la sección "pegada" (apilado por scroll de Inicio) sin
               esto esa parte sobrante quedaba inalcanzable. Con scroll propio,
               el acordeón nunca empuja nada fuera de la vista. */}
            <div className="wheel-accordion wheel-accordion--compact wheel-accordion--reserve wheel-accordion--scroll" aria-label="Lecturas de la trama curricular">
              {RENDERED_STATE_IDS.map((id) => {
                const item = wheelStates[id];
                const expanded = active === id;
                const isTitle = id === "intro";
                return (
                  <div key={id} className="wheel-accordion__item">
                    <button
                      id={`wheel-${id}-button`}
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`wheel-${id}-panel`}
                      onClick={() => setActive((current) => (current === id ? "base" : id))}
                      className={`wheel-accordion__trigger ${isTitle ? "!pt-0 !pb-4 md:!pt-4" : ""}`}
                    >
                      {isTitle ? (
                        <span className="font-display text-2xl font-semibold tracking-[-.035em] text-[#494963] sm:text-3xl lg:text-4xl">{item.label}</span>
                      ) : (
                        <span>{item.label}</span>
                      )}
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
