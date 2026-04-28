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

/* Materiales y recursos educativos - con más info (thumbnails para videos) */
const recursosEducativos = {
  secuencias: [
    { nombre: "Primeros pasos", formato: "PDF", size: "2.4 MB", descripcion: "Introducción al idioma", paginas: 12 },
    { nombre: "Mi familia y yo", formato: "PDF", size: "3.1 MB", descripcion: "Vocabulario familiar", paginas: 18 },
    { nombre: "En la escuela", formato: "PDF", size: "2.8 MB", descripcion: "Contexto escolar", paginas: 15 },
    { nombre: "Los colores del mundo", formato: "PDF", size: "2.2 MB", descripcion: "Colores y formas", paginas: 10 },
    { nombre: "Animales y naturaleza", formato: "PDF", size: "3.5 MB", descripcion: "Fauna y flora", paginas: 20 },
  ],
  audiovisuales: [
    { nombre: "Vocabulario del aula", formato: "MP4", size: "45 MB", duracion: "5:30", thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=120&h=80&fit=crop" },
    { nombre: "Canciones interactivas", formato: "MP4", size: "62 MB", duracion: "8:20", thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&h=80&fit=crop" },
    { nombre: "Storytelling", formato: "MP4", size: "38 MB", duracion: "6:15", thumbnail: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=120&h=80&fit=crop" },
  ],
  guias: [
    { nombre: "Guía didáctica - Nivel inicial", formato: "PDF", size: "4.5 MB", descripcion: "Para docentes principiantes", paginas: 32 },
    { nombre: "Planificación anual sugerida", formato: "PDF", size: "1.8 MB", descripcion: "Calendario escolar", paginas: 8 },
    { nombre: "Estrategias de evaluación", formato: "PDF", size: "2.2 MB", descripcion: "Rúbricas y criterios", paginas: 14 },
    { nombre: "Recursos para el aula", formato: "PDF", size: "3.0 MB", descripcion: "Material imprimible", paginas: 24 },
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

        {/* Idiomas - botones amarillos sólidos MAS GRANDES */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {idiomas.map((idioma) => {
            const isSelected = idiomaSeleccionado === idioma.id;
            return (
              <button
                key={idioma.id}
                type="button"
                onClick={() => handleIdiomaClick(idioma.id)}
                className="group inline-flex items-center gap-2 sm:gap-3 rounded-full px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-3.5 text-sm sm:text-base lg:text-lg font-semibold transition-all hover:shadow-md hover:scale-105"
                style={{ 
                  backgroundColor: isSelected ? area.color : `${area.color}30`,
                  color: isSelected ? "#5c4a00" : "#5c4a00",
                  boxShadow: isSelected ? `0 4px 12px ${area.color}50` : "none",
                }}
              >
                <span>{idioma.name}</span>
                <ChevronDown 
                  className={`w-4 h-4 sm:w-5 sm:h-5 opacity-60 group-hover:opacity-100 transition-all ${isSelected ? "rotate-180" : ""}`}
                />
              </button>
            );
          })}
        </div>

        {/* Sección de Materiales y recursos educativos - aparece al seleccionar un idioma */}
        {idiomaSeleccionado && (
          <div className="mt-10 sm:mt-14 animate-in fade-in slide-in-from-top-4 duration-300">
            {/* Título del idioma seleccionado - ALINEADO A LA IZQUIERDA */}
            <div className="mb-8">
              <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#494963] font-display text-left">
                {idiomaInfo?.name}
              </h4>
            </div>

            {/* Materiales y recursos educativos - LISTA ORDENADA */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 lg:p-6 shadow-sm">
              <h5 className="text-sm sm:text-base font-bold text-[#494963] mb-4 font-display">
                Materiales y recursos educativos
              </h5>

              <div className="space-y-1">
                {/* Secuencias didácticas */}
                <div className="border-b border-gray-50 last:border-0">
                  <button
                    type="button"
                    onClick={() => toggleCategoriaRecurso("secuencias")}
                    className="w-full flex items-center justify-between py-2.5 sm:py-3 text-left group"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#494963]/30" />
                      <span className="text-xs sm:text-sm font-medium text-[#494963]">Secuencias didácticas</span>
                      <span className="text-[10px] sm:text-xs text-[#494963]/30 bg-gray-50 px-1.5 py-0.5 rounded">{recursosEducativos.secuencias.length}</span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#494963]/30 transition-transform ${categoriaRecursoAbierta === "secuencias" ? "rotate-180" : ""}`} />
                  </button>
                  {categoriaRecursoAbierta === "secuencias" && (
                    <div className="pb-3 sm:pb-4 pl-5 sm:pl-7 space-y-0.5">
                      {recursosEducativos.secuencias.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2 px-2 sm:px-3 rounded-lg hover:bg-gray-50 group/item">
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#494963]/40" />
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs sm:text-sm text-[#494963]/80 block truncate">{item.nombre}</span>
                              <span className="text-[10px] sm:text-xs text-[#494963]/40 hidden sm:block">{item.descripcion} · {item.paginas} pág.</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                            <span className="text-[10px] sm:text-xs text-[#494963]/30 hidden sm:block">{item.size}</span>
                            <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#494963]/20 group-hover/item:text-[#494963]/50 transition-colors cursor-pointer" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Materiales audiovisuales */}
                <div className="border-b border-gray-50 last:border-0">
                  <button
                    type="button"
                    onClick={() => toggleCategoriaRecurso("audiovisuales")}
                    className="w-full flex items-center justify-between py-2.5 sm:py-3 text-left group"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#494963]/30" />
                      <span className="text-xs sm:text-sm font-medium text-[#494963]">Materiales audiovisuales</span>
                      <span className="text-[10px] sm:text-xs text-[#494963]/30 bg-gray-50 px-1.5 py-0.5 rounded">{recursosEducativos.audiovisuales.length}</span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#494963]/30 transition-transform ${categoriaRecursoAbierta === "audiovisuales" ? "rotate-180" : ""}`} />
                  </button>
                  {categoriaRecursoAbierta === "audiovisuales" && (
                    <div className="pb-3 sm:pb-4 pl-5 sm:pl-7 space-y-0.5">
                      {recursosEducativos.audiovisuales.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2 px-2 sm:px-3 rounded-lg hover:bg-gray-50 group/item">
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            {/* Miniatura para videos */}
                            {"thumbnail" in item ? (
                              <div className="relative w-10 h-7 sm:w-12 sm:h-8 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                                <img src={(item as { thumbnail: string }).thumbnail} alt="" className="w-full h-full object-cover grayscale opacity-70" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                  <Video className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                                </div>
                              </div>
                            ) : (
                              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <Video className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#494963]/40" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <span className="text-xs sm:text-sm text-[#494963]/80 block truncate">{item.nombre}</span>
                              <span className="text-[10px] sm:text-xs text-[#494963]/40">{item.duracion}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                            <span className="text-[10px] sm:text-xs text-[#494963]/30 hidden sm:block">{item.size}</span>
                            <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#494963]/20 group-hover/item:text-[#494963]/50 transition-colors cursor-pointer" />
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
                    className="w-full flex items-center justify-between py-2.5 sm:py-3 text-left group"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#494963]/30" />
                      <span className="text-xs sm:text-sm font-medium text-[#494963]">Guías para la docencia</span>
                      <span className="text-[10px] sm:text-xs text-[#494963]/30 bg-gray-50 px-1.5 py-0.5 rounded">{recursosEducativos.guias.length}</span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#494963]/30 transition-transform ${categoriaRecursoAbierta === "guias" ? "rotate-180" : ""}`} />
                  </button>
                  {categoriaRecursoAbierta === "guias" && (
                    <div className="pb-3 sm:pb-4 pl-5 sm:pl-7 space-y-0.5">
                      {recursosEducativos.guias.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2 px-2 sm:px-3 rounded-lg hover:bg-gray-50 group/item">
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#494963]/40" />
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs sm:text-sm text-[#494963]/80 block truncate">{item.nombre}</span>
                              <span className="text-[10px] sm:text-xs text-[#494963]/40 hidden sm:block">{item.descripcion} · {item.paginas} pág.</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                            <span className="text-[10px] sm:text-xs text-[#494963]/30 hidden sm:block">{item.size}</span>
                            <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#494963]/20 group-hover/item:text-[#494963]/50 transition-colors cursor-pointer" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Banner English Funzine - solo para Inglés - MEJOR RESPONSIVE */}
            {idiomaSeleccionado === "ingles" && (
              <div className="mt-4 sm:mt-6">
                <Link
                  href="/area/lenguas-extranjeras/materiales/ingles"
                  className="group block overflow-hidden rounded-xl sm:rounded-2xl transition-all hover:shadow-xl hover:scale-[1.005]"
                  style={{ backgroundColor: area.color }}
                >
                  <div className="relative p-4 sm:p-5 lg:p-6 flex items-center gap-3 sm:gap-4 lg:gap-5">
                    {/* Logo Funzine */}
                    <div className="flex-shrink-0">
                      <img 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-english-funzine-JxN2InFZ5FUNsqS0lqWZVRrvPgnxBj.png"
                        alt="English Funzine"
                        className="h-8 sm:h-10 lg:h-12 w-auto"
                      />
                    </div>
                    
                    {/* Tagline - The magazine that makes English fun! */}
                    <div className="flex-1 min-w-0">
                      <img 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the-magazine-f811IynMCsQ7XvD0Q8zJl9pEbfUSCx.png"
                        alt="The magazine that makes English fun!"
                        className="h-5 sm:h-7 lg:h-9 w-auto max-w-full"
                      />
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 sm:w-28 sm:h-28 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
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
