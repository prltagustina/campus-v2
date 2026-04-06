"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, Clock, ArrowDownToLine, ChevronRight } from "lucide-react";
import type { Area } from "@/lib/areas-data";

interface MaterialesSectionProps {
  area: Area;
}

type Categoria = "descargas" | "jornada-ampliada";

/* Idiomas disponibles para Lenguas Extranjeras */
const idiomas = [
  { id: "aleman", name: "Alemán" },
  { id: "frances", name: "Francés" },
  { id: "ingles", name: "Inglés" },
  { id: "italiano", name: "Italiano" },
  { id: "portugues", name: "Portugués" },
];

export function MaterialesSection({ area }: MaterialesSectionProps) {
  const isLenguasExtranjeras = area.slug === "lenguas-extranjeras";

  const [categoriaActiva, setCategoriaActiva] =
    useState<Categoria>("descargas");

  const categorias: { id: Categoria; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "descargas", label: "Descargas", icon: ArrowDownToLine },
    { id: "jornada-ampliada", label: "Jornada Ampliada", icon: Clock },
  ];

  const jornadaFiles = [
    {
      nombre: `Cuadernillo Jornada Ampliada - ${area.name} - Primer Ciclo`,
      formato: "PDF",
      size: "2.4 MB",
    },
    {
      nombre: `Cuadernillo Jornada Ampliada - ${area.name} - Segundo Ciclo`,
      formato: "PDF",
      size: "3.1 MB",
    },
  ];

  const docFiles = [
    { nombre: `Programa de estudio - ${area.name}`, formato: "PDF", size: "1.8 MB" },
    { nombre: `Guía didáctica - ${area.name}`, formato: "PDF", size: "2.2 MB" },
    { nombre: `Planificación anual - ${area.name}`, formato: "PDF", size: "1.5 MB" },
  ];

  const files = categoriaActiva === "descargas" ? docFiles : jornadaFiles;

  /* Para Lenguas Extranjeras: mostrar selector de idiomas */
  if (isLenguasExtranjeras) {
    return (
      <section id="materiales" className="scroll-mt-32">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-20">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#494963] font-display">
            Descarga de materiales
          </h3>
          <p className="text-base text-[#494963]/50 mt-4 max-w-xl">
            Seleccioná un idioma para acceder a los materiales de descarga correspondientes.
          </p>
        </div>

        {/* Idiomas - diseño editorial compacto */}
        <div className="max-w-xl mx-auto flex flex-wrap justify-center gap-2">
          {idiomas.map((idioma) => (
            <Link
              key={idioma.id}
              href={`/area/lenguas-extranjeras/materiales/${idioma.id}`}
              className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#494963] transition-all hover:border-[#494963]/30 hover:bg-[#494963]/[0.03]"
            >
              <span>{idioma.name}</span>
              <ChevronRight 
                className="w-3.5 h-3.5 text-[#494963]/30 group-hover:text-[#494963]/50 transition-colors" 
              />
            </Link>
          ))}
        </div>

        {/* Jornada Ampliada section */}
        <div className="mt-16">
          <h4 className="text-lg font-bold text-[#494963] text-center mb-8">
            Jornada Ampliada
          </h4>
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {jornadaFiles.map((file) => (
              <div
                key={file.nombre}
                className="group flex items-center gap-5 rounded-2xl border border-gray-100 bg-white px-6 py-5 transition-all hover:border-gray-200 hover:shadow-md"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${area.color}0D` }}
                >
                  <FileText className="w-5 h-5" style={{ color: area.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base text-[#494963] font-medium truncate leading-snug">
                    {file.nombre}
                  </p>
                  <p className="text-xs text-[#494963]/35 mt-1">
                    {file.formato} &middot; {file.size}
                  </p>
                </div>
                <button
                  type="button"
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all text-[#494963]/30 hover:text-white group-hover:opacity-100 opacity-60"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = area.color;
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "";
                    (e.currentTarget as HTMLElement).style.color = "";
                  }}
                >
                  <ArrowDownToLine className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* Para otras áreas: mostrar tabs y archivos normales */
  return (
    <section id="materiales" className="scroll-mt-32">
      {/* Section header */}
      <div className="flex flex-col items-center text-center mb-14 md:mb-20">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#494963] font-display">
          Descarga de materiales
        </h3>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-12">
        {categorias.map((cat) => {
          const isActive = categoriaActiva === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoriaActiva(cat.id)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold transition-all border"
              style={{
                backgroundColor: isActive ? area.color : "transparent",
                borderColor: isActive ? area.color : "#e5e5e5",
                color: isActive ? area.textOnColor : "#494963",
                opacity: isActive ? 1 : 0.6,
              }}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Files list */}
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {files.map((file) => (
          <div
            key={file.nombre}
            className="group flex items-center gap-5 rounded-2xl border border-gray-100 bg-white px-6 py-5 transition-all hover:border-gray-200 hover:shadow-md"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${area.color}0D` }}
            >
              <FileText className="w-5 h-5" style={{ color: area.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base text-[#494963] font-medium truncate leading-snug">
                {file.nombre}
              </p>
              <p className="text-xs text-[#494963]/35 mt-1">
                {file.formato} &middot; {file.size}
              </p>
            </div>
            <button
              type="button"
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all text-[#494963]/30 hover:text-white group-hover:opacity-100 opacity-60"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = area.color;
                (e.currentTarget as HTMLElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "";
                (e.currentTarget as HTMLElement).style.color = "";
              }}
            >
              <ArrowDownToLine className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
