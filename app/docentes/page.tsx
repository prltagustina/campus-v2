import { BookOpen, Download, ExternalLink, FileText, GraduationCap } from "lucide-react";
import { SectionTabs } from "@/components/v3/section-rail";
import { SlideDeckEmbed } from "@/components/v3/content-blocks";
import { EditorialPageHeading } from "@/components/v3/editorial-page-heading";

const documentos = [
  ["Documento de acompañamiento N° 1", "Implementación del Diseño Curricular", "/docs/Documento_Acompanamiento.pdf"],
  ["Documento de acompañamiento N° 2", "Implementación del área Saberes, Vidas y Mundos", "/docs/Documento_Acompanamiento_2.pdf"],
  ["Presentación para supervisores, directivos y docentes", "Material institucional", "/docs/Presentacion_Supervisores.pdf"],
  ["Resolución 43/2026", "Implementación del área de Lenguas Extranjeras", "/documentos/resolucion-43-26-lenguas-extranjeras.pdf"],
  ["Resolución 1410/2026", "Programa Inglés para la Ruralidad", "/documentos/resolucion-1410-26-ingles.pdf"],
] as const;

const formaciones = [
  ["Diversificación para la Enseñanza", "Estrategias para ampliar las oportunidades de aprendizaje.", "https://campuseducativo.santafe.edu.ar/diversificacion-de-la-ensenanza-c2"],
  ["Planificar la enseñanza en el marco del nuevo Diseño Curricular", "Orientaciones para la planificación institucional y del aula.", "https://campuseducativo.santafe.edu.ar/planificar-la-ensenanza-en-el-marco-del-nuevo-diseno-curricular-para-la-educacion-primaria-de-la-provincia-de-santa-fe/"],
] as const;

export default function DocentesPage() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#F7F7F9]">
      <EditorialPageHeading
        title="Docentes y directivos"
      />

      <SectionTabs title="Recursos institucionales" items={[{ id: "presentacion", label: "Presentación" }, { id: "documentos", label: "Documentos" }, { id: "formaciones", label: "Formaciones" }]} keepVisitedPanels>
        <section className="px-4 py-9 sm:px-6 sm:py-11 md:py-14">
          <div className="mx-auto max-w-4xl">
            <SlideDeckEmbed
              src="https://docs.google.com/presentation/d/1BKzPQiSzHd73OvYHmVLTDccV-qt8g-tg/embed?start=false&loop=false&delayms=3000"
              title="Presentación para Directivos y Docentes"
              label="Presentación institucional"
              posterSrc="/images/cabecera-docentes.png"
            />
          </div>
        </section>

        <section className="px-4 py-9 sm:px-6 sm:py-11 md:py-14">
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-3xl bg-white shadow-[0_5px_24px_rgba(73,73,99,.065)]">
              <div className="flex items-center justify-between gap-4 border-b border-[#494963]/[.07] px-5 py-4 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#494963]/[.055] text-[#494963]"><BookOpen className="h-4 w-4" /></span>
                  <div><h3 className="font-display text-lg font-semibold text-[#494963]">Repositorio institucional</h3><p className="text-xs text-[#494963]/40">{documentos.length} documentos disponibles</p></div>
                </div>
                <span className="rounded-full bg-[#494963]/[.06] px-3 py-1 text-xs font-bold text-[#494963]/55">{documentos.length}</span>
              </div>

              <div className="divide-y divide-[#494963]/[.07]">
                {documentos.map(([title, description, url]) => (
                  <a key={url} href={url} download className="group flex items-center gap-3 px-4 py-4 transition-colors hover:bg-[#F8F8FA] sm:gap-4 sm:px-6 sm:py-5">
                    <FileText className="h-4.5 w-4.5 shrink-0 text-[#494963]/35" />
                    <span className="min-w-0 flex-1">
                      <b className="block text-sm font-semibold leading-snug text-[#494963] sm:text-base">{title}</b>
                      <small className="mt-1 block text-xs leading-relaxed text-[#494963]/42 sm:text-sm">{description} · PDF</small>
                    </span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F1F1F4] text-[#494963]/45 transition-colors group-hover:bg-[#494963] group-hover:text-white" aria-hidden="true"><Download className="h-4 w-4" /></span>
                    <span className="sr-only">Descargar {title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-9 sm:px-6 sm:py-11 md:py-14">
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-3xl bg-white shadow-[0_5px_24px_rgba(73,73,99,.065)]">
              <div className="flex items-center gap-3 border-b border-[#494963]/[.07] px-5 py-4 sm:px-6">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#494963]/[.055] text-[#494963]"><GraduationCap className="h-4.5 w-4.5" /></span>
                <div><h3 className="font-display text-lg font-semibold text-[#494963]">Propuestas disponibles</h3><p className="text-xs text-[#494963]/40">Acceso desde Campus Educativo</p></div>
              </div>
              <div className="divide-y divide-[#494963]/[.07]">
                {formaciones.map(([title, description, url]) => (
                  <a key={url} href={url} target="_blank" rel="noreferrer" className="group flex items-center gap-3 px-4 py-5 transition-colors hover:bg-[#F8F8FA] sm:gap-4 sm:px-6 sm:py-6">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#494963]/[.055] text-[#494963]/55"><GraduationCap className="h-4.5 w-4.5" /></span>
                    <span className="min-w-0 flex-1"><b className="block text-sm font-semibold leading-snug text-[#494963] sm:text-base">{title}</b><small className="mt-1 block text-xs leading-relaxed text-[#494963]/42 sm:text-sm">{description}</small></span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F1F1F4] text-[#494963]/45 transition-colors group-hover:bg-[#494963] group-hover:text-white" aria-hidden="true"><ExternalLink className="h-4 w-4" /></span>
                    <span className="sr-only">Abrir {title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionTabs>
    </div>
  );
}
