"use client";

import { useState } from "react";
import Image from "next/image";

const ejes = [
  {
    title: "Aprendizajes comunes, fundantes y significativos",
    description:
      "Saberes que aseguran el avance hacia conocimientos mas complejos y promueven la participacion plena en la vida social.",
  },
  {
    title: "Relacion dialogica entre la ensenanza y la evaluacion",
    description:
      "La ensenanza como practica intencional y situada en el marco de enfoques activos. La evaluacion planificada de la mano de la ensenanza.",
  },
  {
    title: "Alfabetizacion desde el inicio",
    description:
      "Una alfabetizacion plena desde Primer Grado como base imprescindible para el desarrollo integral de las trayectorias escolares.",
  },
  {
    title: "Matematica en situaciones reales",
    description:
      "La resolucion de problemas autenticos desde la evidencia, el razonamiento, la argumentacion y la validacion matematica en dialogo con la vida cotidiana.",
  },
  {
    title: "Mas tiempo para pensar cientificamente",
    description:
      "El pensamiento critico, cientifico y ciudadano desde los primeros anos a partir de la ampliacion horaria para las ciencias.",
  },
  {
    title: "Saberes, Vidas y Mundos: un espacio flexible y por proyectos",
    description:
      "El abordaje de tematicas actuales a traves de la participacion activa de las infancias y la articulacion de los contenidos de las areas y los enfoques transversales.",
  },
  {
    title: "Educacion Tecnologica actualizada",
    description:
      "La actualizacion de Educacion Tecnologica, a la que se suman el pensamiento computacional, la robotica, la ciudadania digital y una mirada critica sobre los consumos tecnologicos.",
  },
  {
    title: "Lenguas Extranjeras a lo largo de toda la escolaridad",
    description:
      "La incorporacion gradual de Lenguas Extranjeras a lo largo de toda la escolaridad para garantizar el derecho a aprender otras lenguas y culturas desde una perspectiva plurilingue e intercultural.",
  },
  {
    title: "Lenguajes artisticos con sentido territorial",
    description:
      "La presencia de los lenguajes artisticos articulados por ejes comunes, con saberes situados en el contexto y en dialogo con las producciones artisticas identitarias y con el patrimonio cultural provincial.",
  },
  {
    title: "Practicas corporales como diversidad cultural",
    description:
      "El valor de la diversidad de practicas corporales y motrices como manifestaciones culturales y desde una perspectiva que prioriza el juego, la expresion y el respeto por las subjetividades.",
  },
  {
    title: "Enfoques transversales en todas las areas",
    description:
      "Un abordaje de los enfoques transversales que los convierte en parte integral de los espacios curriculares con orientaciones explicitas para la articulacion.",
  },
  {
    title: "La heterogeneidad como punto de partida",
    description:
      "El reconocimiento de la heterogeneidad inherente a los grupos escolares como una riqueza a valorar y la diversidad como punto de partida de la ensenanza.",
  },
  {
    title: "Formacion Etica y Ciudadana",
    description:
      "La resignificacion y profundizacion de los contenidos de Formacion Etica y Ciudadana, presentes en el enfoque transversal Ciudadania, Derechos Humanos y Participacion, en Saberes, Vidas y Mundos, y en Ciencias Sociales.",
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
                Identidad del diseno
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#494963] leading-tight mb-3">
                {"Ejes centrales de la propuesta"}
              </h2>
              <p className="text-[#494963]/50 text-lg max-w-xl">
                {"13 ejes que definen la identidad del nuevo diseno curricular. Toca cada uno para conocer mas."}
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
