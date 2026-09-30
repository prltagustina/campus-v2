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

/**
 * Antes era una tarjeta "hero" (min-h-[520px], portada sin tope de alto,
 * título grande) - a pedido, pasa a ser un banner: la portada da un toque
 * visual (no un botón plano), pero no es la protagonista - para cuando
 * llegás acá ya leíste el documento principal, así que no hace falta
 * tanta jerarquía. El fondo de color pleno ya le da entidad de sobra.
 */
export function DocumentoExplainer({ titulo, descripcion, portadaSrc, pdfUrl, accent, accentText, heading }: DocumentoExplainerProps) {
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ title: titulo, url }).catch(() => undefined);
    else await navigator.clipboard?.writeText(url);
  };

  return (
    <section className="v3-section !p-0 md:!pb-[14px] md:!pl-[14px] md:!pr-[14px] md:!pt-0">
      {/* mx-auto max-w-4xl adentro (ver más abajo): en pantallas muy anchas
         (el aside/rail son angostos, la tarjeta ocupa casi todo el ancho)
         portada+texto quedaban pegados a la izquierda con un montón de
         espacio vacío a la derecha - centrado como el resto de las
         secciones del sitio. */}
      <div
        className="rounded-none px-4 py-5 sm:rounded-2xl sm:px-6 sm:py-6"
        style={{ backgroundColor: accent, color: accentText }}
      >
        {/* lg:flex-row (no sm:): en tablet (md, ~768px) rail+aside ya comen
           buena parte del ancho - en fila ahí el texto quedaba aplastado a
           una palabra por línea. Apilado hasta que hay espacio real de
           sobra (mismo criterio que RepositoryFileGroup, más abajo en la
           página). lg:items-center (no items-start): pedido explícito - el
           texto al lado de la portada se centra contra el largo de la
           portada, no queda pegado arriba. lg:w-fit (no w-full): sin esto,
           la fila estiraba hasta los 896px de max-w-4xl y el texto (corto)
           quedaba pegado a la izquierda con un vacío enorme a la derecha -
           el grupo imagen+texto ahora mide lo que su contenido necesita, y
           mx-auto centra ESE bloque compacto en vez de estirarlo. */}
        <div className="mx-auto flex max-w-4xl flex-col gap-4 lg:w-fit lg:flex-row lg:items-center lg:gap-6">
          {/* Apilado (hasta lg): portada grande y centrada, como la
             referencia - las versiones anteriores (w-14 a w-40) se seguían
             leyendo chicas. En fila (lg+): tamaño fijo, pegada a la
             izquierda del texto (no centrada, ahí ya no hay "arriba/abajo"
             sino "al costado"). */}
          <div className="relative aspect-[3/4] w-3/5 max-w-[240px] mx-auto shrink-0 overflow-hidden rounded-md shadow-[0_8px_20px_rgba(20,20,35,.22)] lg:mx-0 lg:w-48 lg:max-w-none">
            <Image src={portadaSrc} alt="" aria-hidden="true" fill className="object-cover" sizes="(max-width: 1023px) 240px, 192px" />
          </div>
          <div className="min-w-0 lg:max-w-md">
            {/* text-2xl/3xl/4xl: tamaño de antes del banner, sin tocar - pedido
               explícito de mantenerlo igual aunque el resto se redujo. */}
            <h3 className="font-display text-2xl font-semibold leading-[1.05] tracking-[-.035em] sm:text-3xl lg:text-4xl">{heading ?? <>Descargá<br />el documento del área</>}</h3>
            {/* max-w-md en vez de flex-1: la columna ya no se estira a
               ocupar todo el resto del max-w-4xl (eso hacía que el texto
               corto quedara con un vacío enorme a la derecha) - ahora mide
               lo que el texto necesita, como el resto del grupo. */}
            <p className="mt-1 text-sm leading-relaxed opacity-80">{descripcion}</p>
            {/* Botones abajo del texto en todos los anchos (antes al costado
               desde lg, quedaban en una tercera columna aparte). */}
            <div className="mt-4 flex items-center gap-2.5">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Descargar PDF: ${titulo}`}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-[9px] bg-white px-4 text-sm font-semibold tracking-[-0.035em] text-[#494963] sm:h-11 sm:px-5"
              >
                <Download className="h-4 w-4 shrink-0" />
                <span>Descargar PDF</span>
              </a>
              <button type="button" onClick={share} aria-label={`Compartir ${titulo}`} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-current text-current sm:h-11 sm:w-11">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
