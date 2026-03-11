"use client";

import Link from "next/link";
import { ArrowLeft, Download, FileText, Monitor, Clock, Users, MapPin, Bookmark } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing/landing-footer";

const documentos = [
  {
    nombre: "Marco_General_Diseno_Curricular.pdf",
    titulo: "Marco General del Diseño Curricular",
    formato: "PDF",
    url: "/docs/Marco_General_Diseno_Curricular.pdf",
  },
  {
    nombre: "Guia_Planificacion_Docente.pdf",
    titulo: "Guía de Planificación Docente",
    formato: "PDF",
    url: "/docs/Guia_Planificacion_Docente.pdf",
  },
  {
    nombre: "Orientaciones_Evaluacion.pdf",
    titulo: "Orientaciones para la Evaluación",
    formato: "PDF",
    url: "/docs/Orientaciones_Evaluacion.pdf",
  },
  {
    nombre: "Organizacion_Curricular.pdf",
    titulo: "Organización Curricular",
    formato: "PDF",
    url: "/docs/Organizacion_Curricular.pdf",
  },
];

const formaciones = [
  {
    titulo: "Afectividad y emociones en la escuela. Fortaleciendo los vínculos desde la ESI",
    programa: "Comunidades de Aprendizajes",
    modalidad: "Virtual asincrónico",
    encuentros: "3 Encuentros",
    destinatarios: "Docentes",
    plataforma: "Plataforma Educativa",
    nivel: "Todos",
  },
  {
    titulo: "Estrategias didácticas para el nuevo Diseño Curricular",
    programa: "Formación Continua",
    modalidad: "Virtual asincrónico",
    encuentros: "4 Encuentros",
    destinatarios: "Docentes y Directivos",
    plataforma: "Plataforma Educativa",
    nivel: "Primario",
  },
  {
    titulo: "Evaluación formativa: nuevos enfoques y herramientas",
    programa: "Comunidades de Aprendizajes",
    modalidad: "Virtual sincrónico",
    encuentros: "2 Encuentros",
    destinatarios: "Docentes",
    plataforma: "Zoom",
    nivel: "Todos",
  },
];

const PRIMARY_COLOR = "#494963";

export default function DocentesPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-[#F5F5F7] py-16 md:py-20 mt-16">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#494963]/50 hover:text-[#494963] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#494963] leading-tight mb-4 font-display">
              Para Docentes y Directivos
            </h1>
          </div>
        </div>
      </section>

      {/* Documentos y Descargas */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-[#494963] mb-8 text-center font-display">
            Documentos y Descargas
          </h2>
          <div className="max-w-3xl mx-auto border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
            {documentos.map((doc) => (
              <a
                key={doc.nombre}
                href={doc.url}
                download
                className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors group"
              >
                <FileText className="w-5 h-5 flex-shrink-0 text-[#494963]" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-[#494963] font-medium block truncate">{doc.titulo}</span>
                  <span className="text-xs text-[#494963]/40 block mt-0.5">{doc.nombre}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#494963]/30 font-semibold flex-shrink-0">{doc.formato}</span>
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-[#494963]/30 group-hover:text-[#494963]/60 group-hover:bg-gray-100">
                  <Download className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Formaciones Docentes */}
      <section className="py-12 md:py-16 bg-[#EDEDF0]">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-[#494963] mb-10 text-center font-display">
            Formaciones Docentes
          </h2>
          
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {formaciones.map((formacion, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group bg-white"
              >
                {/* Header */}
                <div
                  className="p-6 md:p-7"
                  style={{ backgroundColor: PRIMARY_COLOR, color: "#ffffff" }}
                >
                  <h4 className="text-sm md:text-base font-bold leading-snug mb-3 pr-4">
                    {formacion.titulo}
                  </h4>
                  <p className="text-[11px] font-medium opacity-75">
                    {formacion.programa}
                  </p>
                </div>

                {/* Details */}
                <div className="p-6 md:p-7 space-y-3">
                  {[
                    { icon: Monitor, text: formacion.modalidad },
                    { icon: Clock, text: formacion.encuentros },
                    { icon: Users, text: formacion.destinatarios },
                    { icon: MapPin, text: formacion.plataforma },
                    { icon: Bookmark, text: `Nivel: ${formacion.nivel}` },
                  ].map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-3 text-[13px] text-gray-600"
                    >
                      <Icon className="w-4 h-4 text-gray-300 flex-shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-50 px-6 md:px-7 py-4">
                  <a
                    href="#"
                    className="text-xs font-bold transition-colors hover:underline"
                    style={{ color: PRIMARY_COLOR }}
                  >
                    + Info
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
