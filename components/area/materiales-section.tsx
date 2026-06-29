"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, ChevronDown, BookOpen, Download, ArrowRight, ArrowUpRight, Share2, Check } from "lucide-react";
import type { Area } from "@/lib/areas-data";
import { getItinerario, type ItinerarioGrado, type ItinerarioFile } from "@/lib/itinerarios-data";

interface MaterialesSectionProps {
  area: Area;
}

type CategoriaRecurso = "secuencias" | "audiovisuales" | "guias";

/* Idiomas disponibles para Lenguas Extranjeras - orden alfabético, pero Inglés se abre por defecto */
const idiomas = [
  { id: "aleman", name: "Alemán" },
  { id: "frances", name: "Francés" },
  { id: "ingles", name: "Inglés" },
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

/* Documento de pautas común a todas las lenguas extranjeras */
const pautaLenguasExtranjeras = {
  nombre: "Res. 43/2026 - Pautas del área de Lenguas Extranjeras",
  descripcion: "Implementación del área de Lenguas Extranjeras",
  url: "/documentos/resolucion-43-26-lenguas-extranjeras.pdf",
};

/* Normativa para Inglés: pauta general + resolución del programa de ruralidad */
const normativaIngles = [
  pautaLenguasExtranjeras,
  {
    nombre: "Res. 1410/2026 - Programa Inglés para la Ruralidad",
    descripcion: "Programa Inglés para la Ruralidad",
    url: "/documentos/resolucion-1410-26-ingles.pdf",
  },
];

/* Normativa para las demás lenguas: solo el documento de pautas */
const normativaOtrasLenguas = [pautaLenguasExtranjeras];

/* Secuencias didácticas reales por idioma (tomadas del Campus Educativo) */
const secuenciasPorIdioma: Record<
  string,
  { nombre: string; descripcion: string; paginas: number; size: string; url: string }[]
> = {
  aleman: [
    {
      nombre: "Del mundo a lo local: diseñamos nuestra mascota mundialista",
      descripcion: "Secuencia 1",
      paginas: 41,
      size: "1.8 MB",
      url: "/documentos/secuencias/secuencia1_aleman.pdf",
    },
  ],
  frances: [
    {
      nombre: "Del mundo a lo local: diseñamos nuestra mascota mundialista",
      descripcion: "Secuencia 1",
      paginas: 41,
      size: "1.9 MB",
      url: "/documentos/secuencias/secuencia1_frances.pdf",
    },
  ],
  italiano: [
    {
      nombre: "Del mundo a lo local: diseñamos nuestra mascota mundialista",
      descripcion: "Secuencia 1",
      paginas: 41,
      size: "1.9 MB",
      url: "/documentos/secuencias/secuencia1_italiano.pdf",
    },
  ],
  portugues: [
    {
      nombre: "Del mundo a lo local: diseñamos nuestra mascota mundialista",
      descripcion: "Secuencia 1",
      paginas: 41,
      size: "1.8 MB",
      url: "/documentos/secuencias/secuencia1_portugues.pdf",
    },
  ],
};

/* Encabezado de grupo (ciclo) con línea divisoria editorial */
function GrupoHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#494963]/45 whitespace-nowrap">
        {label}
      </span>
      <span className="h-px flex-1 bg-gray-200/70" />
    </div>
  );
}

/* Fila de un material descargable: miniatura de portada + datos + acciones
   (compartir y descargar) SIEMPRE visibles. */
function MaterialRow({
  file,
  color,
  textOnColor,
}: {
  file: ItinerarioFile;
  color: string;
  textOnColor: string;
}) {
  const [copied, setCopied] = useState(false);
  const meta = [file.formato ?? "PDF", file.paginas ? `${file.paginas} páginas` : null]
    .filter(Boolean)
    .join(" · ");

  const handleShare = async () => {
    const shareData = {
      title: file.nombre,
      text: `${file.nombre} - Campus Educativo Santa Fe`,
      url: file.url,
    };
    const showCopied = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    };
    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(file.url);
        showCopied();
      } else {
        const input = document.createElement("input");
        input.value = file.url;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        showCopied();
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        try {
          await navigator.clipboard.writeText(file.url);
          showCopied();
        } catch {
          /* Silenciar si todo falla */
        }
      }
    }
  };

  return (
    <div
      className="group/item flex items-center gap-3 sm:gap-4 rounded-xl px-2 py-2 sm:px-3 sm:py-2.5 hover:bg-gray-50 transition-colors"
      style={{ ["--area" as string]: color, ["--area-fg" as string]: textOnColor }}
    >
      {/* Enlace de descarga -- miniatura + datos (zona principal clickeable) */}
      <a
        href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        download
        aria-label={`Descargar ${file.nombre}`}
        className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1"
      >
        {/* Miniatura de portada (primera página del PDF) */}
        <div className="relative w-11 h-[58px] sm:w-12 sm:h-16 rounded-md overflow-hidden border border-gray-200/80 flex-shrink-0 bg-gray-50">
          {file.portada ? (
            <img
              src={file.portada || "/placeholder.svg"}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FileText className="w-4 h-4 text-[#494963]/30" />
            </div>
          )}
        </div>

        {/* Datos del material */}
        <div className="min-w-0 flex-1">
          <span className="block text-sm sm:text-base font-medium text-[#494963] leading-snug line-clamp-2">
            {file.nombre}
          </span>
          <span className="text-xs text-[#494963]/45">{meta}</span>
        </div>
      </a>

      {/* Acciones -- siempre visibles */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        {/* Descargar */}
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          download
          aria-label={`Descargar ${file.nombre}`}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-2 text-xs sm:text-sm font-semibold border-[var(--area)] text-[var(--area)] group-hover/item:bg-[var(--area)] group-hover/item:text-[var(--area-fg)] transition-colors"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Descargar</span>
        </a>

        {/* Compartir -- a la derecha de Descargar */}
        <button
          type="button"
          onClick={handleShare}
          aria-label={copied ? "Enlace copiado" : `Compartir ${file.nombre}`}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-gray-200 text-[#494963]/60 hover:border-[var(--area)] hover:text-[var(--area)] transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-[var(--area)]" /> : <Share2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

/* Bloque de un grado dentro de un ciclo: etiqueta + filas de materiales,
   o estado "Próximamente" si todavía no hay material cargado. */
function GradoBlock({
  grado,
  color,
  textOnColor,
}: {
  grado: ItinerarioGrado;
  color: string;
  textOnColor: string;
}) {
  const hasFiles = grado.files.length > 0;
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="flex items-baseline gap-2 mb-2 px-2 sm:px-3">
        <h6 className="text-sm sm:text-base font-bold text-[#494963]">{grado.name}</h6>
        {hasFiles ? (
          grado.files.length > 1 && (
            <span className="text-xs text-[#494963]/35">{grado.files.length} materiales</span>
          )
        ) : (
          <span className="text-xs font-medium uppercase tracking-wide text-[#494963]/30">
            Próximamente
          </span>
        )}
      </div>
      {hasFiles && (
        <div className="space-y-0.5">
          {grado.files.map((file, idx) => (
            <MaterialRow key={idx} file={file} color={color} textOnColor={textOnColor} />
          ))}
        </div>
      )}
    </div>
  );
}

/* Tarjeta-contenedor de un grupo (ciclo) con título y bloques de grado. */
function CicloCard({
  title,
  grados,
  color,
  textOnColor,
}: {
  title: string;
  grados: ItinerarioGrado[];
  color: string;
  textOnColor: string;
}) {
  return (
    <div className="rounded-2xl lg:rounded-3xl border border-gray-100 bg-white p-4 sm:p-6 lg:p-8 shadow-sm">
      <GrupoHeader label={title} />
      <div className="divide-y divide-gray-100">
        {grados.map((grado) => (
          <GradoBlock key={grado.id} grado={grado} color={color} textOnColor={textOnColor} />
        ))}
      </div>
    </div>
  );
}

export function MaterialesSection({ area }: MaterialesSectionProps) {
  const isLenguasExtranjeras = area.slug === "lenguas-extranjeras";

  // Inglés siempre activo por defecto
  const [idiomaSeleccionado, setIdiomaSeleccionado] = useState<string>("ingles");
  const [categoriaRecursoAbierta, setCategoriaRecursoAbierta] = useState<CategoriaRecurso | null>(null);

  const toggleCategoriaRecurso = (cat: CategoriaRecurso) => {
    setCategoriaRecursoAbierta(categoriaRecursoAbierta === cat ? null : cat);
  };

  const handleIdiomaClick = (idiomaId: string) => {
    // Cambiar al idioma seleccionado (siempre mantener uno activo)
    setIdiomaSeleccionado(idiomaId);
    setCategoriaRecursoAbierta(null);
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

        {/* MOBILE: Lista minimalista full-width */}
        <div className="sm:hidden -mx-4 px-3 space-y-2 py-2">
          {idiomas.map((idioma) => {
            const isSelected = idiomaSeleccionado === idioma.id;
            const isIngles = idioma.id === "ingles";
            return (
              <div key={idioma.id} className={`overflow-hidden ${isSelected ? "rounded-t-xl" : "rounded-xl"}`}>
                <button
                  type="button"
                  onClick={() => handleIdiomaClick(idioma.id)}
                  className={`w-full flex items-center justify-between px-4 py-4 text-left transition-colors ${isSelected ? "rounded-t-xl" : "rounded-xl"}`}
                  style={{ 
                    backgroundColor: isSelected ? area.color : "rgba(0,0,0,0.03)",
                  }}
                >
                  <span className="text-base font-semibold text-[#494963]">
                    {idioma.name}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform text-[#494963]/40 ${isSelected ? "rotate-180" : ""}`}
                  />
                </button>
                
                {/* Contenido desplegable - MINIMALISTA Y FULL WIDTH */}
                {isSelected && (
                  <div className="bg-gray-50/80 animate-in fade-in slide-in-from-top-2 duration-200 rounded-b-xl">
                    {isIngles ? (
                      <div className="py-2">
                        {/* Secuencias didácticas */}
                        <div className="border-b border-gray-100/80">
                          <button
                            type="button"
                            onClick={() => toggleCategoriaRecurso("secuencias")}
                            className="w-full flex items-center justify-between px-4 py-4"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5" style={{ color: area.color }} />
                              <span className="text-sm font-medium text-[#494963]">Secuencias didácticas</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-[#494963]/40">{recursosEducativos.secuencias.length}</span>
                              <ChevronDown className={`w-4 h-4 text-[#494963]/30 transition-transform ${categoriaRecursoAbierta === "secuencias" ? "rotate-180" : ""}`} />
                            </div>
                          </button>
                          {categoriaRecursoAbierta === "secuencias" && (
                            <div className="bg-white">
                              {recursosEducativos.secuencias.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between px-4 py-4 border-t border-gray-50">
                                  <div className="min-w-0 flex-1 pr-4">
                                    <p className="text-sm font-medium text-[#494963] truncate">{item.nombre}</p>
                                    <p className="text-xs text-[#494963]/40 mt-0.5">{item.paginas} pág. · {item.size}</p>
                                  </div>
                                  <button type="button" className="w-10 h-10 flex items-center justify-center active:bg-gray-100 rounded-full">
                                    <Download className="w-5 h-5 text-[#494963]/40" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Materiales audiovisuales - oculto por ahora (contenido simulado) */}

                        {/* Normativa - mobile */}
                        <div className="border-b border-gray-100/80">
                          <button
                            type="button"
                            onClick={() => toggleCategoriaRecurso("guias")}
                            className="w-full flex items-center justify-between px-4 py-4"
                          >
                            <div className="flex items-center gap-3">
                              <BookOpen className="w-5 h-5" style={{ color: area.color }} />
                              <span className="text-sm font-medium text-[#494963]">Normativa</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-[#494963]/40">{normativaIngles.length}</span>
                              <ChevronDown className={`w-4 h-4 text-[#494963]/30 transition-transform ${categoriaRecursoAbierta === "guias" ? "rotate-180" : ""}`} />
                            </div>
                          </button>
                          {categoriaRecursoAbierta === "guias" && (
                            <div className="bg-white">
                              {normativaIngles.map((item, idx) => (
                                <a
                                  key={idx}
                                  href={item.url}
                                  download
                                  className="flex items-center justify-between px-4 py-4 border-t border-gray-50 active:bg-gray-50 transition-colors"
                                >
                                  <div className="flex items-center gap-3 min-w-0 flex-1 pr-4">
                                    <FileText className="w-5 h-5 flex-shrink-0" style={{ color: area.color }} />
                                    <div className="min-w-0">
                                      <p className="text-sm font-medium text-[#494963]">{item.nombre}</p>
                                      <p className="text-xs text-[#494963]/40 mt-0.5">{item.descripcion}</p>
                                    </div>
                                  </div>
                                  <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                                    <Download className="w-4 h-4 text-[#494963]/40" />
                                  </div>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Banner Funzine - Solo logo - MÁS GRANDE */}
                        <Link
                          href="/area/lenguas-extranjeras/materiales/ingles"
                          className="block mx-3 my-6 rounded-2xl overflow-hidden shadow-xl active:scale-[0.98] transition-transform"
                          style={{ backgroundColor: area.color }}
                        >
                          <div className="px-6 py-6 flex items-center justify-between gap-4">
                            <img 
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-english-funzine-JxN2InFZ5FUNsqS0lqWZVRrvPgnxBj.png"
                              alt="English Funzine"
                              className="h-14 w-auto flex-1 object-contain object-left"
                            />
                            <div className="w-9 h-9 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0 ml-2">
                              <ArrowRight className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </Link>
                      </div>
                    ) : (
                      /* Otros idiomas: Secuencias didácticas + Normativa */
                      <div className="py-2">
                        {/* Secuencias didácticas */}
                        <div className="border-b border-gray-100/80">
                          <button
                            type="button"
                            onClick={() => toggleCategoriaRecurso("secuencias")}
                            className="w-full flex items-center justify-between px-4 py-4"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5" style={{ color: area.color }} />
                              <span className="text-sm font-medium text-[#494963]">Secuencias didácticas</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-[#494963]/40">{(secuenciasPorIdioma[idioma.id] ?? []).length}</span>
                              <ChevronDown className={`w-4 h-4 text-[#494963]/30 transition-transform ${categoriaRecursoAbierta === "secuencias" ? "rotate-180" : ""}`} />
                            </div>
                          </button>
                          {categoriaRecursoAbierta === "secuencias" && (
                            <div className="bg-white">
                              {(secuenciasPorIdioma[idioma.id] ?? []).map((item, idx) => (
                                <a
                                  key={idx}
                                  href={item.url}
                                  download
                                  className="flex items-center justify-between px-4 py-4 border-t border-gray-50 active:bg-gray-50 transition-colors"
                                >
                                  <div className="min-w-0 flex-1 pr-4">
                                    <p className="text-sm font-medium text-[#494963]">{item.nombre}</p>
                                    <p className="text-xs text-[#494963]/40 mt-0.5">{item.paginas} pág. · {item.size}</p>
                                  </div>
                                  <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                                    <Download className="w-4 h-4 text-[#494963]/40" />
                                  </div>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Normativa - mobile */}
                        <div className="border-b border-gray-100/80">
                          <button
                            type="button"
                            onClick={() => toggleCategoriaRecurso("guias")}
                            className="w-full flex items-center justify-between px-4 py-4"
                          >
                            <div className="flex items-center gap-3">
                              <BookOpen className="w-5 h-5" style={{ color: area.color }} />
                              <span className="text-sm font-medium text-[#494963]">Normativa</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-[#494963]/40">{normativaOtrasLenguas.length}</span>
                              <ChevronDown className={`w-4 h-4 text-[#494963]/30 transition-transform ${categoriaRecursoAbierta === "guias" ? "rotate-180" : ""}`} />
                            </div>
                          </button>
                          {categoriaRecursoAbierta === "guias" && (
                            <div className="bg-white">
                              {normativaOtrasLenguas.map((item, idx) => (
                                <a
                                  key={idx}
                                  href={item.url}
                                  download
                                  className="flex items-center justify-between px-4 py-4 border-t border-gray-50 active:bg-gray-50 transition-colors"
                                >
                                  <div className="flex items-center gap-3 min-w-0 flex-1 pr-4">
                                    <FileText className="w-5 h-5 flex-shrink-0" style={{ color: area.color }} />
                                    <div className="min-w-0">
                                      <p className="text-sm font-medium text-[#494963]">{item.nombre}</p>
                                      <p className="text-xs text-[#494963]/40 mt-0.5">{item.descripcion}</p>
                                    </div>
                                  </div>
                                  <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                                    <Download className="w-4 h-4 text-[#494963]/40" />
                                  </div>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* DESKTOP: Botones horizontales */}
        <div className="hidden sm:flex flex-wrap justify-center gap-2 sm:gap-3">
          {idiomas.map((idioma) => {
            const isSelected = idiomaSeleccionado === idioma.id;
            return (
              <button
                key={idioma.id}
                type="button"
                onClick={() => handleIdiomaClick(idioma.id)}
                className="group inline-flex items-center gap-2 rounded-full px-5 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base font-semibold transition-all hover:shadow-md"
                style={{ 
                  backgroundColor: isSelected ? area.color : `${area.color}20`,
                  color: "#5c4a00",
                  boxShadow: isSelected ? `0 4px 12px ${area.color}50` : "none",
                }}
              >
                <span>{idioma.name}</span>
                <ChevronDown 
                  className={`w-4 h-4 opacity-50 group-hover:opacity-80 transition-all ${isSelected ? "rotate-180" : ""}`}
                />
              </button>
            );
          })}
        </div>

        {/* DESKTOP: Sección de Materiales - siempre visible porque inglés está siempre activo */}
        <div className="hidden sm:block mt-12 lg:mt-16 animate-in fade-in slide-in-from-top-4 duration-300">
          {/* Título del idioma seleccionado */}
          <div className="mb-10 lg:mb-12">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#494963] font-display text-left">
              {idiomaInfo?.name}
            </h4>
          </div>

          {/* Solo mostrar contenido de descarga para Inglés */}
          {idiomaSeleccionado === "ingles" ? (
            <>
              {/* Materiales y recursos educativos - MÁS GRANDE */}
              <div className="bg-white rounded-2xl lg:rounded-3xl border border-gray-100 p-6 lg:p-8 shadow-sm">
                <h5 className="text-base lg:text-lg font-bold text-[#494963] mb-6 lg:mb-8 font-display">
                  Materiales y recursos educativos
                </h5>

                <div className="space-y-2">
                  {/* Secuencias didácticas */}
                  <div className="border-b border-gray-100 last:border-0">
                    <button
                      type="button"
                      onClick={() => toggleCategoriaRecurso("secuencias")}
                      className="w-full flex items-center justify-between py-4 lg:py-5 text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${area.color}15` }}
                        >
                          <FileText className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: area.color }} />
                        </div>
                        <div>
                          <span className="text-sm lg:text-base font-semibold text-[#494963] block">Secuencias didácticas</span>
                          <span className="text-xs lg:text-sm text-[#494963]/40">{recursosEducativos.secuencias.length} archivos disponibles</span>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 lg:w-6 lg:h-6 text-[#494963]/30 transition-transform ${categoriaRecursoAbierta === "secuencias" ? "rotate-180" : ""}`} />
                    </button>
                    {categoriaRecursoAbierta === "secuencias" && (
                      <div className="pb-4 lg:pb-6 space-y-2">
                        {recursosEducativos.secuencias.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between py-4 px-4 lg:px-5 rounded-xl hover:bg-gray-50 group/item transition-colors">
                            <div className="flex items-center gap-4 min-w-0 flex-1">
                              <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-[#494963]/50" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="text-sm lg:text-base text-[#494963] font-medium block truncate">{item.nombre}</span>
                                <span className="text-xs lg:text-sm text-[#494963]/40">{item.descripcion} · {item.paginas} páginas</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0">
                              <span className="text-xs lg:text-sm text-[#494963]/30">{item.size}</span>
                              <button type="button" className="w-10 h-10 lg:w-11 lg:h-11 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors">
                                <Download className="w-4 h-4 lg:w-5 lg:h-5 text-[#494963]/50" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Materiales audiovisuales - oculto por ahora (contenido simulado) */}

                  {/* Normativa */}
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleCategoriaRecurso("guias")}
                      className="w-full flex items-center justify-between py-4 lg:py-5 text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${area.color}15` }}
                        >
                          <BookOpen className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: area.color }} />
                        </div>
                        <div>
                          <span className="text-sm lg:text-base font-semibold text-[#494963] block">Normativa</span>
                          <span className="text-xs lg:text-sm text-[#494963]/40">{normativaIngles.length} documentos disponibles</span>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 lg:w-6 lg:h-6 text-[#494963]/30 transition-transform ${categoriaRecursoAbierta === "guias" ? "rotate-180" : ""}`} />
                    </button>
                    {categoriaRecursoAbierta === "guias" && (
                      <div className="pb-4 lg:pb-6 space-y-2">
                        {normativaIngles.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.url}
                            download
                            className="flex items-center justify-between py-4 px-4 lg:px-5 rounded-xl hover:bg-gray-50 group/item transition-colors"
                          >
                            <div className="flex items-center gap-4 min-w-0 flex-1">
                              <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-[#494963]/50" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="text-sm lg:text-base text-[#494963] font-medium block truncate">{item.nombre}</span>
                                <span className="text-xs lg:text-sm text-[#494963]/40">{item.descripcion}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0">
                              <span className="text-xs lg:text-sm text-[#494963]/30 uppercase tracking-wide hidden sm:block">PDF</span>
                              <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-lg bg-gray-50 group-hover/item:bg-gray-100 flex items-center justify-center transition-colors">
                                <Download className="w-4 h-4 lg:w-5 lg:h-5 text-[#494963]/50" />
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Banner English Funzine - MÁS GRANDE */}
              <div className="mt-6 lg:mt-8">
                <Link
                  href="/area/lenguas-extranjeras/materiales/ingles"
                  className="group block overflow-hidden rounded-2xl lg:rounded-3xl transition-all hover:shadow-2xl hover:scale-[1.01] shadow-lg"
                  style={{ backgroundColor: area.color }}
                >
                  <div className="relative p-8 lg:p-10 flex items-center gap-6 lg:gap-8">
                    {/* Logo Funzine */}
                    <div className="flex-shrink-0">
                      <img 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-english-funzine-JxN2InFZ5FUNsqS0lqWZVRrvPgnxBj.png"
                        alt="English Funzine"
                        className="h-16 lg:h-20 w-auto"
                      />
                    </div>
                    
                    {/* Tagline - The magazine that makes English fun! */}
                    <div className="flex-1 min-w-0">
                      <img 
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the-magazine-f811IynMCsQ7XvD0Q8zJl9pEbfUSCx.png"
                        alt="The magazine that makes English fun!"
                        className="h-10 lg:h-14 w-auto max-w-full"
                      />
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <ArrowRight className="w-6 h-6 lg:w-7 lg:h-7 text-white group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-40 h-40 lg:w-52 lg:h-52 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 lg:w-32 lg:h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                  </div>
                </Link>
              </div>
            </>
          ) : (
            /* Otros idiomas: Secuencias didácticas + Normativa */
            <div className="bg-white rounded-2xl lg:rounded-3xl border border-gray-100 p-6 lg:p-8 shadow-sm">
              <h5 className="text-base lg:text-lg font-bold text-[#494963] mb-6 lg:mb-8 font-display">
                Materiales y recursos educativos
              </h5>
              <div className="space-y-2">
                {/* Secuencias didácticas */}
                <div className="border-b border-gray-100 last:border-0">
                  <button
                    type="button"
                    onClick={() => toggleCategoriaRecurso("secuencias")}
                    className="w-full flex items-center justify-between py-4 lg:py-5 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${area.color}15` }}
                      >
                        <FileText className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: area.color }} />
                      </div>
                      <div>
                        <span className="text-sm lg:text-base font-semibold text-[#494963] block">Secuencias didácticas</span>
                        <span className="text-xs lg:text-sm text-[#494963]/40">{(secuenciasPorIdioma[idiomaSeleccionado] ?? []).length} archivos disponibles</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 lg:w-6 lg:h-6 text-[#494963]/30 transition-transform ${categoriaRecursoAbierta === "secuencias" ? "rotate-180" : ""}`} />
                  </button>
                  {categoriaRecursoAbierta === "secuencias" && (
                    <div className="pb-4 lg:pb-6 space-y-2">
                      {(secuenciasPorIdioma[idiomaSeleccionado] ?? []).map((item, idx) => (
                        <a
                          key={idx}
                          href={item.url}
                          download
                          className="flex items-center justify-between py-4 px-4 lg:px-5 rounded-xl hover:bg-gray-50 group/item transition-colors"
                        >
                          <div className="flex items-center gap-4 min-w-0 flex-1">
                            <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-[#494963]/50" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-sm lg:text-base text-[#494963] font-medium block truncate">{item.nombre}</span>
                              <span className="text-xs lg:text-sm text-[#494963]/40">{item.descripcion} · {item.paginas} páginas</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 flex-shrink-0">
                            <span className="text-xs lg:text-sm text-[#494963]/30">{item.size}</span>
                            <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-lg bg-gray-50 group-hover/item:bg-gray-100 flex items-center justify-center transition-colors">
                              <Download className="w-4 h-4 lg:w-5 lg:h-5 text-[#494963]/50" />
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Normativa */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleCategoriaRecurso("guias")}
                    className="w-full flex items-center justify-between py-4 lg:py-5 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${area.color}15` }}
                      >
                        <BookOpen className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: area.color }} />
                      </div>
                      <div>
                        <span className="text-sm lg:text-base font-semibold text-[#494963] block">Normativa</span>
                        <span className="text-xs lg:text-sm text-[#494963]/40">{normativaOtrasLenguas.length} documentos disponibles</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 lg:w-6 lg:h-6 text-[#494963]/30 transition-transform ${categoriaRecursoAbierta === "guias" ? "rotate-180" : ""}`} />
                  </button>
                  {categoriaRecursoAbierta === "guias" && (
                    <div className="pb-4 lg:pb-6 space-y-2">
                      {normativaOtrasLenguas.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.url}
                          download
                          className="flex items-center justify-between py-4 px-4 lg:px-5 rounded-xl hover:bg-gray-50 group/item transition-colors"
                        >
                          <div className="flex items-center gap-4 min-w-0 flex-1">
                            <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-[#494963]/50" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-sm lg:text-base text-[#494963] font-medium block truncate">{item.nombre}</span>
                              <span className="text-xs lg:text-sm text-[#494963]/40">{item.descripcion}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 flex-shrink-0">
                            <span className="text-xs lg:text-sm text-[#494963]/30 uppercase tracking-wide hidden sm:block">PDF</span>
                            <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-lg bg-gray-50 group-hover/item:bg-gray-100 flex items-center justify-center transition-colors">
                              <Download className="w-4 h-4 lg:w-5 lg:h-5 text-[#494963]/50" />
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  /* Para otras áreas: Itinerarios didácticos -- grilla editorial de portadas */
  const itinerario = getItinerario(area.slug);

  return (
    <section id="materiales" className="scroll-mt-32">
      {/* Section header */}
      <div className="flex flex-col items-center text-center mb-10 md:mb-14">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#494963] font-display text-balance">
          Itinerarios didácticos
        </h3>
        <p className="text-sm sm:text-base text-[#494963]/50 mt-3 max-w-md text-pretty">
          Secuencias didácticas organizadas por ciclo y grado.
        </p>
        {itinerario.recursoGeneral && (
          <a
            href={itinerario.recursoGeneral.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: area.color }}
          >
            <span>Ver planilla de secuencias</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Repositorio editorial: tarjetas por ciclo con filas de materiales */}
      <div className="max-w-3xl mx-auto space-y-5 md:space-y-6">
        {/* Ciclos */}
        {itinerario.ciclos.map((ciclo) => (
          <CicloCard
            key={ciclo.id}
            title={ciclo.name}
            grados={ciclo.grados}
            color={area.color}
            textOnColor={area.textOnColor}
          />
        ))}

        {/* Grados sueltos (Séptimo grado) */}
        {itinerario.gradosSueltos && itinerario.gradosSueltos.length > 0 && (
          <CicloCard
            title="Séptimo grado"
            grados={itinerario.gradosSueltos}
            color={area.color}
            textOnColor={area.textOnColor}
          />
        )}

        {/* Articulación entre Primaria y Secundaria */}
        {itinerario.articulacion && (
          <div className="pt-2">
            <GrupoHeader label="Articulación Primaria – Secundaria" />
            <div className="grid sm:grid-cols-2 gap-4">
              {itinerario.articulacion.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-white px-5 py-4 hover:shadow-md hover:-translate-y-0.5 transition-all group/item"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${area.color}15` }}
                  >
                    <BookOpen className="w-5 h-5" style={{ color: area.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-sm lg:text-base font-semibold text-[#494963]">
                      {link.nombre}
                    </span>
                    <span className="text-xs lg:text-sm text-[#494963]/40">{link.descripcion}</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#494963]/30 group-hover/item:text-[#494963]/60 transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
