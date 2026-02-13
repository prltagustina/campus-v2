"use client";

import { useState } from "react";

export function AreaOrganizationSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items = [
    {
      number: "01",
      title: "Presentación del área",
      description: "Fundamentos y ejes de contenido.",
    },
    {
      number: "02",
      title: "Objetivos",
      description: "Por ciclo y para 7º grado.",
    },
    {
      number: "03",
      title: "Contenidos",
      description: "Organizados en cuadros por eje y grado.",
    },
    {
      number: "04",
      title: "Enfoques transversales",
      description:
        "Etiquetas que señalan qué contenidos pueden trabajarse desde la ciudadanía, la educación ambiental y otros enfoques.",
    },
    {
      number: "05",
      title: "Recomendaciones",
      description:
        "Orientaciones específicas para la enseñanza, la evaluación y la diversificación.",
    },
    {
      number: "06",
      title: "Lecturas sugeridas y glosario",
      description: "",
    },
  ];

  return (
    <section id="organizacion" className="w-full bg-[#f8f8f8] py-24 md:pt-32 md:pb-32">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-['Inter_Tight'] tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-[#494963] mb-4">
            Cómo está <br />
            organizada cada área
          </h2>

          <p className="text-lg md:text-xl font-normal text-[#494963] max-w-3xl mb-12">
            Todas comparten una misma estructura:
          </p>

          {/* DESKTOP */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Línea horizontal */}
              <div className="absolute top-6 left-0 right-0 h-px bg-[#494963]/20" />

              <div className="grid grid-cols-6 gap-4">
                {items.map((item, index) => (
                  <div key={index} className="relative group">
                    {/* Círculo */}
                    <div
                      className="
                        relative z-10 w-12 h-12 rounded-full
                        flex items-center justify-center mb-6
                        border border-[#494963]
                        bg-white
                        transition-all duration-300 ease-out
                        group-hover:bg-[#494963]
                        group-hover:scale-105
                      "
                    >
                      <span
                        className="
                          text-sm font-medium
                          text-[#494963]
                          transition-colors duration-300
                          group-hover:text-white
                        "
                      >
                        {item.number}
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg font-medium text-[#494963] mb-3 leading-tight">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-base text-[#494963] leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MOBILE */}
          <div className="md:hidden space-y-0">
            {items.map((item, index) => (
              <div
                key={index}
                className={
                  index !== items.length - 1
                    ? "border-b border-[#494963]/20"
                    : ""
                }
              >
                <button
                  className="w-full py-5 flex items-baseline gap-4 text-left"
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                >
                  <span className="text-lg font-semibold text-[#494963] w-8">
                    {item.number}
                  </span>
                  <span className="flex-1 text-base md:text-lg font-medium text-[#494963]">
                    {item.title}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    activeIndex === index
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {item.description && (
                    <p className="pl-12 pr-4 pb-5 text-base text-[#494963] leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
