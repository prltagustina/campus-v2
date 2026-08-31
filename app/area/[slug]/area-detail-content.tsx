"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Download, FileText, BookOpen } from "lucide-react";
import type { Area } from "@/lib/areas-data";
import { MARCO_GENERAL_COLOR } from "@/lib/constants";
import { DocumentoStepper } from "@/components/v3/content-blocks";
import { DocumentoExplainer } from "@/components/v3/documento-explainer";
import { OrganizationCompact } from "@/components/v3/organization-compact";
import { AreaWorkspace } from "@/components/v3/area-workspace";
import { SolidAreaArrow } from "@/components/v3/area-nav-link";

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

const marcoDocuments = [
  ["Documento de acompañamiento N° 1", "Material para la implementación institucional", "/docs/Documento_Acompanamiento.pdf"],
  ["Documento de acompañamiento N° 2", "Implementación de Saberes, Vidas y Mundos", "/docs/Documento_Acompanamiento_2.pdf"],
  ["Presentación para supervisores", "Síntesis institucional del nuevo diseño", "/docs/Presentacion_Supervisores.pdf"],
] as const;

const marcoTrainings = [
  ["Diversificación para la Enseñanza", "Curso en Campus Educativo", "https://campuseducativo.santafe.edu.ar/diversificacion-de-la-ensenanza-c2"],
  ["Planificar la enseñanza en el nuevo Diseño Curricular", "Formación para equipos docentes", "https://campuseducativo.santafe.edu.ar/planificar-la-ensenanza-en-el-marco-del-nuevo-diseno-curricular-para-la-educacion-primaria-de-la-provincia-de-santa-fe/"],
] as const;

function MarcoGeneralContent() {
  const [selectedAxis, setSelectedAxis] = useState<number | null>(0);
  const [resourceView, setResourceView] = useState<"documentos" | "formaciones">("documentos");
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
      <div id="documento" className="pb-4 md:pb-6">
        <DocumentoExplainer
          titulo="Marco General"
          heading="Los ejes centrales del nuevo Diseño Curricular"
          descripcion="El Marco General establece los lineamientos políticos y pedagógico-didácticos de la propuesta, y define la organización curricular para la Educación Primaria de la Provincia de Santa Fe"
          portadaSrc="/images/marco-general-portada.jpg"
          pdfUrl="https://campuseducativo.santafe.edu.ar/wp-content/uploads/sites/3/2026/04/marco-general.pdf"
          accent={MARCO_GENERAL_COLOR}
          accentText="#EDEDF0"
          singleSlide
        />
      </div>
      <section id="recursos" className="v3-section !p-0 md:!p-[14px]">
        <div className="rounded-none bg-[#F5F5F7] p-5 md:rounded-3xl md:p-8 lg:p-10">
          <header className="mb-10 max-w-2xl md:mb-14"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#494963]/40">Repositorio del Marco General</p><h2 className="mt-2 font-display text-3xl font-semibold tracking-[-.03em] text-[#494963] md:text-4xl">Documentos y formaciones</h2><p className="mt-3 text-[#494963]/50">Materiales institucionales y propuestas para acompañar la implementación.</p></header>
          <div className="grid gap-4 lg:grid-cols-[210px_minmax(0,1fr)]">
            <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-1 lg:self-start" role="tablist" aria-label="Recursos del Marco General">
              {([['documentos', 'Documentos', FileText], ['formaciones', 'Formaciones', BookOpen]] as const).map(([id, label, Icon]) => {
                const active = resourceView === id;
                return <button key={id} type="button" role="tab" aria-selected={active} onClick={() => setResourceView(id)} className={`flex min-h-14 items-center gap-3 rounded-xl px-4 text-left text-sm font-semibold transition-colors ${active ? "bg-[#494963] text-white" : "bg-white text-[#494963]"}`}><Icon className="h-4 w-4 shrink-0 opacity-55" />{label}</button>;
              })}
            </div>
            <div className="min-h-[240px] rounded-2xl bg-white px-4 md:px-6" role="tabpanel">
              {resourceView === "documentos" ? <div className="divide-y divide-[#494963]/[.08]">{marcoDocuments.map(([title, description, href]) => <a key={href} href={href} download className="group flex min-h-[78px] items-center gap-4 py-4"><FileText className="h-4.5 w-4.5 shrink-0 text-[#494963]/35" /><span className="min-w-0 flex-1"><b className="block text-sm text-[#494963]">{title}</b><small className="mt-1 block text-[#494963]/45">{description}</small></span><Download className="h-4 w-4 shrink-0 text-[#494963]/25 transition-colors group-hover:text-[#494963]" /></a>)}</div> : <div className="divide-y divide-[#494963]/[.08]">{marcoTrainings.map(([title, description, href]) => <a key={href} href={href} target="_blank" rel="noreferrer" className="group flex min-h-[92px] items-center gap-4 py-4"><BookOpen className="h-4.5 w-4.5 shrink-0 text-[#494963]/35" /><span className="min-w-0 flex-1"><b className="block text-sm text-[#494963]">{title}</b><small className="mt-1 block text-[#494963]/45">{description}</small></span><ArrowUpRight className="h-4 w-4 shrink-0 text-[#494963]/25 transition-colors group-hover:text-[#494963]" /></a>)}</div>}
            </div>
          </div>
        </div>
      </section>
      <section id="ejes" className="v3-section !p-0 md:!p-[14px]"><div className="rounded-none bg-[#F5F5F7] p-5 md:rounded-3xl md:p-8 lg:p-10">
        <header className="mb-10 max-w-2xl md:mb-14">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#494963]/40">Marco conceptual</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-.03em] text-[#494963] md:text-4xl">Aspectos distintivos del Diseño Curricular.</h2>
          <p className="mt-3 text-sm text-[#494963]/45">Seleccioná un eje para conocer su alcance sin perder el recorrido general.</p>
        </header>
        <div className="overflow-hidden rounded-2xl bg-white" role="list" aria-label="Aspectos distintivos del Diseño Curricular">
          {centralAxes.map(([title, description], index) => {
            const active = selectedAxis === index;
            const panelId = `eje-central-${index}-panel`;
            const buttonId = `eje-central-${index}-button`;

            return (
              <div
                key={title}
                ref={(node) => { axisRefs.current[index] = node; }}
                role="listitem"
                className="border-b border-[#494963]/[.08] last:border-0"
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
                  className={`flex min-h-[64px] w-full items-center gap-3 px-4 py-3.5 text-left text-sm font-semibold leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#494963] sm:px-5 ${active ? "bg-[#494963] text-white" : "text-[#494963] hover:bg-[#494963]/[.035]"}`}
                >
                  <span className={`w-6 shrink-0 text-[10px] font-bold ${active ? "text-white/45" : "text-[#494963]/30"}`}>{String(index + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1">{title}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center transition-transform duration-300 ${active ? "rotate-90" : ""}`} aria-hidden="true">
                    <span className="-ml-3"><SolidAreaArrow /></span>
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!active}
                  className="border-t border-[#494963]/[.08] bg-white px-4 py-5 text-[#494963] sm:px-5 sm:py-6"
                >
                  <p className="max-w-3xl pl-9 text-sm leading-relaxed text-[#494963]/65 sm:text-base">{description}</p>
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
