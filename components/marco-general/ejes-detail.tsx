"use client";

import { useState } from "react";
import Image from "next/image";

const ejes = [
  {
    title: "Aprendizajes comunes, fundantes y significativos",
    description:
      "Saberes que aseguran el avance hacia conocimientos m\u00e1s complejos y promueven la participaci\u00f3n plena en la vida social.",
  },
  {
    title: "Relaci\u00f3n dial\u00f3gica entre la ense\u00f1anza y la evaluaci\u00f3n",
    description:
      "La ense\u00f1anza como pr\u00e1ctica intencional y situada en el marco de enfoques activos. La evaluaci\u00f3n planificada de la mano de la ense\u00f1anza.",
  },
  {
    title: "Alfabetizaci\u00f3n desde el inicio",
    description:
      "Una alfabetizaci\u00f3n plena desde Primer Grado como base imprescindible para el desarrollo integral de las trayectorias escolares.",
  },
  {
    title: "Matem\u00e1tica en situaciones reales",
    description:
      "La resoluci\u00f3n de problemas aut\u00e9nticos desde la evidencia, el razonamiento, la argumentaci\u00f3n y la validaci\u00f3n matem\u00e1tica en di\u00e1logo con la vida cotidiana.",
  },
  {
    title: "M\u00e1s tiempo para pensar cient\u00edficamente",
    description:
      "El pensamiento cr\u00edtico, cient\u00edfico y ciudadano desde los primeros a\u00f1os a partir de la ampliaci\u00f3n horaria para las ciencias.",
  },
  {
    title: "Saberes, Vidas y Mundos: un espacio flexible y por proyectos",
    description:
      "El abordaje de tem\u00e1ticas actuales a trav\u00e9s de la participaci\u00f3n activa de las infancias y la articulaci\u00f3n de los contenidos de las \u00e1reas y los enfoques transversales.",
  },
  {
    title: "Educaci\u00f3n Tecnol\u00f3gica actualizada",
    description:
      "La actualizaci\u00f3n de Educaci\u00f3n Tecnol\u00f3gica, a la que se suman el pensamiento computacional, la rob\u00f3tica, la ciudadan\u00eda digital y una mirada cr\u00edtica sobre los consumos tecnol\u00f3gicos.",
  },
  {
    title: "Lenguas Extranjeras a lo largo de toda la escolaridad",
    description:
      "La incorporaci\u00f3n gradual de Lenguas Extranjeras a lo largo de toda la escolaridad para garantizar el derecho a aprender otras lenguas y culturas desde una perspectiva pluriling\u00fce e intercultural.",
  },
  {
    title: "Lenguajes art\u00edsticos con sentido territorial",
    description:
      "La presencia de los lenguajes art\u00edsticos articulados por ejes comunes, con saberes situados en el contexto y en di\u00e1logo con las producciones art\u00edsticas identitarias y con el patrimonio cultural provincial.",
  },
  {
    title: "Pr\u00e1cticas corporales como diversidad cultural",
    description:
      "El valor de la diversidad de pr\u00e1cticas corporales y motrices como manifestaciones culturales y desde una perspectiva que prioriza el juego, la expresi\u00f3n y el respeto por las subjetividades.",
  },
  {
    title: "Enfoques transversales en todas las \u00e1reas",
    description:
      "Un abordaje de los enfoques transversales que los convierte en parte integral de los espacios curriculares con orientaciones expl\u00edcitas para la articulaci\u00f3n.",
  },
  {
    title: "La heterogeneidad como punto de partida",
    description:
      "El reconocimiento de la heterogeneidad inherente a los grupos escolares como una riqueza a valorar y la diversidad como punto de partida de la ense\u00f1anza.",
  },
  {
    title: "Formaci\u00f3n \u00c9tica y Ciudadana",
    description:
      "La resignificaci\u00f3n y profundizaci\u00f3n de los contenidos de Formaci\u00f3n \u00c9tica y Ciudadana, presentes en el enfoque transversal Ciudadan\u00eda, Derechos Humanos y Participaci\u00f3n, en Saberes, Vidas y Mundos, y en Ciencias Sociales.",
  },
];

export function EjesDetail() {
  const [active, setActive] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActive((prev) => (prev === index ? null : index));
  };

  return (
    <section id="ejes" className="w-full py-20 md:py-32 bg-[#fafafa]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header with illustration */}
          <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-end mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#494963]/40 mb-3 block">
                Identidad del dise\u00f1o
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#494963] leading-tight mb-3">
                {"Ejes centrales de la propuesta"}
              </h2>
              <p className="text-[#494963]/50 text-lg max-w-xl">
                {"13 ejes que definen la identidad del nuevo dise\u00f1o curricular. Toc\u00e1 cada uno para conocer m\u00e1s."}
              </p>
            </div>

            {/* Decorative illustration */}
            <div className="hidden md:block w-48 h-48 relative opacity-60">
              <Image
                src="/images/ilustracionIntro.png"
                alt=""
                width={192}
                height={192}
                className="object-contain"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Ejes list */}
          <div className="space-y-0">
            {ejes.map((eje, index) => (
              <div
                key={index}
                className="border-b border-[#494963]/8 last:border-b-0"
              >
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={active === index}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#494963]/6 text-[#494963]/40 text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <h4
                      className={`text-base md:text-lg font-semibold transition-colors leading-snug ${
                        active === index
                          ? "text-[#494963]"
                          : "text-[#494963]/60 group-hover:text-[#494963]"
                      }`}
                    >
                      {eje.title}
                    </h4>
                  </div>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 text-[#494963]/30 transform transition-transform duration-300 ${
                      active === index ? "rotate-90" : "rotate-0"
                    }`}
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path d="M4 2L8 6L4 10V2Z" fill="currentColor" />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    active === index
                      ? "max-h-[400px] opacity-100 pb-5"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-base text-[#494963]/50 leading-relaxed pl-12">
                    {eje.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
