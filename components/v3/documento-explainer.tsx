"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { Download, Share2 } from "lucide-react";

export interface DocumentoExplainerProps {
  titulo: string;
  descripcion: string;
  portadaSrc: string;
  pdfUrl: string;
  accent: string;
  accentText: string;
  heading?: ReactNode;
}

export function DocumentoExplainer({ titulo, descripcion, portadaSrc, pdfUrl, accent, accentText, heading }: DocumentoExplainerProps) {
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ title: titulo, url }).catch(() => undefined);
    else await navigator.clipboard?.writeText(url);
  };

  return (
    <section className="v3-section !p-0 md:!pb-[14px] md:!pl-[14px] md:!pr-[14px] md:!pt-0">
      <div className="relative overflow-hidden rounded-none md:rounded-2xl" style={{ backgroundColor: accent, color: accentText }}>
        {/* Tablet (md, 768–1023px): una sola columna con aire; recién en lg
           pasa a dos columnas centradas. Con md ya en 2 columnas la portada
           de 320px aplastaba el texto y quedaba feo.
           px-4/sm:px-7 (sin crecer en md/lg): mismo inset que el botón de
           categoría de Itinerarios ("Docencia"), para que el borde del
           bloque quede alineado con el de ahí. Portada a la izquierda,
           texto a la derecha (como siempre).
           Columnas parejas (1fr/1fr, antes 1fr/1.3fr) y la portada sin tope
           fijo en lg: con el aside/rail más angostos la tarjeta quedó más
           ancha, y el tope de 320px dejaba la imagen chica y perdida en un
           mar de color vacío — nunca tiene que verse más chica que el texto. */}
        <div className="grid content-start gap-6 px-4 py-8 sm:gap-8 sm:px-7 sm:py-12 md:gap-10 md:py-14 lg:min-h-[520px] lg:grid-cols-[1fr_1fr] lg:content-center lg:items-center lg:py-16">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[200px] overflow-hidden rounded-lg shadow-[0_20px_40px_rgba(20,20,35,.28)] sm:max-w-[280px] lg:max-w-none">
            <Image src={portadaSrc} alt={`Portada de ${titulo}`} fill className="object-cover" sizes="(max-width: 1023px) 280px, 45vw" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-semibold leading-[1.05] tracking-[-.035em] sm:text-3xl lg:text-4xl">{heading ?? <>Descargá el<br />documento del área</>}</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed opacity-80 sm:text-base">{descripcion}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7">
              {/* Botón entero con texto en todos los anchos (antes en mobile
                 quedaba solo el ícono, circular, y el texto recién
                 aparecía desde sm). */}
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Descargar PDF: ${titulo}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[9px] bg-white px-5 font-semibold tracking-[-0.035em] text-[#494963] sm:h-12 sm:px-6"
              >
                <Download className="h-4 w-4 shrink-0" />
                <span>Descargar PDF</span>
              </a>
              <button type="button" onClick={share} aria-label={`Compartir ${titulo}`} className="grid h-11 w-11 place-items-center rounded-full border border-current text-current sm:h-12 sm:w-12">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
