"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  Video, 
  ChevronRight,
  Clock,
  ArrowRight
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing/landing-footer";

const AREA_COLOR = "#FFCB02";
const TEXT_ON_COLOR = "#5c4a00";

/* Materiales y recursos educativos simulados */
const recursosEducativos = {
  secuencias: [
    { nombre: "Secuencia 1 - Getting Started", formato: "PDF", size: "2.4 MB" },
    { nombre: "Secuencia 2 - My Family", formato: "PDF", size: "3.1 MB" },
    { nombre: "Secuencia 3 - At School", formato: "PDF", size: "2.8 MB" },
  ],
  audiovisuales: [
    { nombre: "Video: Classroom Vocabulary", formato: "MP4", size: "45 MB" },
    { nombre: "Audio: Pronunciation Guide", formato: "MP3", size: "8.2 MB" },
    { nombre: "Video: Interactive Songs", formato: "MP4", size: "62 MB" },
  ],
  guias: [
    { nombre: "Guía Didáctica - Nivel Inicial", formato: "PDF", size: "4.5 MB" },
    { nombre: "Planificación Anual Sugerida", formato: "PDF", size: "1.8 MB" },
    { nombre: "Estrategias de Evaluación", formato: "PDF", size: "2.2 MB" },
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

export default function InglesMaterilesPage() {
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

      {/* Materiales y recursos educativos - Minimalista */}
      <section className="py-10 sm:py-12 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg sm:text-xl font-bold text-[#494963] mb-6 font-display">
              Materiales y recursos educativos
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {/* Secuencias didácticas */}
              <div className="p-4 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition-colors cursor-pointer group">
                <FileText className="w-5 h-5 mb-2 text-[#494963]/30 group-hover:text-[#494963]/50 transition-colors" />
                <p className="text-sm font-medium text-[#494963]">Secuencias didácticas</p>
                <p className="text-xs text-[#494963]/40 mt-0.5">{recursosEducativos.secuencias.length} archivos</p>
              </div>

              {/* Materiales audiovisuales */}
              <div className="p-4 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition-colors cursor-pointer group">
                <Video className="w-5 h-5 mb-2 text-[#494963]/30 group-hover:text-[#494963]/50 transition-colors" />
                <p className="text-sm font-medium text-[#494963]">Materiales audiovisuales</p>
                <p className="text-xs text-[#494963]/40 mt-0.5">{recursosEducativos.audiovisuales.length} archivos</p>
              </div>

              {/* Guías para la docencia */}
              <div className="p-4 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition-colors cursor-pointer group">
                <BookOpen className="w-5 h-5 mb-2 text-[#494963]/30 group-hover:text-[#494963]/50 transition-colors" />
                <p className="text-sm font-medium text-[#494963]">Guías para la docencia</p>
                <p className="text-xs text-[#494963]/40 mt-0.5">{recursosEducativos.guias.length} archivos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serie English Funzine - Destacada */}
      <section className="py-12 sm:py-16 md:py-20 flex-1 bg-[#FAFAFA]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Banner destacado */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-10 sm:mb-12">
              <Image
                src="/images/english-funzine-banner.jpg"
                alt="English Funzine"
                width={900}
                height={300}
                className="w-full h-40 sm:h-52 md:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#494963]/90 via-[#494963]/60 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display mb-1 sm:mb-2">
                  English Funzine
                </h2>
                <p className="text-sm sm:text-base text-white/80 italic">
                  The Magazine That Makes English Fun
                </p>
              </div>
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
