import { Download, FileText } from "lucide-react";
import { SectionTabs } from "@/components/v3/section-rail";
import { SlideDeckEmbed } from "@/components/v3/content-blocks";
import { EditorialPageHeading } from "@/components/v3/editorial-page-heading";

const materiales = [
  { titulo: "Cartilla para familias", descripcion: "Guía para acompañar el nuevo Diseño Curricular desde el hogar.", url: "/docs/Familias_cartilla_familias.pdf" },
  { titulo: "Presentación del Diseño Curricular para familias", descripcion: "Síntesis visual de los fundamentos y la organización de la propuesta.", url: "/docs/PTT_DISENO_CURRICULAR_para_FAMILIAS.pdf" },
  { titulo: "Objetivos y contenidos — Lengua y Literatura", descripcion: "Contenidos y aprendizajes centrales del área.", url: "/docs/Familias_objetivos_contenido_LenguayLiteratura.pdf" },
  { titulo: "Objetivos y contenidos — Matemática", descripcion: "Contenidos y aprendizajes centrales del área.", url: "/docs/Familias_objetivos_contenido_Matematica.pdf" },
] as const;

export default function FamiliasPage() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#F7F7F9]">
      <EditorialPageHeading
        eyebrow="Comunidad educativa"
        title="Familias"
        description="Recursos claros para conocer la propuesta curricular y acompañar las trayectorias escolares."
      />

      <SectionTabs title="Recursos para familias" items={[{ id: "presentacion", label: "Presentación" }, { id: "materiales", label: "Materiales" }]} keepVisitedPanels>
        <section className="px-4 py-9 sm:px-6 sm:py-11 md:py-14">
          <div className="mx-auto max-w-4xl">
            <header className="mb-6 max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#494963]/40">Para empezar</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-.035em] text-[#494963] md:text-4xl">El diseño curricular, en pocas palabras</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#494963]/50 sm:text-base">Una introducción visual preparada especialmente para las familias.</p>
            </header>
            <SlideDeckEmbed
              src="https://docs.google.com/presentation/d/1iE4BFRuhcT7yXhRfCoDpeEEx8ZSYyqWH/embed?start=false&loop=false&delayms=3000"
              title="Presentación del Diseño Curricular para Familias"
              label="Presentación para familias"
              posterSrc="/images/cabecera-familias.png"
            />
          </div>
        </section>

        <section className="px-4 py-9 sm:px-6 sm:py-11 md:py-14">
          <div className="mx-auto max-w-4xl">
            <header className="mb-6 max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#494963]/40">Biblioteca familiar</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-.035em] text-[#494963] md:text-4xl">Materiales para acompañar</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#494963]/50 sm:text-base">Documentos breves para consultar, compartir o descargar.</p>
            </header>

            <div className="overflow-hidden rounded-3xl bg-white shadow-[0_5px_24px_rgba(73,73,99,.065)]">
              <div className="flex items-center justify-between gap-4 border-b border-[#494963]/[.07] px-5 py-4 sm:px-6">
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#494963]">Documentos disponibles</h3>
                  <p className="mt-0.5 text-xs text-[#494963]/40">{materiales.length} archivos en formato PDF</p>
                </div>
                <span className="rounded-full bg-[#494963]/[.06] px-3 py-1 text-xs font-bold text-[#494963]/55">{materiales.length}</span>
              </div>

              <div className="divide-y divide-[#494963]/[.07]">
                {materiales.map((material) => (
                  <a key={material.url} href={material.url} download className="group flex items-center gap-3 px-4 py-4 transition-colors hover:bg-[#F8F8FA] sm:gap-4 sm:px-6 sm:py-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#494963]/[.055] text-[#494963]/55">
                      <FileText className="h-4.5 w-4.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <b className="block text-sm font-semibold leading-snug text-[#494963] sm:text-base">{material.titulo}</b>
                      <small className="mt-1 block text-xs leading-relaxed text-[#494963]/42 sm:text-sm">{material.descripcion} · PDF</small>
                    </span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F1F1F4] text-[#494963]/45 transition-colors group-hover:bg-[#494963] group-hover:text-white" aria-hidden="true">
                      <Download className="h-4 w-4" />
                    </span>
                    <span className="sr-only">Descargar {material.titulo}</span>
                  </a>
                ))}
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-[#494963]/38">La biblioteca se ampliará a medida que se publiquen materiales para nuevas áreas.</p>
          </div>
        </section>
      </SectionTabs>
    </div>
  );
}
