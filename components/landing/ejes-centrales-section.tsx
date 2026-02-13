"use client";

import { useState } from "react";
import { Download, ArrowRight } from "lucide-react";

const ICON_CLASS = "w-5 h-5 flex-shrink-0";
const ICON_SIZE = 20;

const ejes = [
  {
    title: "Aprendizajes comunes, fundantes y significativos",
    description:
      "Saberes que aseguran el avance hacia conocimientos más complejos y promueven la participación plena en la vida social.",
  },
  {
    title: "Relación dialógica entre la enseñanza y la evaluación",
    description:
      "La enseñanza como práctica intencional y situada en el marco de enfoques activos. La evaluación planificada de la mano de la enseñanza.",
  },
  {
    title: "Alfabetización desde el inicio",
    description:
      "Una alfabetización plena desde Primer Grado como base imprescindible para el desarrollo integral de las trayectorias escolares.",
  },
  {
    title: "Matemática en situaciones reales",
    description:
      "La resolución de problemas auténticos desde la evidencia, el razonamiento, la argumentación y la validación matemática en diálogo con la vida cotidiana.",
  },
  {
    title: "Más tiempo para pensar científicamente",
    description:
      "El pensamiento crítico, científico y ciudadano desde los primeros años a partir de la ampliación horaria para las ciencias.",
  },
  {
    title: "Saberes, Vidas y Mundos: un espacio flexible y por proyectos",
    description:
      "El abordaje de temáticas actuales a través de la participación activa de las infancias y la articulación de los contenidos de las áreas y los enfoques transversales.",
  },
  {
    title: "Educación Tecnológica actualizada",
    description:
      "La actualización de Educación Tecnológica, a la que se suman el pensamiento computacional, la robótica, la ciudadanía digital y una mirada crítica sobre los consumos tecnológicos.",
  },
  {
    title: "Lenguas Extranjeras a lo largo de toda la escolaridad",
    description:
      "La incorporación gradual de Lenguas Extranjeras a lo largo de toda la escolaridad para garantizar el derecho a aprender otras lenguas y culturas desde una perspectiva plurilingüe e intercultural.",
  },
  {
    title: "Lenguajes artísticos con sentido territorial",
    description:
      "La presencia de los lenguajes artísticos articulados por ejes comunes, con saberes situados en el contexto y en diálogo con las producciones artísticas identitarias y con el patrimonio cultural provincial.",
  },
  {
    title: "Prácticas corporales como diversidad cultural",
    description:
      "El valor de la diversidad de prácticas corporales y motrices como manifestaciones culturales y desde una perspectiva que prioriza el juego, la expresión y el respeto por las subjetividades.",
  },
  {
    title: "Enfoques transversales en todas las áreas",
    description:
      "Un abordaje de los enfoques transversales que los convierte en parte integral de los espacios curriculares con orientaciones explícitas para la articulación.",
  },
  {
    title: "La heterogeneidad como punto de partida",
    description:
      "El reconocimiento de la heterogeneidad inherente a los grupos escolares como una riqueza a valorar y la diversidad como punto de partida de la enseñanza.",
  },
  {
    title: "Formación Ética y Ciudadana",
    description:
      "La resignificación y profundización de los contenidos de Formación Ética y Ciudadana, que están presentes en el enfoque transversal Ciudadanía, Derechos Humanos y Participación, en los contenidos propios de Saberes, Vidas y Mundos, y en el eje Las sociedades, la vida cotidiana y las prácticas culturales de Ciencias Sociales.",
  },
];

function splitArray<T>(arr: T[], parts = 2): T[][] {
  const result = Array.from({ length: parts }, () => [] as T[]);
  arr.forEach((item, index) => result[index % parts].push(item));
  return result;
}

export function EjesCentralesSection() {
  const titleColor = "#494963";
  const [active, setActive] = useState<number | null>(0);
  const [leftColumn, rightColumn] = splitArray(ejes, 2);

  const toggle = (globalIndex: number) => {
    setActive((prev) => (prev === globalIndex ? null : globalIndex));
  };

  const renderItem = (
    item: { title: string; description: string },
    idx: number,
    globalIndex: number
  ) => (
    <div key={globalIndex} className="py-4 border-b border-gray-300">
      <button
        onClick={() => toggle(globalIndex)}
        aria-expanded={active === globalIndex}
        className="w-full flex items-center justify-between gap-4 text-left transition-colors"
      >
        <h4 className="text-lg md:text-xl font-semibold text-gray-700 leading-tight flex-1">
          {item.title}
        </h4>

        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${
            active === globalIndex ? "rotate-90" : "rotate-0"
          }`}
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M4 2L8 6L4 10V2Z" fill="#333333" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-[max-height,opacity,margin] duration-300 ${
          active === globalIndex
            ? "max-h-[400px] opacity-100 mt-2"
            : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-base text-gray-600 leading-relaxed pb-4">
          {item.description}
        </p>
      </div>
    </div>
  );

  return (
    <section id="ejes-centrales" className="w-full py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <h3
            className="text-2xl md:text-3xl font-bold mb-6"
            style={{ color: titleColor }}
          >
            <span className="block">Ejes centrales</span>
            <span className="block">de la propuesta</span>
          </h3>

          <div className="w-full h-px bg-gray-300 mb-6" />

          {/* Ejes */}
          <div className="grid md:grid-cols-2 gap-x-8 mb-12 md:mb-16">
            <div>
              {leftColumn.map((item, index) => renderItem(item, index, index))}
            </div>
            <div>
              {rightColumn.map((item, index) =>
                renderItem(item, index, leftColumn.length + index)
              )}
            </div>
          </div>

          {/* Bottom */}
          <div className="grid lg:grid-cols-2 gap-8 items-start mt-20 -mx-4">
            <div className="flex justify-start order-2 lg:order-1">
              <img
                src="/images/ilustracionEjes.png"
                alt="Ilustración decorativa ejes centrales"
                className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto"
              />
            </div>

            <div className="order-1 lg:order-2 px-4">
              <div className="rounded-lg p-6 md:p-8 bg-[#EDEDF0] max-w-md">
                {/* TÍTULO SIEMPRE EN DOS LÍNEAS */}
                <h4
                  className="text-xs md:text-sm font-semibold tracking-wide mb-6 uppercase"
                  style={{ color: titleColor }}
                >
                  <span className="block">Enlaces de interés</span>
                  <span className="block">y descarga de documentos</span>
                </h4>

                <div className="w-full h-px bg-gray-300 mb-6" />

                <div className="space-y-4 mb-6">
                  <a
                    href="#"
                    className="flex items-center gap-3 font-semibold"
                    style={{ color: titleColor }}
                  >
                    <Download size={ICON_SIZE} className={ICON_CLASS} />
                    <span className="leading-snug block">
                      Documento de acompañamiento
                      <br />
                      para docentes y directivos
                    </span>
                  </a>

                  <a
                    href="#"
                    className="flex items-center gap-3 font-semibold"
                    style={{ color: titleColor }}
                  >
                    <Download size={ICON_SIZE} className={ICON_CLASS} />
                    <span>
                      Presentación para supervisores, <br /> directivos y
                      docentes
                    </span>
                  </a>
                </div>

                <div className="w-full h-px bg-gray-300 mb-6" />

                <p className="text-sm mb-4" style={{ color: titleColor }}>
                  Formaciones docentes
                </p>

                <a
                  href="https://campuseducativo.santafe.edu.ar/diversificacion-de-la-ensenanza/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-semibold"
                  style={{ color: titleColor }}
                >
                  <ArrowRight size={ICON_SIZE} className={ICON_CLASS} />
                  <span>Diversificación para la Enseñanza</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EjesCentralesSection;
