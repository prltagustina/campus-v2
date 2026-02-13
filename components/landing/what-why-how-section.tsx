"use client";

import { useState } from "react";
import { Inter_Tight } from "next/font/google";
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function WhatWhyHowSection() {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const sections = [
    {
      id: "que",
      title: "Qué enseñar",
      content: (
        <>
          Define los{" "}
          <strong>
            contenidos fundamentales que todas las escuelas deben enseñar
          </strong>
          , organizados por áreas, ciclos y grados.
        </>
      ),
      detail: (
        <>
          Los contenidos de cada área se presentan en cuadros que muestran su{" "}
          <strong>progresión y complejización</strong>, a fin de facilitar la
          planificación de propuestas integrales y articuladas.
        </>
      ),
    },
    {
      id: "como",
      title: "Cómo hacerlo",
      content: (
        <>
          Propone <strong>articular contenidos</strong>, incorporar{" "}
          <strong>enfoques transversales</strong> y diversificar las estrategias
          de enseñanza para garantizar aprendizajes significativos en todas las
          aulas.
        </>
      ),
      detail: (
        <>
          Mediante{" "}
          <strong>orientaciones didácticas, ejemplos y recomendaciones</strong>{" "}
          específicas para cada área y ciclo.
        </>
      ),
    },
    {
      id: "por-que",
      title: "Con qué propósito",
      content: (
        <>
          Se articula en torno a principios político-pedagógicos sólidos para
          que las infancias accedan al conocimiento y se desarrollen plenamente
          como{" "}
          <strong>
            ciudadanas y ciudadanos críticos, creativos y solidarios
          </strong>
          .
        </>
      ),
      detail: (
        <>
          En las escuelas, el Estado materializa su responsabilidad indelegable:{" "}
          <strong>garantizar el derecho a la Educación</strong>.
        </>
      ),
    },
  ];

  return (
    <section id="que-ensenar" className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* TÍTULO */}
          <div className="mb-10">
            <h2
              className={`${interTight.className} text-3xl md:text-4xl lg:text-5xl font-bold text-[#494963] leading-tight`}
            >
              Qué enseñar,
              <br />
              cómo hacerlo
              <br />y con qué propósito
            </h2>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:block">
            <div className="grid grid-cols-3">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`py-8 px-6 ${
                    index !== sections.length - 1
                      ? "border-r border-gray-200"
                      : ""
                  }`}
                  onMouseEnter={() => setActiveSection(index)}
                  onMouseLeave={() => setActiveSection(null)}
                >
                  <h3
                    className={`text-2xl md:text-3xl font-bold mb-4 transition-colors duration-300 ${
                      activeSection === index
                        ? "text-[#494963]"
                        : "text-[#494963]/60"
                    }`}
                  >
                    {section.title}
                  </h3>

                  <div
                    className={`h-0.5 mb-6 bg-[#494963] transition-all duration-500 ${
                      activeSection === index ? "w-full" : "w-8"
                    }`}
                  />

                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    {section.content}
                  </p>

                  <p className="text-lg text-gray-500 leading-relaxed">
                    {section.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE */}
          <div className="md:hidden">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`${
                  index !== sections.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <button
                  onClick={() =>
                    setActiveSection(activeSection === index ? null : index)
                  }
                  className="w-full py-6 text-left flex justify-between items-center"
                >
                  <h3
                    className={`text-xl font-bold ${
                      activeSection === index
                        ? "text-[#494963]"
                        : "text-[#494963]/70"
                    }`}
                  >
                    {section.title}
                  </h3>
                  <div className="w-6 h-0.5 bg-[#494963]" />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    activeSection === index ? "max-h-96 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-lg text-gray-600 mb-3">
                    {section.content}
                  </p>
                  <p className="text-lg text-gray-500">{section.detail}</p>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </section>
  );
}

export default WhatWhyHowSection;
