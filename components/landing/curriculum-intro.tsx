"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function CurriculumIntro() {
  return (
    <section id="inicio" className="w-full min-h-screen bg-[#EDEDF0] py-16 md:py-20 lg:py-0 overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 h-full">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-8 lg:h-screen">
          {/* Left Content (text block) */}
          <div className="w-full lg:w-1/2 max-w-xl space-y-6 lg:space-y-8 lg:pt-0">
            <div className="w-16 h-16 md:w-20 md:h-20">
              <Image
                src="/images/recurso-3.png"
                alt="Logo Diseño Curricular"
                width={80}
                height={80}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            {/* Title: Inter Tight */}
            <h1
              className="font-bold text-3xl md:text-4xl lg:text-[2.75rem] text-[#3D3D5C] leading-tight"
              style={{
                fontFamily:
                  "'Inter Tight', 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
              }}
            >
              Diseño Curricular
              <br />
              para la Educación
              <br />
              Primaria de Santa Fe
            </h1>

            {/* Paragraphs */}
            <div className="space-y-5 text-[#3D3D5C] max-w-md">
              <p className="text-base md:text-lg leading-relaxed">
                Un marco común que orienta qué enseñar, cómo hacerlo y con qué
                propósito.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Una política concreta para garantizar una enseñanza de calidad,
                centrada en los aprendizajes claves para las infancias del siglo
                XXI, en sus derechos, sus intereses y sus desafíos.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Una hoja de ruta en la que cada docente tiene el rol
                insustituible de convertir este diseño en prácticas situadas y
                significativas.
              </p>
            </div>

            {/* Button */}
            <div className="pt-4 flex justify-center lg:justify-start">
              <Link
                href="#marco-general"
                className="inline-flex items-center px-6 py-2.5 rounded-full border-2 border-[#B159A7] text-[#B159A7] font-medium text-sm hover:bg-[#C084FC]/10 transition-colors"
              >
                Conocer más
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
          alt="Ilustración del diseño curricular con mapa de Santa Fe"
          fill
          className="object-contain object-center lg:object-right lg:translate-x-[12%]"
          priority
        />
      </div>
    </section>
  );
}
