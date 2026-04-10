"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  Video, 
  ChevronRight,
  ChevronDown,
  Clock,
  ArrowRight,
  Download
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing/landing-footer";

const AREA_COLOR = "#FFCB02";
const TEXT_ON_COLOR = "#5c4a00";

/* Materiales y recursos educativos simulados - Repositorio expandido */
const recursosEducativos = {
  secuencias: [
    { nombre: "Primeros pasos en inglés", formato: "PDF", size: "2.4 MB" },
    { nombre: "Mi familia y yo", formato: "PDF", size: "3.1 MB" },
    { nombre: "En la escuela", formato: "PDF", size: "2.8 MB" },
    { nombre: "Los colores del mundo", formato: "PDF", size: "2.2 MB" },
    { nombre: "Animales y naturaleza", formato: "PDF", size: "3.5 MB" },
  ],
  audiovisuales: [
    { nombre: "Vocabulario del aula", formato: "MP4", size: "45 MB" },
    { nombre: "Guía de pronunciación", formato: "MP3", size: "8.2 MB" },
    { nombre: "Canciones interactivas", formato: "MP4", size: "62 MB" },
    { nombre: "Storytelling: The Little Star", formato: "MP4", size: "38 MB" },
  ],
  guias: [
    { nombre: "Guía didáctica - Nivel inicial", formato: "PDF", size: "4.5 MB" },
    { nombre: "Planificación anual sugerida", formato: "PDF", size: "1.8 MB" },
    { nombre: "Estrategias de evaluación", formato: "PDF", size: "2.2 MB" },
    { nombre: "Recursos para el aula", formato: "PDF", size: "3.0 MB" },
  ],
};

/* Issues de English Funzine */
const funzineIssues = [
  {
    number: 1,
    slug: "issue-1",
    title: "It's great to be me!",
    available: true,
  },
  {
    number: 2,
    slug: "issue-2", 
    title: "Próximamente",
    available: false,
  },
  {
    number: 3,
    slug: "issue-3",
    title: "Próximamente", 
    available: false,
  },
];

type CategoriaRecurso = "secuencias" | "audiovisuales" | "guias";

export default function InglesMaterilesPage() {
  const [categoriaAbierta, setCategoriaAbierta] = useState<CategoriaRecurso | null>(null);

  const toggleCategoria = (cat: CategoriaRecurso) => {
    setCategoriaAbierta(categoriaAbierta === cat ? null : cat);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Hero - fondo amarillo clarito */}
      <section className="py-12 sm:py-16 md:py-20 mt-16" style={{ backgroundColor: `${AREA_COLOR}12` }}>
        <div className="container mx-auto px-4">
          <Link 
            href="/area/lenguas-extranjeras#materiales" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#494963]/50 hover:text-[#494963] transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Volver a Lenguas Extranjeras
          </Link>
          <div className="max-w-3xl">
            <span 
              className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full mb-3 sm:mb-4"
              style={{ backgroundColor: `${AREA_COLOR}40`, color: TEXT_ON_COLOR }}
            >
              Lenguas Extranjeras
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#494963] leading-tight mb-2 font-display">
              Inglés
            </h1>
            <p className="text-lg sm:text-xl text-[#494963]/70 font-medium">
              Itinerarios didácticos
            </p>
          </div>
        </div>
      </section>

      {/* Materiales y recursos educativos - Repositorio */}
      <section className="py-10 sm:py-12 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg sm:text-xl font-bold text-[#494963] mb-6 font-display">
              Materiales y recursos educativos
            </h2>

            <div className="divide-y divide-gray-100">
              {/* Secuencias didácticas */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleCategoria("secuencias")}
                  className="w-full flex items-center justify-between py-4 text-left group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#494963]/30" />
                    <span className="text-sm font-medium text-[#494963]">Secuencias didácticas</span>
                    <span className="text-xs text-[#494963]/30">{recursosEducativos.secuencias.length}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#494963]/30 transition-transform ${categoriaAbierta === "secuencias" ? "rotate-180" : ""}`} />
                </button>
                {categoriaAbierta === "secuencias" && (
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
                  onClick={() => toggleCategoria("audiovisuales")}
                  className="w-full flex items-center justify-between py-4 text-left group"
                >
                  <div className="flex items-center gap-3">
                    <Video className="w-4 h-4 text-[#494963]/30" />
                    <span className="text-sm font-medium text-[#494963]">Materiales audiovisuales</span>
                    <span className="text-xs text-[#494963]/30">{recursosEducativos.audiovisuales.length}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#494963]/30 transition-transform ${categoriaAbierta === "audiovisuales" ? "rotate-180" : ""}`} />
                </button>
                {categoriaAbierta === "audiovisuales" && (
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
                  onClick={() => toggleCategoria("guias")}
                  className="w-full flex items-center justify-between py-4 text-left group"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-[#494963]/30" />
                    <span className="text-sm font-medium text-[#494963]">Guías para la docencia</span>
                    <span className="text-xs text-[#494963]/30">{recursosEducativos.guias.length}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#494963]/30 transition-transform ${categoriaAbierta === "guias" ? "rotate-180" : ""}`} />
                </button>
                {categoriaAbierta === "guias" && (
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
        </div>
      </section>

      {/* Serie English Funzine - Destacada */}
      <section className="py-12 sm:py-16 md:py-20 flex-1 bg-[#FAFAFA]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Banner con logo oficial */}
            <div className="flex flex-col items-center justify-center py-8 sm:py-12 mb-8 sm:mb-10 bg-white rounded-2xl border border-gray-100">
              <Image
                src="/images/english-funzine-logo.png"
                alt="English Funzine"
                width={400}
                height={150}
                className="w-64 sm:w-80 md:w-96 h-auto mb-4"
              />
              <p className="text-sm sm:text-base text-[#494963]/50 italic">
                The magazine that makes English fun
              </p>
            </div>

            {/* Introducción */}
            <div className="mb-10 sm:mb-12">
              <p className="text-sm sm:text-base text-[#494963]/70 leading-relaxed max-w-2xl">
                Les damos la bienvenida a <strong className="text-[#494963]">English Funzine</strong>. 
                Esta serie de materiales está pensada para acompañar la implementación de Lenguas Extranjeras 
                en aquellas escuelas primarias de Santa Fe que elijan enseñar inglés.
              </p>
            </div>

            {/* Video de presentación */}
            <div className="mb-10 sm:mb-12">
              <p className="text-xs font-semibold text-[#494963]/40 uppercase tracking-wider mb-3">
                Video de presentación
              </p>
              <div className="rounded-xl overflow-hidden bg-[#494963]/5 aspect-video flex items-center justify-center border border-gray-100">
                <div className="text-center">
                  <div 
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 cursor-pointer transition-transform hover:scale-105"
                    style={{ backgroundColor: AREA_COLOR }}
                  >
                    <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: TEXT_ON_COLOR }} />
                  </div>
                  <p className="text-xs text-[#494963]/40">Reproducir video</p>
                </div>
              </div>
            </div>

            {/* Issues */}
            <div>
              <p className="text-xs font-semibold text-[#494963]/40 uppercase tracking-wider mb-4">
                Ediciones disponibles
              </p>
              <div className="space-y-3">
                {funzineIssues.map((issue) => (
                  issue.available ? (
                    <Link
                      key={issue.slug}
                      href={`/area/lenguas-extranjeras/materiales/ingles/${issue.slug}`}
                      className="group flex items-center justify-between p-4 sm:p-5 rounded-xl border border-gray-100 bg-white transition-all hover:border-gray-200 hover:shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: AREA_COLOR }}
                        >
                          <span className="text-base sm:text-lg font-bold" style={{ color: TEXT_ON_COLOR }}>
                            {issue.number}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm sm:text-base font-semibold text-[#494963]">
                            Issue {issue.number}
                          </p>
                          <p className="text-xs sm:text-sm text-[#494963]/50 mt-0.5">
                            {issue.title}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#494963]/20 group-hover:text-[#494963]/40 transition-colors" />
                    </Link>
                  ) : (
                    <div
                      key={issue.slug}
                      className="flex items-center justify-between p-4 sm:p-5 rounded-xl border border-gray-100 bg-gray-50/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-200/50">
                          <span className="text-base sm:text-lg font-bold text-[#494963]/30">
                            {issue.number}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm sm:text-base font-semibold text-[#494963]/50">
                            Issue {issue.number}
                          </p>
                          <p className="text-xs sm:text-sm text-[#494963]/30 mt-0.5 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Próximamente
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
