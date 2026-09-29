import { Bookmark, BookOpen, GraduationCap } from "lucide-react";
import { SectionTabs } from "@/components/v3/section-rail";
import { SlideDeckEmbed } from "@/components/v3/content-blocks";
import { EditorialPageHeading } from "@/components/v3/editorial-page-heading";
import { RepositoryPanel, ResourceRow } from "@/components/v3/repository-panel";

const documentos = [
  ["\"Documento de acompañamiento N° 1\"", "Implementación del Diseño Curricular", "/docs/Documento_Acompanamiento.pdf"],
  ["\"Documento de acompañamiento N° 2\"", "Implementación del área Saberes, Vidas y Mundos", "/docs/Documento_Acompanamiento_2.pdf"],
  ["\"Presentación para supervisores, directivos y docentes\"", "Material institucional", "/docs/Presentacion_Supervisores.pdf"],
  ["\"Resolución 43/2026\"", "Implementación del área de Lenguas Extranjeras", "/documentos/resolucion-43-26-lenguas-extranjeras.pdf"],
  ["\"Resolución 1410/2026\"", "Programa Inglés para la Ruralidad", "/documentos/resolucion-1410-26-ingles.pdf"],
  ["\"Jornada Ampliada o Completa\"", "Más tiempo para transformar los aprendizajes", "/documentos/jornada-ampliada-o-completa.pdf"],
] as const;

const formaciones = [
  ["\"Diversificación para la Enseñanza\"", "Estrategias para ampliar las oportunidades de aprendizaje.", "https://campuseducativo.santafe.edu.ar/diversificacion-de-la-ensenanza-c2"],
  ["\"Planificar la enseñanza en el marco del nuevo Diseño Curricular\"", "Orientaciones para la planificación institucional y del aula.", "https://campuseducativo.santafe.edu.ar/planificar-la-ensenanza-en-el-marco-del-nuevo-diseno-curricular-para-la-educacion-primaria-de-la-provincia-de-santa-fe/"],
] as const;

export default function DocentesPage() {
  return (
    <div className="flex min-h-full flex-col overflow-hidden rounded-none bg-[#F7F7F9] md:rounded-2xl md:shadow-[0_0_0_1px_rgba(73,73,99,.06)]">
      <EditorialPageHeading
        title="Equipos directivos y docentes"
        imageSrc="/images/cabecera-docentes.png"
      />

      <SectionTabs title="Recursos institucionales" items={[{ id: "presentacion", label: "Presentación" }, { id: "documentos", label: "Documentos" }, { id: "formaciones", label: "Formaciones" }]} keepVisitedPanels>
        <section className="px-4 py-3 sm:px-6 sm:py-4 md:py-4">
          <div className="mx-auto max-w-4xl">
            <SlideDeckEmbed
              src="https://docs.google.com/presentation/d/1BKzPQiSzHd73OvYHmVLTDccV-qt8g-tg/embed?start=false&loop=false&delayms=3000"
              title="Presentación para Equipos Directivos y Docentes"
              label="Presentación institucional"
            />
          </div>
        </section>

        <section className="px-4 py-3 sm:px-6 sm:py-4 md:py-4">
          <div className="mx-auto max-w-4xl">
            <RepositoryPanel title="Repositorio institucional" icon={<BookOpen className="h-4 w-4" />}>
              {documentos.map(([title, description, url]) => (
                <ResourceRow key={url} title={title} description={`${description} · PDF`} href={url} download />
              ))}
            </RepositoryPanel>
          </div>
        </section>

        <section className="px-4 py-3 sm:px-6 sm:py-4 md:py-4">
          <div className="mx-auto max-w-4xl">
            <RepositoryPanel title="Propuestas disponibles" icon={<GraduationCap className="h-4 w-4" />}>
              {formaciones.map(([title, description, url]) => (
                <ResourceRow key={url} title={title} description={description} href={url} icon={<Bookmark className="h-4.5 w-4.5 shrink-0 text-[#494963]/35" />} />
              ))}
            </RepositoryPanel>
          </div>
        </section>
      </SectionTabs>
    </div>
  );
}
