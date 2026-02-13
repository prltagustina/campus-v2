"use client";

import React, { useState } from "react";
import { FileText, Clock, ArrowDownToLine, BookOpen } from "lucide-react";
import type { Area } from "@/lib/areas-data";

interface MaterialesSectionProps {
  area: Area;
}

type Categoria = "jornada-ampliada" | "documentacion";

export function MaterialesSection({ area }: MaterialesSectionProps) {
  const [categoriaActiva, setCategoriaActiva] =
    useState<Categoria>("jornada-ampliada");

  const categorias: { id: Categoria; label: string; icon: typeof Clock }[] = [
    { id: "jornada-ampliada", label: "Jornada Ampliada", icon: Clock },
    { id: "documentacion", label: "Documentaci\u00f3n", icon: BookOpen },
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
    { nombre: `Gu\u00eda did\u00e1ctica - ${area.name}`, formato: "PDF", size: "2.2 MB" },
    { nombre: `Planificaci\u00f3n anual - ${area.name}`, formato: "PDF", size: "1.5 MB" },
  ];

  const files =
    categoriaActiva === "jornada-ampliada" ? jornadaFiles : docFiles;

  return (
    <section id="materiales" className="scroll-mt-32">
      {/* Section header -- centered */}
      <div className="flex flex-col items-center text-center mb-12 md:mb-16">
        <div
          className="w-10 h-1 rounded-full mb-6"
          style={{ backgroundColor: area.color }}
        />
        <h3
          className="text-xs md:text-sm font-bold uppercase tracking-[0.25em]"
          style={{ color: "#494963" }}
        >
          Descarga de materiales
        </h3>
      </div>

      {/* Category tabs -- centered */}
      <div className="flex justify-center gap-3 mb-10 md:mb-12">
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
                color: isActive ? "white" : "#494963",
                opacity: isActive ? 1 : 0.6,
              }}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Files list -- max-width centered */}
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
