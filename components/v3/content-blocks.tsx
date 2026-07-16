"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Download, ExternalLink, Presentation, Share2 } from "lucide-react";

export function VideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <section className="v3-section">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#171729] shadow-[0_12px_40px_rgba(73,73,99,.10)]">
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

export function SlideDeckEmbed({ src, title, label = "Presentación institucional", posterSrc }: { src: string; title: string; label?: string; posterSrc?: string }) {
  const [requested, setRequested] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return <div className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_32px_rgba(73,73,99,.08)]">
    <div className="flex min-h-14 items-center gap-3 border-b border-[#494963]/[.07] px-4 md:px-5">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#494963]/[.06] text-[#494963]"><Presentation className="h-4 w-4" /></span>
      <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-[#494963]">{label}</p><p className="text-[10px] uppercase tracking-[.12em] text-[#494963]/35">Diapositivas</p></div>
      <a href={src} target="_blank" rel="noreferrer" className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#F1F1F4] px-3 text-xs font-semibold text-[#494963]" aria-label={`Abrir ${title} en una nueva pestaña`}>Abrir<ExternalLink className="h-3 w-3" /></a>
    </div>
    <div className="bg-[#E9E9EE] p-1.5 md:p-2">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-[#DDDDE4]">
        {!requested ? (
          <button
            type="button"
            onClick={() => setRequested(true)}
            className="group absolute inset-0 w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#494963]"
            aria-label={`Cargar ${title}`}
          >
            {posterSrc ? <Image src={posterSrc} alt="" fill className="object-cover object-right" sizes="(max-width: 1023px) calc(100vw - 3rem), 896px" /> : null}
            <span className={`absolute inset-0 ${posterSrc ? "bg-gradient-to-r from-[#494963]/95 via-[#494963]/70 to-[#494963]/15" : "bg-[#494963]"}`} aria-hidden="true" />
            <span className="absolute inset-0 flex max-w-lg flex-col justify-end p-5 text-white sm:p-8">
              <span className="text-[10px] font-extrabold uppercase tracking-[.17em] text-white/55 sm:text-xs">Presentación interactiva</span>
              <strong className="mt-2 text-xl leading-tight sm:text-2xl">{title}</strong>
              <span className="mt-4 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-[#494963] shadow-sm transition-transform group-hover:translate-x-1">
                <Presentation className="h-4 w-4" /> Ver presentación
              </span>
            </span>
          </button>
        ) : (
          <>
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
          </>
        )}
      </div>
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
  return (
    <section className="documento-hero-shell v3-section">
      <div className={`documento-hero ${compact ? "documento-hero--compact" : "documento-hero--standard"}`}>
        <div className="documento-hero__cover">
          <Image
            src={portadaSrc}
            alt={`Portada de ${titulo}`}
            fill
            className={`documento-hero__image drop-shadow-[0_20px_28px_rgba(73,73,99,.24)] ${tiltedCover ? "documento-hero__image--tilted" : ""}`}
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
          <div className="documento-hero__actions flex flex-wrap items-center gap-3">
            <a href={pdfUrl} target="_blank" rel="noreferrer" aria-label={`Descargar PDF: ${titulo}`} className="inline-flex h-12 items-center gap-2 rounded-full px-6 font-bold" style={{ backgroundColor: compact ? "#EDEDF0" : accent, color: compact ? "#494963" : accentText }}>
              <Download className="h-4 w-4" /> Descargar PDF
            </a>
            <button type="button" onClick={share} aria-label={`Compartir ${titulo}`} className="grid h-12 w-12 place-items-center rounded-full border border-white/30 hover:bg-white/10">
              <Share2 className="h-4 w-4" />
            </button>
            {secondaryHref && <Link href={secondaryHref} className="basis-full"><span className="mt-1 inline-flex h-11 items-center rounded-full border border-white/40 px-6 font-semibold">Saber más</span></Link>}
          </div>
        </div>
      </div>
    </section>
  );
}

export interface StepItem {
  eyebrow?: string;
  title: string;
  description: string;
  content?: React.ReactNode;
}

export function DocumentoStepper({ title, steps }: { title: string; steps: StepItem[] }) {
  const [current, setCurrent] = useState(0);
  const step = steps[current];
  return (
    <section className="v3-section">
      <div className="rounded-3xl bg-white p-7 shadow-[0_8px_32px_rgba(73,73,99,.08)] md:p-12">
        <h2 className="max-w-sm font-display text-4xl font-extrabold leading-[.9] tracking-[-0.05em]">{title}</h2>
        <div className="mt-8 grid h-[390px] gap-8 overflow-y-auto overscroll-contain [scrollbar-gutter:stable] sm:h-[350px] md:h-[250px] md:grid-cols-[.55fr_1.45fr] md:items-center">
          <span className="font-display text-8xl font-black text-[#EDEDF0] md:text-9xl">{String(current + 1).padStart(2, "0")}</span>
          <div>
            {step.eyebrow && <p className="v3-eyebrow">{step.eyebrow}</p>}
            <h3 className="font-display text-3xl font-extrabold text-[#494963]">{step.title}</h3>
            <p className="mt-4 max-w-xl leading-relaxed text-[#494963]/65">{step.description}</p>
            <div className="mt-5 min-h-10">{step.content}</div>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-2" aria-label={`Paso ${current + 1} de ${steps.length}`}>
            {steps.map((_, index) => <button key={index} onClick={() => setCurrent(index)} aria-label={`Ir al paso ${index + 1}`} aria-current={index === current ? "step" : undefined} className="flex h-3 w-8 items-center"><span className={`block h-2.5 rounded-full transition-[width,background-color] ${index === current ? "w-8 bg-[#494963]" : "w-2.5 bg-[#494963]/20"}`} /></button>)}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setCurrent((current - 1 + steps.length) % steps.length)} className="grid h-10 w-10 place-items-center rounded-full border border-[#494963]/20" aria-label="Paso anterior"><ChevronLeft className="h-4 w-4" /></button>
            <button onClick={() => setCurrent((current + 1) % steps.length)} className="grid h-10 w-10 place-items-center rounded-full bg-[#494963] text-white" aria-label="Paso siguiente"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
