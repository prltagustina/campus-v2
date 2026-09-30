import { SectionTabs } from "@/components/v3/section-rail";
import { SlideDeckEmbed } from "@/components/v3/content-blocks";
import { EditorialPageHeading } from "@/components/v3/editorial-page-heading";
import { RepositoryPanel, ResourceRow } from "@/components/v3/repository-panel";

// Mismos nombres, tal cual figuran en
// https://campuseducativo.santafe.edu.ar/diseno-curricular/familias/ (sin la
// aclaración descriptiva que se le había agregado acá).
const materiales = [
  { titulo: "\"Cartilla para familias\"", url: "/docs/Familias_cartilla_familias.pdf" },
  { titulo: "\"Presentación del Diseño Curricular para Familias\"", url: "/docs/PTT_DISENO_CURRICULAR_para_FAMILIAS.pdf" },
  { titulo: "\"Objetivos y contenidos - Lengua y Literatura\"", url: "/docs/Familias_objetivos_contenido_LenguayLiteratura.pdf" },
  { titulo: "\"Objetivos y contenidos - Matemática\"", url: "/docs/Familias_objetivos_contenido_Matematica.pdf" },
] as const;

export default function FamiliasPage() {
  return (
    <div className="flex min-h-full flex-col overflow-hidden rounded-none bg-[#F7F7F9] md:rounded-2xl md:shadow-[0_0_0_1px_rgba(73,73,99,.06)]">
      <EditorialPageHeading
        title="Materiales para familias"
        imageSrc="/images/cabecera-familias.png"
      />

      <SectionTabs title="Recursos para familias" items={[{ id: "presentacion", label: "Presentación" }, { id: "materiales", label: "Materiales" }]} keepVisitedPanels>
        <section className="px-4 pb-3 sm:px-6 sm:pb-4 md:pb-4">
          <div className="mx-auto max-w-4xl">
            <SlideDeckEmbed
              src="https://docs.google.com/presentation/d/1iE4BFRuhcT7yXhRfCoDpeEEx8ZSYyqWH/embed?start=false&loop=false&delayms=3000"
              title="Presentación del Diseño Curricular para Familias"
              label="Presentación para familias"
            />
          </div>
        </section>

        <section className="px-4 pb-3 sm:px-6 sm:pb-4 md:pb-4">
          <div className="mx-auto max-w-4xl">
            {/* Sin título ni ícono (antes BookOpen): única tira de esta tab
               ("Materiales"), el título quedaba redundante con la tab. */}
            <RepositoryPanel chips>
              {materiales.map((material) => (
                <ResourceRow key={material.url} title={material.titulo} href={material.url} download chip showActionLabel />
              ))}
            </RepositoryPanel>
          </div>
        </section>
      </SectionTabs>
    </div>
  );
}
