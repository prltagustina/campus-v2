"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Download, ExternalLink, Share2 } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { CarouselArrows } from "@/components/v3/carousel-arrows";
import { CarouselDots } from "@/components/v3/carousel-dots";

export function VideoEmbed({
  videoId,
  title,
  className = "!px-4 !pb-4 md:!px-[14px] md:!pb-[14px]",
  topClassName = "!pt-4 md:!pt-[14px]",
  mediaClassName = "rounded-2xl",
}: {
  videoId: string;
  title: string;
  /** Padding horizontal + inferior de la sección. */
  className?: string;
  topClassName?: string;
  /** Esquinas del video. Si va a borde (sin padding horizontal), pasar
   * "rounded-none md:rounded-2xl" para no recortar contra el borde. */
  mediaClassName?: string;
}) {
  return (
    <section className={`v3-section ${className} ${topClassName}`}>
      {/* Sin shadow propia (antes shadow-[0_12px_40px_rgba(73,73,99,.10)]):
         en Inicio, con el apilado por scroll, se veía como una mancha al
         despegarse - pedido explícito de blancos/transparencias, sin
         sombras (mismo criterio en todo lugar donde se usa este video). */}
      <div className={`relative aspect-video overflow-hidden bg-[#171729] ${mediaClassName}`}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}

export function SlideDeckEmbed({ src, title, label = "Presentación institucional" }: { src: string; title: string; label?: string }) {
  const [loaded, setLoaded] = useState(false);

  return <div>
    {/* Encabezado suelto, afuera de la tarjeta: mismo criterio "chips" que
       RepositoryPanel (Marco normativo, Documentos disponibles, etc.) —
       antes el título y el "Abrir" vivían dentro de la misma caja que el
       video, como un contenedor todo-en-uno. Sin ícono y con label chico en
       mayúsculas (antes h3 + caja de ícono): mismo tratamiento "tipo
       resolución" que el resto de los encabezados de Familias/Directivos/
       EIB. La fila mide 40px por el botón: items-start alinea el label con
       los demás encabezados y, sin margen extra, deja el visor en el mismo
       comienzo vertical que el primer chip de los otros paneles. */}
    <div className="flex items-start gap-3 px-1">
      <p className="min-w-0 flex-1 truncate text-xs font-bold uppercase tracking-[.1em] text-[#494963]/40">{label}</p>
      <a href={src} target="_blank" rel="noreferrer" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#494963]/[.06] text-[#494963] transition-colors hover:bg-[#494963]/[.12]" aria-label={`Abrir ${title} en una nueva pestaña`}><ExternalLink className="h-4 w-4" /></a>
    </div>
    {/* Sin el marco gris (bg-[#E9E9EE] p-1.5/p-2) que envolvía el iframe -
       pedido explícito de sacar ese reborde. xl:aspect-auto + xl:h (no
       md:max-h combinado con aspect-video, como había quedado antes): con
       aspect-video Y max-height en el mismo elemento, el navegador no
       "letterboxea" - achica el ANCHO de la caja para mantener el 16:9
       contra el alto tope, dejando un hueco vacío a la derecha (quedaba
       angosta) - por eso "quedaron muy anchas" con respecto al resto:
       en realidad habían quedado angostas y desalineadas, no anchas.
       Separar en aspect-ratio (mobile/tablet, sin tope) y alto fijo por
       clamp (desktop, sin aspect-ratio) evita ese bug: el ancho se mantiene
       al 100% siempre, el iframe letterboxea adentro.
       xl: (no md:), para no afectar tablets (el ancho de iPad incluso
       apaisado, ~1024-1180px, queda excluido) - ahí no hace falta ningún
       tope, por eso se habían achicado sin necesidad.
       calc(100svh - 562px): el tope se achica junto con la ventana (562px
       = header del sitio + cabecera editorial + tabs + fila del título de
       la presentación, todo fijo) - así no hace scroll en ventanas de
       desktop más bajas (1366x768, etc.). clamp para no desaparecer en
       ventanas muy bajas ni crecer de más en las muy altas. */}
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#DDDDE4] shadow-[0_2px_10px_rgba(73,73,99,.065)] xl:aspect-auto xl:h-[clamp(180px,calc(100svh_-_562px),420px)]">
      {!loaded ? (
        <div className="absolute inset-0 z-10 grid place-items-center bg-[#F4F4F6]" role="status" aria-live="polite">
          <span className="flex items-center gap-3 text-sm font-semibold text-[#494963]/65">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#494963]/15 border-t-[#494963]" aria-hidden="true" />
            Cargando presentación…
          </span>
        </div>
      ) : null}
      <iframe
        src={src}
        className={`absolute inset-0 h-full w-full bg-white transition-opacity ${loaded ? "opacity-100" : "opacity-0"}`}
        title={title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setLoaded(true)}
        allowFullScreen
      />
    </div>
  </div>;
}

export interface DocumentoHeroProps {
  titulo: string;
  tituloEditorial?: readonly string[];
  eyebrow: string;
  descripcion: string;
  descripcionEditorial?: readonly (readonly string[])[];
  portadaSrc: string;
  pdfUrl: string;
  accent?: string;
  accentText?: string;
  secondaryHref?: string;
  tiltedCover?: boolean;
  compact?: boolean;
}

export function DocumentoHero({ titulo, tituloEditorial, eyebrow, descripcion, descripcionEditorial, portadaSrc, pdfUrl, accent = "#EDEDF0", accentText = "#494963", secondaryHref, tiltedCover = false, compact = false }: DocumentoHeroProps) {
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ title: titulo, url }).catch(() => undefined);
    else await navigator.clipboard?.writeText(url);
  };
  // md:!pt-0 (no md:!p-[14px] en los 4 lados): el espacio "de arriba" ya lo
  // da el pt del wrapper en Home ("documento") — si acá también suma 14px,
  // el salto entre secciones queda más grande que entre las demás (mismo
  // criterio que DocumentoExplainer en las áreas).
  return (
    <section className="documento-hero-shell v3-section !p-0 md:!pb-[14px] md:!pl-[14px] md:!pr-[14px] md:!pt-0">
      <div className={`documento-hero ${compact ? "documento-hero--compact" : "documento-hero--standard"}`}>
        <div className="documento-hero__cover">
          <Image
            src={portadaSrc}
            alt={`Portada de ${titulo}`}
            fill
            // Sin drop-shadow propio (antes drop-shadow-[0_20px_28px_rgba(73,73,99,.24)]):
            // con el apilado por scroll de Inicio se veía como una mancha al
            // despegarse la tarjeta - pedido explícito de blancos/transparencias.
            className={`documento-hero__image ${tiltedCover ? "documento-hero__image--tilted" : ""}`}
            sizes="(max-width: 559px) 78vw, (max-width: 1279px) 28vw, 24vw"
          />
        </div>
        <div className="documento-hero__content">
          {eyebrow && <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em]" style={{ color: compact ? "rgba(255,255,255,.5)" : accent }}>{eyebrow}</p>}
          <h2 className="documento-hero__title font-display font-medium leading-tight" aria-label={tituloEditorial ? titulo : undefined}>
            {tituloEditorial ? tituloEditorial.map((line, index) => <span className="documento-hero__title-line" key={line}>{line}{index < tituloEditorial.length - 1 ? " " : ""}</span>) : titulo}
          </h2>
          <p className={`documento-hero__description max-w-2xl whitespace-pre-line leading-relaxed ${compact ? "text-white/65" : "text-white/70"}`}>
            {descripcionEditorial ? descripcionEditorial.map((paragraph, paragraphIndex) => (
              <span className="documento-hero__description-paragraph" key={paragraphIndex}>
                {paragraph.map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {line}
                    {lineIndex < paragraph.length - 1 && <><span className="documento-hero__description-editorial-space"> </span><br className="documento-hero__description-editorial-break" /></>}
                  </span>
                ))}
              </span>
            )) : descripcion}
          </p>
          {/* Descargar / Saber más / Compartir en una sola fila (antes "Saber
             más" iba en su propia fila, mt-1 basis-full): pedido explícito
             de tenerlos alineados, con "Saber más" en el medio. Texto
             "Descargar PDF" oculto en mobile (solo el ícono) para que los
             tres entren en una fila incluso en pantallas chicas - además
             libera alto, que hace falta con la sección apilada por scroll
             de Inicio (sin esto, con poco alto de pantalla el botón podía
             quedar tapado). h-10 sm:h-11 en los tres (antes h-[52px]/h-12/
             h-[52px], quedaban descalzados entre sí): mismo alto exacto que
             el botón "Descargar PDF" de los banners de área
             (DocumentoExplainer), para que sea consistente en todo el
             sitio. */}
          <div className="documento-hero__actions flex flex-wrap items-center gap-2.5 sm:gap-4">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Descargar PDF: ${titulo}`}
              className="inline-flex h-10 items-center gap-2.5 rounded-[9px] px-4 text-[15px] font-semibold tracking-[-0.035em] transition-[filter] hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 sm:h-11 sm:px-7"
              style={{ backgroundColor: compact ? "#EDEDF0" : accent, color: compact ? "#494963" : accentText }}
            >
              <Download className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} /> <span className="hidden sm:inline">Descargar PDF</span>
            </a>
            {secondaryHref && (
              <Link href={secondaryHref}>
                <span className="inline-flex h-10 w-fit items-center rounded-[9px] border border-white/55 px-4 text-[15px] font-medium tracking-[-0.035em] transition-colors hover:bg-white/10 sm:h-11 sm:px-7">
                  Saber más
                </span>
              </Link>
            )}
            <button
              type="button"
              onClick={share}
              aria-label={`Compartir ${titulo}`}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/55 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 sm:h-11 sm:w-11"
            >
              <Share2 className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export interface StepItem {
  eyebrow?: string;
  title: string;
  description: string | string[];
  content?: React.ReactNode;
}

export function DocumentoStepper({ title, steps }: { title: React.ReactNode; steps: StepItem[] }) {
  return (
    // !pt-5/md:!pt-6 (antes !pt-8/md:!pt-10): menos aire entre secciones a
    // propósito, mismo criterio en toda la página - que se vea que sigue
    // contenido más abajo.
    <section className="v3-section !px-0 !pb-0 !pt-5 bg-[#F5F5F7] md:!px-[14px] md:!pb-[14px] md:!pt-6 md:bg-transparent">
      <div className="rounded-none bg-[#F5F5F7] p-5 md:rounded-2xl md:p-8 lg:p-10">
      {/* Sin loop: al llegar al último paso, "Siguiente" se deshabilita en
         vez de volver al primero — mismo criterio en todos los carruseles
         del sitio. */}
      <Carousel opts={{ loop: false }}>
        <h2 className="max-w-sm font-sans text-2xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#494963] sm:text-3xl lg:text-4xl">{title}</h2>
        {/* Anterior/Siguiente sobre el propio paso (no arriba, junto al
           título): "relative" acá adentro, no en el <Carousel>, para que se
           centren contra el contenido del paso y no contra todo el bloque
           (que de otro modo incluye los StepperDots de abajo). md:px-10:
           margen propio para las flechas, afuera del contenido del paso
           (antes se superponían al numeral/texto). */}
        <div className="relative md:px-10">
          <CarouselContent className="mt-5 sm:mt-7">
            {steps.map((step, index) => (
              <CarouselItem key={index} className="basis-full">
                {/* gap-2 en mobile (antes gap-4): el título quedaba lejos
                   del numeral. sm:gap-8 sin tocar (ahí ya se usa como
                   separación horizontal desde md). */}
                <div className="grid gap-2 sm:gap-8 md:grid-cols-[.4fr_1.6fr] md:items-center">
                  {/* Un paso más grande en cada breakpoint (antes
                     text-6xl/7xl/8xl): pedido explícito, sin romper el
                     layout - la columna del numeral (.4fr) y el gap ya le
                     dan lugar de sobra. */}
                  <span className="font-sans text-7xl font-black leading-none text-[#E4E4E9] sm:text-8xl lg:text-9xl">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    {step.eyebrow && <p className="v3-eyebrow">{step.eyebrow}</p>}
                    {/* text-xl font-bold en mobile (antes text-lg font-semibold):
                       quedaba chico y poco presente al lado de un numeral tan
                       grande. sm:text-2xl sin tocar. */}
                    <h3 className="font-sans text-xl font-bold text-[#494963] sm:text-2xl sm:font-semibold">{step.title}</h3>
                    {(Array.isArray(step.description) ? step.description : [step.description]).map((paragraph, i) => (
                      <p key={i} className="mt-3 max-w-xl font-sans text-base leading-relaxed text-[#8B8B99] sm:leading-[1.5]">{paragraph}</p>
                    ))}
                    {step.content ? <div className="mt-5 min-h-10">{step.content}</div> : null}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselArrows prevLabel="Paso anterior" nextLabel="Paso siguiente" />
        </div>
        <CarouselDots className="mt-6" />
      </Carousel>
      </div>
    </section>
  );
}
