"use client";

import { ProcesoFotosCarousel } from "@/components/landing/proceso-fotos-carousel";

// Fotos y textos oficiales tomados de https://campuseducativo.santafe.edu.ar/diseno-curricular/
// (sección "Línea histórica del diseño"), reemplazando las imágenes previas.
const events2025 = [
  ["Septiembre 2025", "Jornadas de Socialización y Consulta", "En el norte, centro y sur de la provincia, con equipos directivos y docentes.", "/images/proceso-septiembre2025.png", "Jornada de equipos directivos y docentes del nivel primario de escuelas urbanas y rurales, de la modalidad especial y del área de tecnología"],
  ["31 de agosto", "Consulta a instituciones de Educación Primaria e IFD.", "Consulta mediante la plataforma Educativa del Ministerio de Educación.", "/images/proceso-31agosto.png", "Instancias de consulta del diseño curricular en instituciones educativas de Santa Fe"],
  ["27 de agosto", "Presentación al Comité Asesor Provincial de Discapacidad.", "Se presentó la propuesta en la 3ª Asamblea Ordinaria del Comité Asesor Provincial.", "/images/proceso-27agosto.png", "Integrantes exponiendo en una mesa durante la Asamblea del Comité Asesor Provincial de Discapacidad"],
  ["14 de agosto", "Socialización y consulta con equipos de supervisión.", "Con participación de más de 150 supervisores/as de toda la provincia.", "/images/proceso-14agosto.png", "Jornada de socialización y consultas con equipos de supervisión educativa"],
  ["01 de agosto", "Reunión con delegados y coordinadores regionales.", "Presentación del proceso de escritura y diálogo en torno a dudas e inquietudes.", "/images/proceso-01agosto.jpeg", "Reunión con delegados y coordinadores regionales del sistema educativo"],
  ["25 de julio", "Encuentro presencial con directores y supervisores.", "Se llevó a cabo la presentación general de la propuesta y se conformaron mesas de trabajo.", "/images/proceso-25julio.png", "Reunión con directores y supervisores para analizar el nuevo diseño curricular de primaria"],
  ["22 de julio", "Encuentro con el Comité de Educación Ambiental.", "Se presentaron los enfoques transversales, particularmente el de Educación Ambiental Integral.", "/images/proceso-22julio.png", "Encuentro del Comité de Educación Ambiental Integral"],
] as const;

const years = [
  ["2026", "Implementación", "Implementación del nuevo diseño curricular. Construcción de metas de aprendizaje, materiales didácticos para el aula y formación docente."],
  ["2025", "Consolidación", "Consolidación de la escritura del nuevo borrador y realización de jornadas focales de socialización y consulta a la comunidad educativa."],
  ["2024", "Conformación", "Recuperación de escrituras anteriores y conformación de nuevos equipos de trabajo. Consultas a especialistas y equipos regionales."],
  ["2023", "Consultas", "Jornadas de consulta en las instituciones educativas."],
  ["Hasta 2022", "Experiencias previas", "Experiencias pedagógicas y escrituras preliminares del nuevo diseño curricular."],
  ["1997", "Diseño anterior", "Fecha del último diseño curricular para la Educación Primaria en Santa Fe."],
] as const;

const proceso2025Fotos = events2025.map(([date, title, , src, alt]) => ({ src, date, title, alt }));

export function TimelineSection() {
  return <section id="proceso" className="w-full px-5 py-8 md:px-10 md:py-14">
    <header className="mb-6 max-w-2xl sm:mb-9"><h2 className="font-display text-3xl font-semibold tracking-[-.035em] text-[#494963] sm:text-4xl md:text-5xl">Proceso<br />de construcción colectiva</h2><p className="mt-3 text-[#494963]/55">Implementación del nuevo diseño curricular. Construcción de progresiones de aprendizaje, materiales didácticos para el aula y propuestas de formación docente.</p></header>
    <div className="border-y border-[#494963]/15">
      {years.map(([year, stage, description]) => (
        <article key={year} className="grid min-w-0 gap-2 border-t border-[#494963]/10 py-5 first:border-t-0 sm:gap-3 sm:py-6 md:grid-cols-[170px_1fr] md:py-7">
          <div><span className="font-display text-3xl font-semibold tracking-[-.04em] text-[#494963]">{year}</span><span className="mt-1 block text-[10px] font-bold uppercase tracking-[.15em] text-[#494963]/35">{stage}</span></div>
          <div className="min-w-0">
            <p className="max-w-2xl leading-relaxed text-[#494963]/60">{description}</p>
            {year === "2025" ? <ProcesoFotosCarousel photos={proceso2025Fotos} /> : null}
          </div>
        </article>
      ))}
    </div>
  </section>;
}
