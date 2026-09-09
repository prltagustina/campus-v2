"use client";

import Image from "next/image";
import { ReactNode, useState } from "react";
import { ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";
import { NavigateTextHotspots } from "@/components/v3/navigate-text-hotspots";

export interface DocumentoExplainerProps {
  titulo: string;
  descripcion: string;
  portadaSrc: string;
  pdfUrl: string;
  accent: string;
  accentText: string;
  heading?: ReactNode;
  /** Oculta el segundo slide ("Cómo navegar el texto") y toda la navegación
   * entre slides, para documentos que no necesitan esa ayuda genérica (p. ej.
   * Marco General, que no es un área curricular). */
  singleSlide?: boolean;
}

export function DocumentoExplainer({ titulo, descripcion, portadaSrc, pdfUrl, accent, accentText, heading, singleSlide = false }: DocumentoExplainerProps) {
  const [slide, setSlide] = useState<0 | 1>(0);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ title: titulo, url }).catch(() => undefined);
    else await navigator.clipboard?.writeText(url);
  };

  return (
    <section className="v3-section !p-0 md:!pb-[14px] md:!pl-[14px] md:!pr-[14px] md:!pt-0">
      <div className="relative overflow-hidden rounded-none md:rounded-2xl" style={{ backgroundColor: accent, color: accentText }}>
        {!singleSlide ? (
          <>
            <button
              type="button"
              onClick={() => setSlide(0)}
              aria-label="Slide anterior"
              aria-hidden={slide === 0}
              tabIndex={slide === 0 ? -1 : undefined}
              className={`absolute left-3 top-[143px] z-10 grid h-11 w-11 place-items-center rounded-full bg-black/15 text-current shadow-sm transition-[background-color,opacity] hover:bg-black/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current sm:left-6 sm:top-[212px] lg:top-1/2 lg:-translate-y-1/2 ${slide === 0 ? "pointer-events-none opacity-0" : ""}`}
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => setSlide(1)}
              aria-label="Slide siguiente"
              aria-hidden={slide === 1}
              tabIndex={slide === 1 ? -1 : undefined}
              className={`absolute right-3 top-[143px] z-10 grid h-11 w-11 place-items-center rounded-full bg-black/15 text-current shadow-sm transition-[background-color,opacity] hover:bg-black/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current sm:right-6 sm:top-[212px] lg:top-1/2 lg:-translate-y-1/2 ${slide === 1 ? "pointer-events-none opacity-0" : ""}`}
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>
          </>
        ) : null}

        {singleSlide ? (
          /* Tablet (md, 768–1023px): una sola columna con aire; recién en lg
             pasa a dos columnas centradas. Con md ya en 2 columnas la portada
             de 320px aplastaba el texto y quedaba feo. */
          <div className="grid content-start gap-6 px-6 py-8 sm:gap-8 sm:px-10 sm:py-12 md:gap-10 md:px-14 md:py-14 lg:min-h-[520px] lg:grid-cols-[1fr_1.3fr] lg:content-center lg:items-center lg:px-20 lg:py-16">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[200px] overflow-hidden rounded-lg shadow-[0_20px_40px_rgba(20,20,35,.28)] sm:max-w-[280px] lg:max-w-[320px]">
              <Image src={portadaSrc} alt={`Portada de ${titulo}`} fill className="object-cover" sizes="(max-width: 1023px) 280px, 320px" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold leading-[1.05] tracking-[-.035em] sm:text-3xl lg:text-4xl">{heading ?? <>Descargá el<br />documento del área</>}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed opacity-80 sm:mt-4 sm:text-base">{descripcion}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7">
                <a href={pdfUrl} target="_blank" rel="noreferrer" aria-label={`Descargar PDF: ${titulo}`} className="inline-flex h-11 items-center gap-2 rounded-[9px] bg-white px-5 font-semibold tracking-[-0.035em] text-[#494963] sm:h-12 sm:px-6">
                  <Download className="h-4 w-4" /> Descargar PDF
                </a>
                <button type="button" onClick={share} aria-label={`Compartir ${titulo}`} className="grid h-11 w-11 place-items-center rounded-full border border-current text-current sm:h-12 sm:w-12">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Desktop (lg+): los dos slides se apilan en la misma celda con
             visibility (no display) para que el contenedor mida siempre lo
             mismo → igual alto entre slides y flechas al mismo top.
             Mobile y tablet (<lg): solo se renderiza el slide activo
             (display:none al otro), en una sola columna con aire. Con md ya en
             2 columnas la portada aplastaba el texto y quedaba feo. */
          <div className="grid px-6 py-8 sm:px-10 sm:py-12 md:px-14 md:py-14 lg:min-h-[520px] lg:px-20 lg:py-16 lg:[&>*]:col-start-1 lg:[&>*]:row-start-1">
            <div aria-hidden={slide !== 0} className={`content-start gap-6 sm:gap-8 md:gap-10 lg:grid lg:grid-cols-[1fr_1.3fr] lg:items-start ${slide === 0 ? "grid" : "hidden lg:invisible"}`}>
              <span className="hidden w-fit lg:order-2 lg:col-start-2 lg:row-start-1 lg:inline-flex lg:h-9 lg:items-center lg:rounded-full lg:border-2 lg:border-current lg:px-4 lg:text-sm lg:font-bold">1 de 2</span>
              <div className="relative order-2 mx-auto aspect-[3/4] w-full max-w-[200px] overflow-hidden rounded-lg shadow-[0_20px_40px_rgba(20,20,35,.28)] sm:max-w-[280px] lg:order-1 lg:col-start-1 lg:row-span-2 lg:max-w-[320px]">
                <Image src={portadaSrc} alt={`Portada de ${titulo}`} fill className="object-cover" sizes="(max-width: 1023px) 280px, 320px" />
              </div>
              <div className="order-3 lg:order-3 lg:col-start-2 lg:row-start-2">
                <h3 className="font-display text-2xl font-semibold leading-[1.05] tracking-[-.035em] sm:text-3xl lg:text-4xl">{heading ?? <>Descargá el<br />documento del área</>}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed opacity-80 sm:mt-4 sm:text-base">{descripcion}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7">
                  <a href={pdfUrl} target="_blank" rel="noreferrer" aria-label={`Descargar PDF: ${titulo}`} className="inline-flex h-11 items-center gap-2 rounded-[9px] bg-white px-5 font-semibold tracking-[-0.035em] text-[#494963] sm:h-12 sm:px-6">
                    <Download className="h-4 w-4" /> Descargar PDF
                  </a>
                  <button type="button" onClick={share} aria-label={`Compartir ${titulo}`} className="grid h-11 w-11 place-items-center rounded-full border border-current text-current sm:h-12 sm:w-12">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div aria-hidden={slide !== 1} className={`content-start gap-6 sm:gap-8 md:gap-10 lg:grid lg:grid-cols-[1fr_1.3fr] lg:items-start ${slide === 1 ? "grid" : "hidden lg:invisible"}`}>
              <NavigateTextHotspots
                accent={accent}
                badge={
                  <span className="hidden w-fit lg:order-2 lg:col-start-2 lg:row-start-1 lg:inline-flex lg:h-9 lg:items-center lg:rounded-full lg:border-2 lg:border-current lg:px-4 lg:text-sm lg:font-bold">2 de 2</span>
                }
                title={
                  <h3 className="font-display text-2xl font-semibold leading-[1.05] tracking-[-.035em] sm:text-3xl lg:text-4xl">Cómo navegar<br />el texto</h3>
                }
              />
            </div>
          </div>
        )}

        {!singleSlide ? (
          <div className="flex justify-center gap-2 pb-8" aria-label={`Slide ${slide + 1} de 2`}>
            {([0, 1] as const).map((index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSlide(index)}
                aria-label={`Ir al slide ${index + 1}`}
                aria-current={index === slide ? "step" : undefined}
                className="h-2 w-2 rounded-full transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: accentText, outlineColor: accentText, opacity: index === slide ? 1 : 0.3 }}
              />
            ))}
          </div>
        ) : (
          /* Sin puntitos de slide, pero reservamos su mismo alto (8px + pb-8)
             para que la tarjeta de Marco General termine a la misma altura que
             la de las áreas. */
          <div aria-hidden className="h-10" />
        )}
      </div>
    </section>
  );
}
