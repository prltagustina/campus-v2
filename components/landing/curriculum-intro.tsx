"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";

export function CurriculumIntro() {
  return (
    <section
      id="inicio"
      className="w-full min-h-screen bg-[#EDEDF0] py-16 md:py-20 lg:py-0 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12 h-full">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-8 lg:h-screen">
          {/* Left Content (text block) */}
          <div className="w-full lg:w-1/2 max-w-xl space-y-6 lg:space-y-8 lg:pt-0">
            <div className="w-16 h-16 md:w-20 md:h-20">
              <Image
                src="/images/recurso-3.png"
                alt="Logo Dise\u00f1o Curricular"
                width={80}
                height={80}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            {/* Title */}
            <h1 className="font-bold text-4xl md:text-5xl lg:text-[3.25rem] text-[#3D3D5C] leading-tight tracking-tight font-display">
              {"Dise\u00f1o Curricular"}
              <br />
              {"para la Educaci\u00f3n"}
              <br />
              {"Primaria de Santa Fe"}
            </h1>

            {/* Paragraphs */}
            <div className="space-y-4 text-[#3D3D5C]/80 max-w-md">
              <p className="text-lg md:text-xl leading-relaxed">
                {
                  "Un marco com\u00fan que orienta qu\u00e9 ense\u00f1ar, c\u00f3mo hacerlo y con qu\u00e9 prop\u00f3sito."
                }
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                {
                  "Una política concreta para garantizar una enseñanza de calidad, centrada en los aprendizajes claves para las infancias del siglo XXI, en sus derechos, sus intereses y sus desafíos."
                }
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                {
                  "Una hoja de ruta en la que cada docente tiene el rol insustituible de convertir este dise\u00f1o en pr\u00e1cticas situadas y significativas."
                }
              </p>
            </div>

            {/* Double CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch lg:items-start gap-3 w-full sm:w-auto">
              <a
                href="https://campuseducativo.santafe.edu.ar/diseno-curricular/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 h-12 rounded-lg bg-[#494963] text-white font-semibold text-base hover:bg-[#3a3a4f] transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">{"DESCARGAR DISE\u00d1O CURRICULAR"}</span>
                <span className="sm:hidden">DESCARGAR</span>
              </a>
              <Link
                href="/marco-general"
                className="inline-flex items-center justify-center px-7 h-12 rounded-lg border-2 border-[#494963]/20 text-[#494963] font-semibold text-base hover:border-[#494963]/40 hover:bg-[#494963]/4 transition-colors"
              >
                {"Conocer m\u00e1s"}
              </Link>
            </div>
          </div>

          {/* Spacer so text stays left on wide screens */}
          <div className="hidden lg:block lg:flex-1" />
        </div>
      </div>

      {/* Right illustration */}
      <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[55%] h-[380px] md:h-[520px] lg:h-[90%] mt-8 lg:mt-0 pointer-events-none">
        <Image
          src="/images/ilustracionIntro.png"
          alt="Ilustraci\u00f3n del dise\u00f1o curricular con mapa de Santa Fe"
          fill
          className="object-contain object-center lg:object-right lg:translate-x-[12%]"
          priority
        />
      </div>
    </section>
  );
}
