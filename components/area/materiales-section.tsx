"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, Clock, ArrowDownToLine, ChevronRight, ChevronDown, BookOpen, Video, Download, ArrowRight } from "lucide-react";
import type { Area } from "@/lib/areas-data";

interface MaterialesSectionProps {
  area: Area;
}

type Categoria = "descargas" | "jornada-ampliada";
type CategoriaRecurso = "secuencias" | "audiovisuales" | "guias";

/* Idiomas disponibles para Lenguas Extranjeras - Inglés primero */
const idiomas = [
  { id: "ingles", name: "Inglés" },
  { id: "aleman", name: "Alemán" },
  { id: "frances", name: "Francés" },
  { id: "italiano", name: "Italiano" },
  { id: "portugues", name: "Portugués" },
];

/* Materiales y recursos educativos - comunes a todos los idiomas */
const recursosEducativos = {
  secuencias: [
    { nombre: "Primeros pasos", formato: "PDF", size: "2.4 MB" },
    { nombre: "Mi familia y yo", formato: "PDF", size: "3.1 MB" },
    { nombre: "En la escuela", formato: "PDF", size: "2.8 MB" },
    { nombre: "Los colores del mundo", formato: "PDF", size: "2.2 MB" },
    { nombre: "Animales y naturaleza", formato: "PDF", size: "3.5 MB" },
  ],
  audiovisuales: [
    { nombre: "Vocabulario del aula", formato: "MP4", size: "45 MB" },
    { nombre: "Guía de pronunciación", formato: "MP3", size: "8.2 MB" },
    { nombre: "Canciones interactivas", formato: "MP4", size: "62 MB" },
    { nombre: "Storytelling", formato: "MP4", size: "38 MB" },
  ],
  guias: [
    { nombre: "Guía didáctica - Nivel inicial", formato: "PDF", size: "4.5 MB" },
    { nombre: "Planificación anual sugerida", formato: "PDF", size: "1.8 MB" },
    { nombre: "Estrategias de evaluación", formato: "PDF", size: "2.2 MB" },
    { nombre: "Recursos para el aula", formato: "PDF", size: "3.0 MB" },
  ],
};

export function MaterialesSection({ area }: MaterialesSectionProps) {
  const isLenguasExtranjeras = area.slug === "lenguas-extranjeras";

  const [categoriaActiva, setCategoriaActiva] =
    useState<Categoria>("descargas");
  const [idiomaSeleccionado, setIdiomaSeleccionado] = useState<string | null>(null);
  const [categoriaRecursoAbierta, setCategoriaRecursoAbierta] = useState<CategoriaRecurso | null>(null);

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

  const toggleCategoriaRecurso = (cat: CategoriaRecurso) => {
    setCategoriaRecursoAbierta(categoriaRecursoAbierta === cat ? null : cat);
  };

  const handleIdiomaClick = (idiomaId: string) => {
    if (idiomaSeleccionado === idiomaId) {
      setIdiomaSeleccionado(null);
      setCategoriaRecursoAbierta(null);
    } else {
      setIdiomaSeleccionado(idiomaId);
      setCategoriaRecursoAbierta(null);
    }
  };

  /* Para Lenguas Extranjeras: mostrar selector de idiomas y materiales debajo */
  if (isLenguasExtranjeras) {
    const idiomaInfo = idiomas.find(i => i.id === idiomaSeleccionado);
    
    return (
      <section id="materiales" className="scroll-mt-32">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#494963] font-display">
            Itinerarios didácticos
          </h3>
          <p className="text-sm sm:text-base text-[#494963]/50 mt-3 max-w-md text-left sm:text-center">
            Seleccioná un idioma para acceder a los recursos.
          </p>
        </div>

        {/* Idiomas - botones amarillos sólidos */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {idiomas.map((idioma) => {
            const isSelected = idiomaSeleccionado === idioma.id;
            return (
              <button
                key={idioma.id}
                type="button"
                onClick={() => handleIdiomaClick(idioma.id)}
                className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all hover:shadow-md hover:scale-105"
                style={{ 
                  backgroundColor: isSelected ? area.color : `${area.color}30`,
                  color: isSelected ? "#5c4a00" : "#5c4a00",
                  boxShadow: isSelected ? `0 4px 12px ${area.color}50` : "none",
                }}
              >
                <span>{idioma.name}</span>
                <ChevronDown 
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 group-hover:opacity-100 transition-all ${isSelected ? "rotate-180" : ""}`}
                />
              </button>
            );
          })}
        </div>

        {/* Sección de Materiales y recursos educativos - aparece al seleccionar un idioma */}
        {idiomaSeleccionado && (
          <div className="mt-10 sm:mt-14 animate-in fade-in slide-in-from-top-4 duration-300">
            {/* Título del idioma seleccionado */}
            <div className="text-center mb-8">
              <h4 className="text-xl md:text-2xl font-bold text-[#494963] font-display">
                {idiomaInfo?.name}
              </h4>
            </div>

            {/* Materiales y recursos educativos */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm">
              <h5 className="text-base sm:text-lg font-bold text-[#494963] mb-5 font-display">
                Materiales y recursos educativos
              </h5>

              <div className="divide-y divide-gray-100">
                {/* Secuencias didácticas */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleCategoriaRecurso("secuencias")}
                    className="w-full flex items-center justify-between py-3 sm:py-4 text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-[#494963]/30" />
                      <span className="text-sm font-medium text-[#494963]">Secuencias didácticas</span>
                      <span className="text-xs text-[#494963]/30">{recursosEducativos.secuencias.length}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[#494963]/30 transition-transform ${categoriaRecursoAbierta === "secuencias" ? "rotate-180" : ""}`} />
                  </button>
                  {categoriaRecursoAbierta === "secuencias" && (
                    <div className="pb-4 pl-7 space-y-1">
                      {recursosEducativos.secuencias.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 group/item">
                          <span className="text-sm text-[#494963]/70">{item.nombre}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-[#494963]/30">{item.size}</span>
                            <Download className="w-3.5 h-3.5 text-[#494963]/20 group-hover/item:text-[#494963]/50 transition-colors cursor-pointer" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Materiales audiovisuales */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleCategoriaRecurso("audiovisuales")}
                    className="w-full flex items-center justify-between py-3 sm:py-4 text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <Video className="w-4 h-4 text-[#494963]/30" />
                      <span className="text-sm font-medium text-[#494963]">Materiales audiovisuales</span>
                      <span className="text-xs text-[#494963]/30">{recursosEducativos.audiovisuales.length}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[#494963]/30 transition-transform ${categoriaRecursoAbierta === "audiovisuales" ? "rotate-180" : ""}`} />
                  </button>
                  {categoriaRecursoAbierta === "audiovisuales" && (
                    <div className="pb-4 pl-7 space-y-1">
                      {recursosEducativos.audiovisuales.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 group/item">
                          <span className="text-sm text-[#494963]/70">{item.nombre}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-[#494963]/30">{item.size}</span>
                            <Download className="w-3.5 h-3.5 text-[#494963]/20 group-hover/item:text-[#494963]/50 transition-colors cursor-pointer" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Guías para la docencia */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleCategoriaRecurso("guias")}
                    className="w-full flex items-center justify-between py-3 sm:py-4 text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-[#494963]/30" />
                      <span className="text-sm font-medium text-[#494963]">Guías para la docencia</span>
                      <span className="text-xs text-[#494963]/30">{recursosEducativos.guias.length}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[#494963]/30 transition-transform ${categoriaRecursoAbierta === "guias" ? "rotate-180" : ""}`} />
                  </button>
                  {categoriaRecursoAbierta === "guias" && (
                    <div className="pb-4 pl-7 space-y-1">
                      {recursosEducativos.guias.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 group/item">
                          <span className="text-sm text-[#494963]/70">{item.nombre}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-[#494963]/30">{item.size}</span>
                            <Download className="w-3.5 h-3.5 text-[#494963]/20 group-hover/item:text-[#494963]/50 transition-colors cursor-pointer" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Banner English Funzine - solo para Inglés */}
            {idiomaSeleccionado === "ingles" && (
              <div className="mt-6">
                <Link
                  href="/area/lenguas-extranjeras/materiales/ingles"
                  className="group block overflow-hidden rounded-2xl transition-all hover:shadow-xl hover:scale-[1.01]"
                  style={{ backgroundColor: area.color }}
                >
                  <div className="relative p-5 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    {/* Logo Funzine */}
                    <div className="flex-shrink-0">
                      <img 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-english-funzine-JxN2InFZ5FUNsqS0lqWZVRrvPgnxBj.png"
                        alt="English Funzine"
                        className="h-12 sm:h-14 lg:h-16 w-auto"
                      />
                    </div>
                    
                    {/* Tagline - The magazine that makes English fun! */}
                    <div className="flex-1 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                      <img 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the-magazine-IT34i2R2KxWNrQUNqTTfmztloIwOs6.svg"
                        alt="The magazine that makes"
                        className="h-4 sm:h-5 w-auto"
                      />
                      <img 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the-magazine-N1q7YSUUn0jkppVWrDW7saBJh09H1F.png"
                        alt="English fun!"
                        className="h-5 sm:h-6 w-auto"
                      />
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                  </div>
                </Link>
              </div>
            )}

            {/* Mensaje "Próximamente" para otros idiomas */}
            {idiomaSeleccionado !== "ingles" && (
              <div className="mt-6 text-center py-6 sm:py-8 bg-white rounded-2xl border border-gray-100">
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: `${area.color}15` }}
                >
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: area.color }} />
                </div>
                <p className="text-sm sm:text-base font-medium text-[#494963]/60">
                  Más recursos para {idiomaInfo?.name} próximamente
                </p>
              </div>
            )}
          </div>
        )}
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
