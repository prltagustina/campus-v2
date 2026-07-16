"use client";

import Image from "next/image";
import { Fragment } from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const events2025 = [
  ["Septiembre 2025", "Jornadas de Socialización y Consulta", "En el norte, centro y sur de la provincia, con equipos directivos y docentes.", "/images/foto-7-septiembre2025.jpg"],
  ["31 de agosto", "Consulta a instituciones de Educación Primaria e IFD", "Consulta mediante la plataforma Educativa del Ministerio de Educación.", "/images/foto-6-31agosto.jpg"],
  ["27 de agosto", "Presentación al Comité Asesor Provincial de Discapacidad", "Presentación en la 3ª Asamblea Ordinaria del Comité Asesor Provincial.", "/images/foto-5-27agosto.jpg"],
  ["14 de agosto", "Socialización con equipos de supervisión", "Con participación de más de 150 supervisores y supervisoras de la provincia.", "/images/foto-4-14agosto.jpg"],
  ["1 de agosto", "Reunión con delegados y coordinadores regionales", "Presentación del proceso de escritura y diálogo en torno a dudas e inquietudes.", "/images/foto-3-01agosto.jpg"],
  ["25 de julio", "Encuentro con directores y supervisores", "Presentación general de la propuesta y conformación de mesas de trabajo.", "/images/foto-2-25julio.jpg"],
  ["22 de julio", "Encuentro con el Comité de Educación Ambiental", "Presentación de los enfoques transversales, especialmente Educación Ambiental Integral.", "/images/foto-1-22julio.jpg"],
] as const;

const years = [
  ["2026", "Implementación", "Implementación del nuevo diseño curricular. Construcción de metas de aprendizaje, materiales didácticos para el aula y formación docente."],
  ["2025", "Consolidación", "Consolidación de la escritura del nuevo borrador y realización de jornadas focales de socialización y consulta a la comunidad educativa."],
  ["2024", "Conformación", "Recuperación de escrituras anteriores y conformación de nuevos equipos de trabajo. Consultas a especialistas y equipos regionales."],
  ["2023", "Consultas", "Jornadas de consulta en las instituciones educativas."],
  ["Hasta 2022", "Experiencias previas", "Experiencias pedagógicas y escrituras preliminares del nuevo diseño curricular."],
  ["1997", "Diseño anterior", "Fecha del último diseño curricular para la Educación Primaria en Santa Fe."],
] as const;

export function TimelineSection() {
  const [expanded, setExpanded] = useState(false);
  return <section id="proceso" className="w-full px-5 py-10 md:px-10 md:py-14">
    <header className="mb-9 max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#494963]/40">Construcción colectiva</p><h2 className="mt-3 font-display text-4xl font-semibold tracking-[-.035em] text-[#494963] md:text-5xl">Línea histórica del diseño</h2><p className="mt-3 text-[#494963]/55">Un recorrido sintético por los principales momentos de elaboración, consulta e implementación.</p></header>
    <div className="border-y border-[#494963]/15">
      {years.map(([year, stage, description], index) => <Fragment key={year}>
        <article className="grid gap-3 border-t border-[#494963]/10 py-6 first:border-t-0 md:grid-cols-[170px_1fr] md:py-7">
          <div><span className="font-display text-3xl font-semibold tracking-[-.04em] text-[#494963]">{year}</span><span className="mt-1 block text-[10px] font-bold uppercase tracking-[.15em] text-[#494963]/35">{stage}</span></div>
          <div><p className="max-w-2xl leading-relaxed text-[#494963]/60">{description}</p>{index === 1 && <button type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#494963]">{expanded ? "Ocultar" : "Ver"} 7 hitos de 2025<ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} /></button>}</div>
        </article>
        {index === 1 && expanded && <div className="grid border-t border-[#494963]/10 bg-white/45 px-0 md:grid-cols-2 md:px-5">{events2025.map(([date, title, eventDescription, src], eventIndex) => <article key={title} className={`grid grid-cols-[104px_1fr] gap-4 border-b border-[#494963]/10 py-5 last:border-b-0 md:grid-cols-[120px_1fr] ${eventIndex % 2 === 0 ? "md:pr-6" : "md:border-l md:pl-6"}`}><div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#DDDDE3]"><Image src={src} alt={`Registro de ${title}`} fill className="object-cover" sizes="120px" /></div><div className="min-w-0"><span className="text-[10px] font-bold uppercase tracking-[.14em] text-[#494963]/35">{date}</span><h3 className="mt-1.5 text-sm font-bold leading-snug text-[#494963]">{title}</h3><p className="mt-2 text-xs leading-relaxed text-[#494963]/50">{eventDescription}</p></div></article>)}</div>}
      </Fragment>)}
    </div>
  </section>;
}
