import { BookOpen } from "lucide-react";
import { SectionTabs } from "@/components/v3/section-rail";
import { SlideDeckEmbed } from "@/components/v3/content-blocks";
import { EditorialPageHeading } from "@/components/v3/editorial-page-heading";
import { RepositoryPanel, ResourceRow } from "@/components/v3/repository-panel";

const materiales = [
  { titulo: "\"Cartilla para familias\"", descripcion: "Guía para acompañar el nuevo Diseño Curricular desde el hogar.", url: "/docs/Familias_cartilla_familias.pdf" },
  { titulo: "\"Presentación del Diseño Curricular para familias\"", descripcion: "Síntesis visual de los fundamentos y la organización de la propuesta.", url: "/docs/PTT_DISENO_CURRICULAR_para_FAMILIAS.pdf" },
  { titulo: "\"Objetivos y contenidos — Lengua y Literatura\"", descripcion: "Contenidos y aprendizajes centrales del área.", url: "/docs/Familias_objetivos_contenido_LenguayLiteratura.pdf" },
  { titulo: "\"Objetivos y contenidos — Matemática\"", descripcion: "Contenidos y aprendizajes centrales del área.", url: "/docs/Familias_objetivos_contenido_Matematica.pdf" },
] as const;

export default function FamiliasPage() {
  return (
    <div className="flex min-h-full flex-col overflow-hidden rounded-none bg-[#F7F7F9] md:rounded-2xl md:shadow-[0_0_0_1px_rgba(73,73,99,.06)]">
      <EditorialPageHeading
        title="Materiales para familias"
        imageSrc="/images/cabecera-familias.png"
      />

      <SectionTabs title="Recursos para familias" items={[{ id: "presentacion", label: "Presentación" }, { id: "materiales", label: "Materiales" }]} keepVisitedPanels>
        <section className="px-4 py-3 sm:px-6 sm:py-4 md:py-4">
          <div className="mx-auto max-w-4xl">
            <SlideDeckEmbed
              src="https://docs.google.com/presentation/d/1iE4BFRuhcT7yXhRfCoDpeEEx8ZSYyqWH/embed?start=false&loop=false&delayms=3000"
              title="Presentación del Diseño Curricular para Familias"
              label="Presentación para familias"
            />
          </div>
        </section>

        <section className="px-4 py-3 sm:px-6 sm:py-4 md:py-4">
          <div className="mx-auto max-w-4xl">
            <RepositoryPanel title="Documentos disponibles" icon={<BookOpen className="h-4 w-4" />}>
              {materiales.map((material) => (
                <ResourceRow key={material.url} title={material.titulo} description={`${material.descripcion} · PDF`} href={material.url} download />
              ))}
            </RepositoryPanel>
          </div>
        </section>
      </SectionTabs>
    </div>
  );
}
