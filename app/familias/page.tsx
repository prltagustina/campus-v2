"use client";

import Link from "next/link";
import { ArrowLeft, Download, FileText, Presentation } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing/landing-footer";

const materialesGenerales = [
  {
    nombre: "Familias_cartilla_familias.pdf",
    titulo: "Cartilla para familias",
    descripcion: "Orientaciones generales sobre el nuevo Diseno Curricular para acompanar desde el hogar.",
    formato: "PDF",
    url: "/docs/Familias_cartilla_familias.pdf",
  },
  {
    nombre: "PTT DISENO CURRICULAR para FAMILIAS.pptx.pdf",
    titulo: "Presentacion del Diseno Curricular para Familias",
    descripcion: "Presentacion general del marco curricular en formato visual.",
    formato: "PPT",
    url: "/docs/PTT_DISENO_CURRICULAR_para_FAMILIAS.pdf",
  },
];

const materialesPorArea = [
  {
    area: "Lengua y Literatura",
    color: "#FF7402",
    nombre: "Familias_objetivos_contenido_LenguayLiteratura.pdf",
    titulo: "Objetivos y contenidos - Lengua y Literatura",
    url: "/docs/Familias_objetivos_contenido_LenguayLiteratura.pdf",
  },
  {
    area: "Matematica",
    color: "#E42153",
    nombre: "Familias_objetivos_contenido_Matematica.pdf",
    titulo: "Objetivos y contenidos - Matematica",
    url: "/docs/Familias_objetivos_contenido_Matematica.pdf",
  },
];

export default function FamiliasPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-[#F5F5F7] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#494963]/50 hover:text-[#494963] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#494963] leading-tight mb-4">
              Materiales para Familias
            </h1>
            <p className="text-lg text-[#494963]/60 leading-relaxed max-w-2xl">
              Recursos y orientaciones para acompañar el proceso educativo de sus hijos e hijas en el marco del nuevo Diseño Curricular.
            </p>
          </div>
        </div>
      </section>

      {/* Materiales Generales */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xs uppercase tracking-[0.15em] text-[#494963]/40 font-semibold mb-6">
            Materiales Generales
          </h2>
          <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
            {materialesGenerales.map((mat) => (
              <a
                key={mat.nombre}
                href={mat.url}
                download
                className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors group"
              >
                {mat.formato === "PPT" ? (
                  <Presentation className="w-5 h-5 flex-shrink-0 text-[#B159A7]" />
                ) : (
                  <FileText className="w-5 h-5 flex-shrink-0 text-[#E42153]" />
                )}
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-[#494963] font-medium block truncate">{mat.titulo}</span>
                  <span className="text-xs text-[#494963]/40 block mt-0.5">{mat.nombre}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#494963]/30 font-semibold flex-shrink-0">{mat.formato}</span>
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-[#494963]/30 group-hover:text-[#494963]/60 group-hover:bg-gray-100">
                  <Download className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Materiales por Area */}
      <section className="py-12 md:py-16 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-xs uppercase tracking-[0.15em] text-[#494963]/40 font-semibold mb-6">
            Materiales por Area
          </h2>
          <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
            {materialesPorArea.map((mat) => (
              <a
                key={mat.nombre}
                href={mat.url}
                download
                className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors group"
              >
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: mat.color }} />
                <FileText className="w-5 h-5 flex-shrink-0" style={{ color: mat.color }} />
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-[#494963] font-medium block truncate">{mat.titulo}</span>
                  <span className="text-xs text-[#494963]/40 block mt-0.5">{mat.nombre}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#494963]/30 font-semibold flex-shrink-0">PDF</span>
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-[#494963]/30 group-hover:text-[#494963]/60 group-hover:bg-gray-100">
                  <Download className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
          <p className="text-xs text-[#494963]/30 mt-4">
            Se iran sumando materiales para mas areas a medida que esten disponibles.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
