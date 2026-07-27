"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";

export interface DocumentoExplainerProps {
  titulo: string;
  descripcion: string;
  portadaSrc: string;
  pdfUrl: string;
  accent: string;
  accentText: string;
}

export function DocumentoExplainer({ titulo, descripcion, portadaSrc, pdfUrl, accent, accentText }: DocumentoExplainerProps) {
  const [slide, setSlide] = useState<0 | 1>(0);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ title: titulo, url }).catch(() => undefined);
    else await navigator.clipboard?.writeText(url);
  };

  return (
    <section className="v3-section">
      <div className="relative overflow-hidden rounded-3xl" style={{ backgroundColor: accent, color: accentText }}>
        {slide === 1 ? (
          <button type="button" onClick={() => setSlide(0)} aria-label="Slide anterior" className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/[.06] text-current transition-colors hover:bg-black/[.12] sm:left-6">
            <ChevronLeft className="h-5 w-5" />
          </button>
        ) : null}
        {slide === 0 ? (
          <button type="button" onClick={() => setSlide(1)} aria-label="Slide siguiente" className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/[.06] text-current transition-colors hover:bg-black/[.12] sm:right-6">
            <ChevronRight className="h-5 w-5" />
          </button>
        ) : null}

        <div className="grid gap-8 px-10 py-12 sm:px-14 sm:py-16 md:min-h-[440px] md:grid-cols-[1fr_1.3fr] md:items-center md:px-20">
          {slide === 0 ? (
            <>
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-lg shadow-[0_20px_40px_rgba(20,20,35,.28)]">
                <Image src={portadaSrc} alt={`Portada de ${titulo}`} fill className="object-cover" sizes="(max-width: 767px) 70vw, 320px" />
              </div>
              <div>
                <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-current text-xl font-bold">1</span>
                <h3 className="mt-5 font-display text-3xl font-semibold leading-[1.05] tracking-[-.035em] sm:text-4xl">Descargá el<br />documento del área</h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed opacity-80 sm:text-base">{descripcion}</p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a href={pdfUrl} target="_blank" rel="noreferrer" aria-label={`Descargar PDF: ${titulo}`} className="inline-flex h-12 items-center gap-2 rounded-full bg-[#494963] px-6 font-bold text-white">
                    <Download className="h-4 w-4" /> Descargar PDF
                  </a>
                  <button type="button" onClick={share} aria-label={`Compartir ${titulo}`} className="grid h-12 w-12 place-items-center rounded-full border-2 border-current text-current">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-current text-xl font-bold">2</span>
                <h3 className="mt-5 font-display text-3xl font-semibold leading-[1.05] tracking-[-.035em] sm:text-4xl">Cómo navegar<br />el texto</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-[1.2fr_1fr] sm:items-stretch">
                <div className="relative overflow-hidden rounded-xl bg-white p-6 shadow-[0_16px_36px_rgba(20,20,35,.18)]" aria-hidden="true">
                  <div className="space-y-2.5">
                    <span className="block h-2 w-2/3 rounded-full bg-[#494963]/10" />
                    <span className="block h-2 w-full rounded-full bg-[#494963]/10" />
                    <span className="block h-2 w-full rounded-full bg-[#494963]/10" />
                    <span className="block h-2 w-4/5 rounded-full bg-[#494963]/10" />
                    <span className="block h-2 w-full rounded-full bg-[#494963]/10" />
                    <span className="block h-2 w-3/5 rounded-full bg-[#494963]/10" />
                  </div>
                  <span className="absolute right-6 top-6 h-9 w-9 rounded-full border-2 border-dashed" style={{ borderColor: accent }} />
                  <span className="absolute bottom-8 left-8 h-7 w-7 rounded-full border-2 border-dashed" style={{ borderColor: accent }} />
                </div>
                <div className="flex items-center rounded-xl bg-[#E42153] p-6 text-white">
                  <p className="font-display text-lg font-bold italic leading-snug">
                    Recorré el documento con las referencias visuales que acompañan cada sección.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center gap-2 pb-8" aria-label={`Slide ${slide + 1} de 2`}>
          {([0, 1] as const).map((index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSlide(index)}
              aria-label={`Ir al slide ${index + 1}`}
              aria-current={index === slide ? "step" : undefined}
              className="h-2.5 w-2.5 rounded-full border-2 transition-opacity"
              style={{ borderColor: accentText, backgroundColor: index === slide ? accentText : "transparent", opacity: index === slide ? 1 : 0.4 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
