import { Bookmark, CirclePlay } from "lucide-react";
import { SectionTabs } from "@/components/v3/section-rail";
import { SlideDeckEmbed } from "@/components/v3/content-blocks";
import { EditorialPageHeading } from "@/components/v3/editorial-page-heading";
import { RepositoryPanel, ResourceRow } from "@/components/v3/repository-panel";

// Mismos materiales y misma clasificación que
// https://campuseducativo.santafe.edu.ar/diseno-curricular/docentes-y-directivos/
// ("Material de apoyo para el trabajo institucional" y "Normativa" son dos
// grupos separados ahí, no uno solo).
const materialApoyo = [
  { nombre: "\"Documento de acompañamiento N° 1 - Implementación del Diseño Curricular\"", url: "https://drive.google.com/uc?export=download&id=1Cv30cZWqHd6eRjGZPn700FYSnOHTwS_e" },
  { nombre: "\"Documento de acompañamiento N° 2 - Implementación del área Saberes, Vidas y Mundos\"", url: "https://drive.google.com/uc?export=download&id=1Cvo5D0_Y6SCh2E64xQBnPFX5TiKYR8OO" },
  { nombre: "\"Presentación para supervisores, directivos y docentes\"", url: "https://drive.google.com/uc?export=download&id=1qZYlfBemNZLdpVV-VbvHuWMvEM7D_CHy" },
  { nombre: "\"Jornada Ampliada o Completa - Más tiempo para transformar los aprendizajes\"", url: "https://drive.google.com/uc?export=download&id=1z0MgQRSc2tt-9u_Sayu4QHnUSBDgzt6c" },
] as const;

const normativa = [
  { nombre: "\"Res. 43/2026 - Implementación del área de Lenguas Extranjeras\"", url: "https://drive.google.com/uc?export=download&id=1c0sFWyQ-nPSncOKgEDnASczNaG4orxBL" },
  { nombre: "\"Res. 1410/2026 - Programa Inglés para la Ruralidad\"", url: "https://drive.google.com/uc?export=download&id=1u0HwB1R56w29xQnbJx4tDNA2qS_H-Rtf" },
] as const;

const formaciones = [
  ["\"Diversificación para la Enseñanza\"", "https://campuseducativo.santafe.edu.ar/diversificacion-de-la-ensenanza-c2"],
  ["\"Planificar la enseñanza en el marco del nuevo Diseño Curricular\"", "https://campuseducativo.santafe.edu.ar/planificar-la-ensenanza-en-el-marco-del-nuevo-diseno-curricular-para-la-educacion-primaria-de-la-provincia-de-santa-fe/"],
] as const;

export default function DocentesPage() {
  return (
    <div className="flex min-h-full flex-col overflow-hidden rounded-none bg-[#F7F7F9] md:rounded-2xl md:border md:border-[#494963]/[.06]">
      <EditorialPageHeading
        title="Equipos directivos y docentes"
        imageSrc="/images/cabecera-docentes.png"
      />

      <SectionTabs title="Recursos institucionales" items={[{ id: "presentacion", label: "Presentación" }, { id: "documentos", label: "Documentos" }, { id: "formaciones", label: "Formaciones" }]} keepVisitedPanels>
        <section className="px-4 pb-3 sm:px-6 sm:pb-4 md:pb-4">
          <div className="mx-auto max-w-4xl">
            <SlideDeckEmbed
              src="https://docs.google.com/presentation/d/1BKzPQiSzHd73OvYHmVLTDccV-qt8g-tg/embed?start=false&loop=false&delayms=3000"
              title="Presentación para Equipos Directivos y Docentes"
              label="Presentación institucional"
            />
          </div>
        </section>

        <section className="px-4 pb-3 sm:px-6 sm:pb-4 md:pb-4">
          <div className="mx-auto max-w-4xl space-y-6">
            {/* Sin título de panel ni ícono (antes BookOpen): quedan los dos
               grupos (Material de apoyo/Normativa) apilados en la misma tab,
               así que el título no se retira del todo (se perdería la
               distinción entre uno y otro) sino que pasa a label chico en
               mayúsculas - mismo criterio que "Resolución"/"Decretos / Ley"
               en EIB. */}
            <div>
              <p className="mb-6 px-1 text-xs font-bold uppercase tracking-[.1em] text-[#494963]/40">Material de apoyo para el trabajo institucional</p>
              <RepositoryPanel chips>
                {materialApoyo.map((documento) => (
                  // "Presentación para supervisores...": ícono de play, no de
                  // documento - así la distingue el Campus (es un video, no un
                  // PDF), mismo criterio en Marco General.
                  <ResourceRow
                    key={documento.url}
                    title={documento.nombre}
                    href={documento.url}
                    download
                    chip
                    sideActions
                    icon={documento.nombre.includes("Presentación para supervisores") ? <CirclePlay className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#494963" }} aria-hidden="true" /> : undefined}
                  />
                ))}
              </RepositoryPanel>
            </div>
            <div>
              <p className="mb-6 px-1 text-xs font-bold uppercase tracking-[.1em] text-[#494963]/40">Normativa</p>
              <RepositoryPanel chips>
                {normativa.map((documento) => (
                  <ResourceRow key={documento.url} title={documento.nombre} href={documento.url} download chip sideActions />
                ))}
              </RepositoryPanel>
            </div>
          </div>
        </section>

        <section className="px-4 pb-3 sm:px-6 sm:pb-4 md:pb-4">
          <div className="mx-auto max-w-4xl">
            {/* Sin título ni ícono (antes GraduationCap): única tira de esta
               tab ("Formaciones"), el título quedaba redundante con la tab. */}
            <RepositoryPanel chips>
              {formaciones.map(([title, url]) => (
                // Bookmark, no FileText: distingue de un documento (mismo
                // criterio en todo lugar donde aparecen formaciones). Color
                // oscuro sólido (antes /35, se veía apagado al lado de los
                // demás íconos de la fila).
                <ResourceRow key={url} title={title} href={url} icon={<Bookmark className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#494963" }} aria-hidden="true" />} chip />
              ))}
            </RepositoryPanel>
          </div>
        </section>
      </SectionTabs>
    </div>
  );
}
