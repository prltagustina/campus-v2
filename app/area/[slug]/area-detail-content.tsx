"use client";

import { useEffect, useRef, useState } from "react";
import { Bookmark, CirclePlay } from "lucide-react";
import type { Area } from "@/lib/areas-data";
import { MARCO_GENERAL_COLOR } from "@/lib/constants";
import { DocumentoStepper } from "@/components/v3/content-blocks";
import { DocumentoExplainer } from "@/components/v3/documento-explainer";
import { OrganizationCompact } from "@/components/v3/organization-compact";
import { AreaWorkspace } from "@/components/v3/area-workspace";
import { SolidAreaArrow } from "@/components/v3/area-nav-link";
import { ResourceRow } from "@/components/v3/repository-panel";
import { SectionTabs } from "@/components/v3/section-rail";

const centralAxes = [
  ["Aprendizajes comunes, fundantes y significativos", "Saberes que aseguran el avance hacia conocimientos más complejos y promueven la participación plena en la vida social."],
  ["Relación dialógica entre la enseñanza y la evaluación", "La enseñanza como práctica intencional y situada en el marco de enfoques activos. La evaluación planificada de la mano de la enseñanza."],
  ["Alfabetización desde el inicio", "Una alfabetización plena desde Primer Grado como base imprescindible para el desarrollo integral de las trayectorias escolares."],
  ["Matemática en situaciones reales", "La resolución de problemas auténticos desde la evidencia, el razonamiento, la argumentación y la validación matemática en diálogo con la vida cotidiana."],
  ["Más tiempo para pensar científicamente", "El pensamiento crítico, científico y ciudadano desde los primeros años a partir de la ampliación horaria para las ciencias."],
  ["Saberes, Vidas y Mundos: un espacio flexible y por proyectos", "El abordaje de temáticas actuales mediante la participación activa de las infancias y la articulación de contenidos de las áreas y enfoques transversales."],
  ["Educación Tecnológica actualizada", "La actualización incorpora pensamiento computacional, robótica, ciudadanía digital y una mirada crítica sobre los consumos tecnológicos."],
  ["Lenguas Extranjeras a lo largo de toda la escolaridad", "La incorporación gradual garantiza el derecho a aprender otras lenguas y culturas desde una perspectiva plurilingüe e intercultural."],
  ["Lenguajes artísticos con sentido territorial", "Los lenguajes artísticos se articulan por ejes comunes, con saberes situados y en diálogo con las producciones identitarias y el patrimonio cultural provincial."],
  ["Prácticas corporales como diversidad cultural", "Las prácticas corporales y motrices se reconocen como manifestaciones culturales, priorizando el juego, la expresión y el respeto por las subjetividades."],
  ["Enfoques transversales en todas las áreas", "Los enfoques transversales son parte integral de los espacios curriculares y cuentan con orientaciones explícitas para su articulación."],
  ["La heterogeneidad como punto de partida", "La heterogeneidad inherente a los grupos escolares se reconoce como una riqueza y la diversidad como punto de partida de la enseñanza."],
  ["Formación Ética y Ciudadana", "Sus contenidos se profundizan en Ciudadanía, Derechos Humanos y Participación, Saberes, Vidas y Mundos y Ciencias Sociales."],
] as const;

// Mismos documentos, mismos nombres y mismos PDFs que "Documentos y
// descargas" en https://campuseducativo.santafe.edu.ar/diseno-curricular/marco-general/
// (antes había acá dos ítems más — Resolución 1410/2026 y Jornada Ampliada —
// que en el Campus solo están en Docentes, no en Marco General).
const marcoDocuments = [
  ["\"Documento de acompañamiento para docentes y directivos, N° 1\"", "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/02/Documento-de-acompanamiento-para-directivos-y-supervisores-N1.pdf"],
  ["\"Documento de acompañamiento para docentes y directivos, N° 2\"", "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/02/Documento-de-acompanamiento-para-directivos-y-supervisores-N2.pdf"],
  ["\"Presentación para supervisores, directivos y docentes\"", "https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2025/12/Presentacion-para-supervisores-directivos-y-docentes.pdf"],
] as const;

const marcoTrainings = [
  ["\"Diversificación para la Enseñanza\"", "https://campuseducativo.santafe.edu.ar/diversificacion-de-la-ensenanza-c2"],
  ["\"Planificar la enseñanza en el nuevo Diseño Curricular\"", "https://campuseducativo.santafe.edu.ar/planificar-la-ensenanza-en-el-marco-del-nuevo-diseno-curricular-para-la-educacion-primaria-de-la-provincia-de-santa-fe/"],
] as const;

function MarcoGeneralContent() {
  const [selectedAxis, setSelectedAxis] = useState<number | null>(0);
  const axisRefs = useRef<Array<HTMLDivElement | null>>([]);
  const hasAxisInteraction = useRef(false);

  useEffect(() => {
    if (!hasAxisInteraction.current || selectedAxis === null || !window.matchMedia("(max-width: 767px)").matches) return;
    const selected = axisRefs.current[selectedAxis];
    if (!selected) return;

    const frame = window.requestAnimationFrame(() => {
      selected.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selectedAxis]);
  return (
    <div className="bg-white">
      {/* Sin pb propio: el espacio hasta "Recursos" lo da el !pt-8/md:!pt-10
         de esa sección (mismo criterio que en las áreas) — un pb acá sumaba
         un aire extra que no tenía ningún otro salto entre secciones. */}
      <div id="documento">
        <DocumentoExplainer
          titulo="Marco General"
          heading={<>Los ejes centrales<br />del nuevo Diseño Curricular</>}
          descripcion="El Marco General establece los lineamientos políticos y pedagógico-didácticos de la propuesta, y define la organización curricular para la Educación Primaria de la Provincia de Santa Fe."
          portadaSrc="/images/marco-general-portada.jpg"
          pdfUrl="https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/04/marco-general.pdf"
          accent={MARCO_GENERAL_COLOR}
          accentText="#EDEDF0"
        />
      </div>
      <section id="recursos" className="v3-section !px-0 !pb-0 !pt-8 bg-[#F5F5F7] md:!px-[14px] md:!pb-[14px] md:!pt-10 md:bg-transparent">
        {/* SectionTabs (mismo componente que Familias/Docentes/EIB), no el
           tablist manual de antes: separa Documentos y Formaciones en tabs
           reales, con el mismo mecanismo en todos lados (scroll al tope al
           cambiar de tab incluido). px-6, no px-7: mismo inset que trae el
           propio SectionTabs en su tira de tabs — antes el header usaba
           px-7 (para alinear con "Docencia" de Itinerarios, más abajo en la
           página) y quedaba corrido respecto de los tabs de acá. */}
        <div className="overflow-hidden rounded-none bg-[#F5F5F7] md:rounded-2xl">
          {/* Sin mb propio: el aire hasta los tabs ya lo da el padding
             superior de SectionTabs (mismo que separa la cabecera de
             Familias/Docentes/EIB de sus tabs) — sumar los dos quedaba con
             el doble de aire de la cuenta. */}
          <div className="px-4 pt-5 sm:px-6 md:pt-8 lg:pt-10">
            <header className="max-w-2xl"><h2 className="font-display text-2xl font-semibold tracking-[-.03em] text-[#494963] sm:text-3xl lg:text-4xl">Documentos y formaciones</h2><p className="mt-2 text-sm sm:text-base lg:text-lg text-[#494963]/50">Materiales institucionales y propuestas para acompañar la implementación.</p></header>
          </div>
          <SectionTabs title="Recursos del Marco General" items={[{ id: "documentos", label: "Documentos" }, { id: "formaciones", label: "Formaciones" }]} keepVisitedPanels scrollToTopOnChange={false} align="left" color={MARCO_GENERAL_COLOR}>
            {/* ResourceRow (mismo componente que Familias/Docentes/EIB), con
               el color del Marco General — mismo tratamiento que las filas
               de Itinerarios/repositorios de área (RepositoryMaterialRow):
               ícono y botón de acción teñidos, no un ícono gris genérico.
               chip: tarjeta suelta por ítem, no una caja única con líneas
               divisorias. */}
            {/* px-4/sm:px-6 afuera, max-w-4xl adentro sin padding propio
               (mismo orden que Familias/Docentes/EIB): si el tope de ancho y
               el padding van en el mismo div, el padding le resta ancho al
               tope y los chips quedan más angostos que en el resto (848px en
               vez de 896px). Así, los chips llegan exactamente al mismo
               ancho máximo en todos lados. Sin mx-auto (a diferencia de
               Familias/Docentes/EIB): acá el título y los tabs de arriba
               están pegados a la izquierda, no centrados — con mx-auto los
               chips quedaban corridos respecto de ellos en pantallas anchas. */}
            <div className="px-4 pb-5 sm:px-6 md:pb-8 lg:pb-10">
              <div className="max-w-4xl space-y-2">
                {marcoDocuments.map(([title, href]) => (
                  // "Presentación para supervisores": ícono de play, no de
                  // documento — así la distingue el Campus (es un video, no
                  // un PDF), mismo criterio en Docentes.
                  <ResourceRow
                    key={href}
                    title={title}
                    href={href}
                    download
                    color={MARCO_GENERAL_COLOR}
                    showActionLabel
                    chip
                    icon={title.includes("Presentación para supervisores") ? <CirclePlay className="mt-0.5 h-4 w-4 shrink-0" style={{ color: MARCO_GENERAL_COLOR }} aria-hidden="true" /> : undefined}
                  />
                ))}
              </div>
            </div>
            <div className="px-4 pb-5 sm:px-6 md:pb-8 lg:pb-10">
              <div className="max-w-4xl space-y-2">
                {marcoTrainings.map(([title, href]) => (
                  // Bookmark: mismo ícono que distingue "formaciones" de un
                  // documento en Docentes, acá con el color propio de Marco
                  // General (mismo criterio que usan sus otras filas).
                  <ResourceRow key={href} title={title} href={href} color={MARCO_GENERAL_COLOR} showActionLabel chip icon={<Bookmark className="mt-0.5 h-4 w-4 shrink-0" style={{ color: MARCO_GENERAL_COLOR }} aria-hidden="true" />} />
                ))}
              </div>
            </div>
          </SectionTabs>
        </div>
      </section>
      <section id="ejes" className="v3-section !px-0 !pb-0 !pt-8 bg-[#F5F5F7] md:!px-[14px] md:!pb-[14px] md:!pt-10 md:bg-transparent"><div className="rounded-none bg-[#F5F5F7] px-4 py-5 sm:px-7 md:rounded-2xl md:py-8 lg:py-10">
        <header className="mb-6 max-w-2xl md:mb-8">
          <h2 className="max-w-[20ch] text-balance font-display text-2xl font-semibold tracking-[-.03em] text-[#494963] sm:text-3xl lg:text-4xl">Aspectos distintivos del Diseño Curricular</h2>
          {/* Antes text-sm/45: menos presencia que la intro equivalente de
             "recursos" ("Materiales institucionales..."). Mismas clases ahí y
             acá para que las dos introducciones lean igual. */}
          <p className="mt-2 text-sm sm:text-base lg:text-lg text-[#494963]/50">Seleccioná un eje para conocer su alcance sin perder el recorrido general.</p>
        </header>
        <div className="wheel-accordion wheel-accordion--compact" role="list" aria-label="Aspectos distintivos del Diseño Curricular">
          {centralAxes.map(([title, description], index) => {
            const active = selectedAxis === index;
            const panelId = `eje-central-${index}-panel`;
            const buttonId = `eje-central-${index}-button`;

            return (
              <div
                key={title}
                ref={(node) => { axisRefs.current[index] = node; }}
                role="listitem"
                className="wheel-accordion__item"
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={active}
                  aria-controls={panelId}
                  onClick={() => {
                    hasAxisInteraction.current = true;
                    setSelectedAxis((current) => (current === index ? null : index));
                  }}
                  className="wheel-accordion__trigger"
                >
                  <span>{title}</span>
                  <span className={`grid h-6 w-6 shrink-0 place-items-center transition-transform duration-300 ${active ? "rotate-90" : ""}`} aria-hidden="true">
                    <span className="-ml-3"><SolidAreaArrow /></span>
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!active}
                  className="wheel-accordion__panel"
                >
                  <p>{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </section>
      <div id="organizacion">
        <DocumentoStepper title={<>Qué enseñar<br />cómo hacerlo<br />y con qué propósito</>} steps={[
          {
            title: "Qué enseñar",
            description: [
              "Define los contenidos fundamentales que todas las escuelas deben enseñar, organizados por áreas, ciclos y grados.",
              "Los contenidos de cada área se presentan en cuadros que muestran su progresión y complejización, a fin de facilitar la planificación de propuestas integrales y articuladas.",
            ],
          },
          {
            title: "Cómo hacerlo",
            description: [
              "Propone articular contenidos, incorporar enfoques transversales y diversificar las estrategias de enseñanza para garantizar aprendizajes significativos en todas las aulas.",
              "Mediante orientaciones didácticas, ejemplos y recomendaciones específicas para cada área y ciclo.",
            ],
          },
          {
            title: "Con qué propósito",
            description: [
              "Se articula en torno a principios político-pedagógicos sólidos para que las infancias accedan al conocimiento y se desarrollen plenamente como ciudadanas y ciudadanos críticos, creativos y solidarios.",
              "En las escuelas, el Estado materializa su responsabilidad indelegable: garantizar el derecho a la Educación.",
            ],
          },
        ]} />
        <OrganizationCompact />
      </div>
    </div>
  );
}
export function AreaDetailContent({ area, isMarcoGeneral = false }: { area?: Area; isMarcoGeneral?: boolean }) {
  if (isMarcoGeneral || !area) return <MarcoGeneralContent />;
  return <AreaWorkspace area={area} />;
}
